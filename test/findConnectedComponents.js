import { test, expect } from 'vitest';
import findConnectedComponents from '../examples/findConnectedComponents';
import createGraph from '..';

test('can find connected components', function() {
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
  expect(components.length).toBe(4);
  expect(components[0]).toEqual([1, 2, 3]);
  expect(components[1]).toEqual([5, 6]);
  expect(components[2]).toEqual([8]);
  expect(components[3]).toEqual([9]);
});