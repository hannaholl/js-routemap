# js-routemap
Quickly create a google map displaying a travelled route with info on each location.

Demo here http://hannahollstrom.se/dev/routemap/demo/  
Live example as a wordpress plugin http://hannahollstrom.se/travels/map/

## Instructions
1. Include Google Maps on the page where you want to use the route map. https://developers.google.com/maps/
2. Include js/HHRouteMap.js in your project.
3. Initialise the map by calling HHRouteMap.createMap(mapDivId, options) passing the ID of the div the map is going to use, as a string. The options object is optional. HHRouteMap.createMap() returns a new HHRouteMap.Map object.
4. Add locations to the map by calling map.addLocations(locationArray) passing an array with HHRouteMap.Location objects.

#### Options

The following options are available for the map and can be passed in an object in HHRouteMap.createMap()  

**infoWindowMaxWidth**: Integer. The maximum width in px of the popup window for each location. *Default 450*  
**sortLocationsByDate**: Boolean. Sort the locations passed to HHRouteMap.Map.addLocations(locationArray) by their arriveDate and leavingDate properties. Requires all locations to have leaving and/or arrive date set to work properly. *Default true*  
**mapCenter**: Object containing 'lat' and 'lng' properties. Defines the map's initial center *Default {lat: 51.5072, lng: 0.1275}*  
**mapInitialZoom**: Integer. Initial zoom of the map. *Default 5*  
**centerOnLastLocation**: Boolean. When locations are added, the map will automatically center on the last one. *Default true*  
**customMarkerIconPath**: String. Define a custom marker icon, can be absolute or relative path. Uses the original Google map pin by default.  
**lineOptions**: Object containing color, opacity and weight properties. Defines the line drawn between locations. *Default {color: '#6432FA', opacity: 0.7, weight: 5}*  

#### The HHRouteMap.Location object
To add a route to the map you call addLocations(locationArray) on an HHRouteMap.Map object, where locationArray is an array of HHRouteMap.Location objects. A location object is created by calling 'new HHRouteMap.Location()' and then setting it's properties:  
**lat**: Number. The locations latitude. *Required*  
**lng**: Number. The locations longitude. *Required*  
**locationTitle**: String. The title to display when clicking the location icon on the map. *Required*  
**imageUrl**: String. URL to an image to show when clicking the location icon on the map.  
**link**: String. A link to add to the location's info window. Will link with the copy 'Read about my experience in *locationTitle* here'.  
**copy**: String. Text to add to the location's info window.  
**arriveDate**: Date object. The date arrived at this location. Will be used to order the locations if map setting sortLocationsByDate is set to true   
**leavingDate**: Date object. The date leaving at location. Will be used to order the locations if map setting sortLocationsByDate is set to true  

To change any of the fixed copy in the info window, change it in the HHRouteMap.Map.getHtmlForLocation() method.
