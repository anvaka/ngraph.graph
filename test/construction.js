var test = require('tap').test,
    createGraph = require('..');

test('add node adds node', function(t) {
  var graph = createGraph();
  var customData = '31337';

  var node = graph.addNode(1, customData);

  t.equal(graph.getNodesCount(), 1, 'addNode failed');
  t.equal(graph.getNode(1), node, 'invalid node returned by addNode (or getNode)');
  t.equal(node.data, customData, 'data was not set properly');
  t.equal(node.id, 1, 'node id was not set properly');
  t.end();
});

test('add link adds link', function(t) {
  var graph = createGraph();

  var link = graph.addLink(1, 2),
     firstNodeLinks = graph.getLinks(1),
     secondNodeLinks = graph.getLinks(2);

  t.equal(graph.getNodesCount(), 2, 'addLink failed');
  t.equal(firstNodeLinks.length, 1, 'number of links of the first node is wrong');
  t.equal(secondNodeLinks.length, 1, 'number of links of the second node is wrong');
  t.equal(link, firstNodeLinks[0], 'invalid link in the first node');
  t.equal(link, secondNodeLinks[0], 'invalid link in the second node');
  t.end();
});

test('add one node fires changed event', function(t) {
  t.plan(3);
  var graph = createGraph();
  var testNodeId = 'hello world';

  graph.on('changed', function(changes) {
   t.ok(changes && changes.length === 1, "Only one change should be recorded");
   t.equal(changes[0].node.id, testNodeId, "Wrong node change notification");
   t.equal(changes[0].changeType, 'add', "Add change type expected.");
  });

  graph.addNode(testNodeId);

  t.end();
});

test('add link fires changed event', function(t) {
  t.plan(4);
  var graph = createGraph();
  var fromId = 1, toId = 2;

  graph.on('changed', function(changes) {
     t.ok(changes && changes.length === 3, "Three change should be recorded: node, node and link");
     t.equal(changes[2].link.fromId, fromId, "Wrong link from Id");
     t.equal(changes[2].link.toId, toId, "Wrong link toId");
     t.equal(changes[2].changeType, 'add', "Add change type expected.");
  });

  graph.addLink(fromId, toId);
  t.end();
});

test('remove isolated node remove it', function(t) {
  var graph = createGraph();

  graph.addNode(1);
  graph.removeNode(1);

  t.equal(graph.getNodesCount(), 0, 'Remove operation failed');
  t.end();
});

test('remove link removes it', function(t) {
  t.plan(3);

  var graph = createGraph();
  var link = graph.addLink(1, 2);

  graph.removeLink(link);

  t.equal(graph.getNodesCount(), 2, 'remove link should not remove nodes');
  t.equal(graph.getLinks(1).length, 0, 'link should be removed from the first node');
  t.equal(graph.getLinks(2).length, 0, 'link should be removed from the second node');

  graph.forEachLink(function(link){
     test.ok(false, 'No links should be in graph');
  });
  t.end();
});

test('remove isolated node fires changed event', function(t) {
  t.plan(3);
  var graph = createGraph();
  graph.addNode(1);

  graph.on('changed', function(changes) {
     t.ok(changes && changes.length === 1, "One change should be recorded: node removed");
     t.equal(changes[0].node.id, 1, "Wrong node Id");
     t.equal(changes[0].changeType, 'remove', "'remove' change type expected.");
  });

  graph.removeNode(1);
  t.end();
});

test('remove link fires changed event', function(t) {
  t.plan(3);
  var graph = createGraph();
  var link = graph.addLink(1, 2);

  graph.on('changed', function(changes) {
     t.ok(changes && changes.length === 1, "One change should be recorded: link removed");
     t.equal(changes[0].link, link, "Wrong link removed");
     t.equal(changes[0].changeType, 'remove', "'remove' change type expected.");
  });

  graph.removeLink(link);
  t.end();
});

test('remove linked node fires changed event', function(t) {
  t.plan(5);
  var graph = createGraph(),
      link = graph.addLink(1, 2),
      nodeIdToRemove = 1;

  graph.on('changed', function(changes) {
     t.ok(changes && changes.length === 2, "Two changes should be recorded: link and node removed");
     t.equal(changes[0].link, link, "Wrong link removed");
     t.equal(changes[0].changeType, 'remove', "'remove' change type expected.");
     t.equal(changes[1].node.id, nodeIdToRemove, "Wrong node removed");
     t.equal(changes[1].changeType, 'remove', "'remove' change type expected.");
  });

  graph.removeNode(nodeIdToRemove);
  t.end();
});

test('remove node with many links removes them all', function(t) {
  var graph = createGraph(),
      link12 = graph.addLink(1, 2),
      link13 = graph.addLink(1, 3),
      nodeIdToRemove = 1;

  graph.removeNode(1);

  t.equal(graph.getNodesCount(), 2, 'remove link should remove one node only');
  t.equal(graph.getLinks(1), null, 'link should be removed from the first node');
  t.equal(graph.getLinks(2).length, 0, 'link should be removed from the second node');
  t.equal(graph.getLinks(3).length, 0, 'link should be removed from the third node');
  graph.forEachLink(function(link) {
     test.ok(false, 'No links should be in graph');
  });
  t.end();
});
