// Type definitions for ngraph.graph v0.0.14
// Project: https://github.com/anvaka/ngraph.graph
// Definitions by: Nathan Westlake <https://github.com/CorayThan>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "ngraph.graph" {

    type NodeId = string | number

    interface Link {
        id: string,
        fromId: NodeId,
        toId: NodeId,
        data: any
    }

    interface Node {
        id: NodeId,
        links: Link[],
        data: any
    }

    interface Graph {
        addNode: (node: NodeId, data?: any) => Node
        addLink: (from: NodeId, to: NodeId, data?: any) => Link
        removeLink: (link: Link) => boolean
        removeNode: (nodeId: NodeId) => boolean
        getNode: (nodeId: NodeId) => Node | undefined
        hasNode: (nodeId: NodeId) => Node | undefined
        getLink: (fromNodeId: NodeId, toNodeId: NodeId) => Link | null
        hasLink: (fromNodeId: NodeId, toNodeId: NodeId) => Link | null
        getNodesCount: () => number
        getLinksCount: () => number
        getLinks: Link[]
        forEachNode: (callbackPerNode: (node: Node) => void) => void
        forEachLinkedNode: (nodeId: NodeId, callbackPerNode: (node: Node, link: Link) => void, oriented: boolean) => void
        forEachLink: (callbackPerLink: (link: Link) => void) => void
        beginUpdate: () => void
        endUpdate: () => void
        clear: () => void
    }

    export default function createGraph(options?: { multigraph: boolean }): Graph

}
