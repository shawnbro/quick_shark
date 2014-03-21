$(document).ready(function(){
  window.result;

  var url = "/journey_data?id=" + journeyID;

  d3.json(url, function (data) {
    result = data;

    function draw(data){

      var margin = {
                "top": 10,
                "right": 10,
                "bottom": 30,
                "left": 50
            },
            width = 700,
            height = 300;

      var x = d3.scale.ordinal()
            .domain($.map(data, function(a){ return a.name}))
            .rangeRoundBands([0, width], 0);

      var y = d3.scale.linear()
            .domain([0, d3.max($.map(data, function(b){ (b.updated_at - b.created_at) }))])
            .range([height, 0]);

      var xAxis = d3.svg.axis().scale(x).orient("bottom");

      var yAxis = d3.svg.axis().scale(y).orient("left");

      var svgContainer = d3.select("div#bar-chart").append("svg")
      .attr("class", "chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom).append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

      svgContainer.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate( 0," + height + ")")
            .call(xAxis);

      svgContainer.append("g")
            .attr("class", "y axis").call(yAxis)
            .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Time Spent on Topic");

      svgContainer.selectAll(".bar").data($.map(data, function(b){ (b.updated_at - b.created_at) })).enter().append("rect")
       .attr("class", "bar")
            .attr("x", function(d, i) {
                return i * x.rangeBand();
            })
            .attr("y", function(d) {
                return y(d);
            })
            .attr("width", function(){
                return x.rangeBand();
            })
            .attr("height", function(d) {
                return height -y(d);
            });
        }//closes function draw(data)
        draw(result);
    })//closes d3.json function
});//closes document.ready