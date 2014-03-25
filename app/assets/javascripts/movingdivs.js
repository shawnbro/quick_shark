$(document).ready(function(){
  KeyboardJS.on('down', function() {
    reset();
    $("div#define")[0].style.top = "5%";
    $("div#pictures")[0].style.top = "105%";
    // ajax get for description
    $.ajax({
      url: "/description",
      data: {name: $("h1").text()},
      dataType: "text",
       success: function(result){$("div#define p#description").text(result)}
    });
    // ajax get for definitions
    $.ajax({
      url: "/definitions",
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){

        // Removing any leftover elements
        $("div#definitions p").remove();
        $("div#reverse_definitions p").remove();
        // Append the definition to the div tab in a <p>
        $.each(result[0]["definitions"], function(index, value){
          $("div#definitions").append($("<p>").text(value["text"]))
        })
        // Append the reverse definition to the div tab in a <p>
        $.each(result[0]["reverse_definitions"]["results"], function(index, value){
          $("div#reverse_definitions").append($("<p>").text(value["text"]))
        });
      }
    });
  }); // on 'down'

  KeyboardJS.on('up', function() {
    reset();
    $("div#pictures")[0].style.top = "5%";
    $("div#define")[0].style.top = "-105%";
    // ajax get for pictures
    $.ajax({
      url: "/pictures",
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){
        // Removing any leftover elements
        $("div#pictures img").remove();
        $("div.flickr-wrapper").remove();
        // Creating a picture wrapper div for all the pics
        // Then creating picture divs for each pic, then appending to the pic wrapper
        $("div#pictures").append("<div class=flickr-wrapper>");
        for ( var i = 0; i < 4; i++ ){
          $("div.flickr-wrapper").append("<div class=flickr><img src="+result[i]+" ></div>");
        }
        // Creating a refresh button, then appending that to the wrapper
        $("div.flickr-wrapper").append($("<button id='photo_refresh'></button>").text("Refresh"));
        // Adding event listener to refresh button, function below
        $("div.flickr-wrapper button").on("click", updatePhotos);
      }
    });
  }); // on 'up'

  KeyboardJS.on('left', function() {
    reset();
    $("div#stats")[0].style.left = "5%";
    $("div#videos")[0].style.left = "-105%";
    // ajax get for stats from wolfram
    $.ajax({
      url: "/stats",
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){
        $("div.stat").remove();
        for(i=0; i < result.length; i++) {
          $("div#stats").append("<div class='stat'><img src='"+result[i]["image"]["src"]+"' ></div>");
        }
      }
    })
  }); // on 'left'

  KeyboardJS.on('right', function() {
    var videos;

    reset();
    $("div#videos")[0].style.left = "5%";
    $("div#stats")[0].style.left = "105%";
    // AJAX call to retrieve Youtube JSON object
    $.ajax({
      url: "/ytdata",
      // Passing the name of the topic here
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){
        // Setting the retrieved data from the AJAX call
        // to a variable for use later in the function
        newVideos = result;
        // Remove any previous divs or elements
        // wihtin the video div
        $('iframe').remove();
        $('div#video').remove();
        $('div.videoWrap').remove();
        $('button').remove();

        // Creating a div wrapper for the video divs, appending to the tab div
        // Creating iframes and divs for the YouTube videos, then appending to the div wrapper
        // Creating a refresh button and appending ot the tab div
        $("div#videos").append('<div class="videoWrap">');
        for ( var i = 0; i < 4; i++ ){
          $('<div id=video><iframe src="http://www.youtube.com/embed/' + result.items[i].id.videoId + '"></div>').appendTo('div.videoWrap');
        }
        $("div#videos").append($("<button id='refresh'></button>").text("Refresh"));
      }
    }); // end ajax
  }); // on 'right'

  var videoIndex = 4;

  $('#videos').on("click", "button", function() {

    // Same function as above, clearing previous elements
    // Then making new divs and iframes with new Youtube results
    $('iframe').remove();
    $('div#video').remove();
    $('div.videoWrap').remove();
    $('button').remove();
    $("div#videos").append('<div class="videoWrap">');
    for ( var i = 0; i < 4; i++ ){
      // Variable set in the AJAX call function used here
      // % 50 used to return to the beginning of the results
      // Once the user refreshes past 50 videos
      $('<div id=video><iframe src="http://www.youtube.com/embed/' + newVideos.items[(i+videoIndex) % 50].id.videoId + '"></div>').appendTo('div.videoWrap');
    }
    $("div#videos").append($("<button id='refresh'></button>").text("Refresh"));

    videoIndex += 4;

  }); // click button#refresh

  var reset = function() {
    $("div#define")[0].style.top = "-105%";
    $("div#pictures")[0].style.top = "105%";
    $("div#videos")[0].style.left = "-105%";
    $("div#stats")[0].style.left = "105%";
  }

  KeyboardJS.on('c', reset);

  var updatePhotos = function() {
    // Essentially same function as above
    // Clearing elements then creating new divs and generating new pics
    $.ajax({
      url: "/pictures",
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){
        $("div#pictures img").remove();
        $("div.flickr-wrapper").remove();
        $("div#pictures").append("<div class=flickr-wrapper>");
        for ( var i = 0; i < 4; i++ ){
          $("div.flickr-wrapper").append("<div class=flickr><img src="+result[i]+" ></div>")
         };
        $("div.flickr-wrapper").append($("<button id='photo_refresh'></button>").text("Refresh"));
        $("div.flickr-wrapper button").on("click", updatePhotos)
      }
    });
  };
}); // end ready

