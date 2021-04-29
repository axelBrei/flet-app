#!/usr/bin/env bash

# DEFINE COLORS
BLACK="\033[30m"
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
BLUE="\033[34m"
PINK="\033[35m"
CYAN="\033[36m"
WHITE="\033[37m"
NORMAL="\033[0;39m"
END_COLOR='\033[0m'

PROJECT_DIR="ios/OMINT"
INFOPLIST_FILE="Info.plist"
INFOPLIST_DIR="${PROJECT_DIR}/${INFOPLIST_FILE}"

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
PACKAGE_TEST_VERSION=$(cat package.json | grep testing-version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')


echo -e "Current version: $PACKAGE_VERSION"
echo -e "Current build version: $PACKAGE_TEST_VERSION \n"

PACKAGE_TEST_VERSION=$(($PACKAGE_TEST_VERSION+1))
echo -e "${GREEN}New version: $PACKAGE_TEST_VERSION${END_COLOR}"
#"testing-version": "7"
sed -i -e "s/\"testing-version\": [0-9]*/\"testing-version\": ${PACKAGE_TEST_VERSION}/g" package.json

git clean -fd package.json-e

cd ios/

# SET IOS BUILD VERSION
xcrun agvtool new-marketing-version $PACKAGE_VERSION
xcrun agvtool new-version -all $PACKAGE_TEST_VERSION

echo -e "${GREEN}Version sync succcesfully${END_COLOR}"
echo -e "\t${YELLOW}Current version: $PACKAGE_VERSION"
echo -e "\tBuild version: $PACKAGE_TEST_VERSION"

