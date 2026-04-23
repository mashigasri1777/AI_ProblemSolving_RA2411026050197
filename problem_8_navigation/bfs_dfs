from collections import deque, defaultdict


def build_graph(edges):
    graph = defaultdict(list)
    for edge in edges:
        edge = edge.strip()
        if "-" in edge:
            u, v = edge.split("-")
            u, v = u.strip().upper(), v.strip().upper()
            graph[u].append(v)
            graph[v].append(u)
    return graph


def bfs(graph, start, goal):
    visited = set()
    queue = deque([(start, [start])])
    explored_order = []

    while queue:
        node, path = queue.popleft()
        if node in visited:
            continue

        visited.add(node)
        explored_order.append(node)

        if node == goal:
            return path, explored_order

        for neighbor in graph[node]:
            if neighbor not in visited:
                queue.append((neighbor, path + [neighbor]))

    return None, explored_order


def dfs(graph, start, goal):
    visited = set()
    stack = [(start, [start])]
    explored_order = []

    while stack:
        node, path = stack.pop()
        if node in visited:
            continue

        visited.add(node)
        explored_order.append(node)

        if node == goal:
            return path, explored_order

        for neighbor in reversed(graph[node]):
            if neighbor not in visited:
                stack.append((neighbor, path + [neighbor]))

    return None, explored_order


def compare_methods(bfs_path, bfs_explored, dfs_path, dfs_explored):
    print("\n--- BFS Result ---")
    if bfs_path:
        print("Path found:", " -> ".join(bfs_path))
        print("Path length:", len(bfs_path) - 1)
    else:
        print("No path found.")
    print("Nodes explored:", len(bfs_explored))
    print("Traversal order:", " -> ".join(bfs_explored))

    print("\n--- DFS Result ---")
    if dfs_path:
        print("Path found:", " -> ".join(dfs_path))
        print("Path length:", len(dfs_path) - 1)
    else:
        print("No path found.")
    print("Nodes explored:", len(dfs_explored))
    print("Traversal order:", " -> ".join(dfs_explored))

    print("\n--- Comparison ---")
    if bfs_path and dfs_path:
        if len(bfs_path) < len(dfs_path):
            print("BFS found a shorter path, so it is more optimal for this graph.")
        elif len(bfs_path) > len(dfs_path):
            print("DFS found a shorter path in this case, but BFS generally guarantees shortest path in unweighted graphs.")
        else:
            print("Both BFS and DFS found paths of the same length.")

    if len(bfs_explored) < len(dfs_explored):
        print("BFS explored fewer nodes.")
    elif len(bfs_explored) > len(dfs_explored):
        print("DFS explored fewer nodes.")
    else:
        print("Both explored the same number of nodes.")


def main():
    print("Smart Navigation System using BFS and DFS")
    print("Enter graph edges like: A-B, A-C, B-D, C-E")

    edge_input = input("Enter graph connections: ").strip()
    start = input("Enter start node: ").strip().upper()
    goal = input("Enter goal node: ").strip().upper()

    edges = [e.strip() for e in edge_input.split(",")]
    graph = build_graph(edges)

    if start not in graph or goal not in graph:
        print("Start node or goal node not found in graph.")
        return

    bfs_path, bfs_explored = bfs(graph, start, goal)
    dfs_path, dfs_explored = dfs(graph, start, goal)

    compare_methods(bfs_path, bfs_explored, dfs_path, dfs_explored)


if __name__ == "__main__":
    main()
