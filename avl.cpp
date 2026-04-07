#include<iostream>
#include<string>
#include<algorithm>
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
        height = 1;
    }
};

// Get height
int height(Node* root)
{
    if(!root) return 0;
    return root->height;
}

// Get balance factor
int balanceFactor(Node* root)
{
    if(!root) return 0;
    return height(root->left) - height(root->right);
}

// Right Rotation
Node* rotateRight(Node* parent)
{
    Node* temp = parent->left;
    Node* T2 = temp->right;

    temp->right = parent;
    parent->left = T2;

    // Update heights
    parent->height = 1 + max(height(parent->left), height(parent->right));
    temp->height = 1 + max(height(temp->left), height(temp->right));

    return temp;
}

// Left Rotation
Node* rotateLeft(Node* parent)
{
    Node* temp = parent->right;
    Node* T2 = temp->left;

    temp->left = parent;
    parent->right = T2;

    // Update heights
    parent->height = 1 + max(height(parent->left), height(parent->right));
    temp->height = 1 + max(height(temp->left), height(temp->right));
    
    return temp;
}

// AVL Insert
Node* insert(Node* root, int id, string dest, string time)
{
    // Step 1: Normal BST insertion
    if(!root) return new Node(id, dest, time);

    if(id < root->trainID)
        root->left = insert(root->left, id, dest, time);
    else if(id > root->trainID)
        root->right = insert(root->right, id, dest, time);
    else
        return root;

    // Step 2: Update height
    root->height = 1 + max(height(root->left), height(root->right));

    // Step 3: Get balance factor
    int bf = balanceFactor(root);

    // Step 4: Balance the tree

    // Left Left Case
    if(bf > 1 && id < root->left->trainID)
        return rotateRight(root);

    // Right Right Case
    if(bf < -1 && id > root->right->trainID)
        return rotateLeft(root);

    // Left Right Case
    if(bf > 1 && id > root->left->trainID)
    {
        root->left = rotateLeft(root->left);
        return rotateRight(root);
    }

    // Right Left Case
    if(bf < -1 && id < root->right->trainID)
    {
        root->right = rotateRight(root->right);
        return rotateLeft(root);
    }

    return root;
}

// Inorder traversal (for checking)
void inorder(Node* root)
{
    if(!root) return;
    inorder(root->left);
    cout << root->trainID << " (" << root->destination << ") ";
    inorder(root->right);
}

int main()
{
    Node* root = nullptr;

    root = insert(root, 30, "CSMT", "5.00 PM");
    root = insert(root, 40, "Karjat", "10.30 PM");
    root = insert(root, 50, "Lonavala", "9.00 AM");
    root = insert(root, 45, "Daund", "10.00 AM");
    root = insert(root, 85, "Dadar", "7.45 AM");
    root = insert(root, 90, "Kalyan", "1.15 PM");
    root = insert(root, 70, "Nashik", "8.00 PM");
    root = insert(root, 65, "Sinnar", "12.30 PM");

    cout << "Inorder Traversal:\n";
    inorder(root);

    return 0;
}