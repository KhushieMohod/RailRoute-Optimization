#include<iostream>
#include<algorithm>
using namespace std;

#define MAX 10

struct Edge {
    int u,v,w;
};

class Graph {
private:
    Edge edges[50];
    int nV,nE;

public:
    void input() {
        cout<<"Enter vertices and edges: ";
        cin>>nV>>nE;

        cout<<"Enter u v weight:\n";
        for(int i=0;i<nE;i++)
            cin>>edges[i].u>>edges[i].v>>edges[i].w;
    }

    int findParent(int parent[], int i) {
        if(parent[i]==i) return i;
        return findParent(parent,parent[i]);
    }

    void kruskal() {
        sort(edges, edges+nE, [](Edge a, Edge b){
            return a.w < b.w;
        });

        int parent[MAX];
        for(int i=0;i<nV;i++) parent[i]=i;

        int count=0, i=0, total=0;

        cout<<"Edges in MST:\n";

        while(count<nV-1 && i<nE) {
            Edge e = edges[i++];

            int p1 = findParent(parent,e.u);
            int p2 = findParent(parent,e.v);

            if(p1!=p2) {
                cout<<e.u<<" - "<<e.v<<" = "<<e.w<<endl;
                total += e.w;
                parent[p1] = p2;
                count++;
            }
        }

        cout<<"Total MST Cost = "<<total<<endl;
    }
};

int main() {
    Graph g;
    g.input();
    g.kruskal();
}
