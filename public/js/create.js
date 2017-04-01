/**
 * Created by Resi Tamas on 30/03/2017.
 */

var players = [];
var invites = [];
var requests = [];

$(function(){

    players = JSON.parse($('#participants').val());
    invites = JSON.parse($('#invites').val());
    requests = JSON.parse($('#requests').val());

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15,
        format: 'yyyy-mm-dd',
        default: $(this).val(),
        onSet: function( arg ){
            if ( 'select' in arg ){
                this.close();
            }
        }
    });
    $('#timepicker').pickatime({
        autoclose: true,
        twelvehour: false
    });
    $('select').material_select();
    var single = $('#singleInput').materialize_autocomplete({
        multiple: {
            enable: false
        },
        dropdown: {
            el: '#singleDropdown'
        },
        getData: function (value, cb) {

            $.ajax({
                type: "GET",
                dataType: "json",
                contentType: 'application/json',
                url: "/users?name=%s",
                data: {
                    name: value
                },
                success: function (data) {

                    selectedData = undefined;

                    cb(value,data);
                }

            });
        },
        onSelect: function (item) {

            selectedData = item;

        }
    });

})

function showUserInfo() {
    window.open('/users/1','_blank');
}


function remove(element, type) {

    if (type == "players") {
        removeFromPlayers(element);
    } else {
        if (type == "invites") {
            removeFromInvites(element);
        } else {
            removeFromRequests(element);
        }
    }

}

function removeFromPlayers(element) {

    var parent = $(element).closest("li");

    changeClass(parent,"red", "green");

    players = removeFrom(players,parseInt(parent.attr("data-userid")));

    $("#participants").val(JSON.stringify(players));

}

function removeFromInvites(element) {

    var parent = $(element).closest("li");

    changeClass(parent,"red", "green");

    invites = removeFrom(invites,parseInt(parent.attr("data-userid")));

    $("#invites").val(JSON.stringify(invites));

}

function removeFromRequests(element) {

    var parent = $(element).closest("li");

    changeClass(parent,"red", "green");

    requests = removeFrom(requests,parseInt(parent.attr("data-userid")));

    $("#requests").val(JSON.stringify(requests));

}

function addFromRequests(element) {

    var parent = $(element).closest("li");

    changeClass(parent,"green", "red");

    requests = addTo(requests,parseInt(parent.attr("data-userid")));

    $("#requests").val(JSON.stringify(requests));

}

function changeClass(parent, newCssClass, oldCssClass) {

    parent.removeClass(oldCssClass);

    if (parent.hasClass(newCssClass)){
        parent.removeClass(newCssClass);
    } else {
        parent.addClass(newCssClass);
    }
}

function removeFrom(array, element) {

    var index = array.indexOf(element);

    if (index > -1) {
        array.splice(index,1);
    } else {
        array.push(element);
    }

    return array;
}

function addTo(array, element) {

    if ($.inArray(element,array) == -1) {
        array.push(element);
    } else {

        var index = array.indexOf(element)
        array.splice(index,1);
    }

    return array;
}

function invite() {

    if (selectedData != undefined) {

        var length = invites.length;

        invites = addTo(invites, selectedData.id);

        $("#invites").val(JSON.stringify(invites));

        if (length != invites.length) {
            addToCollection(selectedData.text.split("(")[0],selectedData.id);
            $('#invitesCollection #header').text("Invites (" + invites.length + ")")
        }

        $('#singleInput').get(0).value = "";
        selectedData = undefined;
    }
}

function addToCollection(name, id) {

    var str = getHTMLString(name, id);

    $("#invitesCollection").get(0).innerHTML += str;
}

function getHTMLString(userName, userId) {

    var str = "<li class='collection-item avatar hoverable' data-userid='"+userId+"'>";
    str += "<img src='https://avatars.githubusercontent.com/u/17765383?v=3&s=40' alt='' class='circle'>";
    str += "<span class='title black-text'>"+userName+"</span>";
    str += "<div class='secondary-content'>";
    str += "<i class='material-icons' onclick='remove(this,\"invites\")'>remove</i>";
    str += "<i class='material-icons' onclick='showUserInfo()'>info</i>";
    str += "</div></li>"

    return str;
}

