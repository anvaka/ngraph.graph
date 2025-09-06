import { test, expect } from 'vitest';
import createGraph from '..';

test('forEachLinkedNode respects orientation', function() {

  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(2, 3);
  var oriented = true;
  graph.forEachLinkedNode(2, function(node, link) {
  expect(link.toId === 3).toBe(true);
  }, oriented);

  graph.forEachLinkedNode(2, function(node, link) {
  expect(link.toId === 3 || link.toId === 2).toBe(true);
  }, !oriented);
});

test('forEachLinkedNode handles self-loops', function() {

  var graph = createGraph();
  graph.addLink(1, 1);
  // we should visit exactly one time
  graph.forEachLinkedNode(1, function(node, link) {
  expect(link.fromId === 1 && link.toId === 1).toBe(true);
  });
});

test('forEachLinkedNode will not crash on invalid node id', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.forEachLinkedNode(3, function() {
  throw new Error('This code will never be executed');
  });
});

test('forEachLinkedNode can quit fast for oriented graphs', function() {
  var graph = createGraph();
  var oriented = true;
  graph.addLink(1, 2);
  graph.addLink(1, 3);

  var visited = 0;
  graph.forEachLinkedNode(1, function() {
    visited += 1;
    return true; // We want to stop right now!
  }, oriented);
  expect(visited).toBe(1);
});

test('forEachLinkedNode can quit fast for non-oriented graphs', function() {
  var graph = createGraph();
  var oriented = false;
  graph.addLink(1, 2);
  graph.addLink(1, 3);

  var visited = 0;
  graph.forEachLinkedNode(1, function() {
    visited += 1;
    return true; // We want to stop right now!
  }, oriented);

  expect(visited).toBe(1);
});

test('forEachLinkedNode returns quitFast flag', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(1, 3);

  var fastQuit = graph.forEachLinkedNode(1, function() {
    return true; // Stop right now.
  });

  expect(!!fastQuit).toBe(true);

  var notSoFast = graph.forEachLinkedNode(1, function() { });
  expect(!!notSoFast).toBe(false);
});

test('forEachLink visits each link', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.forEachLink(function(link) {
  expect(link.fromId === 1 && link.toId === 2).toBe(true);
  });
});

test('forEachLink will not crash on empty callback', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.forEachLink(); // didn't pass callback, no worries.
});

test('forEachNode will stop when requested', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.forEachNode(function(node) {
  expect(node.id).toBe(1);
    return true; // we want to stop now!
  });
});

test('forEachNode returns fastQuit', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  var fastQuit = graph.forEachNode(function(node) {
    expect(node.id).toBe(1);
    return true; // we want to stop now!
  }); // no callback? No worries

  expect(!!fastQuit).toBe(true);

  var notSoFast = graph.forEachNode(function() { });
  expect(!!notSoFast).toBe(false);
});

test('forEachNode throws when callback is not a function', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  expect(() => {
    graph.forEachNode('not a function');
  }).toThrow();
});

test('forEachLink stops when requested', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(2, 3);

  var visitCount = 0;
  graph.forEachLink(function() {
    visitCount += 1;
    return true;
  });
  expect(visitCount).toBe(1);
});