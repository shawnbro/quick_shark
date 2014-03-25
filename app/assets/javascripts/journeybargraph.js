$(document).ready(function(){
  window.result;

  var url = "/journey_data?id=" + journeyID;

  d3.json(url, function (data) {
    result = data;

    drawBarchart("bar-chart",result,"Seconds",700,400);
  });
  });

    function drawBarchart(containerId, allData, yAxisText, chartAreaWidth,
    chartAreaHeight){

      var margin = {
      top : 20,
      right : 20,
      bottom : 30,
      left : 40
      }, 
      width = chartAreaWidth - margin.left - margin.right, 
      height = chartAreaHeight - margin.top - margin.bottom;

      var formatPercent = d3.format(".0%");

      var y = d3.scale.linear().range([ height, 0 ]);

      var yAxis = d3.svg.axis().scale(y).orient("left");

      var svg = d3.select("#" + containerId).append("svg").attr("width",
      width + margin.left + margin.right).attr("height",
      height + margin.top + margin.bottom).append("g").attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

      y.domain([ 0, d3.max(allData, function(d) {
        return d.counter;
      }) ]);

      // svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr(
      // "transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
      // "text-anchor", "end").text(yAxisText);

      svg.selectAll(".bar").data(allData).enter().append("rect")
      .attr("class", "bar").attr("x", function(d, i) {
        return i * width/allData.length;
      })
      .attr("id",function(d){
        return "id"+d.id.toString();
      })
      .attr("width", (width/allData.length)-20)
      .attr("y", function(d) {
        return y(d.counter);
      })
      .attr("height", function(d) {
        return height - y(d.counter);
      }).style("fill","pink")
      .on("mouseover",animateText)
            .on('mouseout', removeTextSize)
      ;

      svg.selectAll("text.x").data(allData).enter()
        .append("text").attr("class", "x")
        .attr("x", function(d, i) {
          return (i * width/allData.length) + ((width/allData.length)-20)/2;
        })//closes attr x
        .attr("y", height + 20)
        .attr("text-anchor", "middle")
        .text(function(d) { 
          return d.name; 
        })//closes text

      
      svg.selectAll("text.seconds")
        .data(allData).enter()
          .append("text").attr("class", "seconds")
            .attr("x", function(d, i) {
              return (i * width/allData.length) + ((width/allData.length)-20)/2;
            })
            .attr("y", function(d){ 
              return height - d.counter;
            })
            .text(function(d){
              return d.counter
            })
            .attr("id",function(d){
              return "id"+d.id.toString();
            })
            .attr("text-anchor", "middle")
            .style("opacity", "0")
        
        function animateText() { 
      var graphItems = d3.selectAll('text.seconds')
      for(i = 0; i < graphItems[0].length; i++){
        if(graphItems[0][i].id === this.id){
            d3.select("text#"+graphItems[0][i].id).transition()
            .duration(100)
            .style("font-size", "50px")
            .style("cursor", "pointer")
            .style("fill", "#E38D9C")
            .style("opacity", "1")
        }
      }
      d3.select(this)
      .transition()
      .duration(100)
      .style("fill","#FFE5E9")
          
  };

        function removeTextSize() {
      d3.selectAll("text.seconds")
        .transition()
          .duration(100)
          .style("font-size", "14px")
          .style("opacity", "0")
      d3.select(this)
      .transition()
      .duration(100)
      .style("fill","pink")
  };

      // function type(d) {
      //  d.counter = +d.counter;
      //  return d;
      // }//closes function type


    }// closes barchart