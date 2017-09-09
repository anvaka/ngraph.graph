var createGraph = require('../');
var randomAPI = require('ngraph.random').random
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

suite.add('Adding 5,000 edges', function() {
  var graph = createGraph();
  for(var i = 1; i < 5000; ++i) {
    graph.addLink(i, i - 1, i);
  }
});

suite.add('Adding 5,000 multigraph edges', function() {
  var graph = createGraph({multigraph: true});
  for(var i = 1; i < 5000; ++i) {
    graph.addLink(i, i - 1, i);
  }
});

suite.add('Adding 5,000 random edges', function() {
  var graph = createGraph();
  var random = randomAPI(42);
  var maxEdgeId = 10000000;
  for(var i = 1; i < 5000; ++i) {
    var fromId = random.next(maxEdgeId);
    var toId = random.next(maxEdgeId);
    graph.addLink(fromId, toId, i);
  }
});

suite.add('Adding 5,000 random edges to multigraph', function() {
  var graph = createGraph({multigraph: true});
  var random = randomAPI(42);
  var maxEdgeId = 10000000;
  for(var i = 1; i < 5000; ++i) {
    var fromId = random.next(maxEdgeId);
    var toId = random.next(maxEdgeId);
    graph.addLink(fromId, toId, i);
  }
})

suite.on('cycle', function(event) {
  console.log(String(event.target));
})
// run async
.run({ 'async': true });