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

suite.add('Adding 5,000 random edges and randomly removing them', function() {
  var graph = createGraph();
  var random = randomAPI(42);
  var maxEdgeId = 10000000;
  for(var i = 1; i < 5000; ++i) {
    var fromId = random.next(maxEdgeId);
    var toId = random.next(maxEdgeId);
    graph.addLink(fromId, toId, i);
  }

  for(var i = 1; i < 15000; ++i) {
    var fromId = random.next(maxEdgeId);
    var toId = random.next(maxEdgeId);
    graph.removeLink(fromId, toId);
  }
});

suite.add('Adding 5,000 random edges to multigraph and randomly removing them', function() {
  var graph = createGraph({multigraph: true});
  var random = randomAPI(42);
  var maxEdgeId = 10000000;
  for(var i = 1; i < 15000; ++i) {
    var fromId = random.next(maxEdgeId);
    var toId = random.next(maxEdgeId);
    graph.addLink(fromId, toId, i);
  }

  for(var i = 1; i < 5000; ++i) {
    var fromId = random.next(maxEdgeId);
    var toId = random.next(maxEdgeId);
    graph.removeLink(fromId, toId);
  }
})

suite.add('Removing all edges one by one from 5k graph', function() {
  var graph = createGraph();
  var random = randomAPI(42);
  var maxEdgeId = 10000000;
  for(var i = 1; i < 5000; ++i) {
    var fromId = random.next(maxEdgeId);
    var toId = random.next(maxEdgeId);
    graph.addLink(fromId, toId, i);
  }
  var links = [];

  graph.forEachLink(function (link) {
    links.push(link);
  });

  for (var i = 0; i < links.length; ++i) {
    graph.removeLink(links[i]);
  }
})

suite.add('Removing all edges one by one from 5k multigraph graph', function() {
  var graph = createGraph({multigraph: true});
  var random = randomAPI(42);
  var maxEdgeId = 10000000;
  for(var i = 1; i < 5000; ++i) {
    var fromId = random.next(maxEdgeId);
    var toId = random.next(maxEdgeId);
    graph.addLink(fromId, toId, i);
  }
  var links = [];

  graph.forEachLink(function (link) {
    links.push(link);
  });

  for (var i = 0; i < links.length; ++i) {
    graph.removeLink(links[i]);
  }
})

suite.on('cycle', function(event) {
  console.log(String(event.target));
})
// run async
.run({ 'async': true });
