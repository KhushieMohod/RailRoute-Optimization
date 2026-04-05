#include<iostream>
#include<climits>
using namespace std;

#define MAX 10

class Graph {
private:
    int AM[MAX][MAX];
    int nV, nE;

public:
    Graph(int V, int E) {
        nV = V;
        nE = E;

        for(int i=0;i<MAX;i++)
            for(int j=0;j<MAX;j++)
                AM[i][j] = (i==j)?0:INT_MAX;
    }

    void addEdge() {
        cout<<"Enter v1 v2 weight:\n";
        for(int i=0;i<nE;i++) {
            int u,v,w;
            cin>>u>>v>>w;
            AM[u][v] = w;
            AM[v][u] = w;
        }
    }

    void dijkstra(int start) {
        int visited[MAX] = {0};
        int distance[MAX];

        for(int i=0;i<nV;i++)
            distance[i] = INT_MAX;

        distance[start] = 0;

        for(int i=0;i<nV;i++) {
            int min = INT_MAX, u = -1;

            // find minimum distance vertex
            for(int j=0;j<nV;j++) {
                if(!visited[j] && distance[j] < min) {
                    min = distance[j];
                    u = j;
                }
            }

            visited[u] = 1;

            // update neighbors
            for(int v=0;v<nV;v++) {
                if(AM[u][v] != INT_MAX && !visited[v]) {
                    if(distance[u] + AM[u][v] < distance[v]) {
                        distance[v] = distance[u] + AM[u][v];
                    }
                }
            }

            // Debug print (good for viva)
            cout<<"Visited: ";
            for(int k=0;k<nV;k++) cout<<visited[k]<<" ";
            cout<<endl;
        }

        cout<<"\nShortest Distances:\n";
        for(int i=0;i<nV;i++)
            cout<<"To "<<i<<" = "<<distance[i]<<endl;
    }
};

int main() {
    int nV,nE;
    cout<<"Enter vertices and edges: ";
    cin>>nV>>nE;

    Graph g(nV,nE);
    g.addEdge();
    g.dijkstra(0);
}
