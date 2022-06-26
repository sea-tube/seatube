const Graph = p2pGraph

const graph = new Graph('.root')

const graph_peers = []

const startGraph = (sources) => {
    graph.on('select', function (id) {
        console.log(id + ' selected!')
    })
    
    // Add two peers
    graph.add({
        id: 'my_peer',
        me: true,
        name: 'You'
    })
    
    sources.forEach((source, id) => {
        graph_peers.push(source)
        graph.add({
            id,
            name: source
        })
    })
}

const connect = (source) => {
    if (!graph.hasLink("my_peer", graph_peers.indexOf(source))) graph.connect('my_peer', graph_peers.indexOf(source))
}

const disconnect = (url) => {
   graph.disconnect('my_peer', graph_peers.indexOf(url))
}