var Benchmark = require('benchmark');

var createGraph = require('../'),
    numberOfNodes = 10000;

console.log('Nodes #' + numberOfNodes);
var suite = new Benchmark.Suite();

var forInGraph = createGraph(true);
var objGraph = createGraph();
for (var i = 0; i < 100000; ++i) {
  forInGraph.addNode('hello' + i, i);
  objGraph.addNode('hello' + i, i);
}

var sum1 = 0;
var sum2 = 0;

// add tests
suite.add('forInIterator', function() {
  forInGraph.forEachNode(function (node) {
    sum1 += node.data;
  });
})
.add('objGraph', function() {
  objGraph.forEachNode(function (node) {
    sum2 += node.data;
  });
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  console.log(sum1, sum2);
})
// run async
.run({ 'async': true });
