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
  var localSum = 0;
  graphWithOutMap.forEachNode(function (node) {
    localSum += node.data;
  });
  sum1 = localSum;
})
.add('graphWithMap', function() {
  var localSum = 0;
  graphWithMap.forEachNode(function (node) {
    localSum += node.data;
  });
  sum2 = localSum;
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
   if (sum1 !== sum2) {
     throw new Error('Invalid test')
   }

   console.log('Fastest is ' + this.filter('fastest').map("name"));
})
// run async
.run({ 'async': true });
