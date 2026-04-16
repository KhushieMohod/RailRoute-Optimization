#include<iostream>
using namespace std;

#define MAX_STATIONS 10
#define INF 9999

// Structure representing a railway track
class RailNetwork {
private:
    int routeCost[MAX_STATIONS][MAX_STATIONS];
    int totalStations;

public:// Constructor to initialize the route cost matrix
    RailNetwork() {
        for(int i = 0; i < MAX_STATIONS; i++)
            for(int j = 0; j < MAX_STATIONS; j++)
                routeCost[i][j] = (i == j) ? 0 : INF;
    }

    void input() { // function to input the number of tracks, and their costs
        int totalTracks;
        cout << "Enter number of stations and tracks: ";
        cin >> totalStations >> totalTracks;

        cout << "Enter station1 station2 cost:\n";
        for(int i = 0; i < totalTracks; i++) {
            int s1, s2, cost;
            cin >> s1 >> s2 >> cost;
            routeCost[s1][s2] = cost;
            routeCost[s2][s1] = cost;
        }
    }

    void expandNetworkFromHub() {// Mst funtion
        int visited[MAX_STATIONS] = {0};
        int minCost[MAX_STATIONS];
        int connectedFrom[MAX_STATIONS];

        for(int i = 0; i < totalStations; i++) {
            minCost[i] = INF;
            connectedFrom[i] = -1;
        }

        int hub;
        cout << "Enter starting station (hub): ";
        cin >> hub;

        visited[hub] = 1;
        int current = hub;
        int totalCost = 0;

        cout << "\nSelected Tracks (MST):\n";

        for(int edge = 0; edge < totalStations - 1; edge++) {
            int min = INF, nextStation = -1;

            for(int i = 0; i < totalStations; i++) {
                if(!visited[i]) {
                    if(routeCost[current][i] < minCost[i]) {
                        minCost[i] = routeCost[current][i];
                        connectedFrom[i] = current;
                    }

                    if(minCost[i] < min) {
                        min = minCost[i];
                        nextStation = i;
                    }
                }
            }

            cout << connectedFrom[nextStation] << " - " << nextStation << endl;

            visited[nextStation] = 1;
            current = nextStation;
            totalCost += min;
        }

        cout << "Total Network Cost = " << totalCost << endl;
    }
};

int main() {
    RailNetwork r;
    r.input();
    r.expandNetworkFromHub();
}