class Graph { 

    constructor(Nodes, Edges, isDirected = false) {
        this.Nodes = Nodes;
        this.Edges = Edges;
        this.isDirected = isDirected;
        this.numNodes = Nodes.length;
        this.numEdges = Edges.length;
    }

}