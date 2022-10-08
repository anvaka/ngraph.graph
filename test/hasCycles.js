var test = require('tap').test;
var hasCycle = require('../examples/hasCycles');
var createGraph = require('..');

test('can detect cycles loops', function(t) {
  // our graph has three components
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(2, 3);

  graph.addLink(5, 6);
  graph.addNode(8);
  // let's add loop:
  graph.addLink(9, 9);

  // lets verify it:
  t.ok(hasCycle(graph), 'cycle found');
  t.end();
});

test('can detect simple cycles', function(t) {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(2, 3);
  graph.addLink(3, 6);
  graph.addLink(6, 1);

  // lets verify it:
  t.ok(hasCycle(graph), 'cycle found');
  t.end();
});

test('can detect when no cycles', function(t) {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(2, 3);
  graph.addLink(3, 6);

  // lets verify it:
  console.log(hasCycle(graph));
  t.ok(!hasCycle(graph), 'cycle should not be found');
  t.end();
});