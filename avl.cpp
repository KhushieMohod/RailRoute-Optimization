#include<iostream>
#include<string>
using namespace std;

struct Node{
    int trainID;
    string destination;
    string arrivalTime;
    Node* left;
    Node* right;
    int height;

    Node(int id, string dest, string time)
    {
        trainID = id;
        destination = dest;
        arrivalTime = time;
        left = right = nullptr;
        left = right = nullptr;
        height = 1;
    }
};

Node* insert(Node* root, int id, string dest, string time)
{
    if(!root) return new Node(id, dest, time);

    if(id < root -> trainID) root -> left = insert(root -> left, id, dest, time);
    else if(id > root -> trainID) root -> right = insert(root -> right, id, dest, time);
    else return root;

    
}

int height(Node* root)
{
    if(!root) return 0;
    return root -> height;
}

int balanceFactor(Node* root)
{
    if(!root) return 0;
    return height(root -> left) - height(root -> right);
}

Node* rotateRight(Node* parent)
{
    Node* temp = parent -> left;
    if(temp -> right) temp -> right = parent -> left;
    temp -> right = parent;
    return temp;
}

Node* rotateLeft(Node* parent)
{
    Node* temp = parent -> right;
    if(temp -> left) parent -> right = temp -> left;
    temp -> left = parent;
    return temp; 
}

Node* leftLeft(Node* parent)
{
    Node* temp = rotateRight(parent);
    return temp;
}

Node* rightRight(Node* parent)
{
    Node* temp = rotateLeft(parent);
    return temp;
}

Node* leftRight(Node* parent)
{   
    //Resolving the left right case to left left case
    Node* temp = rotateLeft(parent -> left);
    parent -> left = temp;
    //Resolving the left left case
    temp = rotateRight(parent);
    return temp;
}

Node* rightLeft(Node* parent)
{   
    //Resolving the right left case to right right case
    Node* temp = rotateRight(parent ->right);
    parent -> right = temp;
    //Resolving the right right case
    temp = rotateLeft(parent);
    return temp;
}

int main()
{
    Node* root = nullptr;
    root = insert(root, 30, "CSMT", "5.00 PM");
    root = insert(root, 40, "Karjat", "10.30 pM");
    root = insert(root, 50, "Lonavala", "9.00 AM");
    root = insert(root, 45, "Daund", "10.00 AM");
    root = insert(root, 85, "Dadar", "7.45 AM");
    root = insert(root, 90, "Kalyan", "1.15 PM");
    root = insert(root, 70, "Nashik", "8.00 PM");
    root = insert(root, 65, "Sinnar", "12.30 PM");
    return 0;
}