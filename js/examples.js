let dfs_example = `
let Nodes=[1, 2, 3, 4, 5, 6, 7, 8]; 
let Edges=[[1,2], [1,3], [2,4], [2,5], [3,6], [3,7], [4,8]]; 

displayGraph(Nodes, Edges); 

let Seen = {};

let Neighbours = computeNeighbours(Nodes, Edges); 

// blue - seen node
// red - current node

async function dfs(node) { 

    updateNodeColor(node, 'red'); 
    await waitSleep(500); 

	Seen[node] = 'true'; 
    
	for (var neighbour of Neighbours[node]) { 
        if(Seen[neighbour] !== 'true') { 
            updateNodeColor(node, 'blue'); 
            await dfs(neighbour); 
            
			updateNodeColor(node, 'red'); 
            await waitSleep(500); 
        } 
        
    } 
    updateNodeColor(node, 'blue'); 
} 

dfs(1); 
`;
