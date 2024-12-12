const fs = require('fs');

const inputText = fs.readFileSync('./day11_input.txt', { encoding: 'utf-8' });

const stones = inputText.split(' ');

const nbStoneCache = new Map();

const nbStones = stones.reduce((a, b) => {
	return a + getNbStones(+b, 75);
}, 0);

console.log(nbStones);

function getNbStones(startNumber, nbBlinks) {
	const key = startNumber + '-' + nbBlinks;
	if (nbStoneCache.has(key)) {
		return nbStoneCache.get(key);
	}

	let nbStone;

	if (nbBlinks === 0) {
		nbStone = 1;
	} else if (startNumber === 0) {
		nbStone = getNbStones(1, nbBlinks - 1);
	} else {
		const str = '' + startNumber;

		if (str.length % 2 === 0) {
			nbStone = getNbStones(+str.substring(0, str.length / 2), nbBlinks - 1) + getNbStones(+str.substring(str.length / 2), nbBlinks - 1);
		} else {
			nbStone = getNbStones(startNumber * 2024, nbBlinks - 1);
		}
	}

	nbStoneCache.set(key, nbStone);

	return nbStone;
}
