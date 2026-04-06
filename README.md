
# 🚆 RailRouteOptimization

## 📌 Overview
**RailRouteOptimization** is a C++ project that implements classic graph algorithms (Prim’s, Kruskal’s, Dijkstra’s) for railway network optimization, and also demonstrates an **AVL Tree** for train scheduling.

This project simulates how railway stations can be connected with minimum total cost, shortest paths, and efficient scheduling using advanced data structures and algorithms.

---

## 🎯 Objectives
- Implement **Prim’s Algorithm** (MST)
- Implement **Kruskal’s Algorithm** (MST)
- Implement **Dijkstra’s Algorithm** (Shortest Path)
- Implement **AVL Tree** for train scheduling
- Understand **Greedy Approach** and **Balanced Trees**
- Work with **Graph Representation (Adjacency Matrix)**
- Apply DSA concepts to real-world problems

---

## 🛠️ Tech Stack

| Category        | Technology |
|----------------|-----------|
| Language       | C++       |
| Concepts       | Graphs, MST, Shortest Path, AVL Tree, Greedy Algorithms |
| Representation | Adjacency Matrix, Balanced BST |

---

## 📂 Project Structure

```
RailRouteOptimization/
│
├── Prims.cpp        # Prim's Algorithm Implementation
├── kruskals.cpp     # Kruskal's Algorithm Implementation
├── Dijkstras.cpp    # Dijkstra's Algorithm Implementation
├── avl.cpp          # AVL Tree for Train Scheduling
├── README.md        # Documentation
├── prims.txt        # Prim's Algorithm Steps
├── kruskals.txt     # Kruskal's Algorithm Steps
├── dijkstras.txt    # Dijkstra's Algorithm Steps
└── ...
```

---


## ⚙️ How It Works

### Prim’s Algorithm
1. User inputs number of stations and cost matrix
2. Program applies Prim’s Algorithm
3. Minimum edges are selected
4. Final MST and total cost are displayed

### Kruskal’s Algorithm
1. User inputs edges with weights
2. Program sorts edges and applies Kruskal’s Algorithm
3. MST edges and total cost are displayed

### Dijkstra’s Algorithm
1. User inputs graph (vertices, edges, weights)
2. Program computes shortest paths from source
3. Shortest distances to all nodes are displayed

### AVL Tree (Train Scheduling)
1. User inserts train schedules (ID, destination, arrival time)
2. AVL Tree balances itself after each insertion
3. Inorder traversal displays trains in sorted order

---

distance[] = INF
distance[0] = 0

## 🧠 Algorithms

### Prim’s MST
See [prims.txt](prims.txt) for step-by-step logic.

### Kruskal’s MST
See [kruskals.txt](kruskals.txt) for step-by-step logic.

### Dijkstra’s Shortest Path
See [dijkstras.txt](dijkstras.txt) for step-by-step logic.

### AVL Tree
Self-balancing BST for train schedules. Insertions keep the tree balanced for efficient search and traversal.

---


## 📊 Sample Inputs

### Prim’s Algorithm
Enter number of stations: 4
Enter cost matrix:
0 10 15 20
10 0 35 25
15 35 0 30
20 25 30 0

### Kruskal’s Algorithm
Enter vertices and edges: 4 5
Enter u v weight:
0 1 10
0 2 6
0 3 5
1 3 15
2 3 4

### Dijkstra’s Algorithm
Enter vertices and edges: 4 5
Enter v1 v2 weight:
0 1 10
0 2 6
0 3 5
1 3 15
2 3 4

### AVL Tree
Train schedules inserted as:
30, "CSMT", "5.00 PM"
40, "Karjat", "10.30 PM"
...

---


## ✅ Sample Outputs

### Prim’s Algorithm
Edge Cost
0 - 1 10
0 - 2 15
1 - 3 25
Total Minimum Cost = 50

### Kruskal’s Algorithm
Edges in MST:
2 - 3 = 4
0 - 3 = 5
0 - 1 = 10
Total MST Cost = 19

### Dijkstra’s Algorithm
Shortest Distances:
To 0 = 0
To 1 = 10
To 2 = 6
To 3 = 5

### AVL Tree
Inorder Traversal:
30 (CSMT) 40 (Karjat) 45 (Daund) 50 (Lonavala) 65 (Sinnar) 70 (Nashik) 85 (Dadar) 90 (Kalyan)
