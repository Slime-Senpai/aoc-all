const fs = require('fs');

const inputText = fs.readFileSync('./day06_input.txt', { encoding: 'utf-8' });

const regex = /(.*) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/;

const instructions = inputText.split('\n').map((e) => {
	const match = e.match(regex);

	return {
		instruction: match[1],
		topLeftCorner: [+match[2], +match[3]],
		bottomRightCorner: [+match[4], +match[5]],
	};
});

const map = new Array(1000).fill(0).map((_) => new Array(1000).fill(0));

for (const current of instructions) {
	switch (current.instruction) {
		case 'turn off':
			handleTurnOff(current);
			break;
		case 'turn on':
			handleTurnOn(current);
			break;
		case 'toggle':
			handleToggle(current);
			break;
	}
}

console.log(map.reduce((a, b) => a + b.reduce((c, d) => c + d), 0));

function handleTurnOff(current) {
	for (let i = current.topLeftCorner[0]; i <= current.bottomRightCorner[0]; ++i) {
		for (let j = current.topLeftCorner[1]; j <= current.bottomRightCorner[1]; j++) {
			map[i][j] = Math.max(0, map[i][j] - 1);
		}
	}
}

function handleTurnOn(current) {
	for (let i = current.topLeftCorner[0]; i <= current.bottomRightCorner[0]; ++i) {
		for (let j = current.topLeftCorner[1]; j <= current.bottomRightCorner[1]; j++) {
			map[i][j] += 1;
		}
	}
}

function handleToggle(current) {
	for (let i = current.topLeftCorner[0]; i <= current.bottomRightCorner[0]; ++i) {
		for (let j = current.topLeftCorner[1]; j <= current.bottomRightCorner[1]; j++) {
			map[i][j] += 2;
		}
	}
}
