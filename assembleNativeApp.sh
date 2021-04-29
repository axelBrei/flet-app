#!/usr/bin/env bash

source "./consoleFunctions.sh"

PLATFORM=$1
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
PACKAGE_TEST_VERSION=$(cat package.json | grep testing-version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

if [ -z $PLATFORM ]
then
  echo "Platform 'android' or 'ios' expected and NOT SUPPLIED."
  echo "Can also add 'production' or 'development' feature to ios"
  echo 'Example: ./build-binary.sh android'
  exit 1;
fi

step "Updating git with remote"
try git fetch
next

if [ $PLATFORM = "android" ]
then
  VARIANT='release'

  if [ $(git tag -l "$VARIANT/$PACKAGE_VERSION($PACKAGE_TEST_VERSION)") ]; then
      PACKAGE_TEST_VERSION=$((PACKAGE_TEST_VERSION+1))
  fi
  VERSION_TAG="$VARIANT/$PACKAGE_VERSION($PACKAGE_TEST_VERSION)"
  step "${YELLOW}Current version:${END_COLOR} ${VERSION_TAG}"
  try echo -e ""
  next

  step "(1/7) Create Android Bundle"
  try react-native bundle --platform android --dev false --entry-file index.native.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
  next

  cd android
#  step "(2/7) Clean android app"
#  try ./gradlew clean
#  next

  step "(3/7) Remove duplicated resources"
  try git clean -fd app/src/main/res/
  next

  step "(4/7) Generate $VARIANT apk"
  try ./gradlew assembleRelease
  next

  cd app/build/outputs/apk/$VARIANT

  step "(5/7) Remove output.json"
  try rm -rf output.json
  next

  step "(6/7) Rename apk"
  try mv "app-$VARIANT.apk" "FletApp-$VARIANT-v$PACKAGE_VERSION($PACKAGE_TEST_VERSION).apk"
  next

  step "(7/7) Open apk folder"
  try open .
  next

  cd ../../../../../..

#  step "Tag version on repository"
#  try git tag $VERSION_TAG
#  try git push --tags
#  next

  echo "Finish"
elif [ $PLATFORM = 'ios' ]
then
  VARIANT='Release'
  BUILD_DIR=$PWD
  SCHEME='fletex_app'

  cd ios/
  step "(1/6) Installing Pods"
  try pod install
  next
# cd ..
#react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/fletex_app/main.jsbundle --assets-dest ios
#  cd ios/

  step "(2/6) Cleaning project"
  try arch -x86_64 xcodebuild -project fletex_app.xcodeproj -scheme $SCHEME -quiet clean
  next

  step "(3/6) Building"
  try xcodebuild -workspace fletex_app.xcworkspace -scheme $SCHEME -quiet -destination generic/platform=iOS build -configuration release
  next

  step "(4/6) Archiving"
  try xcodebuild -workspace fletex_app.xcworkspace -scheme $SCHEME -quiet -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $PWD/build/fletex_app.xcarchive

  next

  step "(5/6) Exporting"
  try xcodebuild -exportArchive -quiet -archivePath $PWD/build/fletex_app.xcarchive -exportOptionsPlist exportOptions.plist -exportPath $PWD/build
  next

#     MUST INSTAL TRANSPORTER APP FROM APP STORE
  step "(6/6) Uploading to AppStoreConnect"
  /Applications/Transporter.app/Contents/itms/bin/./iTMSTransporter -m upload -u $2 -p $3 -assetFile "$PWD/build/$SCHEME.ipa" -v off -throughput
  next
fi
