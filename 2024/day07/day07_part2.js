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

// Somehow, I tried to overthink last part and not use recursion...
// But it turns out that it works way faster than my method sooooo I should have just used it
// A good lesson was learned today again. I'll still keep part1 as is to remember how stupid I was
// After realizing that going backward is way easier, I'm almost tempted to try my old solution again
// since I'd be able to reduce the number of values to check by a lot. We'll see if I ever get to that
function isPossible(testValue, numbers) {
	const testStr = testValue + '';

	if (numbers.length === 1) {
		return testValue === numbers[0];
	}

	const numberToCheck = numbers.at(-1);

	const nbStr = numberToCheck + '';
	if (testStr.endsWith(nbStr)) {
		const possible = isPossible(+testStr.split('').slice(0, -nbStr.length).join(''), numbers.slice(0, -1));

		if (possible) {
			return true;
		}
	}

	if (Number.isInteger(testValue / numberToCheck)) {
		const possible = isPossible(testValue / numberToCheck, numbers.slice(0, -1));

		if (possible) {
			return true;
		}
	}

	if (testValue - numberToCheck > 0) {
		const possible = isPossible(testValue - numberToCheck, numbers.slice(0, -1));

		if (possible) {
			return true;
		}
	}

	return false;
}

let total = 0;
for (const [testValue, numbers] of operationsArray) {
	if (isPossible(testValue, numbers)) {
		total += testValue;
	}
}

console.log(total);
