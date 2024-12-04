const fs = require('fs');

const inputText = fs.readFileSync('./day11_input.txt', { encoding: 'utf-8' });

const monkeys = [];

const monkeyLines = inputText.split('\n\n');

const monkeyRegex =
	/Monkey (\d+):\n *Starting items: ([\d+,? ?]*)\n *Operation: new = old ([+|*]) (\d+|old)\n *Test: divisible by (\d+)\n *If true: throw to monkey (\d+)\n *If false: throw to monkey (\d+)/;

const monkeyArray = monkeyLines.map((e) => monkeyRegex.exec(e));

const monkeyTestNumbers = [];

monkeyArray.forEach((e) => {
	monkeys[e[1]] = {
		items: e[2].split(',').map((f) => parseInt(f)),
		operation: {
			sign: e[3],
			num: e[4],

			getNum(item) {
				return this.num === 'old' ? item : parseInt(this.num);
			}
		},

		test: {
			divisible: parseInt(e[5]),
			monkeyTrue: e[6],
			monkeyFalse: e[7]
		},

		giveToMonkey(item, i) {
			this.inspectTimes++;
			if (item[i] % this.test.divisible === 0) {
				monkeys[this.test.monkeyTrue].items.push(item);
			} else {
				monkeys[this.test.monkeyFalse].items.push(item);
			}
		},

		inspect(item) {
			let newValue = item;
			if (this.operation.sign === '+') {
				newValue = item + this.operation.getNum(item);
			} else {
				newValue = item * this.operation.getNum(item);
			}

			return newValue;
		},

		inspectTimes: 0
	};

	monkeyTestNumbers.push(monkeys[e[1]].test.divisible);
});

monkeys.forEach((monkey) => (monkey.items = monkey.items.map((item) => monkeyTestNumbers.map((testNum) => item % testNum))));

Array(10000)
	.fill()
	.forEach(() => {
		for (let i = 0; i < monkeys.length; i++) {
			const monkey = monkeys[i];
			while (monkey.items.length > 0) {
				let currItem = monkey.items.shift();

				currItem = currItem.map((item, i) => monkey.inspect(item) % monkeyTestNumbers[i]);

				monkey.giveToMonkey(currItem, i);
			}
		}
	});

monkeys.sort((a, b) => b.inspectTimes - a.inspectTimes);

console.log(monkeys[0].inspectTimes * monkeys[1].inspectTimes);
