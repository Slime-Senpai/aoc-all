const fs = require('fs');

const inputText = fs.readFileSync('./day19_input.txt', { encoding: 'utf-8' });

const [towelsStr, patternsStr] = inputText.split('\n\n');

const towels = towelsStr.split(', ');

towels.sort();

const reducedTowels = [];

for (let i = 0; i < towels.length; i++) {
	const towel = towels[i];
	const towelsWithoutTowel = [...towels];
	towelsWithoutTowel.splice(i, 1);
	const regexWithoutTowel = new RegExp('^(?:' + towelsWithoutTowel.join('|') + ')*$');

	if (!regexWithoutTowel.test(towel)) {
		reducedTowels.push(towel);
	}
}

const patterns = patternsStr.split('\n');

const regexOfTowels = new RegExp('^(?:' + reducedTowels.join('|') + ')*$');

let total = 0;

patterns.forEach((e) => {
	if (regexOfTowels.test(e)) {
		total++;
	}
});

console.log(total);
