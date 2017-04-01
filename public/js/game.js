/**
 * Created by Resi Tamas on 30/03/2017.
 */

var map;
var geocoder;
var address;

var shouldGeocode = false;

$(function() {

    address = $("#map").attr("data-address");

    var mapOptions = {
        center: new google.maps.LatLng(48, 19),
        zoom: 15
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    if (shouldGeocode) {
        codeAddress();
    } else {
        shouldGeocode = true;
    }

});

function showMarker() {

    if (shouldGeocode) {
        codeAddress();
    } else {
        shouldGeocode = true;
    }
}

function codeAddress() {

    geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var infowindow = new google.maps.InfoWindow({
                content: address
            });
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: address
            });
            infowindow.open(map,marker);
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
