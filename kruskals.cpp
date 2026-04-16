#include<iostream>
#include<algorithm>
using namespace std;

#define MAX_STATIONS 10

// Structure representing a railway track
struct Track {
    int station1, station2, cost;
};

class RailNetwork {
private:
    Track tracks[50];
    int totalStations, totalTracks;

public:
    void input() {
        cout << "Enter number of stations and tracks: ";
        cin >> totalStations >> totalTracks;

        cout << "Enter station1 station2 cost:\n";
        for(int i = 0; i < totalTracks; i++) {
            cin >> tracks[i].station1 >> tracks[i].station2 >> tracks[i].cost;
        }
    }

    int findParent(int parent[], int station) {
        if(parent[station] == station)
            return station;
        return findParent(parent, parent[station]);
    }

    void designMinimumCostNetwork() {
        sort(tracks, tracks + totalTracks, [](Track a, Track b) {
            return a.cost < b.cost;
        });

        int parent[MAX_STATIONS];
        for(int i = 0; i < totalStations; i++)
            parent[i] = i;

        int edgesUsed = 0, i = 0, totalCost = 0;

        cout << "\nSelected Tracks (MST):\n";

        while(edgesUsed < totalStations - 1 && i < totalTracks) {
            Track t = tracks[i++];

            int p1 = findParent(parent, t.station1);
            int p2 = findParent(parent, t.station2);

            if(p1 != p2) {
                cout << t.station1 << " - " << t.station2 << " : " << t.cost << endl;
                totalCost += t.cost;
                parent[p1] = p2;
                edgesUsed++;
            }
        }

        cout << "Total Network Cost = " << totalCost << endl;
    }
};

int main() {
    RailNetwork r;
    r.input();
    r.designMinimumCostNetwork();
}