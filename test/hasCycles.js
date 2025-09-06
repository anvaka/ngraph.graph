import { test, expect } from 'vitest';
import hasCycle from '../examples/hasCycles';
import createGraph from '..';

test('can detect cycles loops', function() {
  // our graph has three components
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(2, 3);

  graph.addLink(5, 6);
  graph.addNode(8);
  // let's add loop:
  graph.addLink(9, 9);

  // lets verify it:
  expect(!!hasCycle(graph)).toBe(true);
});

test('can detect simple cycles', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(2, 3);
  graph.addLink(3, 6);
  graph.addLink(6, 1);

  // lets verify it:
  expect(!!hasCycle(graph)).toBe(true);
});

test('can detect when no cycles', function() {
  var graph = createGraph();
  graph.addLink(1, 2);
  graph.addLink(2, 3);
  graph.addLink(3, 6);

  // lets verify it:
  expect(!!hasCycle(graph)).toBe(false);
});