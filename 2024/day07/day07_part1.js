const fs = require('fs');

const inputText = fs.readFileSync('./day07_input.txt', { encoding: 'utf-8' });

const operationsArray = inputText.split('\n').map((line) => {
	const [testValueStr, numbersStr] = line.split(':');

	const testValue = +testValueStr.trim();

	const numbers = numbersStr
		.trim()
		.split(' ')
		.map((e) => +e);

	return [testValue, numbers];
});

let total = 0;
for (const [testValue, numbers] of operationsArray) {
	let currentValues = [0];

	for (const number of numbers) {
		const newValues = [];
		for (const currentValue of currentValues) {
			newValues.push(currentValue + number);
			newValues.push(currentValue * number);

			currentValues = newValues.filter((e) => e > 0 && e <= testValue);
		}
	}

	if (currentValues.includes(testValue)) {
		total += testValue;
	}
}

console.log(total);
