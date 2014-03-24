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

      svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr(
      "transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
      "text-anchor", "end").text(yAxisText);

      svg.selectAll(".bar").data(allData).enter().append("rect")
      .attr("class", "bar").attr("x", function(d, i) {
        return i * width/allData.length;
      })
      .attr("width", (width/allData.length)-20)
      .attr("y", function(d) {
        return y(d.counter);
      })
      .attr("height", function(d) {
        return height - y(d.counter);
      });

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

      function type(d) {
        d.counter = +d.counter;
        return d;
      }//closes function type
    }// closes barchart