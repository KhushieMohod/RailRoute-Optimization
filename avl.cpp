#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

// Node structure for the Train Database
struct Node {
    int trainId;
    string destination;
    Node *left, *right;
    int height;

    Node(int id, string dest) {
        trainId = id;
        destination = dest;
        left = right = nullptr;
        height = 1;
    }
};

// Utility to get height of a node
int height(Node* n) {
    return n ? n->height : 0;
}

// Get Balance Factor
int getBalance(Node* n) {
    return n ? height(n->left) - height(n->right) : 0;
}

// Right Rotation (LL Case)
Node* rightRotate(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;

    x->right = y;
    y->left = T2;

    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;

    return x;
}

// Left Rotation (RR Case)
Node* leftRotate(Node* x) {
    Node* y = x->right;
    Node* T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;

    return y;
}

// Recursive function to insert a train into the AVL tree
Node* insert(Node* node, int id, string dest) {
    if (!node) return new Node(id, dest);

    if (id < node->trainId)
        node->left = insert(node->left, id, dest);
    else if (id > node->trainId)
        node->right = insert(node->right, id, dest);
    else
        return node; // Duplicate IDs not allowed

    node->height = 1 + max(height(node->left), height(node->right));

    int balance = getBalance(node);

    // Left Left Case
    if (balance > 1 && id < node->left->trainId)
        return rightRotate(node);

    // Right Right Case
    if (balance < -1 && id > node->right->trainId)
        return leftRotate(node);

    // Left Right Case
    if (balance > 1 && id > node->left->trainId) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && id < node->right->trainId) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

// In-order traversal to display the sorted Time-Table
void display(Node* root) {
    if (root) {
        display(root->left);
        cout << "Train ID: " << root->trainId << " | Destination: " << root->destination << endl;
        display(root->right);
    }
}

int main() {
    Node* root = nullptr;

    // Simulating the RailRoute Database
    root = insert(root, 101, "Mumbai Central");
    root = insert(root, 105, "Pune Junction");
    root = insert(root, 103, "Lonavala Station");
    root = insert(root, 102, "Thane Terminal");

    cout << "--- RailRoute Automated Time-Table (AVL Balanced) ---" << endl;
    display(root);

    return 0;
}