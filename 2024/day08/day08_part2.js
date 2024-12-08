const fs = require('fs');

const inputText = fs.readFileSync('./day08_input.txt', { encoding: 'utf-8' });

const map = inputText.split('\n').map((e) => e.split(''));

const antennas = new Map();

for (let i = 0; i < map.length; i++) {
	const line = map[i];

	for (let j = 0; j < line.length; j++) {
		const char = line[j];

		if (char === '.') {
			continue;
		}

		if (!antennas.has(char)) {
			antennas.set(char, []);
		}

		antennas.get(char).push({
			char: char,
			y: i,
			x: j
		});
	}
}

function getAntinodes(antenna1, antenna2, maxX = map.length, maxY = map.length) {
	const diffX = antenna1.x - antenna2.x;
	const diffY = antenna1.y - antenna2.y;

	let currPos = {
		y: antenna1.y,
		x: antenna1.x
	};

	const antinodes = [];

	while (currPos.x >= 0 && currPos.y >= 0 && currPos.x < maxX && currPos.y < maxY) {
		antinodes.push({ ...currPos });
		currPos = {
			y: currPos.y + diffY,
			x: currPos.x + diffX
		};
	}
	return antinodes;
}

const antinodes = new Set();

for (const [char, antennasForFrequency] of antennas.entries()) {
	antennasForFrequency.forEach((antenna, i, arr) => {
		const antennasToCheck = arr.slice(i + 1);

		for (const antennaToCheck of antennasToCheck) {
			const antinodesOfAntennas = [...getAntinodes(antenna, antennaToCheck), ...getAntinodes(antennaToCheck, antenna)];

			antinodesOfAntennas.forEach((e) => antinodes.add(e.y + '-' + e.x));
		}
	});
}

console.log(antinodes.size);
