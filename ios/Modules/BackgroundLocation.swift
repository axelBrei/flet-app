//
//  BackgroundLocation.swift
//  fletex_app
//
//  Created by Axel Breiterman on 30/04/2021.
//

import Foundation
import CoreLocation
import React

@objc(LocationTrackingModule)
class LocationTrackingModule: RCTEventEmitter, CLLocationManagerDelegate{
  // CORE LOCATION VARS
  var locationManager: CLLocationManager?
  public static var shared:LocationTrackingModule?
  // EVENT EMITER VARS
  var hasListener: Bool = false
  
  // CUSTOM VARS
  private var vehicleId: NSNumber?
  private var postUrl: String?
  private var accesToken: String?
  private var userToken: String?
  var isRunning: Bool = false
    
  override init() {
    super.init()
    LocationTrackingModule.shared = self
    locationManager = CLLocationManager()
  }
  
  @objc(configure:)
  func configure(_ options: NSDictionary) {
    self.vehicleId = options["vehicle_id"] as? NSNumber
    postUrl = options["url"] as? String
    accesToken = options["AccessToken"] as? String
    userToken = options["Authorization"] as? String
    
    locationManager?.delegate = self
    locationManager?.allowsBackgroundLocationUpdates = true
    locationManager?.pausesLocationUpdatesAutomatically = true
    if #available(iOS 11.0, *) {
      locationManager?.showsBackgroundLocationIndicator = true
    }
    locationManager?.desiredAccuracy = kCLLocationAccuracyBest
    locationManager?.distanceFilter = 150
    print("Config")
  }
  
  @objc func startTracking() -> Void {
    locationManager?.startUpdatingLocation()
    self.isRunning = true
    print("Location started")
  }
  
  @objc func stopTracking() {
    locationManager?.stopUpdatingLocation()
    self.isRunning = false
    print("Location stoped")
  }
  
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    print("Location update")
    let firstLocation = locations.first
    let responseDict = [
      "latitude": firstLocation?.coordinate.latitude,
      "longitude": firstLocation?.coordinate.longitude,
      "timestamp": firstLocation?.timestamp,
      "bearing": firstLocation?.course,
      "vehicle_id": self.vehicleId
    ] as [String : Any]
    
    if(hasListener){
      // SEND NATIVE EVENT
      sendEvent(withName: "onLocation", body: responseDict)
    }
    self.postToServer(location: firstLocation!)
  }
  
  override func supportedEvents() -> [String]! {
      return ["onLocation"]
    }
  
  override func startObserving() {
    hasListener = true
  }
  
  override func stopObserving() {
    hasListener = false
  }
  

  // BACKGROUND POST
  var urlSession = URLSession.shared
  private var taskID:UIBackgroundTaskIdentifier!
  private func sendLocationToServer() -> Void {
    
    DispatchQueue.global().async {
      self.taskID = UIApplication.shared.beginBackgroundTask(withName: "Finish Network Task") {
        UIApplication.shared.endBackgroundTask(self.taskID!)
        self.taskID = UIBackgroundTaskIdentifier.invalid
      }
      // EXECUTE REQUEST
      UIApplication.shared.endBackgroundTask(self.taskID!)
      self.taskID = UIBackgroundTaskIdentifier.invalid
    }
    
  }
  
  func postToServer(location: CLLocation) {
    let url = URL(string: postUrl!)!
    
    let json: [String:Any] = [
      "latitude": location.coordinate.latitude,
      "longitude": location.coordinate.longitude,
      "vehicle_id": vehicleId
    ]
    let jsonData = try? JSONSerialization.data(withJSONObject: json)
    
    var request = URLRequest(url: url, cachePolicy: .reloadIgnoringCacheData)
    request.httpMethod = "POST"
    request.httpBody = jsonData
    request.setValue(userToken, forHTTPHeaderField: "Authorization")
     request.setValue(accesToken, forHTTPHeaderField: "AccessToken")
    let task = urlSession.dataTask(with: request, completionHandler: {
      data, response, error in
      if(error == nil){
        print("request succes")
      }
    })
    task.resume()
    
  }
}
