# v20.0.0

The changelog is introduced. Justification for it is that there is a breaking change
in the library, and I wanted to call it out here.

### getLink(fromId, toId) / getLinks(nodeId)

`graph.getLinks(nodeId)` now returns a `Set` object. Previous version of the method
returned an `Array`. 

Pre `v20.0.0` library versions, `getLink(fromId, toId)` operation had `O(deg(fromId))` time performance.

In `v20.0.0` the links are manged via sets, driving the `getLink()` performance down to `O(1)`.

#### How to update?

If your library used `graph.getLinks(fromId).length` constructs, you'll need to change that to
`graph.getLinks(fromId).size`

### addLink(fromId, toId, data)

For non-multigraphs, this method will now act similar to `addNode(nodeId, data)`. If link is 
already present in the graph it will replace old `link.data` with new `data`. Otherwise a new link will be created.

Prior versions of the library always create a new link and clients were required to check link
presence to avoid duplicates.

```
// this code is no longer necessary:
if (graph.hasLink(fromId, toId) || graph.hasLink(toId, fromId)) {
  graph.addLink(fromId, toId, 42);
}

// In version v20.0.0 it is equivalent to:
graph.addLink(fromId, toId, 42);
```

For multigraphs this method will act the same way as before - a new link will always be created.

