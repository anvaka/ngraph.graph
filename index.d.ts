// Type definitions for ngraph.graph v20.0.0
// Project: https://github.com/anvaka/ngraph.graph
// Definitions by: Nathan Westlake <https://github.com/CorayThan> and Anvaka <https://github.com/anvaka>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "ngraph.graph" {
    import { EventedType } from 'ngraph.events'
    
    export type NodeId = string | number
    export type LinkId = string

    /**
     * A single link (edge) of the graph
     */
    export interface Link<Data = any> {
        id: LinkId,
        fromId: NodeId,
        toId: NodeId,
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

    export interface Graph<NodeData = any, LinkData = any> {
        addNode: (node: NodeId, data?: NodeData) => Node<NodeData>
        addLink: (from: NodeId, to: NodeId, data?: LinkData) => Link<LinkData>
        removeLink: (link: Link<LinkData>) => boolean
        removeNode: (nodeId: NodeId) => boolean

        getNode: (nodeId: NodeId) => Node<NodeData> | undefined

        /**
         * Checks whether given node exists in the graph. Return the node
         * or undefined if no such node exist.
         */
        hasNode: (nodeId: NodeId) => Node<NodeData> | undefined
        getLink: (fromNodeId: NodeId, toNodeId: NodeId) => Link<LinkData> | null
        hasLink: (fromNodeId: NodeId, toNodeId: NodeId) => Link<LinkData> | null
        getNodesCount: () => number
        getLinksCount: () => number
        getNodeCount: () => number
        getLinkCount: () => number
        getLinks: (nodeId: NodeId) => Link<LinkData>[] | null
        /** To stop the iteration return true in the callback */
        forEachNode: (callbackPerNode: (node: Node<NodeData>) => void | undefined | null | boolean) => void
        forEachLinkedNode: (nodeId: NodeId, callbackPerNode: (node: Node<NodeData>, link: Link<LinkData>) => void, oriented: boolean) => void
        forEachLink: (callbackPerLink: (link: Link<LinkData>) => void) => void
        beginUpdate: () => void
        endUpdate: () => void
        clear: () => void
    }

    export default function createGraph<NodeData = any, LinkData = any>(options?: { multigraph: boolean }): Graph<NodeData, LinkData> & EventedType

}
