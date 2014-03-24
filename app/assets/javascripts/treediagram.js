// add to the timeline
function makeTimeline() {
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

// draw the d3 graph visualization
function draw(treeData) {
  // define local functions
  function addColor() {
    d3.select(this)
      .transition()
        .duration(300)
        .style("fill", "rgb(0,154,205)")
  }
  function removeColor() {
    d3.select(this)
      .transition()
        .duration(800)
        .style("fill", "white")
  }
  function animateText() { 
    if(this.id !== $("h1").text()){
      d3.select(this)
        .transition()
          .duration(100)
          .style("font-size", "16px")
          .style("cursor", "pointer")
          .style("fill", "rgb(0,154,205)")
    }
  }
  function removeTextSize() {
    if(this.id !== $("h1").text()){
      d3.select(this)
        .transition()
          .duration(100)
          .style("font-size", "14px")
          .style("fill", "black")
    }
  }
  function addTopic(journey, topic){
    var url = "/add_topic?journey=" + journey + "&topic=" + topic;

    $.post(url, function(res) {
      history.pushState({}, null, res.name);
      window.newTopicId=res;
      $("span#topic_id").text(newTopicId.id);
    });
  }
  
  function zoom() {
    vis.attr("transform",
             "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }

  // empty the #vis "canvas" if it exists, and remove the tooltipsy div
  $("#viz").empty();
  $("div.tooltipsy").remove();

  // Create the svg canvas (at #viz)
  var vis = d3.select("#viz").append("svg:svg")
    .call(d3.behavior.zoom()
            .scaleExtent([0, 10]).on("zoom", zoom))
    .attr("width", 800)
    .attr("height", 750)
    .append("svg:g")
    .attr("transform", "translate(425, 425)")
    .append("g");

  // Create a d3 cluster canvas
  var cluster = d3.layout.cluster()
    .size([360,425]);
  
  // **TAKE THE DATA AND CREATE "NODES" ON THE CLUSTER CANVAS**
  var nodes = cluster.nodes(treeData);

  // **TAKE THE NODES AND CREATE "LINKS" ON THE CLUSTER CANVAS**
  var links = cluster.links(nodes);

  // create a d3 diagonal projection default for drawing links
  var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

  // draw all of the existing links on the cluster canvas to be connected
  //   by the above defined d3 diagonal projection path
  var link = vis.selectAll("pathlink")
    .data(links)
    .enter().append("svg:path")
    .attr("class", "link")
    .attr("d", diagonal)

  // draw all of the existing nodes on the cluster canvas
  var node = vis.selectAll("g.node")
    .data(nodes)
    .enter().append("svg:g")
    .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    .attr("id", function(d){ return d.name })
    .attr("class", function(){ return "words" });

  // Add the dot at every node
  node.append("svg:circle")
    .attr("r", 10)
    .attr("stroke", "grey")
    .attr("fill", "white")
    // add animation
    .on("mouseover", addColor)
    .on("mouseout", removeColor);

  node.append("svg:text")
    .attr("dx", function(d) { return d.x < 180 ? 15 : -15; })
    .attr("dy", ".31em")
    .attr("fill", "white")
    .attr("id", function(d){return d.name})
    .attr("title", function(d) {return d.name} )
    .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
    .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
    .text(function(d) {
      words = d.name.split(" "); 
      if(words.length > 3){
        return words[0]+" "+words[1]+" "+words[2]+"..."; 
      } else {
        return d.name;
      }
    })
    .on("mouseover", animateText)
    .on("mouseout", removeTextSize)
    .on("click", function(d,i) { 
      addTopic($("span#journey_id").text(), d.name);
      $.post("/topics/" +$("span#topic_id").text(), {counter: $("span#counter").text(), _method: "put"});
      // count = 0;
      d3.json("/data?word="+d.name, draw)
      $("h1").text(d.name)
      var topicSpan = $("<div class='bubble-line'></div><a id='sup' data-tooltip='"+d.name+"'><div class='bubble'></div></a>").on("click", create);
      $("div#past_topics").append(topicSpan);
      makeTimeline();
    });

  function create(){
    // count = 0;

    addTopic($("span#journey_id").text(),
             this.getAttribute("data-tooltip"))
    $.post({url:     "/topics/" + $("span#topic_id").text(),
            counter: $("span#counter").text(),
            _method: "put"});
    d3.json("/data?word="+ (this.getAttribute("data-tooltip")), draw)
    $("h1").text(this.getAttribute("data-tooltip"));
    var topicSpan = $("<div class='bubble-line'></div><a id='sup' data-tooltip='"+this.getAttribute("data-tooltip")+"'><div class='bubble'></div></a>")
      .on("click", create);
    $("div#past_topics").append(topicSpan)
    makeTimeline();
  }
  $("text").tooltipsy({alignTo: 'cursor', offset: [5, 5]});

  var value = $("h1").text();
  d3.select("#"+value).style("font-size", "26px")
  d3.select("g#"+value).attr("transform", function(){ return "rotate(0 0 0)"});

  $("#end_journey").click(function(topic){
    $.post("/topics/" +$("span#topic_id").text(), {counter: $("span#counter").text(), _method: "put"});
  });
}

//JSON object with the data
window.onload = function() {
  var value = $("h1").text();
  d3.json("/data?word="+value, draw);
  startCounter = window.setInterval(increment, 1000);
}