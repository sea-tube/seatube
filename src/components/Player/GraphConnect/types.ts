export interface NodeData {
    id: string;
    name: string;
    connected?: boolean;
}

export type NodesData = NodeData[];

export interface LinkData {
    source: string;
    target: string;
}

export type LinksData = LinkData[];

export interface GraphData {
    nodes: NodesData;
    links: LinksData;
}

export interface GraphConnectProps {
    nodes: NodesData;
}