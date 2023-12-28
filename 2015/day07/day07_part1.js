const fs = require('fs');

const inputText = fs.readFileSync('./day07_example.txt', { encoding: 'utf-8' });

const wires = inputText.split('\n').map((e) => {
	const [instruction, exitNode] = e.split(' -> ');
});
