/**
 * Created by Resi Tamas on 30/03/2017.
 */
$(function() {
    var mapOptions = {
        center: new google.maps.LatLng(48, 19),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
});
