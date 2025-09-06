export default function hasCycles(graph) {
  var visited = new Set();

  var hasCycle = false;
  graph.forEachNode(function(node) {
    if (hasCycle || visited.has(node.id)) return;

    dfs(graph, node.id, function(otherNode) {
      if (visited.has(otherNode.id)) {
        hasCycle = true;
        return false;
      }

      visited.add(otherNode.id);
      return true;
    });
  });

  return hasCycle;
}

function dfs(graph, startFromNodeId, visitor) {
  const queue = [startFromNodeId];
  while (queue.length) {
    const nodeId = queue.pop();
    graph.forEachLinkedNode(nodeId, function(otherNode) {
      if (visitor(otherNode)) queue.push(otherNode.id);
    }, true);
  }
}