$(document).ready(function(){
  KeyboardJS.on('down', function() {
    console.log('down firing');
    reset();
    $("div#define")[0].style.top = "5%";
    $("div#pictures")[0].style.top = "105%";
    // ajax get for description
    $.ajax({
      url: "/description",
      data: {name: $("h1").text()},
      dataType: "text",
      success: function(result){$("div#define p").text(result)}
    });
  }); // on 'down'

  KeyboardJS.on('up', function() {
    console.log('up firing');
    reset();
    $("div#pictures")[0].style.top = "5%";
    $("div#define")[0].style.top = "-105%";
    // ajax get for pictures
    $.ajax({
      url: "/pictures",
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){
        $("div#pictures img").remove();
        $("div.flickr-wrapper").remove();
        $("div#pictures").append("<div class=flickr-wrapper>");
        for ( var i = 0; i < 4; i++ ){
        $("div.flickr-wrapper").append("<div class=flickr><img src="+result[i]+" ></div>");
        }
      }
    });
  }); // on 'up'

  KeyboardJS.on('left', function() {
    console.log('left firing');
    reset();
    $("div#stats")[0].style.left = "5%";
    $("div#videos")[0].style.left = "-105%";
    // ajax get for stats from wolfram
    $.ajax({
      url: "/stats",
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){
        $("div#stats img").remove();
        for(i=0; i < result.length; i++) {
          $("div#stats").append("<img src='"+result[i]["image"]["src"]+"' >");
        }
      }
    })
  }); // on 'left'

  KeyboardJS.on('right', function() {
    console.log('right firing');
    var videos;

    reset();
    $("div#videos")[0].style.left = "5%";
    $("div#stats")[0].style.left = "105%";
    $.ajax({
      url: "/ytdata",
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){
        newVideos = result;

        $('iframe').remove();
        $('div#video').remove();
        $('button').remove();
        $("div#videos").append('<div class="videoWrap">');
        for ( var i = 0; i < 4; i++ ){
          $('<div id=video><iframe width="400" height="200" src="http://www.youtube.com/embed/' + result.items[i].id.videoId + '"></div>').appendTo('div.videoWrap').css('border-radius', '10px');
        }
        $("div#videos").append($("<button id='refresh'></button>").text("Refresh"));
        $('button').css('border-radius', '10px');
        $('div.videoWrap').css('display', 'block').css('width', '1000px').css('margin-left', 'auto').css('margin-right', 'auto');
        $('div#video').css('display', 'inline-block');
      }
    }); // end ajax
  }); // on 'right'

  var videoIndex = 4;

  $('#videos').on("click", "button", function() {
    $('iframe').remove();
    $('div#video').remove();
    $('button').remove();
    for ( var i = 0; i < 4; i++ ){
      $('<div id=video><iframe width="400" height="200" src="http://www.youtube.com/embed/' + newVideos.items[(i+videoIndex) % 50].id.videoId + '"></div>').appendTo('div.videoWrap').css('border-radius', '10px');
    }
    $("div#videos").append($("<button>").text("Refresh"));
    $('button').css('border-radius', '10px');
    $('div.videoWrap').css('display', 'block').css('width', '1000px').css('margin-left', 'auto').css('margin-right', 'auto');
    $('div#video').css('display', 'inline-block');

    videoIndex += 4;

  }); // click button#refresh

  var reset = function() {
    $("div#define")[0].style.top = "-105%";
    $("div#pictures")[0].style.top = "105%";
    $("div#videos")[0].style.left = "-105%";
    $("div#stats")[0].style.left = "105%";
  }

  KeyboardJS.on('c', reset);

}); // end ready
