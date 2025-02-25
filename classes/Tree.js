import Node from "./Node.js";

export default class Tree {
	constructor(arr = []) {
		const uniqueSortedArr = [...new Set(arr)].sort((a, b) => a - b);

		this.root = this.buildTree(
			uniqueSortedArr,
			0,
			uniqueSortedArr.length - 1
		);
	}

	buildTree(arr, start, end) {
		// Base case
		if (start > end) return null;

		// Get the middle element and make it root
		const mid = Math.floor((start + end) / 2);
		const node = new Node(arr[mid]);

		// Recursively construct the left subtree and make it left child of root
		node.left = this.buildTree(arr, start, mid - 1);

		// Recursively construct the right subtree and make it right child of root
		node.right = this.buildTree(arr, mid + 1, end);

		return node;
	}

	insert(value) {
		this.root = this.insertRec(this.root, value);
	}

	insertRec(root, value) {
		// If tree is empty, create new node
		if (root === null) {
			return new Node(value);
		}

		// Recursively traverse and insert
		if (value < root.data) {
			root.left = this.insertRec(root.left, value);
		} else if (value > root.data) {
			root.right = this.insertRec(root.right, value);
		}

		return root;
	}

	deleteItem(value) {
		this.root = this.deleteRec(this.root, value);
	}

	deleteRec(root, value) {
		if (root === null) return null;

		if (value < root.data) {
			root.left = this.deleteRec(root.left, value);
		} else if (value > root.data) {
			root.right = this.deleteRec(root.right, value);
		} else {
			// Node with only one child or no child
			if (root.left === null) return root.right;
			if (root.right === null) return root.left;

			// Node with two children: Get the inorder successor
			root.data = this.minValue(root.right);
			root.right = this.deleteRec(root.right, root.data);
		}

		return root;
	}

	minValue(root) {
		let minv = root.data;

		while (root.left != null) {
			minv = root.left.data;
			root = root.left;
		}

		return minv;
	}

	find(value) {
		return this.findNode(this.root, value);
	}

	findNode(root, value) {
		if (root === null || root.data === value) return root;

		if (value < root.data) return this.findNode(root.left, value);

		return this.findNode(root.right, value);
	}

	levelOrder(callback) {
		return this.levelOrderTraversal(this.root, callback);
	}

	inOrder(callback) {
		return this.inOrderTraversal(this.root, callback);
	}

	preOrder(callback) {
		return this.preOrderTraversal(this.root, callback);
	}

	postOrder(callback) {
		return this.postOrderTraversal(this.root, callback);
	}

	levelOrderTraversal(root, callback) {
		if (root === null) return [];

		const queue = [root];
		const result = [];

		while (queue.length > 0) {
			const node = queue.shift();

			if (callback) callback(node);
			result.push(node.data);

			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}

		return result;
	}

	inOrderTraversal(root, callback) {
		const result = [];

		function traverse(node) {
			if (node === null) return;

			traverse(node.left);
			if (callback) callback(node);
			result.push(node.data);
			traverse(node.right);
		}

		traverse(root);
		return result;
	}

	preOrderTraversal(root, callback) {
		const result = [];

		function traverse(node) {
			if (node === null) return;

			if (callback) callback(node);
			result.push(node.data);
			traverse(node.left);
			traverse(node.right);
		}

		traverse(root);
		return result;
	}

	postOrderTraversal(root, callback) {
		const result = [];

		function traverse(node) {
			if (node === null) return;

			traverse(node.left);
			traverse(node.right);
			if (callback) callback(node);
			result.push(node.data);
		}

		traverse(root);
		return result;
	}

	height(node) {
		if (node === null) {
			return -1;
		}

		const leftHeight = this.height(node.left);
		const rightHeight = this.height(node.right);

		return Math.max(leftHeight, rightHeight) + 1;
	}

	depth(node) {
		let depth = 0;
		let currentNode = this.root;

		while (currentNode !== null) {
			if (node.data < currentNode.data) {
				currentNode = currentNode.left;
			} else if (node.data > currentNode.data) {
				currentNode = currentNode.right;
			} else {
				return depth;
			}
			depth++;
		}
		return -1; // Node not found
	}

	isBalanced() {
		return this.isBalancedTree(this.root);
	}

	isBalancedTree(node) {
		if (node === null) return true;

		const leftHeight = this.height(node.left);
		const rightHeight = this.height(node.right);

		if (
			Math.abs(leftHeight - rightHeight) <= 1 &&
			this.isBalancedTree(node.left) &&
			this.isBalancedTree(node.right)
		) {
			return true;
		}

		return false;
	}

	rebalance() {
		const arr = this.inOrder();
		this.root = this.buildTree(arr, 0, arr.length - 1);
	}

	prettyPrint(node, prefix = "", isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
		if (node.left) {
			this.prettyPrint(
				node.left,
				`${prefix}${isLeft ? "    " : "│   "}`,
				true
			);
		}
	}
}
