function initDemoMap()
{
  // Create a new map in the div with ID 'map-canvas'. All settings are optional and will be set to default when they're not passed
  var myMap = HHRouteMap.createMap('map-canvas',
  {
    infoWindowMaxWidth: 450,
    sortLocationsByDate: true, // Requires all locations to have leaving and/or arrive date set to work properly
    mapInitialZoom: 5,
    mapCenter: {lat: 51.5072, lng: 0.1275}, // The maps initial center
    centerOnLastLocation: true, // When the locations are added, map will automatically center on the last one
    customMarkerIconPath: 'images/marker-icon.png', // Add a custom pin icon
    lineOptions:
    {
      color: '#6432FA',
      opacity: 0.7,
      weight: 5
    }
  });

  // Create three dummy locations to display on the map
  var KLLocation = new HHRouteMap.Location();
  KLLocation.lat = 3.139;
  KLLocation.lng = 101.68685;
  KLLocation.locationTitle = 'Kuala Lumpur';
  KLLocation.imageUrl = 'images/kl.JPG';
  KLLocation.leavingDate = new Date(2014, 10, 25);

  var palawanLocation = new HHRouteMap.Location();
  palawanLocation.lat = 11.20971;
  palawanLocation.lng = 119.46225;
  palawanLocation.locationTitle = 'Palawan';
  palawanLocation.copy = 'I loved Palawan so much!';
  palawanLocation.imageUrl = 'images/palawan.JPG';
  palawanLocation.link = 'http://hannahollstrom.se/travels';
  palawanLocation.arriveDate = new Date(2014, 10, 25);
  palawanLocation.leavingDate = new Date(2014, 11, 10);

  var boracayLocation = new HHRouteMap.Location();
  boracayLocation.lat = 11.9673502;
  boracayLocation.lng = 121.924759;
  boracayLocation.locationTitle = 'Boracay';
  boracayLocation.copy = 'Boracay was a great party.';
  boracayLocation.arriveDate = new Date(2014, 11, 10);

  var locationArray = [boracayLocation, KLLocation, palawanLocation];

  myMap.addLocations(locationArray);
}

initDemoMap();
