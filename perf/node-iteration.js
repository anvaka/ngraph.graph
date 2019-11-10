var Benchmark = require('benchmark');

var createGraph = require('../'),
    numberOfNodes = 10000;

var suite = new Benchmark.Suite();

var graphWithOutMap = createGraph();
var graphWithMap = createGraph({useMap: true});
for (var i = 0; i < numberOfNodes; ++i) {
  graphWithOutMap.addNode('hello' + i, i);
  graphWithMap.addNode('hello' + i, i);
}

var sum1 = 0;
var sum2 = 0;

// add tests
suite.add('graphWithOutMap', function() {
  graphWithOutMap.forEachNode(function (node) {
    sum1 += node.data;
  });
})
.add('graphWithMap', function() {
  graphWithMap.forEachNode(function (node) {
    sum2 += node.data;
  });
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
   console.log('Fastest is ' + this.filter('fastest').map("name"));
//    console.log(sum1, sum2);
})
// run async
.run({ 'async': true });
