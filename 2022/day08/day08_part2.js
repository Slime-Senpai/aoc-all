const fs = require('fs');

const inputText = fs.readFileSync('./day08_input.txt', { encoding: 'utf-8' });

// HACK for nodejs, we'll define window
let window = {};

console.log(
	inputText
		.split('\n')
		.flatMap((e, i) => (i === 0 ? [e, e] : e))
		.map((e, i) =>
			i === 0
				? (window.trees = [])
				: (window.trees[i - 1] = e.split('').map((f) => {
						return { h: parseInt(f), u: 0, d: 0, l: 0, r: 0 };
				  }))
		)
		.reduce(() => window.trees)
		.map((row, i) =>
			row.forEach((tree, j) =>
				(row
					.slice(0, j)
					.reverse()
					.every((tl) => tree.l++ > Infinity || tl.h < tree.h) &&
					false) ||
				(row.slice(j + 1).every((tr) => tree.r++ > Infinity || tr.h < tree.h) && false) ||
				((i > 0
					? Array(i)
							.fill(0)
							.every((_, tu) => tree.u++ > Infinity || window.trees[i - 1 - tu][j].h < tree.h)
					: false) &&
					false) ||
				((i > 0
					? Array(window.trees.length - i - 1)
							.fill(0)
							.every((_, td) => tree.d++ > Infinity || window.trees[i + td + 1][j].h < tree.h)
					: false) &&
					false)
					? ''
					: ''
			)
		)
		.reduce(() => window.trees)
		.map((e) => e.reduce((a, b) => (b.u * b.d * b.l * b.r > a ? b.u * b.d * b.l * b.r : a), 0))
		.reduce((a, b) => (a > b ? a : b))
);
