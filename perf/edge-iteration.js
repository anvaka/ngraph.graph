var createGraph = require('../');
var randomAPI = require('ngraph.random').random;
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var edgeIterationSumWeight = 0;
var edgeIterationMultigraph = 0;

suite.add('Edge iteration', function() {
  var graph = createGraph();
  var random = randomAPI(42);
  var maxEdgeId = 10000000;
  for(var i = 1; i < 1000; ++i) {
    var fromId = random.next(maxEdgeId);
    var toId = random.next(maxEdgeId);
    graph.addLink(fromId, toId, i);
  }
  edgeIterationSumWeight = 0;
  for (var i = 0; i < 100; ++i) {
    graph.forEachLink(addUpWeight);
  }
  function addUpWeight(link) {
    edgeIterationSumWeight += link.data;
  }
}).on('complete', function() {
  // Print checksum to make sure we are not optimizing out the loop:
  console.log('edge iteration sum weight', edgeIterationSumWeight);
});

suite.add('Edge iteration for multigraph', function() {
  var graph = createGraph({multigraph: true});
  var random = randomAPI(42);
  var maxEdgeId = 10000000;
  for(var i = 1; i < 1000; ++i) {
    var fromId = random.next(maxEdgeId);
    var toId = random.next(maxEdgeId);
    graph.addLink(fromId, toId, i);
  }
  edgeIterationMultigraph = 0;
  for (var i = 0; i < 100; ++i) {
    graph.forEachLink(addUpWeight);
  }
  function addUpWeight(link) {
    edgeIterationMultigraph += link.data;
  }
}).on('complete', function() {
  // Print checksum to make sure we are not optimizing out the loop:
  console.log('edge iteration multigraph weight', edgeIterationMultigraph);
});


suite.on('cycle', function(event) {
  console.log(String(event.target));
})
// run async
.run({ 'async': true });
