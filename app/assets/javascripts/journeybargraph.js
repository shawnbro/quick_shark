//Wait until DOM is fully loaded
$(document).ready(function(){
  //"result" (global variable defined in d3.json below) of this window object, which is //the list of topics in this journey(in json).
  window.result;

  //Url where we request the json data from.  "journeyID" is in params.
  var url = "/journeys/" + journeyID + ".json";

  //Request the list of topics in this journey & their counters & names
  d3.json(url, function (data) {
  //Global variable result.  This is the list of topics in this journey(in json).
    result = data;
     //Run drawBarchart function, which takes bar-chart id as container Id, 
     //global variable result as allData, seconds as yaxisText, 
     //700 as chartAreaWidth, 400 as chartAreaHeight.
    drawBarchart("bar-chart",result,"Seconds",100,400);
  });//Close d3.json function
});//Close document.ready

//Function that creates the bar chart.
//Arguments are the div that contains the d3, the json data, the name of the y axis,
// the chart width, and the chart height.
function drawBarchart(containerId, allData, yAxisText, chartAreaWidth,
  chartAreaHeight){


  // Chart margins to account for labels.
  var margin = {
    top : 20,
    right : 20,
    bottom : 30,
    left : 40
  }, 
  width = (chartAreaWidth* allData.length) - margin.left - margin.right, 
  height = chartAreaHeight - margin.top - margin.bottom;

  //quantitative scale for y axis, ranging from 0 to height of chart
  var y = d3.scale.linear().range([ height, 0 ]);
  // generates axis on left with scale set to y variable
  var yAxis = d3.svg.axis().scale(y).orient("left");

  //Select the bar chart div.  
  var svg = d3.select("#" + containerId)
    //Append an svg element.
    .append("svg")
    //set width & height so svg element includes labels
    .attr("width",width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
    //Append a g element to the svg, which is used to group svg elements together.
    .append("g")
    //The ‘transform’ attribute transforms the coordinate system.
    //'translate' changes coordinates to account for margins
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    //The scale of the y axis maps to this domain, which is 0 to the highest counter(in seconds)
    y.domain([ 0, d3.max(allData, 
      function(d) {
        return d.counter;
      }) //Closes function(d)
    ]);//Closes values being passed as y domain


  //Select the bars on the bar graph
  svg.selectAll(".bar")
    //Bind the json data to them
    .data(allData)
    //Create new nodes for incoming data.
    //The extra data elements form the enter selection.
    .enter()
    //Instantiate by appending to enter selection
    .append("rect")
    //Set the class to "bar"
    .attr("class", "bar")
    //Set the attribute "x" of bar to correspond to 
    //(chart width)/(amount of elements in data)
    .attr("x", function(d, i) {
      return i * width/allData.length;
    })
    //Set the attribute "id" of the bar equal to the topic id
    .attr("id",function(d){
      return "id"+d.id.toString();
    })
    //Set the attribute "width" of the bar based on amount of elements
    //in the data.  -20 makes spaces between the bars.
    .attr("width", (width/allData.length)-20)
    //Set the attribute "y" of the bar equal to the amount of seconds on the topic
    .attr("y", function(d) {
      //y here is the y axis scale
      return y(d.counter);
    })
    //Set the attribute "height" of the bar equal to
    //height of chart minus seconds on the topic
    .attr("height", function(d) {
      return height - y(d.counter);
    })
    //Bar color
    .style("fill", function(d) {
      return "rgb(100, 145, " + (d.counter*100) + ")";
    })
    //On bar mouseover, large number of seconds on topic appears
    .on('mouseover',animateText)
    //On bar mouseout, number of seconds disappears
    .on('mouseout', removeTextSize);//close svg.selectAll(.bar)

  //Select the x axis text labels
  svg.selectAll("text.x")
    //Bind the json data to them
    .data(allData)
    //Create new nodes for incoming data.
    //The extra data elements form the enter selection.
    .enter()
    //Instantiate by appending to enter selection
    .append("text")
    //Set the class to "x"
    .attr("class", "x")
    //Set the attribute "x" so that the x axis labels sit
    //in the center of the bar
    .attr("x", function(d, i) {
      return (i * width/allData.length) + ((width/allData.length)-20)/2;
    })//Closes attr x
    //Set the attribute "y" so that the x axis labels are below the chart 
    .attr("y", height + 20)
    //Set the attribute "text-anchor" so that the text is centered
    .attr("text-anchor", "middle")
    //Set the inner text to the name of the topic
    .text(function(d) { 
      return d.name; 
    });//Closes text.  Closes svg.SelectAll("text.x")

  //Select the seconds labels on each bar
  svg.selectAll("text.seconds")
    //Bind the json data to them
    .data(allData)
    //Create new nodes for incoming data.
    //The extra data elements form the enter selection.
    .enter()
    //Instantiate by appending to enter selection
    .append("text")
    //Set class to "seconds"
    .attr("class", "seconds")
    //Set "x" attribute to middle of bar
    .attr("x", function(d, i) { 
      return (i * width/allData.length) + ((width/allData.length)-20)/2;
    })
    //Set "y" attribute to bottom of bar
    .attr("y", function(d){ 
      return height - d.counter;
    })
    //Set inner text to the number of seconds spent on the topic
    .text(function(d){
      return d.counter
    })
    //Set the id to the topic id
    .attr("id",function(d){
      return "id"+d.id.toString();
    })
    //Center the text
    .attr("text-anchor", "middle")
    //At first, this element should not be visible
    .style("opacity", "0")
    //On mouseover, 
    //On bar mouseover, large number of seconds on topic appears
    .on('mouseover',animateText)
    //On bar mouseout, number of seconds disappears
    .on('mouseout', removeTextSize);//Close svg.selectAll("text.seconds")

  function animateText() { 
    //Select all the seconds labels as graphItems
    var graphItems = d3.selectAll('text.seconds')
    //For each second label, check if the id is equal to the bar's id
    //If it is, change the style of the seconds label so it appears
    for(i = 0; i < graphItems[0].length; i++){
      if(graphItems[0][i].id === this.id){
        d3.select("text#"+graphItems[0][i].id)
          .transition()
          .duration(100)
          .style("font-size", "50px")
          .style("cursor", "pointer")
          .style("fill", "white")
          .style("opacity", "1")
      }//closes if
      d3.select(this)
        .transition()
        .duration(100)
        .style("fill","orange")
    }//closes for
  };//closes animateText

  function removeTextSize() {
    //Select all the seconds labels & change their style back
    d3.selectAll("text.seconds")
      .transition()
      .duration(100)
      .style("font-size", "14px")
      .style("opacity", "0")
    //Select all the bars & change their style back
    d3.select(this)
      .transition()
      .duration(100)
      .style("fill", function(d) {
        return "rgb(100, 145, " + (d.counter*100) + ")";
      })
  };

  //Set default sort order to false, as in not sorted
  var sortOrder = false;
  //Sort bars function
  var sortBars = function () {
    //Change sort order from default false to true
    sortOrder = !sortOrder;
    //Organize by size from least to most seconds
    sortItems = function (a, b) {
        if (sortOrder){
          return a.counter - b.counter;
        } else {
          return b.counter - a.counter;
        }
    }
    //Select all the bars
    svg.selectAll("rect")
      //Sort the bars by size from least to most seconds
      .sort(sortItems)
      //Create an animated transition
      .transition()
      //Specifies the transition delay in milliseconds
      //Setting to a multiple of the index i staggers transitions for elements
      .delay(function (d, i) {
        return i * 50;
      })
      //Specifies duration of transition
      .duration(1000)
      //Sets "x" attribute so bars move horizontally
      .attr("x", function(d, i) {
          return i * width/allData.length;
        });//closes selection of all bars

    //Select all the x axis labels
    svg.selectAll("text.x")
      //Sort the x axis labels by size from least to most seconds
      .sort(sortItems)
      //Create an animated transition
      .transition()
      //Specifies the transition delay in milliseconds
      //Setting to a multiple of the index i staggers transitions for elements
      .delay(function (d, i) {
        return i * 50;
      })
      //Specifies duration of transition
      .duration(1000)
      //Sets "x" attribute so x axis values move horizontally
      .attr("x", function(d, i) {
        return (i * width/allData.length) + ((width/allData.length)-20)/2;
      });//closes selection of all x axis labels

    //Select all the seconds labels
    svg.selectAll("text.seconds")
      //Sort the seconds labels by size from least to most seconds
      .sort(sortItems)
      //Create an animated transition
      .transition()
      //Specifies the transition delay in milliseconds
      //Setting to a multiple of the index i staggers transitions for elements
      .delay(function (d, i) {
        return i * 50;
      })
      //Specifies duration of transition
      .duration(1000)
      //Sets "x" attribute so seconds labels move horizontally
      .attr("x", function(d, i) {
        return (i * width/allData.length) + ((width/allData.length)-20)/2;
      });//closes selection of seconds labels

  };//close sortBars

  //If someone checks the sort checkbox, sort the bars
  d3.select("#sort").on("change", function() {
    if(this.checked) {
      sortBars();
    } 
  });
}// closes drawBarchart
