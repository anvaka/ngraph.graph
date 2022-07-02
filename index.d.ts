// Type definitions for ngraph.graph v20.0.0
// Project: https://github.com/anvaka/ngraph.graph
// Definitions by: Nathan Westlake <https://github.com/CorayThan> and Anvaka <https://github.com/anvaka>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * A graph data structure for javascript.
 */
declare module "ngraph.graph" {
    import { EventedType } from 'ngraph.events'
    
    export type NodeId = string | number
    export type LinkId = string

    /**
     * A single link (edge) of the graph
     */
    export interface Link<Data = any> {
        /**
         * Unique identifier of this link
         */
        id: LinkId,

        /**
         * Node identifier where this links starts
         */
        fromId: NodeId,

        /**
         * Node identifier where this link points to
         */
        toId: NodeId,
        /**
         * Arbitrary data associated with this link
         */
        data: Data
    }

    /**
     * A single node of a graph.
     */
    export interface Node<Data = any> {
        /**
         * Unique identifier of this node
         */
        id: NodeId,

        /**
         * Set of incoming/outgoing links (edges) to/from this node.
         * 
         * For the sake of memory consumption preservation, this property
         * is null when this node has no links.
         * 
         * Link instance is referentially equal throughout the API.
         */
        links: Set<Link<any>> | null,
        
        /**
         * Associated data connected to this node.
         */
        data: Data
    }

    /**
     * A graph data structure
     */
    export interface Graph<NodeData = any, LinkData = any> {
        /**
         * Adds a new node to the graph. If node with such id already exists
         * its data is overwritten with the new data
         */
        addNode: (node: NodeId, data?: NodeData) => Node<NodeData>

        /**
         * Adds a new link to the graph. If link already exists and the graph
         * is not a multigraph, then link's data is overwritten with a new data.
         * 
         * When graph is a multigraph, then a new link is always added between the
         * nodes.
         */
        addLink: (from: NodeId, to: NodeId, data?: LinkData) => Link<LinkData>

        /**
         * Removes a link from the graph. You'll need to pass an actual link instance
         * to remove it. If you pass two arguments, the function assumes they represent
         * from/to node ids, and removes the corresponding link.
         * 
         * Returns true if link is found and removed. False otherwise.
         */
        removeLink: (link: Link<LinkData>) => boolean

        /**
         * Removes node by node id. Returns true if node was removed,
         * false otherwise (e.g. no such node exists in the graph)
         */
        removeNode: (nodeId: NodeId) => boolean

        /**
         * Returns a node by its identifier. Undefined value is returned if node
         * with such identifer does not exist.
         */
        getNode: (nodeId: NodeId) => Node<NodeData> | undefined

        /**
         * Checks whether given node exists in the graph. Return the node
         * or undefined if no such node exist.
         */
        hasNode: (nodeId: NodeId) => Node<NodeData> | undefined

        /**
         * Returns a link between two nodes
         */
        getLink: (fromNodeId: NodeId, toNodeId: NodeId) => Link<LinkData> | undefined

        /**
         * Checks if link is present in the graph 
         */
        hasLink: (fromNodeId: NodeId, toNodeId: NodeId) => Link<LinkData> | undefined

        /**
         * Returns number of nodes in the graph
         */
        getNodesCount: () => number

        /**
         * Returns number of nodes in the graph
         */
        getNodeCount: () => number

        /**
         * Returns number of links (edges) in the graph
         */
        getLinksCount: () => number

        /**
         * Returns number of links (edges) in the graph
         */
        getLinkCount: () => number

        /**
         * Returns all links associated with this node
         */
        getLinks: (nodeId: NodeId) => Set<Link<LinkData>> | null

        /** 
         * Iterates over every single node in the graph, passing the node to a callback.
         * 
         * If callback function returns "true"-like value, enumeration stops.
         **/
        forEachNode: (callbackPerNode: (node: Node<NodeData>) => void | undefined | null | boolean) => void

        /**
         * Iterates over every single link in the graph, passing the link to a callback.
         * If callback function returns "true"-like value, enumeration stops.
         */
        forEachLink: (callbackPerLink: (link: Link<LinkData>) => void | undefined | boolean) => void

        forEachLinkedNode: (nodeId: NodeId, callbackPerNode: (node: Node<NodeData>, link: Link<LinkData>) => void, oriented: boolean) => void
        /**
         * Suspend all notifications about graph changes until
         * endUpdate is called.
         */
        beginUpdate: () => void

        /**
         * Resumes all notifications about graph changes and fires
         * graph 'changed' event in case there are any pending changes.
         */
        endUpdate: () => void

        /**
         * Removes all nodes and links from the graph.
         */
        clear: () => void
    }

    /**
    * Creates a new instance of a graph.
    */
    export default function createGraph<NodeData = any, LinkData = any>(options?: { multigraph: boolean }): Graph<NodeData, LinkData> & EventedType

}
