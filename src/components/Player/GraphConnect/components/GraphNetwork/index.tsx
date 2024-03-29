

import { select } from "d3-selection";
import { forceCenter, forceLink, forceManyBody, forceSimulation } from "d3-force";
import React, { useEffect, useState } from 'react';

import { tick } from './events';
import { addDrag, addHoverOpacity, addZoom } from './interactions';

// TODO: make component independent of restProps
// TODO: add centering node on click
// TODO: split to separate useEffects and useState
// TODO: try to understand better and improve tick

const Graph = ({
    data,
    nodeDistance,
    NodeComponent,
    LineComponent,
    pullIn,
    zoomDepth,
    enableDrag,
    hoverOpacity,
    id = 'GraphTree_container',
    ...restProps
}) => {

    const [simulation, setSimulation] = useState(null);

    useEffect(() => {


        if (!data) {
            return null
        }

        const svg = select(`#${id}`);
        const link = svg.selectAll("._graphLine").data(data.links);
        const node = svg.selectAll("._graphNode").data(data.nodes);

        if (!simulation) {
            const s = forceSimulation();
            s.nodes(data.nodes);
            setSimulation(s);
        } else {
            simulation
                .nodes(data.nodes)
                .force("link", forceLink()                                 // This force provides links between nodes
                    .id(function (d) { return d.id; })                      // This provide the id of a node
                    .links(data.links)                                     // and this the list of links
                )
                .force("charge", forceManyBody().strength(-1 * nodeDistance))          // This adds repulsion between nodes. Play with the -400 for the repulsion strength
                .force("center", forceCenter(
                    svg._groups[0][0].parentElement.clientWidth / 2,
                    svg._groups[0][0].parentElement.clientHeight / 2
                ));                                                         // This force attracts nodes to the center of the svg area


            // https://github.com/d3/d3-force#simulation_tick
            tick(node, link); // Manual tick
            simulation.on("tick", () => tick(node, link)); // auto tick

            // add interactions
            addZoom(svg, zoomDepth);
            addHoverOpacity(node, link, hoverOpacity);
            addDrag(node, simulation, enableDrag, pullIn);

        }

    }, [data, nodeDistance, NodeComponent, LineComponent, pullIn, zoomDepth, enableDrag, hoverOpacity, simulation]);

    if (!data) {
        return null
    }

    return (
        <svg
            id={id}
            width="100%"
            height="100%"
            {...restProps}
        >
            <g className="_graphZoom">
                {
                    data.links.map((link, i) => {
                        return LineComponent
                            ? <LineComponent link={link} key={i} className="_graphLine" />
                            : <line stroke="grey" key={i} className="_graphLine" />
                    })
                }
                {
                    data.nodes.map((node, i) => {
                        return (
                            <g key={i} className="_graphNode">
                                {
                                    NodeComponent
                                        ? <NodeComponent node={node} />
                                        : <circle fill="black" r={10} />
                                }
                            </g>
                        )
                    })
                }
            </g>
        </svg>
    )
};

Graph.defaultProps = {
    nodeDistance: 100,
    zoomDepth: 0,
    hoverOpacity: 1,
};

export default Graph;