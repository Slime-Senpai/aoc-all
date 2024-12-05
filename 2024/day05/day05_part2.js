const fs = require('fs');

const inputText = fs.readFileSync('./day05_input.txt', { encoding: 'utf-8' });

const [rulesStr, manualsStr] = inputText.split('\n\n').map((e) => e.split('\n'));

const rules = new Map();
rulesStr.forEach((ruleStr) => {
	const [before, after] = ruleStr.split('|');

	if (rules.has(before)) {
		rules.get(before).push(after);
	} else {
		rules.set(before, [after]);
	}
});
const manuals = manualsStr.map((manualStr) => manualStr.split(','));

const stinkyManuals = manuals.filter((manual) => {
	return !manual.every((page, i, arr) => {
		return arr.slice(0, i).every((pageBefore) => {
			if (!rules.has(page)) {
				return true;
			}

			return !rules.get(page).includes(pageBefore);
		});
	});
});

stinkyManuals.forEach((manual) => {
	return manual.sort((a, b) => {
		const aHasBAfter = rules.has(a) && rules.get(a).includes(b);
		const bHasAAfter = rules.has(b) && rules.get(b).includes(a);

		if (aHasBAfter) {
			return -1;
		} else if (bHasAAfter) {
			return 1;
		} else {
			return 0;
		}
	});
});

console.log(
	stinkyManuals.reduce((a, b) => {
		return a + +b[Math.ceil(b.length / 2) - 1];
	}, 0)
);
