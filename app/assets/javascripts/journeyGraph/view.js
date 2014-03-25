Tangent.JourneyGraph.prototype.render = function() {
  var test = $("div#past_topics").children()

  for(i = 0; i < test.length; i++) { 
    if(test[i].id === "sup") { 
      $(test[i]).darkTooltip({
        animation:'flipIn',
        gravity:'north'
      }); 
    }
  }
}



// addTopic($("span#journey_id").text(), d.name);
// var topicSpan = $("<div class='bubble-line'></div><a id='sup' data-tooltip='"+d.name+"'><div class='bubble'></div></a>").on("click", create);
// $("div#past_topics").append(topicSpan);
// makeTimeline();
