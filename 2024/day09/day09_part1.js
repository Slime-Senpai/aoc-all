const fs = require('fs');

const inputText = fs.readFileSync('./day09_example.txt', { encoding: 'utf-8' });

const filesAndSpaces = inputText.split('').map((e) => +e);

let currentForward = 0;
let currentBackwards = filesAndSpaces.length - 1;

let currentIndex = 0;

let checksum = 0;
while (currentForward < filesAndSpaces.length) {
	const current = filesAndSpaces[currentForward];

	if (currentForward % 2 === 0) {
		// File
		checksum += sumOfNumbersFromXtoY(currentIndex, currentIndex + current) * current;
		currentIndex += current;
	} else {
		// Space
		const lastFileLength = filesAndSpaces[currentBackwards];

		if (isConsumed) {
			const newLast = filesAndSpaces[currentBackwards];
		}
	}
}

function handleLastFile(currentIndex, current, lastFileLength) {
	const isConsumed = current >= lastFileLength;

	const afterConsume = current - lastFileLength;

	const checksum = sumOfNumbersFromXtoY();

	if (isConsumed) {
		filesAndSpaces.pop();
		currentBackwards--;
	} else {
	}

	return {
		isConsumed,
		afterConsume,
		checksum,
		newIndex: currentIndex + lastFileLength - afterConsume
	};
}

function sumOfNumbersFromXtoY(x, y) {
	return (y - x) * ((x + y) / 2);
}
