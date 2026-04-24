from collections import deque

def build_graph(edges):
    graph = {}
    for edge in edges:
        a, b = edge.split()
        graph.setdefault(a, []).append(b)
        graph.setdefault(b, []).append(a)
    for node in graph:
        graph[node].sort()
    return graph

def bfs(graph, start, goal):
    queue = deque([(start, [start])])
    visited = set([start])
    explored_order = []

    while queue:
        node, path = queue.popleft()
        explored_order.append(node)

        if node == goal:
            return path, explored_order

        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return None, explored_order

def dfs(graph, start, goal):
    stack = [(start, [start])]
    visited = set()
    explored_order = []

    while stack:
        node, path = stack.pop()

        if node in visited:
            continue

        visited.add(node)
        explored_order.append(node)

        if node == goal:
            return path, explored_order

        for neighbor in reversed(graph.get(node, [])):
            if neighbor not in visited:
                stack.append((neighbor, path + [neighbor]))

    return None, explored_order

def main():
    print("Smart Navigation System using BFS and DFS")
    n = int(input("Enter number of connections: "))

    edges = []
    print("Enter connections (example: A B)")
    for _ in range(n):
        edges.append(input().strip())

    start = input("Enter start node: ").strip()
    goal = input("Enter goal node: ").strip()

    graph = build_graph(edges)

    bfs_path, bfs_explored = bfs(graph, start, goal)
    dfs_path, dfs_explored = dfs(graph, start, goal)

    print("\n--- BFS Result ---")
    if bfs_path:
        print("Path found:", " -> ".join(bfs_path))
        print("Path length:", len(bfs_path) - 1)
    else:
        print("No path found")
    print("Nodes explored:", len(bfs_explored))
    print("Traversal order:", " -> ".join(bfs_explored))

    print("\n--- DFS Result ---")
    if dfs_path:
        print("Path found:", " -> ".join(dfs_path))
        print("Path length:", len(dfs_path) - 1)
    else:
        print("No path found")
    print("Nodes explored:", len(dfs_explored))
    print("Traversal order:", " -> ".join(dfs_explored))

    print("\n--- Comparison ---")
    if bfs_path and dfs_path:
        print("BFS gives the shortest path in unweighted graphs.")
        print("DFS may find a path faster in some cases, but it is not guaranteed to be shortest.")
    elif bfs_path:
        print("Only BFS found a valid path.")
    elif dfs_path:
        print("Only DFS found a valid path.")
    else:
        print("Neither BFS nor DFS found a path.")

if __name__ == "__main__":
    main()
