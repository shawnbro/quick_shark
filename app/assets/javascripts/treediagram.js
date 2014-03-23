
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
    .attr("width", 1850)
    .attr("height", 1850)
    .append("svg:g")
    .attr("transform", "translate(400, 400)");

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

  // Add the dot at every node
  node.append("svg:circle")
    .attr("r", 10)
    .attr("stroke", "grey")
    .attr("fill", "white")
    // add animation
    .on("mouseover", animatecircle);

  function animatecircle() {
    d3.select(this).transition()
        .duration(1000)
        .attr("r", 20)
      .transition()
        .duration(1000)
        .attr("r", 10);
  };

  node.append("svg:text")
    .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
    .attr("dy", ".31em")
    .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
    .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
    .text(function(d) { return d.name; })
    .on("mouseover", animatetext)
    .on("click", function(d,i){
      addTopic($("span#journey_id").text(), d.name);
      $.post("/topics/" +$("span#topic_id").text(), {counter: $("span#counter").text(), _method: "put"});
      count = 0;
      d3.json("/data?word="+d.name, draw)
      $("h1").text(d.name)
    });

  function animatetext() { 
    d3.select(this).transition()
        .duration(100)
        .style("font-size", "16px")
      .transition()
        .delay(1500)
        .duration(100)
        .style("font-size", "12px")
  };

  var addTopic = function(journey, topic){
    var url = "/add_topic?journey=" + journey + "&topic=" + topic;

    $.post(url, function(res) {
      history.pushState({}, null, res.name);
      window.newTopicId=res;
      $("span#topic_id").text(newTopicId.id);
    });
    
  };
};
