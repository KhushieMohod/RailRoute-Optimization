#include <iostream>
using namespace std;

#define MAX 10
#define INF 9999

class Graph {
private:
    int cost[MAX][MAX];
    int nV;

public:
    Graph() {
        for(int i = 0; i < MAX; i++)
            for(int j = 0; j < MAX; j++)
                cost[i][j] = (i == j) ? 0 : INF;
    }

    void input() {
        int nE;
        cout << "Enter number of vertices and edges: ";
        cin >> nV >> nE;

        cout << "Enter source destination weight:\n";
        for(int i = 0; i < nE; i++) {
            int u, v, w;
            cin >> u >> v >> w;
            cost[u][v] = w;
            cost[v][u] = w;
        }
    }

    void prims() {
        int visited[MAX] = {0};
        int distance[MAX];
        int from[MAX];

        for(int i = 0; i < nV; i++) {
            distance[i] = INF;
            from[i] = -1;
        }

        int start;
        cout << "Enter starting vertex: ";
        cin >> start;

        visited[start] = 1;
        int v = start;
        int total = 0;

        for(int e = 0; e < nV - 1; e++) {
            int min = INF, minIndex = -1;

            for(int i = 0; i < nV; i++) {
                if(!visited[i]) {
                    if(cost[v][i] < distance[i]) {
                        distance[i] = cost[v][i];
                        from[i] = v;
                    }

                    if(distance[i] < min) {
                        min = distance[i];
                        minIndex = i;
                    }
                }
            }

            cout << "Edge: " << from[minIndex] << " - " << minIndex << endl;

            visited[minIndex] = 1;
            v = minIndex;
            total += min;
        }

        cout << "Total Cost = " << total << endl;
    }
};

int main() {
    Graph g;
    g.input();
    g.prims();
}
