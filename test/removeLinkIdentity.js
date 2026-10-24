import { describe, test, expect } from 'vitest';
import { createRequire } from 'node:module';
import createGraph from '../index.js';

const require = createRequire(import.meta.url);
const createCommonJSGraph = require('..');

describe.each([
  ['source', createGraph],
  ['CommonJS', createCommonJSGraph]
])('%s link removal identity', function(_, create) {
  test.each([false, true])('ignores a stale link with multigraph=%s', function(multigraph) {
    const graph = create({multigraph});
    const stale = graph.addLink(1, 2, 'old');
    expect(graph.removeLink(stale)).toBe(true);
    const current = graph.addLink(1, 2, 'new');
    let events = 0;
    graph.on('changed', () => { events += 1; });

    expect(graph.removeLink(stale)).toBe(false);
    expect(graph.getLinkCount()).toBe(1);
    expect(graph.getLink(1, 2)).toBe(current);
    expect(graph.getLinks(1).has(current)).toBe(true);
    expect(graph.getLinks(2).has(current)).toBe(true);
    expect(events).toBe(0);

    expect(graph.removeLink(current)).toBe(true);
    expect(graph.getLinkCount()).toBe(0);
    expect(graph.getLinks(1).size).toBe(0);
    expect(graph.getLinks(2).size).toBe(0);
    expect(events).toBe(1);
  });

  test.each([false, true])('ignores another graph link with multigraph=%s', function(multigraph) {
    const graph = create({multigraph});
    const current = graph.addLink(1, 2);
    const other = create({multigraph}).addLink(1, 2);

    expect(graph.removeLink(other)).toBe(false);
    expect(graph.getLink(1, 2)).toBe(current);
    expect(graph.getLinks(1).has(current)).toBe(true);
    expect(graph.getLinks(2).has(current)).toBe(true);
  });
});
