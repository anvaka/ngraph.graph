/**
 * This examples shows how to find all connected components of a graph.
 * 
 * Created in response to https://github.com/anvaka/ngraph.graph/issues/18
 */
module.exports = function findConnectedComponents(graph) {
  var nodeIdToComponentId = new Map();

  var connectedComponents = [];
  var lastComponentId = 0;

  graph.forEachNode(function(node) {
    if (nodeIdToComponentId.has(node.id)) {
      // we already seen this cluster. Ignore it.
      return;
    }

    // We found a new connected component:
    nodeIdToComponentId.set(node.id, lastComponentId);
    var currentComponent = [node.id];
    connectedComponents.push(currentComponent);

    // Let's find what other nodes belong to this component
    dfs(graph, node.id, otherNode => {
      let componentId = nodeIdToComponentId.get(otherNode.id);
      if (componentId !== undefined && componentId === lastComponentId) {
        // this is possible when we have a loop. Just ignore the node.
        return false;
      } else if (componentId !== undefined) {
        throw new Error('Reached a component from another component. DFS is broken?');
      }

      currentComponent.push(otherNode.id);
      nodeIdToComponentId.set(otherNode.id, lastComponentId);

      return true; // let's visit neighbors
    });

    lastComponentId += 1;
  });

  return connectedComponents;
};

function dfs(graph, startFromNodeId, visitor) {
  graph.forEachLinkedNode(startFromNodeId, function(otherNode) {
    if (visitor(otherNode)) dfs(graph, otherNode.id, visitor);
  });
}