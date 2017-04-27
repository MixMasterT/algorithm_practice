// define Node
function Node(value) {
  this.key = value;
  this.parent = null;
  this.left = null;
  this.right = null;
}

// define BST
function BST() {
  this.root = null;
}

BST.prototype.addNode = function(node, startNode) {
  // set startNode to root if no startNode was passed in...
  if (startNode === undefined) {
    startNode = this.root;
  }
  // if no root yet, put node at root
  if (startNode === null) {
    this.root = node;
  } else {
   let currentNode = startNode;
   if (node.key < startNode.key) { // go left

     if (startNode.left) { // since key is less recurse down the left side
       this.addNode(node, startNode.left);
     } else {
       startNode.left = node;
       node.parent = startNode;
     }

   } else { // go right
     if (startNode.right) { // since key is greater recurse to right
       this.addNode(node, startNode.right);
     } else {
       startNode.right = node;
       node.parent = startNode;
     }
   }
  }
}

BST.prototype.getNodeByKey = function(key) {
  let currentNode = this.root;

  while (currentNode) {
    if (key === currentNode.key) {
      return currentNode;
    } else {
      if (key < currentNode.key) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
  }
  return currentNode;
}

BST.prototype.getInOrderSuccessor = function(node) {
  if (node.right) { // this right leg of the tree has successors only
  // HOWEVER, there may be a smaller successor higher up the tree...
    let nextLowerSuccessor = node.right;
    while (nextLowerSuccessor.left) {
      nextLowerSuccessor = nextLowerSuccessor.left;
    }
    return nextLowerSuccessor;

  } else { // no successor below, so we must look up the tree...
    let parent = node.parent;
    let previousChild = node;
    while (parent) { // don't want to look at null if there is no parent

      while (parent.key < previousChild.key) { // we were on a right child
        previousChild = parent;
        parent = parent.parent;
      }
      return parent;
    }
  }
  return null;
}

const t = new BST();
const seven = new Node(7);
const five = new Node(5);
const ten = new Node(10);
const twenty = new Node(20);
const twentyOne = new Node(21);
const twentyFive = new Node(25);
t.addNode(seven);
t.addNode(five);
t.addNode(ten);
t.addNode(twenty);
t.addNode(twentyOne);
t.addNode(twentyFive);

console.log(t.getInOrderSuccessor(ten).key)
