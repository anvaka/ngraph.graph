var Benchmark = require('benchmark');

var createGraph = require('../'),
    numberOfNodes = 10000;

var suite = new Benchmark.Suite();

var graph = createGraph();
for (var i = 0; i < numberOfNodes; ++i) {
  graph.addNode('hello' + i, i);
}

var sum = 0;

// add tests
suite.add('forEachNode', function() {
  var localSum = 0;
  graph.forEachNode(function (node) {
    localSum += node.data;
  });
  sum = localSum;
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
   console.log(sum);
   console.log('Fastest is ' + this.filter('fastest').map("name"));
})
// run async
.run({ 'async': true });
