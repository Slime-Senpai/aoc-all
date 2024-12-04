const fs = require('fs');

const inputText = fs.readFileSync('./day12_input.txt', { encoding: 'utf-8' });

const grid = inputText.split('\n').map((e) => e.split(''));

const start = {
	x: -1,
	y: -1,
	effort: 0
};

for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j < grid[i].length; j++) {
		if (grid[i][j] == 'S') {
			start.x = j;
			start.y = i;
			break;
		}
	}
	if (start.x !== -1) {
		break;
	}
}

grid[start.y][start.x] = 'a';

let possibleAStarts = [];

for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j < grid[i].length; j++) {
		if (grid[i][j] == 'a') {
			possibleAStarts.push({
				x: j,
				y: i,
				effort: 0
			});
			break;
		}
	}
}

let possibleMoves = [];

possibleMoves.push(start);

let visitedSquares = [];

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

let effortNeeded = 0;

let possibleAnswers = [];

while (possibleAStarts.length > 0) {
	possibleMoves = [];
	possibleMoves.push(possibleAStarts.pop());
	visitedSquares = [];
	effortNeeded = 0;

	possibleAnswers.push(compute());
}

console.log(possibleAnswers.sort((a, b) => a - b)[0]);

function compute() {
	while (possibleMoves.length > 0) {
		const moveToTry = possibleMoves.shift();

		visitedSquares.push(moveToTry);

		const squaresToVisit = [
			{ x: moveToTry.x - 1, y: moveToTry.y },
			{ x: moveToTry.x + 1, y: moveToTry.y },
			{ x: moveToTry.x, y: moveToTry.y - 1 },
			{ x: moveToTry.x, y: moveToTry.y + 1 }
		].filter((a) => a.x > -1 && a.x < grid[moveToTry.y].length && a.y > -1 && a.y < grid.length);

		for (let squareToVisit of squaresToVisit) {
			if (visitedSquares.find((a) => a.x === squareToVisit.x && a.y === squareToVisit.y) !== undefined) {
				continue;
			}

			if (possibleMoves.find((a) => a.x === squareToVisit.x && a.y === squareToVisit.y) !== undefined) {
				continue;
			}

			if (grid[squareToVisit.y][squareToVisit.x] === 'E' && 'yz'.indexOf(grid[moveToTry.y][moveToTry.x]) === -1) {
				continue;
			}

			if (alphabet.indexOf(grid[squareToVisit.y][squareToVisit.x]) > alphabet.indexOf(grid[moveToTry.y][moveToTry.x]) + 1) {
				continue;
			}

			if (grid[squareToVisit.y][squareToVisit.x] === 'E') {
				effortNeeded = moveToTry.effort + 1;

				return effortNeeded;
			}

			possibleMoves.push({
				x: squareToVisit.x,
				y: squareToVisit.y,
				effort: moveToTry.effort + 1
			});
		}
	}
}
