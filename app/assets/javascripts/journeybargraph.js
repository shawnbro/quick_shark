$(document).ready(function(){
  window.result;

  var url = "/journey_data?id=" + journeyID;

  d3.json(url, function(data) {
    result = data;
  });
});