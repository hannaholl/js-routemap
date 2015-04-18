var HHRouteMap =
{
  createMap: function(mapDivId, options)
  {
    var map = new HHRouteMap.Map();

    // Implement options
    var mapSettings = new HHRouteMap.DefaultSettings();
    if (options)
    {
      for (var prop in options)
      {
        if (options.hasOwnProperty(prop))
        {
          mapSettings[prop] = options[prop];
        }
      }
    }

    map.initMap(mapDivId, mapSettings);

    return map;
  },

  DefaultSettings: function()
  {
    this.infoWindowMaxWidth = 450;
    this.sortLocationsByDate = true; // Requires all locations to have leaving and/or arrive date set to work properly
    this.mapCenter = {lat: 51.5072, lng: 0.1275}; // The maps initial center
    this.mapInitialZoom = 5;
    this.centerOnLastLocation = true; // When the locations are added, map will automatically center on the last one
    this.customMarkerIconPath = '';
    this.lineOptions =
    {
      color: '#6432FA',
      opacity: 0.7,
      weight: 5
    }
  },

  Location: function()
  {
    this.lat = 0;
    this.lng = 0;
    this.imageUrl = '';
    this.link = '';
    this.locationTitle = '';
    this.copy = '';
    this.arriveDate = null;
    this.leavingDate = null;
  },

  Map: function()
  {
    this.googleMap = null,
    this.infoWindow = null,
    this.settings = null,

    this.initMap = function(mapDivId, settings)
    {
      this.settings = settings;

      var mapOptions =
      {
        center: { lat: this.settings.mapCenter.lat, lng: this.settings.mapCenter.lng},
        zoom: this.settings.mapInitialZoom
      };
      this.googleMap = new google.maps.Map(document.getElementById(mapDivId), mapOptions);

      var t = this;
      google.maps.event.addListener(this.googleMap, 'click', function(e)
      {
        if (t.infoWindow)
        {
          t.infoWindow.close();
        }
      });
    },

    this.addLocations = function(locationArray)
    {
      if (this.settings.sortLocationsByDate)
      {
        locationArray.sort(function(a, b) {
          if (a.arriveDate && b.arriveDate)
          {
            return a.arriveDate - b.arriveDate;
          }
          if (a.leavingDate && b.leavingDate)
          {
            return a.leavingDate - b.leavingDate;
          }
          if (a.arriveDate && b.leavingDate)
          {
            return a.arriveDate - b.leavingDate;
          }
          if (a.leavingDate && b.arriveDate)
          {
            return a.leavingDate - b.arriveDate;
          }
          console.warn('Tried to sort locations by date, but not all locations have a date. Consider setting the sortLocationsByDate options to false.');
        });
      }

      this.addMarkers(locationArray);
      this.addPolylines(locationArray);

      if (this.settings.centerOnLastLocation)
      {
        var lastLocation = locationArray[locationArray.length - 1];
        this.googleMap.panTo(new google.maps.LatLng(lastLocation.lat, lastLocation.lng));
      }
    },

    this.addMarkers = function(locationArray)
    {
      for (var i = 0; i < locationArray.length; i++)
      {
        var location = locationArray[i];
        this.addInfoMarker(location);
      }
    },

    this.addPolylines = function(locationArray)
    {
      var coords = [];
      for (var i = 0; i < locationArray.length; i++)
      {
        var location = locationArray[i];
        coords.push(new google.maps.LatLng(location.lat, location.lng));
      }

      var travelPath = new google.maps.Polyline(
      {
        path: coords,
        geodesic: true,
        strokeColor: this.settings.lineOptions.color,
        strokeOpacity: this.settings.lineOptions.opacity,
        strokeWeight: this.settings.lineOptions.weight
      });

      travelPath.setMap(this.googleMap);
    },

    this.addInfoMarker = function(location)
    {
      var latlng = new google.maps.LatLng(location.lat, location.lng);
      var markerSettings =
      {
        position: latlng,
        map: this.googleMap,
        title: location.locationTitle,
      };

      if (this.settings.customMarkerIconPath)
      {
        markerSettings.icon = this.settings.customMarkerIconPath;
      }
      var marker = new google.maps.Marker(markerSettings);

      var t = this;
      google.maps.event.addListener(marker, 'click', function()
      {
        t.showInfoWindowForLocation(location, marker);
      });
    },

    this.showInfoWindowForLocation = function(location, marker)
    {
      if (!this.infoWindow)
      {
        this.infoWindow = new google.maps.InfoWindow({maxWidth: this.settings.infoWindowMaxWidth});
      }

      var content = this.getHtmlForLocation(location);
      this.infoWindow.setContent(content);

      this.infoWindow.open(this.googleMap, marker);
    },

    this.getHtmlForLocation = function(location)
    {
      var html = '<div class="locationContent">';
      html += '<h2>' + location.locationTitle + '</h2>';

      // Custom display of dates depending on wether leaving, arrive or both are set
      html += '<h3>';
      if (!location.leavingDate && location.arriveDate)
      {
        html +='Arrived ';
      }

      if (location.arriveDate)
      {
        html += HHRouteMap.getMonthName(location.arriveDate) +  ' ' + location.arriveDate.getDate() + ', ' + location.arriveDate.getFullYear();
        if (location.leavingDate)
        {
          html += ' - ';
        }
      }
      else if (location.leavingDate)
      {
        html += 'Left on '
      }

      if (location.leavingDate)
      {
        html += HHRouteMap.getMonthName(location.leavingDate) +  ' ' + location.leavingDate.getDate() + ', ' + location.leavingDate.getFullYear();
      }
      html += '</h3>';

      if (location.copy) html += '<p>' + location.copy + '</p>';
      if (location.link) html += '<p><a href="' + location.link + '">Read about my experience in ' + location.locationTitle + ' here</a></p>';
      if (location.imageUrl) html += '<img src="' + location.imageUrl + '"/>';
      html += '</div>';
      return html;
    }
  },

  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  getMonthName: function(date)
  {
    return HHRouteMap.monthNames[date.getMonth()];
  }
}
