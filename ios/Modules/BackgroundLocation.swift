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
  var locationStatus : NSString = "Not Started"
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
    locationManager?.requestAlwaysAuthorization()
    print("Location Config")
  }
  
  @objc func startTracking() -> Void {
    guard let currentLocation = locationManager?.location else {
      sendEvent(withName: "error", body: [
        "code": "FAIL_LOCATION",
        "message": "No pudimos obtener tu ubicación."
      ])
      return
    }
    locationManager?.startUpdatingLocation()
    self.isRunning = true
    print("Location start")
    postToServer(location: currentLocation)
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
      "latitude": firstLocation?.coordinate.latitude as Any,
      "longitude": firstLocation?.coordinate.longitude as Any,
      "timestamp": firstLocation?.timestamp as Any,
      "bearing": firstLocation?.course as Any,
      "vehicle_id": self.vehicleId as Any
    ] as [String : Any]
    
    if(hasListener){
      // SEND NATIVE EVENT
      sendEvent(withName: "onLocation", body: responseDict)
    }
    self.postToServer(location: firstLocation!)
  }
  // Location Manager Delegate stuff
  // If failed
  func locationManager(manager: CLLocationManager!, didFailWithError error: NSError!) {
      locationManager?.stopUpdatingLocation()
    if ((error) != nil) {
      sendEvent(withName: "error", body: [
        "code": "CL_ERROR",
        "message": error
      ])
      }
  }
  
  // authorization status
  private func locationManager(manager: CLLocationManager!,
      didChangeAuthorizationStatus status: CLAuthorizationStatus) {
    if(status == .authorizedAlways){
      self.startTracking()
    }else{
      print("location error: not authorized")
      sendEvent(withName: "error", body: [
        "code": "NOT_AUTHORIZED",
        "message": "Tenés que darle permisos a la applicación para usar tu ubicación"
      ])
    }
  }
  
  override func supportedEvents() -> [String]! {
      return ["onLocation", "error"]
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
      "vehicle_id": vehicleId as Any
    ]
    let jsonData = try? JSONSerialization.data(withJSONObject: json)
    
    var request = URLRequest(url: url, cachePolicy: .reloadIgnoringCacheData)
    request.httpMethod = "POST"
    request.httpBody = jsonData
    request.setValue(self.userToken, forHTTPHeaderField: "Authorization")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue("application/json", forHTTPHeaderField: "Accept")
    request.setValue("*", forHTTPHeaderField:"Access-Control-Allow-Origin")
    request.setValue("Origin, X-Requested-With, Content-Type, Accept", forHTTPHeaderField:"Access-Control-Allow-Headers")
    request.setValue(self.accesToken, forHTTPHeaderField: "AccesToken")
    let task  = urlSession.dataTask(with: request) { [weak self] data, response, error in
      defer {
        self?.taskID = nil
      }
      // 5
      if let error = error {
        print("location Request error")
      } else {
        if
          let _response = response as? HTTPURLResponse,
          _response.statusCode == 200 {
          print("location Request success")
        } else {
          print("location Request error")
        }
      }
    }
    task.resume()
    
  }
  
  @objc override static func requiresMainQueueSetup() -> Bool {
      return false
  }
}
