var test = require('tap').test,
  createGraph = require('..');

test('forEachLinkedNode respects orientation', function(t) {
  t.plan(3);

  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(2, 3);
  var oriented = true;
  graph.forEachLinkedNode(2, function(node, link) {
    t.ok(link.toId === 3, 'Only 3 is connected to node 2, when traversal is oriented');
  }, oriented);

  graph.forEachLinkedNode(2, function(node, link) {
    t.ok(link.toId === 3 || link.toId === 2, 'both incoming and outgoing links are visited');
  }, !oriented);

  t.end();
});

test('forEachLinkedNode will not crash on invalid node id', function(t) {
  t.plan(0);
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.forEachLinkedNode(3, function() {
    t.notOk(true, 'This code will never be executed');
  });
});

test('forEachLink visits each link', function(t) {
  t.plan(1);
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.forEachLink(function(link) {
    t.ok(link.fromId === 1 && link.toId === 2, 'Link is here');
  });
  t.end();
});

test('forEachLink will not crash on empty callback', function(t) {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.forEachLink(); // didn't pass callback, no worries.
  t.end();
});

test('forEachNode will not crash on empty callback', function(t) {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.forEachNode(); // no callback? No worries

  t.end();
});

test('forEachNode will stop when requested', function(t) {
  t.plan(1);
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.forEachNode(function(node) {
    t.equals(node.id, 1, 'We visit only one node');
    return true; // we want to stop now!
  }); // no callback? No worries

  t.end();
});
