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

const validManuals = manuals.filter((manual) => {
	return manual.every((page, i, arr) => {
		return arr.slice(0, i).every((pageBefore) => {
			if (!rules.has(page)) {
				return true;
			}

			return !rules.get(page).includes(pageBefore);
		});
	});
});

console.log(
	validManuals.reduce((a, b) => {
		return a + +b[Math.ceil(b.length / 2) - 1];
	}, 0)
);
