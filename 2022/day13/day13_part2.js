const fs = require('fs');

const inputText = fs.readFileSync('./day13_input.txt', { encoding: 'utf-8' });

const pairs = inputText
	.split('\n')
	.filter((e) => e.trim() !== '')
	.map((e) => e.replaceAll(/(\d+)/g, '"$1"'));

pairs.push('[["2"]]');
pairs.push('[["6"]]');

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

pairs.sort((a, b) => -compare(a, b));

pairs.unshift('RANDOM');

console.log(pairs.indexOf('[["2"]]') * pairs.indexOf('[["6"]]'));
