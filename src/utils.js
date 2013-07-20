// The Template Loader. Used to asynchronously load templates located in separate .html files

var apiRoot      = 'http://localhost/SmartPromo/web/app_dev.php/rest';

var servicesRoot = 'https://api.instagram.com/v1';
var appUrl       = 'http://dev/SimpleStagram/';
var appKey       = '65ae185470c34f65ac645a3f405c2fec';
var urlApiLogin  = 'https://api.instagram.com/oauth/authorize/?client_id=' + appKey
                    + '&response_type=code&redirect_uri=' + appUrl 
                    + '&response_type=token&scope=comments';

window.templateLoader = {

    load: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};


var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();


var shuffle = function ( myArray ) {
  var i = myArray.length, j, temp;
  if ( i === 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = myArray[i];
     myArray[i] = myArray[j]; 
     myArray[j] = temp;
   }
}

var parseUsername = function(text) {
  return text.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
    var username = u.replace("@","")
    return u.link("#user/name/"+username);
  });
}

var parseHashtags = function(text) {
  return text.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
    var tag = t.replace("#","")
    return t.link("#search/"+tag);
  });
}