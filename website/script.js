function wordToNumber(word, mapping) {
  return parseInt(word.split("").map(ch => mapping[ch]).join(""), 10);
}

function solveCryptarithm(words, result, uniqueLetters, firstLetters) {
  const digits = [0,1,2,3,4,5,6,7,8,9];
  const used = new Set();
  const mapping = {};

  function backtrack(index) {
    if (index === uniqueLetters.length) {
      for (let fl of firstLetters) {
        if (mapping[fl] === 0) return null;
      }

      const wordValues = words.map(w => wordToNumber(w, mapping));
      const resultValue = wordToNumber(result, mapping);
      const sum = wordValues.reduce((a, b) => a + b, 0);

      if (sum === resultValue) {
        return { ...mapping, sum, resultValue, wordValues };
      }
      return null;
    }

    const letter = uniqueLetters[index];

    for (let digit of digits) {
      if (used.has(digit)) continue;
      if (digit === 0 && firstLetters.has(letter)) continue;

      mapping[letter] = digit;
      used.add(digit);

      const found = backtrack(index + 1);
      if (found) return found;

      delete mapping[letter];
      used.delete(digit);
    }

    return null;
  }

  return backtrack(0);
}

function solvePuzzle() {
  const input = document.getElementById("puzzleInput").value.trim().toUpperCase();
  const output = document.getElementById("puzzleOutput");

  if (!input) {
    output.textContent = "Please enter a puzzle.";
    return;
  }

  if (!input.includes("=") || !input.includes("+")) {
    output.textContent = "Invalid format. Use format like SEND+MORE=MONEY";
    return;
  }

  const [left, right] = input.split("=");
  const words = left.split("+").map(w => w.trim()).filter(Boolean);
  const result = right.trim();

  if (!words.length || !result) {
    output.textContent = "Invalid puzzle format.";
    return;
  }

  const uniqueLetters = [...new Set((words.join("") + result).split(""))];
  if (uniqueLetters.length > 10) {
    output.textContent = "Too many unique letters. Maximum allowed is 10.";
    return;
  }

  const firstLetters = new Set([...words.map(w => w[0]), result[0]]);
  const solution = solveCryptarithm(words, result, uniqueLetters, firstLetters);

  if (!solution) {
    output.textContent = "No solution found.";
    return;
  }

  const mappingText = uniqueLetters
    .map(letter => `${letter} = ${solution[letter]}`)
    .join("\n");

  const wordValuesText = words
    .map((w, i) => `${w} = ${solution.wordValues[i]}`)
    .join("\n");

  output.textContent =
    `Solution Found:\n\n${mappingText}\n\n${wordValuesText}\n${result} = ${solution.resultValue}`;
}

function buildGraph(edgesText) {
  const graph = {};
  const edges = edgesText.split(",").map(e => e.trim()).filter(Boolean);

  for (let edge of edges) {
    const parts = edge.split("-").map(x => x.trim().toUpperCase());
    if (parts.length !== 2) continue;

    const [a, b] = parts;
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];

    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
}

function bfs(graph, start, goal) {
  const queue = [[start]];
  const visited = new Set([start]);
  let explored = [];

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];
    explored.push(node);

    if (node === goal) {
      return { path, explored };
    }

    for (let neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  return { path: null, explored };
}

function dfs(graph, start, goal) {
  const stack = [[start]];
  const visited = new Set();
  let explored = [];

  while (stack.length > 0) {
    const path = stack.pop();
    const node = path[path.length - 1];

    if (visited.has(node)) continue;
    visited.add(node);
    explored.push(node);

    if (node === goal) {
      return { path, explored };
    }

    const neighbors = [...(graph[node] || [])].reverse();
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push([...path, neighbor]);
      }
    }
  }

  return { path: null, explored };
}

function findPaths() {
  const edgesText = document.getElementById("edgesInput").value.trim();
  const start = document.getElementById("startNode").value.trim().toUpperCase();
  const goal = document.getElementById("goalNode").value.trim().toUpperCase();
  const output = document.getElementById("graphOutput");

  if (!edgesText || !start || !goal) {
    output.textContent = "Please enter graph connections, start node, and goal node.";
    return;
  }

  const graph = buildGraph(edgesText);

  if (!graph[start] || !graph[goal]) {
    output.textContent = "Start or goal node not found in graph.";
    return;
  }

  const bfsResult = bfs(graph, start, goal);
  const dfsResult = dfs(graph, start, goal);

  output.textContent =
    `BFS Path: ${bfsResult.path ? bfsResult.path.join(" -> ") : "No path found"}\n` +
    `BFS Nodes Explored: ${bfsResult.explored.join(", ")}\n` +
    `BFS Path Length: ${bfsResult.path ? bfsResult.path.length - 1 : "-"}\n\n` +
    `DFS Path: ${dfsResult.path ? dfsResult.path.join(" -> ") : "No path found"}\n` +
    `DFS Nodes Explored: ${dfsResult.explored.join(", ")}\n` +
    `DFS Path Length: ${dfsResult.path ? dfsResult.path.length - 1 : "-"}`;
}
function clearPuzzle() {
  document.getElementById("puzzleInput").value = "";
  document.getElementById("puzzleOutput").textContent = "Result will appear here...";
}

function clearGraph() {
  document.getElementById("edgesInput").value = "";
  document.getElementById("startNode").value = "";
  document.getElementById("goalNode").value = "";
  document.getElementById("graphOutput").textContent = "Path result will appear here...";
}
