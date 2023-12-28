const fs = require('fs');

const inputText = fs.readFileSync('./day07_input_part2.txt', { encoding: 'utf-8' });

class Node {
	/**
	 * @type {string}
	 */
	name;
	/**
	 * @type {number | undefined}
	 */
	value_;
	/**
	 * @type {((value: number) => void)[]}
	 */
	listeners_;

	/**
	 * @param {number} value
	 */
	set value(value) {
		if (value === this.value_) {
			return;
		}
		this.value_ = value;
		this.triggerListeners();
	}

	get value() {
		return this.value_;
	}

	constructor(name) {
		this.name = name;
		this.listeners_ = [];
	}

	/**
	 * @param {((value: number) => void)} listener
	 */
	addListener(listener) {
		this.listeners_.push(listener);
	}

	triggerListeners() {
		if (this.value != undefined) {
			this.listeners_.forEach((listener) => listener(this.value));
		}
	}
}

/**
 * @type {Map<string, Node>}
 */
const nodes = new Map();

const getNode = (name) => {
	let node = nodes.get(name);

	if (!node) {
		node = new Node(name);
		nodes.set(name, node);
	}

	return node;
};

inputText.split('\n').forEach((e) => {
	const [instruction, exitName] = e.split(' -> ');

	const exitNode = getNode(exitName);

	if (!isNaN(+instruction)) {
		exitNode.value = +instruction;
	}

	if (instruction.includes('RSHIFT')) {
		const [entryName, nbShift] = instruction.split(' RSHIFT ');
		const entryNode = getNode(entryName);
		entryNode.addListener((value) => {
			exitNode.value = (value >>> +nbShift) & 0xffff;
		});
	} else if (instruction.includes('LSHIFT')) {
		const [entryName, nbShift] = instruction.split(' LSHIFT ');
		const entryNode = getNode(entryName);
		entryNode.addListener((value) => {
			exitNode.value = (value << +nbShift) & 0xffff;
		});
	} else if (instruction.includes('NOT')) {
		const [, entryName] = instruction.split('NOT ');
		const entryNode = getNode(entryName);
		entryNode.addListener((value) => {
			exitNode.value = ~value & 0xffff;
		});
	} else if (instruction.includes('OR')) {
		const [entryName1, entryName2] = instruction.split(' OR ');
		const entryNode1 = getNode(entryName1);
		const entryNode2 = getNode(entryName2);
		let valueNode1 = isNaN(+entryName1) ? undefined : +entryName1;
		let valueNode2 = isNaN(+entryName2) ? undefined : +entryName2;

		const next = () => {
			if (valueNode1 !== undefined && valueNode2 !== undefined) {
				exitNode.value = valueNode1 | valueNode2;
			}
		};

		entryNode1.addListener((value) => {
			valueNode1 = value;

			next();
		});

		entryNode2.addListener((value) => {
			valueNode2 = value;

			next();
		});
	} else if (instruction.includes('AND')) {
		const [entryName1, entryName2] = instruction.split(' AND ');
		const entryNode1 = getNode(entryName1);
		const entryNode2 = getNode(entryName2);
		let valueNode1 = isNaN(+entryName1) ? undefined : +entryName1;
		let valueNode2 = isNaN(+entryName2) ? undefined : +entryName2;

		const next = () => {
			if (valueNode1 !== undefined && valueNode2 !== undefined) {
				exitNode.value = valueNode1 & valueNode2;
			}
		};

		entryNode1.addListener((value) => {
			valueNode1 = value;

			next();
		});

		entryNode2.addListener((value) => {
			valueNode2 = value;

			next();
		});
	} else {
		const entryName = instruction;
		const entryNode = getNode(entryName);

		entryNode.addListener((value) => {
			exitNode.value = value;
		});
	}
});

[...nodes.values()].filter((e) => e.value !== undefined).forEach((e) => e.triggerListeners());

console.log(nodes.get('a'));
