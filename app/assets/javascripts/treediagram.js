
//JSON object with the data
window.onload = function() {
  var value = $("h1").text();
  d3.json("/data?word="+value, draw);
  startCounter = window.setInterval(increment, 1000);
}

var draw = function(data){treeData=data
$("div#viz").empty()
// Create a svg canvas
  var vis = d3.select("#viz").append("svg:svg")
    .attr("width", 900)
    .attr("height", 850)
    .append("svg:g")
    .attr("transform", "translate(425, 425)");

  // Create a cluster "canvas"
  var cluster = d3.layout.cluster()
    .size([360,325]);

  var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

  var nodes = cluster.nodes(treeData);
  var links = cluster.links(nodes);

  var link = vis.selectAll("pathlink")
    .data(links)
    .enter().append("svg:path")
    .attr("class", "link")
    .attr("d", diagonal)

  var node = vis.selectAll("g.node")
    .data(nodes)
    .enter().append("svg:g")
    .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    .attr("id", function(d){return d.name});

  // Add the dot at every node
  node.append("svg:circle")
    .attr("r", 10)
    .attr("stroke", "grey")
    .attr("fill", "white")
    // add animation
    .on("mouseover", addColor)
    .on("mouseout", removeColor);

  function addColor() {
    d3.select(this)
      .transition()
        .duration(300)
        .style("fill", "rgb(0,154,205)")
  };

  function removeColor() {
    d3.select(this)
      .transition()
        .duration(800)
        .style("fill", "white")
  }

  node.append("svg:text")
    .attr("dx", function(d) { return d.x < 180 ? 15 : -15; })
    .attr("dy", ".31em")
    .attr("fill", "white")
    .attr("id", function(d){return d.name})
    .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
    .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
    .text(function(d) { return d.name; })
    .on("mouseover", animateText)
    .on("mouseout", removeTextSize)
    .on("click", function(d,i){
      addTopic($("span#journey_id").text(), d.name);
      $.post("/topics/" +$("span#topic_id").text(), {counter: $("span#counter").text(), _method: "put"});
      count = 0;
      d3.json("/data?word="+d.name, draw)
      $("h1").text(d.name)
      var topicSpan = $("<span> </span><span>"+d.name+"</span>").on("click", create);
      $("span#past_topics").append(topicSpan)
    });

  var create = function(){
    addTopic($("span#journey_id").text(), this.innerText)
    $.post("/topics/" + $("span#topic_id").text(), {counter: $("span#counter").text(), _method: "put"});
    count = 0;
    d3.json("/data?word="+ this.innerText, draw)
    $("h1").text(this.innerText)
    var topicSpan = $("<span> </span><span>"+this.innerText+"</span>").on("click", create);
    $("span#past_topics").append(topicSpan)
  };    


  function animateText() { 
    if(this.id !== $("h1").text()){
      d3.select(this)
        .transition()
          .duration(100)
          .style("font-size", "16px")
          .style("cursor", "pointer")
          .style("fill", "rgb(0,154,205)")
      }
  };

  function removeTextSize() {
    if(this.id !== $("h1").text()){
      d3.select(this)
        .transition()
          .duration(100)
          .style("font-size", "14px")
          .style("fill", "white")
      }
  };

  var value = $("h1").text();
  d3.select("#"+value).style("font-size", "26px")
  d3.select("g#"+value).attr("transform", function(){ return "rotate(0 0 0)"});


  var addTopic = function(journey, topic){
    var url = "/add_topic?journey=" + journey + "&topic=" + topic;

    $.post(url, function(res) {
      history.pushState({}, null, res.name);
      window.newTopicId=res;
      $("span#topic_id").text(newTopicId.id);
    });
    
  };
};
