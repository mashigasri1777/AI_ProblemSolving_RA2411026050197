# AI Problem Solving Assignment

## Repository Name
AI_ProblemSolving_RA2411026050197

## Team Details
- Member 1: Mashiga Sri S
- Member 2: Teammate Name

## Objective
This repository contains solutions for two Artificial Intelligence problem-solving tasks implemented in Python with an interactive website interface.

## Selected Problems
1. Problem 4: Crypt Arithmetic Puzzle Solver
2. Problem 8: Smart Navigation System

## Interactive Website Link
Add your deployed website link here after deploying on Vercel.

Example:
https://ai-problem-solving-ra-2411026050197-three.vercel.app/

---

# Problem 4: Crypt Arithmetic Puzzle Solver

## Problem Description
This problem solves cryptarithmetic puzzles in which each letter represents a unique digit.  
The system accepts a puzzle such as `SEND + MORE = MONEY` and finds a valid digit mapping such that the arithmetic equation is satisfied.

## Algorithm Used
- Constraint Satisfaction Problem (CSP)
- Backtracking
- Constraint checking:
  - Each letter must map to a unique digit
  - No leading letter can be assigned zero

## Files
- `problem_4_cryptarithmetic/solver.py`

## Execution Steps
1. Open terminal or command prompt.
2. Navigate to the project repository.
3. Run the Python file:
   ```bash
   python problem_4_cryptarithmetic/solver.py
   ```
4. Enter the puzzle input if required.
5. View the valid digit mapping and computed result.

## Sample Input
```text
SEND + MORE = MONEY
```

## Sample Output
```text
Solution Found:
S = 9
E = 5
N = 6
D = 7
M = 1
O = 0
R = 8
Y = 2

9567 + 1085 = 10652
```

---

# Problem 8: Smart Navigation System

## Problem Description
This problem builds a graph dynamically using user-provided node connections and finds a path between a start node and a goal node.

The system compares:
- Breadth-First Search (BFS)
- Depth-First Search (DFS)

## Algorithms Used
- Breadth-First Search (BFS)
- Depth-First Search (DFS)

## Files
- `problem_8_navigation/bfs_dfs.py`

## Execution Steps
1. Open terminal or command prompt.
2. Navigate to the project repository.
3. Run the Python file:
   ```bash
   python problem_8_navigation/bfs_dfs.py
   ```
4. Enter graph edges, start node, and goal node.
5. View BFS and DFS path results.

## Sample Input
```text
Edges: A-B, A-C, B-D, C-E, D-F
Start Node: A
Goal Node: F
```

## Sample Output
```text
BFS Path: A -> B -> D -> F
Nodes Explored: 6

DFS Path: A -> C -> E
or
DFS Path: A -> B -> D -> F
```

## Comparison
- BFS gives the shortest path in an unweighted graph.
- DFS explores depth first and may not always return the shortest path.
- BFS is better for path optimality.
- DFS may use a different traversal strategy depending on graph structure.

---

# Website Interface

## Files
- `website/index.html`
- `website/style.css`
- `website/script.js`

## Description
A simple interactive website interface is included for:
- entering cryptarithmetic puzzles
- entering graph connections, start node, and goal node
- displaying outputs for both selected problems

## How to Run Website Locally
1. Open the `website` folder.
2. Open `index.html` in a browser.

---

# Repository Structure

```text
AI_ProblemSolving_RA2411026050197/
├── README.md
├── problem_4_cryptarithmetic/
│   └── solver.py
├── problem_8_navigation/
│   └── bfs_dfs.py
└── website/
    ├── index.html
    ├── style.css
    └── script.js
```

---

# GitHub Requirements Followed
- Public GitHub repository
- Proper folder structure
- Two selected problems implemented
- Interactive website included
- README.md included with required details

---

# Submission
The GitHub repository link will be submitted through GCR before the deadline: 25 April 2026.
