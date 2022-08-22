import { memo, useEffect, useState } from 'react';
import Graph from './components/GraphNetwork';
import LineComponent from './components/Line';
import NodeComponent from './components/Node';
import styles from './GraphConnect.module.css'
import { GraphConnectProps, GraphData, NodesData } from './types';

const defaultData: GraphData = {
    nodes: [
        { id: "you", name: "You" }
    ],
    links: []
}

const createLinks = (nodes: NodesData) => {
    const links = [];
    for (let i = 0; i < nodes.length; i++) {
        links.push({
            source: "you",
            target: nodes[i].id
        })
    }
    return links;
}

function GraphConnect({ nodes }: GraphConnectProps) {

    const [data, setData] = useState<GraphData>(defaultData);

    useEffect(() => {
        setData({
            nodes: [
                ...defaultData.nodes,
                ...nodes
            ],
            links: createLinks(nodes)
        })
    }, [nodes])

    return (
        <>
            <div className={styles.graphConnect}>
                <Graph
                    hoverOpacity={0.3}
                    data={data}
                    id="graph"
                    NodeComponent={NodeComponent}
                    LineComponent={LineComponent}
                    enableDrag={true}
                    zoomDepth={3}
                    nodeDistance={1280}
                    pullIn={true}
                />
            </div>
        </>
    )
}

export default memo(GraphConnect);