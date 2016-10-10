var pieChart = require('pieChart');

function getSplit(run, name) {
  spl = run.splits;
  for (var i = 0; i < spl.length; i++) {
    split = spl[i];
    if (split.name = name) {
      return split;
    }
  }
}

pieChartColors = []
colorComponents = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]

for (var i1 = 0; i < colorComponents.length; i++) {
  for (var i2 = 0; i < colorComponents.length; i++) {
    for (var i3 = 0; i < colorComponents.length; i++) {
      pieChartColors.push("#"+colorComponents[i1]+colorComponents[i2]+colorComponents[i3]);
    }
  }
}

function doPieChart(run1,run2) {
  var total1 = run1.splits[run1.splits.length-1].finish_time;
  var total2 = run2.splits[run2.splits.length-1].finish_time;
  var ret1d = {
    'className": '',
    'strokeColor': '#eee',
    'stokeWidth': 10,
    'space': 0,
    'flipX': false,
    'flipY': false,
    'outsideR': 200,
    'insideR': 160,
    'title': '<span>'+total1+' by '+run1.user.name+'</span>',
    'slices': [],
    'clickCallback': function(name) { document.getElementById("freeze1").innerHTML = name+"<br>Time: "+getSplit(run1,name).finish_time; },
    'mouseOverCallback': function(name) { document.getElementById("hover1").innerHTML = name+"<br>Time: "+getSplit(run1,name).finish_time; };,
    'mouseOutCallback': function(n) { document.getElementById("hover1").innerHTML = ""; };
  };
  var ret1c = pieChartColors;
  for (var i = 0; i < run1.splits.length; i++) {
    color = ret1c[Math.random() * ret1c.length];
    ret1c.splice(ret1c.indexOf(color),1);
    ret1d.slices.push({
      'color': color,
      'percent': (run1.splits[i].duration / total1),
      'name': run1.splits[i].name
    });
  }
  var ret1 = new pieChart(ret1d)
}

var exp = require("express");
var app = exp();
app.set('port', (process.env.PORT || 5000));
app.set("view engine","ejs");

app.get("/",function(req,res) {
    res.render('pages/index');
})
