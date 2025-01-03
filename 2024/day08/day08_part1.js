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

function getAntinode(antenna1, antenna2, maxX = map.length, maxY = map.length) {
	const antinodesX = antenna1.x + antenna1.x - antenna2.x;
	const antinodesY = antenna1.y + antenna1.y - antenna2.y;

	if (antinodesX >= 0 && antinodesY >= 0 && antinodesX < maxX && antinodesY < maxY) {
		return {
			y: antinodesY,
			x: antinodesX
		};
	}

	return null;
}

const antinodes = new Set();

for (const [char, antennasForFrequency] of antennas.entries()) {
	antennasForFrequency.forEach((antenna, i, arr) => {
		const antennasToCheck = arr.slice(i + 1);

		for (const antennaToCheck of antennasToCheck) {
			const antinodesOfAntennas = [getAntinode(antenna, antennaToCheck), getAntinode(antennaToCheck, antenna)].filter((e) => e);

			antinodesOfAntennas.forEach((e) => antinodes.add(e.y + '-' + e.x));
		}
	});
}

console.log(antinodes.size);
