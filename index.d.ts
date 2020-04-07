// Type definitions for ngraph.graph v18.0.0
// Project: https://github.com/anvaka/ngraph.graph
// Definitions by: Nathan Westlake <https://github.com/CorayThan>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "ngraph.graph" {
    import { EventedType } from 'ngraph.events'
    
    export type NodeId = string | number
    export type LinkId = string

    export interface Link<Data = any> {
        id: LinkId,
        fromId: NodeId,
        toId: NodeId,
        data: Data
    }

    export interface Node<Data = any> {
        id: NodeId,
        links: Link[],
        data: Data
    }

    export interface Graph<NodeData = any, LinkData = any> {
        addNode: (node: NodeId, data?: NodeData) => Node<NodeData>
        addLink: (from: NodeId, to: NodeId, data?: LinkData) => Link<LinkData>
        removeLink: (link: Link<LinkData>) => boolean
        removeNode: (nodeId: NodeId) => boolean
        getNode: (nodeId: NodeId) => Node<NodeData> | undefined
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
