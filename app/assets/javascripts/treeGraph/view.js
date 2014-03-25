Tangent.TREEVIZ = "#viz";

Tangent.TreeGraph.prototype.render = function() {
  this.clearCanvas();
  this.createCanvas();
  this.buildGraph();
  this.drawLinks();
  this.drawNodes();

  // enlarge central node
  d3.select("#" + Tangent.heading_text).style("font-size", "26px")
  d3.select("g#" + Tangent.heading_text).attr("transform", function(){ return "rotate(0 0 0)"});

  // add endJourney onclick
  $("#end_journey").click(function(topic){
    this.endJourney($("span#topic_id").text(), $("span#counter").text());
  });
}

Tangent.TreeGraph.prototype.clearCanvas = function(){
  // empty the #vis "canvas" if it exists, and remove the tooltipsy div
  $(Tangent.TREEVIZ).empty();
  $("div.tooltipsy").remove();
}

Tangent.TreeGraph.prototype.createCanvas = function(){
  // Create the svg canvas (at #viz)
  this.vis = d3.select(Tangent.TREEVIZ).append("svg:svg")
    // .call(d3.behavior.zoom()
    //         .scaleExtent([0, 10]).on("zoom", zoom))
    .attr("width", 800)
    .attr("height", 750)
    .append("svg:g")
    .attr("transform", "translate(520, 350) scale(.6)")
    .append("g");

  // Create a d3 cluster canvas
  this.cluster = d3.layout.cluster()
    .size([360,425]);
}

Tangent.TreeGraph.prototype.buildGraph = function(){
  // **TAKE THE DATA AND CREATE "NODES" ON THE CLUSTER CANVAS**
  this.nodes = this.cluster.nodes(this.data);

  // **TAKE THE NODES AND CREATE "LINKS" ON THE CLUSTER CANVAS**
  this.links = this.cluster.links(this.nodes);
}

Tangent.TreeGraph.prototype.drawLinks = function(){
// create a d3 diagonal projection default for drawing links
  this.diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

  // draw all of the existing links on the cluster canvas to be connected
  //   by the above defined d3 diagonal projection path
  this.vis.selectAll("pathlink")
    .data(this.links)
    .enter().append("svg:path")
    .attr("class", "link")
    .attr("d", this.diagonal)
}

Tangent.TreeGraph.prototype.drawNodes = function(){
  // mouseover functions!
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
  function increaseTextSize() { 
    if(this.id !== $("h1").text()){
      d3.select(this)
        .transition()
          .duration(100)
          .style("font-size", "16px")
          .style("cursor", "pointer")
          .style("fill", "rgb(0,154,205)")
    }
  }
  function decreaseTextSize() {
    if(this.id !== $("h1").text()){
      d3.select(this)
        .transition()
          .duration(100)
          .style("font-size", "14px")
          .style("fill", "black")
    }
  }

  // draw all of the existing nodes on the cluster canvas
  var node = this.vis.selectAll("g.node")
    .data(this.nodes)
    .enter().append("svg:g")
    .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    .attr("id", function(d) { return d.name })
    .attr("class", function() { return "words" });

  // add the dot at every node
  node.append("svg:circle")
    .attr("r", 10)
    .attr("stroke", "grey")
    .attr("fill", "white")
    .on("mouseover", addColor)     // add mouseover animations
    .on("mouseout",  removeColor);

  // add the text at every node
  node.append("svg:text")
    .attr("dx", function(d) { return d.x < 180 ? 15 : -15; })
    .attr("dy", ".31em")
    .attr("fill", "white")
    .attr("id", function(d){return d.name})
    .attr("title", function(d) {return d.name} )
    .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
    .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
    .text(function(d) {  // only displays the first three words...
      var words = d.name.split(" "); 
      if(words.length > 3){
        return words[0]+" "+words[1]+" "+words[2]+"..."; 
      } else {
        return d.name;
      }
    })
    .on("mouseover", increaseTextSize)  // add mouseover animations
    .on("mouseout", decreaseTextSize);

  // add the onclick function
  node.on("click", function(d,i) { 
    Tangent.currentGraph.journeyForth($("span#topic_id").text(),$("span#counter").text(),d.name);
    Tangent.setHeading(d.name);      
  });

  // add the tooltip to all the nodes' text
  $("text").tooltipsy({alignTo: 'cursor', offset: [5, 5]});
}