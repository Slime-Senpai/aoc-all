const fs = require('fs');

const inputText = fs.readFileSync('./day13_input.txt', { encoding: 'utf-8' });

const pairs = inputText.split('\n\n').map((e) => e.split('\n').map((f) => f.replaceAll(/(\d+)/g, '"$1"')));

function convert(stuff) {
	return JSON.parse(stuff);
}

function compare(a, b) {
	const convertedA = typeof a === 'string' ? convert(a) : a;
	const convertedB = typeof b === 'string' ? convert(b) : b;

	const same = typeof convertedA === typeof convertedB;

	if (!same) {
		if (typeof convertedA === 'number') {
			return compare([a], b);
		} else {
			return compare(a, [b]);
		}
	}

	if (typeof convertedA === 'number') {
		return convertedB - convertedA;
	}

	if (convertedA.length === 0 && convertedB.length > 0) {
		return 1;
	}

	for (let i = 0; i < convertedA.length; i++) {
		if (i === convertedB.length) return -1;
		const compareValue = compare(convertedA[i], convertedB[i]);
		if (compareValue !== 0) {
			return compareValue;
		}
	}

	return convertedA.length === convertedB.length ? 0 : 1;
}

const num = pairs.map((e, i) => (compare(e[0], e[1]) > 0 ? i + 1 : 0)).reduce((a, b) => a + b, 0);

console.log(num);
