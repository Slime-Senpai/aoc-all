const fs = require('fs');

const inputText = fs.readFileSync('./day09_input.txt', { encoding: 'utf-8' });

const filesAndSpaces = inputText.split('').map((e) => +e);

let currentForward = 0;

let currentIndex = 0;

let checksum = 0;
while (currentForward < filesAndSpaces.length) {
	const current = filesAndSpaces[currentForward];

	if (currentForward % 2 === 0) {
		// File
		const fileChecksum = sumOfNumbersFromXtoY(currentIndex, currentIndex + current) * (currentForward / 2);
		checksum += fileChecksum;

		currentIndex += current;
		currentForward++;
	} else {
		// Space
		const lastFileIndex = (filesAndSpaces.length - 1) / 2;
		const lastFileLength = filesAndSpaces.at(-1);

		const { spaceLeft, lastFileChecksum, nbSpacesUsed } = handleLastFile(currentIndex, current, lastFileLength, lastFileIndex);

		currentIndex += nbSpacesUsed;

		checksum += lastFileChecksum;

		if (spaceLeft > 0) {
			// Pop file
			filesAndSpaces.pop();
			// Pop space
			filesAndSpaces.pop();

			filesAndSpaces[currentForward] = spaceLeft;
		} else {
			currentForward++;
			filesAndSpaces[filesAndSpaces.length - 1] = lastFileLength - nbSpacesUsed;
		}
	}
}

console.log(checksum);

function handleLastFile(currentIndex, current, lastFileLength, lastFileIndex) {
	const nbSpacesUsed = Math.min(current, lastFileLength);

	const spaceLeft = current - nbSpacesUsed;

	const lastFileChecksum = sumOfNumbersFromXtoY(currentIndex, currentIndex + nbSpacesUsed) * lastFileIndex;

	return {
		spaceLeft,
		lastFileChecksum,
		nbSpacesUsed
	};
}

function sumOfNumbersFromXtoY(x, y) {
	const sum = (y - x) * ((x + y - 1) / 2);

	return sum;
}
