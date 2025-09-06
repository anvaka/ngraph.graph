import { test, expect, describe } from 'vitest';
import createGraph from '..';

test('add node adds node', function() {
  var graph = createGraph();
  var customData = '31337';

  var node = graph.addNode(1, customData);

  expect(graph.getNodesCount()).toBe(1);
  expect(graph.getLinksCount()).toBe(0);
  expect(graph.getNode(1)).toBe(node);
  expect(node.data).toBe(customData);
  expect(node.id).toBe(1);
});

test('hasNode checks node', function() {
  var graph = createGraph();

  graph.addNode(1);

  expect(!!graph.hasNode(1)).toBe(true);
  expect(!!graph.hasNode(2)).toBe(false);
});

test('hasLink checks links', function () {
  var graph = createGraph();
  graph.addLink(1, 2);
  var link12 = graph.hasLink(1, 2);
  expect(link12.fromId === 1 && link12.toId === 2).toBe(true);

  // this is somewhat doubtful... has link will return null, but forEachLinkedNode
  // will actually iterate over this link. Not sure how to have consistency here
  // for now documenting behavior in the test:
  var noLink = graph.hasLink(2, 1);
  expect(!!noLink).toBe(false);

  var obviousNo = graph.hasLink();
  expect(!!obviousNo).toBe(false);
});

test('hasLink is the same as getLink', function () {
  var graph = createGraph();

  expect(graph.getLink).toBe(graph.hasLink);
});

test('it considers uniqueLinkId as multigraph', function () {
  var options = {uniqueLinkId: true};
  createGraph(options);
  expect(options.multigraph).toBe(true);
});

test('it throw if no node id is passed', function() {
  var graph = createGraph();
  expect(() => {
    graph.addNode(); // no id, should throw
  }).toThrow();
});

test('it fires update event when node is updated', function() {
  var graph = createGraph();
  graph.addNode(1, 'hello');
  graph.on('changed', checkChangedEvent);
  graph.addNode(1, 'world');

  function checkChangedEvent(changes) {
    var change = changes[0];
  expect(change.node.id).toBe(1);
  expect(change.node.data).toBe('world');
  expect(change.changeType).toBe('update');
  }
});

test('it can add node with id similar to reserved prototype property', function() {
  var graph = createGraph();
  graph.addNode('constructor');
  graph.addLink('watch', 'constructor');

  var iterated = 0;
  graph.forEachNode(function() {
    iterated += 1;
  });

  expect(!!graph.hasLink('watch', 'constructor')).toBe(true);
  expect(graph.getLinksCount()).toBe(1);
  expect(iterated).toBe(2);
});

test('add link adds link', function() {
  var graph = createGraph();

  var link = graph.addLink(1, 2),
    firstNodeLinks = graph.getLinks(1),
    secondNodeLinks = graph.getLinks(2);

  expect(graph.getNodesCount()).toBe(2);
  expect(graph.getLinksCount()).toBe(1);
  expect(firstNodeLinks.size).toBe(1);
  expect(secondNodeLinks.size).toBe(1);
  expect(Array.from(firstNodeLinks)[0]).toBe(link);
  expect(Array.from(secondNodeLinks)[0]).toBe(link);
});

test('it can add multi-edges', function () {
  var graph = createGraph({multigraph: true});
  graph.addLink(1, 2, 'first');
  graph.addLink(1, 2, 'second');
  graph.addLink(1, 2, 'third');

  expect(graph.getLinksCount()).toBe(3);
  expect(graph.getNodesCount()).toBe(2);

  graph.forEachLinkedNode(1, function (otherNode, link) {
    expect(['first', 'second', 'third']).toContain(link.data);
  });
});

describe('it can produce unique link ids', function () {
  // eslint-disable-next-line no-shadow
  test('by default links are de-duped', function () {
    var seen = {};
    var graph = createGraph();
    graph.addLink(1, 2, 'first');
    graph.addLink(1, 2, 'second');
    graph.addLink(1, 2, 'third');
    graph.forEachLink(verifyLinksAreNotUnique);

    var link = graph.getLink(1, 2);
    expect(seen[link.id]).toBe(1);
    expect(link.data).toBe('third');

    // eslint-disable-next-line no-shadow
    function verifyLinksAreNotUnique(link) {
      seen[link.id] = (seen[link.id] || 0) + 1;
    }
  });

  // eslint-disable-next-line no-shadow
  test('You can create multigraph', function () {
    var graph = createGraph({
      multigraph: true
    });

    var seen = {};
    graph.addLink(1, 2, 'first');
    graph.addLink(1, 2, 'second');
    graph.addLink(1, 2, 'third');
    graph.forEachLink(verifyLinkIsUnique);
    expect(graph.getLinksCount()).toBe(3);

    function verifyLinkIsUnique(link) {
      expect(!!seen[link.id]).toBe(false);
      seen[link.id] = true;
    }
  });
});

test('add one node fires changed event', function() {
  var graph = createGraph();
  var testNodeId = 'hello world';

  graph.on('changed', function(changes) {
  expect(!!(changes && changes.length === 1)).toBe(true);
  expect(changes[0].node.id).toBe(testNodeId);
  expect(changes[0].changeType).toBe('add');
  });

  graph.addNode(testNodeId);
});

test('add link fires changed event', function() {
  var graph = createGraph();
  var fromId = 1,
    toId = 2;

  graph.on('changed', function(changes) {
  expect(!!(changes && changes.length === 3)).toBe(true);
  expect(changes[2].link.fromId).toBe(fromId);
  expect(changes[2].link.toId).toBe(toId);
  expect(changes[2].changeType).toBe('add');
  });

  graph.addLink(fromId, toId);
});

test('remove isolated node remove it', function() {
  var graph = createGraph();

  graph.addNode(1);
  graph.removeNode(1);

  expect(graph.getNodesCount()).toBe(0);
});

test('supports plural methods', function() {
  var graph = createGraph();

  graph.addLink(1, 2);

  expect(graph.getNodeCount()).toBe(2);
  expect(graph.getLinkCount()).toBe(1);

  expect(graph.getNodesCount()).toBe(2);
  expect(graph.getLinksCount()).toBe(1);
});

test('remove link removes it', function() {

  var graph = createGraph();
  var link = graph.addLink(1, 2);

  var linkIsRemoved = graph.removeLink(link);

  expect(graph.getNodesCount()).toBe(2);
  expect(graph.getLinksCount()).toBe(0);
  expect(graph.getLinks(1).size).toBe(0);
  expect(graph.getLinks(2).size).toBe(0);
  expect(!!linkIsRemoved).toBe(true);

  graph.forEachLink(function() {
    throw new Error('No links should be in graph');
  });
});

test('it can remove link by from/to ids', function() {
  var graph = createGraph();
  graph.addLink(1, 2);

  var linkIsRemoved = graph.removeLink(1, 2);

  expect(graph.getNodesCount()).toBe(2);
  expect(graph.getLinksCount()).toBe(0);
  expect(graph.getLinks(1).size).toBe(0);
  expect(graph.getLinks(2).size).toBe(0);
  expect(!!linkIsRemoved).toBe(true);

  graph.forEachLink(function() {
    throw new Error('No links should be in graph');
  });
});

test('remove link returns false if no link removed', function () {
  var graph = createGraph();

  graph.addLink(1, 2);
  var result = graph.removeLink('blah');
  expect(!!result).toBe(false);

  var alsoNo = graph.removeLink();
  expect(!!alsoNo).toBe(false);
});

test('remove isolated node fires changed event', function() {
  var graph = createGraph();
  graph.addNode(1);

  graph.on('changed', function(changes) {
    expect(!!(changes && changes.length === 1)).toBe(true);
    expect(changes[0].node.id).toBe(1);
    expect(changes[0].changeType).toBe('remove');
  });

  var result = graph.removeNode(1);
  expect(!!result).toBe(true);
});

test('remove link fires changed event', function() {
  var graph = createGraph();
  var link = graph.addLink(1, 2);

  graph.on('changed', function(changes) {
  expect(!!(changes && changes.length === 1)).toBe(true);
  expect(changes[0].link).toBe(link);
  expect(changes[0].changeType).toBe('remove');
  });

  graph.removeLink(link);
});

test('remove linked node fires changed event', function() {
  var graph = createGraph(),
    link = graph.addLink(1, 2),
    nodeIdToRemove = 1;

  graph.on('changed', function(changes) {
  expect(!!(changes && changes.length === 2)).toBe(true);
  expect(changes[0].link).toBe(link);
  expect(changes[0].changeType).toBe('remove');
  expect(changes[1].node.id).toBe(nodeIdToRemove);
  expect(changes[1].changeType).toBe('remove');
  });

  graph.removeNode(nodeIdToRemove);
});

test('remove node with many links removes them all', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(1, 3);

  graph.removeNode(1);

  expect(graph.getNodesCount()).toBe(2);
  expect(graph.getLinks(1)).toBe(null);
  expect(graph.getLinks(2).size).toBe(0);
  expect(graph.getLinks(3).size).toBe(0);
  graph.forEachLink(function() {
    throw new Error('No links should be in graph');
  });
});

test('remove node returns false when no node removed', function () {
  var graph = createGraph();
  graph.addNode('hello');
  var result = graph.removeNode('blah');
  expect(!!result).toBe(false);
});

test('clearGraph clears graph', function () {
  var graph = createGraph();
  graph.addNode('hello');
  graph.addLink(1, 2);
  graph.clear();

  expect(graph.getNodesCount()).toBe(0);
  expect(graph.getLinksCount()).toBe(0);
});

test('beginUpdate holds events', function() {
  var graph = createGraph();
  var changedCount = 0;
  graph.on('changed', function () {
    changedCount += 1;
  });
  graph.beginUpdate();
  graph.addNode(1);
  expect(changedCount).toBe(0);
  graph.endUpdate();
  expect(changedCount).toBe(1);
});
