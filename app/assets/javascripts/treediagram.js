
//JSON object with the data
window.onload = function() {
var value = $("h1").text()
d3.json("/data?word="+value, function(data){treeData=data

// Create a svg canvas
  var vis = d3.select("#viz").append("svg:svg")
    .attr("width", 900)
    .attr("height", 900)
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
    .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
    .on("mouseout", function(){d3.select(this).style("fill", "white");})
    .on("mouseover", animate);

  function animate() {
    d3.select(this).transition()
        .duration(1000)
        .attr("r", 10)
      .transition()
        .attr("r", 40)
      .transition()
        .duration(1000)
        .attr("r", 10);
  };

  node.append("svg:text")
    .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
    .attr("dy", ".31em")
    .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
    .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
    .text(function(d) { return d.name; });

});
}