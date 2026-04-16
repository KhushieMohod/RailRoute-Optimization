#include<iostream>
#include<climits>
using namespace std;

#define MAX_STATIONS 10

class RailNetwork {
private:
    int routeMap[MAX_STATIONS][MAX_STATIONS];
    int totalStations, totalTracks;

public:
    RailNetwork(int s, int t) {
        totalStations = s;
        totalTracks = t;

        for(int i = 0; i < MAX_STATIONS; i++)
            for(int j = 0; j < MAX_STATIONS; j++)
                routeMap[i][j] = (i == j) ? 0 : INT_MAX;
    }

    void addTracks() {
        cout << "Enter station1 station2 cost:\n";
        for(int i = 0; i < totalTracks; i++) {
            int s1, s2, cost;
            cin >> s1 >> s2 >> cost;
            routeMap[s1][s2] = cost;
            routeMap[s2][s1] = cost;
        }
    }

    void findShortestRoutes(int sourceStation) {
        int visited[MAX_STATIONS] = {0};
        int shortestDistance[MAX_STATIONS];

        for(int i = 0; i < totalStations; i++)
            shortestDistance[i] = INT_MAX;

        shortestDistance[sourceStation] = 0;

        for(int i = 0; i < totalStations; i++) {
            int min = INT_MAX, currentStation = -1;

            for(int j = 0; j < totalStations; j++) {
                if(!visited[j] && shortestDistance[j] < min) {
                    min = shortestDistance[j];
                    currentStation = j;
                }
            }

            visited[currentStation] = 1;

            for(int next = 0; next < totalStations; next++) {
                if(routeMap[currentStation][next] != INT_MAX && !visited[next]) {
                    if(shortestDistance[currentStation] + routeMap[currentStation][next] < shortestDistance[next]) {
                        shortestDistance[next] = shortestDistance[currentStation] + routeMap[currentStation][next];
                    }
                }
            }
        }

        cout << "\nShortest Routes from Station " << sourceStation << ":\n";
        for(int i = 0; i < totalStations; i++)
            cout << "To " << i << " = " << shortestDistance[i] << endl;
    }
};

int main() {
    int stations, tracks;
    cout << "Enter number of stations and tracks: ";
    cin >> stations >> tracks;

    RailNetwork r(stations, tracks);
    r.addTracks();
    r.findShortestRoutes(0);
}