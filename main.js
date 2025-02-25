import Tree from "./classes/Tree.js";

const generateRandomArray = (size, max) => {
	const arr = [];

	for (let i = 0; i < size; i++) {
		arr.push(Math.floor(Math.random() * max));
	}

	return arr;
};

// Create BST with random numbers < 100
const randomArray = generateRandomArray(15, 100);
const bst = new Tree();

randomArray.forEach((num) => {
	bst.insert(num);
});

console.log("\n--- Initial Tree ---");
console.log("Is the tree balanced?", bst.isBalanced());
console.log("Level order:", bst.levelOrder());
console.log("Pre-order:", bst.preOrder());
console.log("Post-order:", bst.postOrder());
console.log("In-order:", bst.inOrder());

// Unbalance the tree
const unbalancedNumbers = [101, 102, 103, 104, 105];

unbalancedNumbers.forEach((num) => {
	bst.insert(num);
});

console.log("\n--- After Unbalancing ---");
console.log("Is the tree balanced?", bst.isBalanced());
console.log("Unbalanced tree:", bst.prettyPrint(bst.root));

// Balance the tree
bst.rebalance();

console.log("\n--- After Rebalancing ---");
console.log("Is the tree balanced?", bst.isBalanced());
console.log("Level order:", bst.levelOrder());
console.log("Pre-order:", bst.preOrder());
console.log("Post-order:", bst.postOrder());
console.log("In-order:", bst.inOrder());
