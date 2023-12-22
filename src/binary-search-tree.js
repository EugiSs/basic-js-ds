const { NotImplementedError } = require("../extensions/index.js")

const { Node } = require("../extensions/list-tree.js")

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
	constructor() {
		this.treeRoot = null
	}

	root() {
		return this.treeRoot
	}

	add(data) {
		this.treeRoot = addNode(this.treeRoot, data)

		function addNode(current, data) {
			if (!current) return new Node(data)

			if (current.data === data) return current

			if (current.data > data) {
				current.left = addNode(current.left, data)
			} else {
				current.right = addNode(current.right, data)
			}

			return current
		}
	}

	has(data) {
		return hasValue(this.treeRoot, data)
		function hasValue(current, data) {
			if (!current) return false

			if (current.data === data) return true

			return current.data > data
				? hasValue(current.left, data)
				: hasValue(current.right, data)
		}
	}

	find(data) {
		// throw new NotImplementedError("Not implemented")
		return findValue(this.treeRoot, data)

		function findValue(current, data) {
			if (!current) return null

			if (current.data === data) return current

			if (data < current.data) {
				return findValue(current.left, data)
			} else {
				return findValue(current.right, data)
			}
		}
	}

	remove(data) {
		this.treeRoot = removeNode(this.treeRoot, data)

		function removeNode(current, data) {
			if (!current) return null

			if (data < current.data) {
				current.left = removeNode(current.left, data)
				return current
			} else if (data > current.data) {
				current.right = removeNode(current.right, data)
				return current
			} else {
				if (!current.left && !current.right) {
					return null
				}
				if (!current.right) {
					current = current.left
					return current
				}
				if (!current.left) {
					current = current.right
					return current
				}

				let maxLeftValue = current.left
				while (maxLeftValue.right) {
					maxLeftValue = maxLeftValue.right
				}
				current.data = maxLeftValue.data
				current.left = removeNode(current.left, maxLeftValue.data)

				return current
			}
		}
	}

	min() {
		if (!this.treeRoot) return null
		let current = this.treeRoot
		while (current.left) {
			current = current.left
		}
		return current.data
	}

	max() {
		if (!this.treeRoot) return null
		let current = this.treeRoot
		while (current.right) {
			current = current.right
		}
		return current.data
	}
}

let b = new BinarySearchTree()
b.has("test")
console.log(b)

module.exports = {
	BinarySearchTree
}
