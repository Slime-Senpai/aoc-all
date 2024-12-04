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
						return { h: parseInt(f) };
				  }))
		)
		.reduce(() => window.trees)
		.map((row, i) =>
			row.forEach((tree, j) =>
				i === 0 || j === 0 || i === window.trees.length - 1 || j === row.length - 1
					? (tree.visible = true)
					: row.slice(0, j).every((tl) => tl.h < tree.h) ||
					  row.slice(j + 1).every((tr) => tr.h < tree.h) ||
					  Array(i)
							.fill(0)
							.every((_, tu) => window.trees[tu][j].h < tree.h) ||
					  Array(window.trees.length - (i + 1))
							.fill(0)
							.every((_, td) => window.trees[window.trees.length - td - 1][j].h < tree.h)
					? (tree.visible = true)
					: ''
			)
		)
		.reduce(() => window.trees)
		.reduce((c, d) => c + d.reduce((a, b) => (b.visible ? a + 1 : a), 0), 0)
);
