
count = 0;
var increment = function(){
  $("span#counter").text(count);
  ++count;
};

// window.onload(function(){
//   startCounter = window.setInterval(increment, 1000);
//   console.log("change")
// });

$("h1").change(function(){
  startCounter = window.setInterval(increment, 1000);
  console.log("change")
});


