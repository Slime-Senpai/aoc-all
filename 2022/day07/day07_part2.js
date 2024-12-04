const fs = require('fs');

const inputText = fs.readFileSync('./day07_input.txt', { encoding: 'utf-8' });

// HACK for nodejs, we'll define window
let window = {};

console.log(
	inputText
		.split('\n')
		.flatMap((e, i) => (i === 0 ? [e, e, e] : e))
		.map((e, i) =>
			i === 0
				? (window.dirSizes = {})
				: i === 1
				? (window.dirStack = [])
				: e.substring(0, 4) === '$ cd'
				? e.substring(5) === '..'
					? (window.dirSizes[window.dirStack.slice(0, -1).reduce((a, b) => a + '/' + b, '')] +=
							window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')]) | window.dirStack.pop()
					: window.dirStack.push(e.substring(5))
				: e.substring(0, 4) === '$ ls'
				? (window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')] = 0)
				: e.split(' ')[0] === 'dir'
				? ''
				: (window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')] += parseInt(e.split(' ')[0]))
		)
		.map((e, i) => (i === 0 ? Array(window.dirStack.length).fill(0) : Object.keys(window.dirSizes)))
		.slice(0, 3)
		.map((e, i) =>
			i === 0
				? e.forEach(
						(_) =>
							(window.dirSizes[window.dirStack.slice(0, -1).reduce((a, b) => a + '/' + b, '')] +=
								window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')]) | window.dirStack.pop()
				  )
				: e
		)
		.slice(1)
		.map((a) => a.map((b) => window.dirSizes[b]).sort((a, b) => a - b))
		.map((e, i) => (i === 0 ? (window.neededSpace = 30000000 - 70000000 + e[e.length - 1]) : e))[1]
		.find((a) => a > window.neededSpace)
);
