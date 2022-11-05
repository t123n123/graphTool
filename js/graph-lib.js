colorNode = {};
colorEdge = {};

positionNode = {};


class Graph{ 
    constructor (Nodes, Edges, isDirected = false) {
        this.Nodes = Nodes;
        this.Edges = Edges;
        this.Neighbours = {};
        for(let nodeIndex = 0; nodeIndex < Nodes.length; nodeIndex++) {
            console.log(Nodes[nodeIndex]);
            this.Neighbours[Nodes[nodeIndex]] = [];
        }

        for(let edgeIndex = 0; edgeIndex < Edges.length; edgeIndex++) {
            console.log(Edges[edgeIndex]);
            console.log(Edges[edgeIndex][0]);
            console.log(Edges[edgeIndex][1]);
            this.Neighbours[Edges[edgeIndex][0]].push(Edges[edgeIndex][1]);
            if(!isDirected) {
                this.Neighbours[Edges[edgeIndex][1]].push(Edges[edgeIndex][0]);
            }
        }
    }
}




function displayGraph(Graph) {
    d3.select('#chart').select('#root').remove();
    chart = d3.select('#chart').append('g').attr('id', 'root');
    Nodes = Graph.Nodes;
    Edges = Graph.Edges;
    for(let nodeIndex = 0; nodeIndex < Nodes.length; nodeIndex++) {
        displayNode(nodeIndex);
        // colorNode[nodeIndex] = Graph?.colorNode[nodeIndex];
    } 
    for(let edgeIndex = 0; edgeIndex < Edges.length; edgeIndex++) {
        displayEdge(edgeIndex);
        // colorEdge[edgeIndex] = Graph?.colorEdge[edgeIndex];
    } 
}

function updateEdges() {
    console.log(positionNode);
    for(let edgeIndex = 0; edgeIndex < Edges.length; edgeIndex++) {
        console.log(edgeIndex);
        label1 = Edges[edgeIndex][0];
        label2 = Edges[edgeIndex][1]; 
        d3.select("#Edge" + edgeIndex)
        .attr("x1", positionNode[label1][0])
        .attr("y1", positionNode[label1][1])
        .attr("x2", positionNode[label2][0])
        .attr("y2", positionNode[label2][1])
    } 
}

function dragged() {
    var circle = d3.select(this);
    circle            
        .attr('cx', d3.event.x)
        .attr('cy', d3.event.y);
    
    var text = d3.select(this.parentNode).select("text");
    text            
        .attr('x', d3.event.x)
        .attr('y', d3.event.y);
    let label = text.text();
    positionNode[label] = [d3.event.x, d3.event.y];
    updateEdges();
}

function displayNode(nodeIndex) {
    let label = Nodes[nodeIndex];
    let color = colorNode[nodeIndex];

    var svg = d3.select("#root");

    var dragHandler = d3.drag()
        .on('drag', dragged);
        // .on('start', dragstarted);

    var node = svg.append("g");

    var node_circle = node.append("circle")
        .attr("cx", 50 + nodeIndex*50)
        .attr("cy", 50)
        .attr('r', 20)
        .style("fill", "#d19a66");

    if(color !== undefined) {
        node_circle = node_circle.style("fill", color);
    } else {
        colorNode[nodeIndex] = "#d19a66";
    }

    positionNode[label] = [50 + nodeIndex*50,50];

    if(label !== undefined) {
        node = node
        .append("text")
        .style("fill", "black")
        .attr("x",  50 + nodeIndex*50)
        .attr("y", 50)
        .text(label);
    }

    dragHandler(node_circle);
}

function displayEdge(edgeIndex) {
    color = colorEdge[edgeIndex];
    label1 = Edges[edgeIndex][0];
    label2 = Edges[edgeIndex][1];
    var svg = d3.select("#root");
    var edge = svg.append("line")
    .style("stroke", "lightgreen")
    .style("stroke-width", 2)
    .attr("x1", positionNode[label1][0])
    .attr("y1", positionNode[label1][1])
    .attr("x2", positionNode[label2][0])
    .attr("y2", positionNode[label2][1])
    .attr("id", "Edge" + edgeIndex);
}