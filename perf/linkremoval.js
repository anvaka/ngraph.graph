var create = require('ngraph.generators');

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

suite.add('Run default', function() {
  var graph = create.grid(20, 20);
  var links = [];
  graph.forEachLink(function (link) {
    links.push(link);
  });
  for (var i = 0; i < links.length; ++i) {
    graph.removeLink(links[i]);
  }
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
// run async
.run({ 'async': true });

