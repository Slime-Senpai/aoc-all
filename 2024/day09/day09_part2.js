const fs = require('fs');

const inputText = fs.readFileSync('./day09_input.txt', { encoding: 'utf-8' });

const filesAndSpaces = inputText.split('').map((e, i) => ({
	spaceUsed: +e,
	type: i % 2 === 0 ? 'F' : 'S',
	index: i
}));

const files = filesAndSpaces.filter((e) => e.type === 'F');

for (let i = files.length - 1; i >= 0; i--) {
	const lastFile = files[i];

	const indexToMove = filesAndSpaces.findIndex((e) => e.type === 'S' && e.spaceUsed >= lastFile.spaceUsed && e.index < lastFile.index);

	if (indexToMove !== -1) {
		const spaceToMove = filesAndSpaces[indexToMove];

		const newSpace = {
			spaceUsed: spaceToMove.spaceUsed - lastFile.spaceUsed,
			type: 'S',
			index: spaceToMove.index
		};

		const newFile = {
			spaceUsed: lastFile.spaceUsed,
			type: 'F',
			index: lastFile.index
		};

		filesAndSpaces.splice(indexToMove, 1, newFile, newSpace);

		// We don't need to merge the space because we'll be checking from left to right once, so there is no risk of a file opening up a new slot for another file
		files[i].type = 'S';
	}
}

let currentIndex = 0;
let checksum = 0;
for (const fileOrSpace of filesAndSpaces) {
	if (fileOrSpace.type === 'S') {
		currentIndex += fileOrSpace.spaceUsed;

		continue;
	}

	const fileChecksum = sumOfNumbersFromXtoY(currentIndex, currentIndex + fileOrSpace.spaceUsed) * (fileOrSpace.index / 2);

	checksum += fileChecksum;

	currentIndex += fileOrSpace.spaceUsed;
}

console.log(checksum);

function sumOfNumbersFromXtoY(x, y) {
	const sum = (y - x) * ((x + y - 1) / 2);

	return sum;
}
