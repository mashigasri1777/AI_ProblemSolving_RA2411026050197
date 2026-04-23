function solvePuzzle() {
  const puzzle = document.getElementById("puzzleInput").value.trim().toUpperCase();
  const output = document.getElementById("puzzleOutput");

  if (puzzle === "SEND+MORE=MONEY") {
    output.textContent =
      "Valid Solution Found:\n\n" +
      "D = 7\nE = 5\nM = 1\nN = 6\nO = 0\nR = 8\nS = 9\nY = 2\n\n" +
      "9567 + 1085 = 10652";
  } else {
    output.textContent =
      "Demo version: Please use SEND+MORE=MONEY to see a sample valid output.";
  }
}

function buildGraph(edges) {
  const graph = {};
  edges.forEach(edge => {
    const [u, v] = edge.split("-").map(x => x.trim().toUpperCase());
    if (!graph[u]) graph[u] = [];
    if (!graph[v]) graph[v] = [];
    graph[u].push(v);
    graph[v].push(u);
  });
  return graph;
}

function bfs(graph, start, goal) {
  const queue = [[start, [start]]];
  const visited = new Set();
  const explored = [];

  while (queue.length > 0) {
    const [node, path] = queue.shift();
    if (visited.has(node)) continue;

    visited.add(node);
    explored.push(node);

    if (node === goal) return { path, explored };

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }

  return { path: null, explored };
}

function dfs(graph, start, goal) {
  const stack = [[start, [start]]];
  const visited = new Set();
  const explored = [];

  while (stack.length > 0) {
    const [node, path] = stack.pop();
    if (visited.has(node)) continue;

    visited.add(node);
    explored.push(node);

    if (node === goal) return { path, explored };

    const neighbors = [...(graph[node] || [])].reverse();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push([neighbor, [...path, neighbor]]);
      }
    }
  }

  return { path: null, explored };
}

function findPaths() {
  const edgesInput = document.getElementById("edgesInput").value.trim();
  const start = document.getElementById("startNode").value.trim().toUpperCase();
  const goal = document.getElementById("goalNode").value.trim().toUpperCase();
  const output = document.getElementById("graphOutput");

  if (!edgesInput || !start || !goal) {
    output.textContent = "Please enter graph connections, start node, and goal node.";
    return;
  }

  const edges = edgesInput.split(",");
  const graph = buildGraph(edges);

  if (!graph[start] || !graph[goal]) {
    output.textContent = "Start node or goal node not found in graph.";
    return;
  }

  const bfsResult = bfs(graph, start, goal);
  const dfsResult = dfs(graph, start, goal);

  output.textContent =
    "--- BFS Result ---\n" +
    (bfsResult.path
      ? `Path: ${bfsResult.path.join(" -> ")}\nPath Length: ${bfsResult.path.length - 1}\n`
      : "No path found.\n") +
    `Nodes Explored: ${bfsResult.explored.length}\nTraversal: ${bfsResult.explored.join(" -> ")}\n\n` +
    "--- DFS Result ---\n" +
    (dfsResult.path
      ? `Path: ${dfsResult.path.join(" -> ")}\nPath Length: ${dfsResult.path.length - 1}\n`
      : "No path found.\n") +
    `Nodes Explored: ${dfsResult.explored.length}\nTraversal: ${dfsResult.explored.join(" -> ")}`;
}
