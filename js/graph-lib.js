colorNode = {};
colorEdge = {};

positionNode = {};


class Graph{ 
    constructor (Nodes, Edges, isDirected = false) {
        this.Nodes = Nodes;
        this.Edges = Edges;
        this.Neighbours = {};
        for(let nodeIndex = 0; nodeIndex < Nodes.length; nodeIndex++) {
            this.Neighbours[Nodes[nodeIndex]] = [];
        }

        for(let edgeIndex = 0; edgeIndex < Edges.length; edgeIndex++) {
            this.Neighbours[Edges[edgeIndex][0]].push(Edges[edgeIndex][1]);
            if(!isDirected) {
                this.Neighbours[Edges[edgeIndex][1]].push(Edges[edgeIndex][0]);
            }
        }
    }

 
}



function displayGraph(Graph) {
    Nodes = [];
    Edges = [];
    colorEdge = {};
    colorNode = {};
    d3.select('#chart').select('#root').remove();
    chart = d3.select('#chart').append('g').attr('id', 'root');
    chart.append('g').attr('id', 'edges');
    chart.append('g').attr('id', 'nodes');
    Nodes = Graph.Nodes;
    Edges = Graph.Edges;
    for(let nodeIndex = 0; nodeIndex < Nodes.length; nodeIndex++) {
        displayNode(nodeIndex);
    } 
    for(let edgeIndex = 0; edgeIndex < Edges.length; edgeIndex++) {
        displayEdge(edgeIndex);
    } 
}

function selectNode(nodeIndex) {
    return d3.select("#Node_" + Nodes[nodeIndex]);
}
function selectNodeByLabel(nodeLabel) {
    return d3.select("#Node_" + nodeLabel)
}

function selectEdge(edgeIndex) {
    let label1 = Edges[edgeIndex][0];
    let label2 = Edges[edgeIndex][1];
    return d3.select("#Edge_" + label1 + '_' + label2);
}

function selectEdgeByLabels(edgeLabels) {
    let label1 = edgeLabels[0];
    let label2 = edgeLabels[1];
    return d3.select("#Edge_" + label1 + '_' + label2);
}

function updateNodeColor(nodeLabel, newColor) {
    colorNode[nodeLabel] = newColor;
    selectNodeByLabel(nodeLabel).select("circle").style("fill", newColor);
}

function updateEdgeColor(edgeLabels, newColor) {
    colorEdge[edgeLabels] = newColor;
    selectEdgeByLabels(edgeLabels).style("stroke", newColor);
}

function updateEdges() {
    for(let edgeIndex = 0; edgeIndex < Edges.length; edgeIndex++) {
        let label1 = Edges[edgeIndex][0];
        let label2 = Edges[edgeIndex][1];        

        selectEdge(edgeIndex).attr("x1", positionNode[label1][0])
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

function resetNodePositions() {
    positionNode = {};
}

function displayNode(nodeIndex) {
    let label = Nodes[nodeIndex];
    let color = colorNode[nodeIndex];

    var svg = d3.select("#root").select("#nodes");

    var dragHandler = d3.drag()
        .on('drag', dragged);

    var node = svg.append("g").attr('id', "Node_" +label);

    // Calculate positon on the cirlce 

    let startAngle = -Math.PI;
    let stepAngle = (Math.PI * 2) / Nodes.length;

    let nodeAngle = startAngle + nodeIndex * stepAngle;

    if(positionNode[label] === undefined) {
        console.log("new node");
        let positionX = Math.sin(nodeAngle) * 20 * Nodes.length + 500;
        let positionY = Math.cos(nodeAngle) * 20 * Nodes.length + 300;
        positionNode[label] = [positionX, positionY];
    }
    var node_circle = node.append("circle")
        .attr("cx", positionNode[label][0])
        .attr("cy", positionNode[label][1])
        .attr('r', 30)
        .style("fill", "#d19a66");

    if(color !== undefined) {
        node_circle = node_circle.style("fill", color);
    } else {
        colorNode[nodeIndex] = "#d19a66";
    }



    if(label !== undefined) {
        node = node
        .append("text")
        .style("fill", "black")
        .attr("x",  positionNode[label][0])
        .attr("y", positionNode[label][1])
        .text(label);
    }

    dragHandler(node_circle);
}

function displayEdge(edgeIndex) {

    color = colorEdge[edgeIndex];
    label1 = Edges[edgeIndex][0];
    label2 = Edges[edgeIndex][1];
    var svg = d3.select("#root").select("#edges");
    var edge = svg.append("line")
    .style("stroke", "#61afef")
    .style("stroke-width", 2)
    .attr("x1", positionNode[label1][0])
    .attr("y1", positionNode[label1][1])
    .attr("x2", positionNode[label2][0])
    .attr("y2", positionNode[label2][1])
    .attr("id", "Edge_" + label1 + "_" + label2);

    if(color !== undefined) {
        edge.style("stroke", color);
    }
}

function waitSleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
