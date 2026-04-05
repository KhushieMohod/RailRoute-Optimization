# 🚆 RailRouteOptimization

## 📌 Overview
**RailRouteOptimization** is a C++ project that implements **Prim’s Minimum Spanning Tree (MST) Algorithm** to design an optimal railway network.

This project simulates how railway stations can be connected with minimum total cost while ensuring all stations remain connected.

---

## 🎯 Objectives
- Implement **Prim’s Algorithm**
- Understand **Greedy Approach**
- Work with **Graph Representation (Adjacency Matrix)**
- Apply DSA concepts to real-world problems

---

## 🛠️ Tech Stack

| Category        | Technology |
|----------------|-----------|
| Language       | C++       |
| Concepts       | Graphs, MST, Greedy Algorithms |
| Representation | Adjacency Matrix |

---

## 📂 Project Structure
RailRouteOptimization/
│
├── main.cpp # Prim's Algorithm Implementation
├── README.md # Documentation
└── flowchart.mmd # Mermaid Flowchart

---

## ⚙️ How It Works
1. User inputs number of stations  
2. User enters cost matrix  
3. Program applies Prim’s Algorithm  
4. Minimum edges are selected  
5. Final MST and total cost are displayed  

---

## 🧠 Algorithm (Prim’s MST)
Initialize arrays:
visited[] = false
distance[] = INF
from[] = -1
Set starting node:
distance[0] = 0
Repeat for all vertices:
Select unvisited node with minimum distance
Mark it as visited
Update distances of adjacent nodes
Construct MST using from[]


---

## 📊 Sample Input

Enter number of stations: 4

Enter cost matrix:

0 10 15 20

10 0 35 25

15 35 0 30

20 25 30 0

---

## ✅ Sample Output

Edge Cost

0 - 1 10

0 - 2 15

1 - 3 25

Total Minimum Cost = 50
