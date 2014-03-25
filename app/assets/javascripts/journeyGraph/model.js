Tangent.JourneyGraph = function() {
  
}

Tangent.JourneyGraph.prototype.add = function(journey, topic) {
  var url = "/add_topic?journey=" + journey + "&topic=" + topic;
  $.post(url, function(res) {
    history.pushState({}, null, res.name);
    window.newTopicId=res;
    $("span#topic_id").text(newTopicId.id);
  });
}

Tangent.JourneyGraph.prototype.create = function(){
  count = 0;
  
}


// function addTopic(journey, topic){
//   var url = "/add_topic?journey=" + journey + "&topic=" + topic;

//   $.post(url, function(res) {
//     history.pushState({}, null, res.name);
//     window.newTopicId=res;
//     $("span#topic_id").text(newTopicId.id);
//   });
// }


// function create(){
//   count = 0;
//   addTopic($("span#journey_id").text(),
//            this.getAttribute("data-tooltip"))
//   $.post({url:     "/topics/" + $("span#topic_id").text(),
//           counter: $("span#counter").text(),
//           _method: "put"});
//   d3.json("/data?word="+ (this.getAttribute("data-tooltip")), draw)

//   Tangent.setHeading(this.getAttribute("data-tooltip"));

//   var topicSpan = $("<div class='bubble-line'></div><a id='sup' data-tooltip='"+this.getAttribute("data-tooltip")+"'><div class='bubble'></div></a>")
//     .on("click", create);
//   $("div#past_topics").append(topicSpan)
//   makeTimeline();
// }