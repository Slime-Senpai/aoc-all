const fs = require('fs');

const inputText = fs.readFileSync('./day19_input.txt', { encoding: 'utf-8' });

const [towelsStr, patternsStr] = inputText.split('\n\n');

const patterns = patternsStr.split('\n');

const towels = towelsStr.split(', ');

towels.sort();

let total = 0;

let currentPatterns = [...patterns.map((e) => ({ pattern: e, nb: 1 }))];

while (currentPatterns.length > 0) {
	const { pattern, nb } = currentPatterns.shift();

	if (pattern === '') {
		total += nb;
		continue;
	}

	for (const towel of towels) {
		if (pattern.startsWith(towel)) {
			const str = pattern.substring(towel.length);

			const existing = currentPatterns.find((e) => e.pattern === str);

			if (existing) {
				existing.nb += nb;
			} else {
				currentPatterns.push({ pattern: str, nb });
			}
		}
	}
}

console.log(total);
