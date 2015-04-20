# js-routemap
Quickly create a google map displaying a travelled route with info on each location.

Demo here http://hannahollstrom.se/dev/routemap/demo/  
Live example as a wordpress plugin http://hannahollstrom.se/travels/map/

## Getting started
### 1. Include Google Maps on the page where you want to use the route map.
```html
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=REPLACE_WITH_GOOGLE_MAPS_API_KEY"></script>
```
If you don't have a Google Maps API key you can get one here https://developers.google.com/maps/
### 2. Include the HHRouteMap script in your project.
```html
<script type="text/javascript" src="js/HHRouteMap.js"></script>
```
### 3. Initialise the map  
```js
var myMap = HHRouteMap.createMap('mapDivId', options);
```
Pass in the ID of the div the map is going to use, as a string. The options object is optional. HHRouteMap.createMap() returns a new HHRouteMap.Map object.
### 4. Add locations to the map
```js
myMap.addLocations(locationArray);
```
locationArray is an array of HHRouteMap.Location objects.

## Options

You can pass options to the map when you create it with HHRouteMap.createMap():  
```js
var myMap = HHRouteMap.createMap('map-canvas',
{
  infoWindowMaxWidth: 450, // Integer. The maximum width in px of the popup window for each location. Default 450  
  sortLocationsByDate: true, // Boolean. Sort the locations passed to HHRouteMap.Map.addLocations(locationArray) by their arriveDate and leavingDate properties. Requires all locations to have leaving and/or arrive date set to work properly. Default true
  mapInitialZoom: 5, // Integer. Initial zoom of the map. Default 5
  mapCenter: {lat: 51.5072, lng: 0.1275}, // Object containing 'lat' and 'lng' properties. Defines the map's initial center Default {lat: 51.5072, lng: 0.1275}
  centerOnLastLocation: true, // Boolean. When locations are added, the map will automatically center on the last one. Default true
  customMarkerIconPath: 'images/marker-icon.png', // String. Define a custom marker icon, can be absolute or relative path. Uses the original Google map pin by default.
  lineOptions:
  {
    color: '#6432FA', // Colour of the line drawn between locations
    opacity: 0.7, // Opacity of the line drawn between locations
    weight: 5 // Thickness (weight) of the line drawn between locations
  }
});
```

To change any of the fixed copy in the info window, change it in the HHRouteMap.Map.getHtmlForLocation() method. 


## The HHRouteMap.Location object
To add a route to the map you call addLocations(locationArray) on an HHRouteMap.Map object, where locationArray is an array of HHRouteMap.Location objects. A location object is created by calling 'new HHRouteMap.Location()' and then setting it's properties:  
```js
var myLocation = new HHRouteMap.Location();
myLocation.lat = 11.20971; // Number. The locations latitude. Required
myLocation.lng = 119.46225; // Number. The locations longitude. Required
myLocation.locationTitle = 'Palawan'; // String. The title to display when clicking the location icon on the map. Required
myLocation.copy = 'I loved Palawan so much!'; // String. Text to add to the location's info window.  
myLocation.imageUrl = 'images/palawan.JPG'; // String. URL to an image to show when clicking the location icon on the map.
myLocation.link = 'http://hannahollstrom.se/travels'; // String. A link to add to the location's info window. Will link with the copy 'Read about my experience in *locationTitle* here'.
myLocation.arriveDate = new Date(2014, 10, 25); // Date object. The date arrived at this location. Will be used to order the locations if map setting sortLocationsByDate is set to true.
myLocation.leavingDate = new Date(2014, 11, 10); // Date object. The date leaving at location. Will be used to order the locations if map setting sortLocationsByDate is set to true  

// Create map and add the location
var myMap = HHRouteMap.createMap('mapDivId');
myMap.addLocations([myLocation]);
```

## Next steps
One of the main things to implement would be the possibility to keep adding locations to the map after the initial call to addLocations(), at the moment this wont work as expected. Another thing to look at would be customising and localising the fixed copy in the info window.
