var test = require('tap').test;
var findConnectedComponents = require('../examples/findConnectedComponents');
var createGraph = require('..');

test('can find connected components', function(t) {
  // our graph has three components
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(2, 3);

  graph.addLink(5, 6);
  graph.addNode(8);
  // let's add loop:
  graph.addLink(9, 9);

  // lets verify it:
  var components = findConnectedComponents(graph);
  t.equal(components.length, 4, 'all components found');
  t.same(components[0], [1, 2, 3], 'first component found');
  t.same(components[1], [5, 6], 'second component found');
  t.same(components[2], [8], 'third component found');
  t.same(components[3], [9], 'fourth component found');

  t.end();
});