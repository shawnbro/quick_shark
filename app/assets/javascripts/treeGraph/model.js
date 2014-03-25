Tangent.TreeGraph = function() {
  this.data = {};
}

Tangent.TreeGraph.prototype.getData = function(searchTerm) {
  function saveResult(result){
    this.data = result;
    Tangent.currentGraph.render(); // SHOULD SPLIT THIS OUT!!!!!!!!!!!
  }
  saveResult = saveResult.bind(this);

  $.ajax({
    url: "/data?word=" + encodeURIComponent(searchTerm),
    _method: "GET"
  }).done(saveResult);
}

Tangent.TreeGraph.prototype.journeyForth = function(topic_id, counter, searchTerm) {
  $.post("/topics/" + encodeURIComponent(topic_id),
    {_method: "PUT",
     counter: counter}
  ).done(function(result){ // SHOULD RETURN THE SEARCHED DATA!!!!
    Tangent.currentGraph = new Tangent.TreeGraph();
    Tangent.currentGraph.getData(searchTerm); // NO TWO AJAX REQUESTS PER HANDSHAKE
  });

  count = 0; // reset the counter (a global variable: PUT THIS BEHIND THE TANGENT APP NAMESPACE) 
}

Tangent.TreeGraph.prototype.endJourney = function(topic_id, counter) {
  $.ajax({
    url:  "/topics/" + encodeURIComponent(topic_id),
    type: "PUT",
    data: {counter: counter}
  });
}