const fs = require('fs');

const inputText = fs.readFileSync('./day17_input.txt', { encoding: 'utf-8' });

const MAX_STEPS_IN_SAME_DIRECTION = 3;
const POSSIBLE_DIRECTIONS = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1]
];

class Step {
	/**
	 * @type {number}
	 */
	x;

	/**
	 * @type {number}
	 */
	y;

	/**
	 * @type {number}
	 */
	costToReach;

	/**
	 * @type {Map<string, number>}
	 */
	totalCostFromStart;

	/**
	 * @type {Map<string, number>}
	 */
	fScore;

	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} costToReach
	 */
	constructor(x, y, costToReach) {
		this.x = x;
		this.y = y;
		this.costToReach = costToReach;
		this.totalCostFromStart = new Map();
		this.fScore = new Map();
	}

	/**
	 * Updates the cost and the number of steps in the same direction if it is lower than the saved cost
	 * @param {number} newCost
	 * @param {number[]} direction The direction that the step is being accessed from
	 * @param {number} nbSteps The number of steps in the direction
	 * @returns true if the cost is lower, false otherwise
	 */
	maybeUpdate(newCost, direction, nbSteps) {
		const key = `${direction[0]}V${direction[1]}V${nbSteps}`;

		if (!this.totalCostFromStart.has(key)) {
			this.totalCostFromStart.set(key, newCost);

			return true;
		}

		if (this.totalCostFromStart.get(key) >= newCost) {
			this.totalCostFromStart.set(key, newCost);

			return true;
		}

		return false;
	}
}

const heatMap = inputText.split('\n').map((e, x) => e.split('').map((f, y) => new Step(x, y, +f)));

const startStep = heatMap[0][0];

const endStep = heatMap[heatMap.length - 1][heatMap[heatMap.length - 1].length - 1];

const openSet = [{ step: startStep, comingDirection: [-1, 0], nbSteps: 0 }];

const closedSet = [];

const cameFrom = new Map();

let totalCost = 0;
while (openSet.length > 0) {
	/**
	 * @type {{step: Step, comingDirection: number[], nbSteps: number}}
	 */
	const { step: currentStep, comingDirection: comingDirection, nbSteps: currentNbSteps } = openSet.shift();
	logger(currentStep);

	const currentKey = `${comingDirection[0]}V${comingDirection[1]}V${currentNbSteps}`;

	if (currentStep === endStep) {
		totalCost = currentStep.totalCostFromStart.get(currentKey);
		break;
	}

	for (const [i, j] of POSSIBLE_DIRECTIONS) {
		const neighborX = currentStep.x + i;
		const neighborY = currentStep.y + j;

		if (neighborX < 0 || neighborX >= heatMap.length || neighborY < 0 || neighborY >= heatMap[neighborX].length) {
			continue;
		}

		const direction = [i, j];

		// If direction is the same, nbSteps + 1, otherwise 1
		let nbSteps;
		if (!comingDirection || direction[0] !== comingDirection[0] || direction[1] !== comingDirection[1]) {
			nbSteps = 1;
		} else {
			nbSteps = currentNbSteps + 1;
		}

		if (nbSteps > MAX_STEPS_IN_SAME_DIRECTION) {
			continue;
		}

		const neighborStep = heatMap[neighborX][neighborY];

		logger('n', neighborX, neighborY, direction, nbSteps, neighborStep);

		if (
			closedSet.some(
				(e) => e.step === neighborStep && e.comingDirection[0] === direction[0] && e.comingDirection[1] === direction[1] && e.nbSteps === nbSteps
			)
		) {
			continue;
		}

		const startCost = currentStep.totalCostFromStart.get(currentKey) ? currentStep.totalCostFromStart.get(currentKey) : 0;

		if (neighborStep.maybeUpdate(startCost + neighborStep.costToReach, direction, nbSteps)) {
			const key = `${direction[0]}V${direction[1]}V${nbSteps}`;

			// we'll use the taxi driving as heuristic. It ignores the heatmap, but at least is admissible
			const fScore = neighborStep.totalCostFromStart.get(key) + Math.abs(endStep.x - neighborStep.x) + Math.abs(endStep.y - neighborStep.y);
			neighborStep.fScore.set(key, fScore);

			logger('f', fScore);

			if (
				openSet.some(
					(e) =>
						e.step === neighborStep && e.comingDirection[0] === direction[0] && e.comingDirection[1] === direction[1] && e.nbSteps === nbSteps
				)
			) {
				continue;
			}

			const index = openSet.findIndex((e) => e.step.fScore.get(`${e.comingDirection[0]}V${e.comingDirection[1]}V${e.nbSteps}`) > fScore);

			cameFrom.set(
				{ step: neighborStep, comingDirection: direction, nbSteps: nbSteps },
				{ step: currentStep, comingDirection: comingDirection, nbSteps: currentNbSteps }
			);

			if (index !== -1) {
				openSet.splice(index, 0, { step: neighborStep, comingDirection: direction, nbSteps: nbSteps });
			} else {
				openSet.push({ step: neighborStep, comingDirection: direction, nbSteps: nbSteps });
			}
		} else {
			logger('NOT UPDATED');
		}
	}
	closedSet.push({ step: currentStep, comingDirection: comingDirection, nbSteps: currentNbSteps });
}

function drawPath(endStep) {
	const path = new Array(heatMap.length).fill(0).map((e) => new Array(heatMap.length).fill('.'));
	let current = [...cameFrom.values()].find(
		(e) =>
			e.step === endStep.step &&
			e.direction[0] === endStep.direction[0] &&
			e.direction[1] === endStep.direction[1] &&
			e.nbSteps === endStep.nbSteps
	);
	while (cameFrom.has(current)) {
		const dxy = current.comingDirection[0] * 10 + current.comingDirection[1];
		let step = '#';
		switch (dxy) {
			case -10:
				step = '^';
				break;
			case 10:
				step = 'V';
				break;
			case 1:
				step = '>';
				break;
			case -1:
				step = '<';
				break;
		}
		path[current.step.x][current.step.y] = step;
		current = [...cameFrom.values()].find(
			(e) =>
				e.step === current.step &&
				e.direction[0] === current.direction[0] &&
				e.direction[1] === current.direction[1] &&
				e.nbSteps === current.nbSteps
		);
	}

	console.log('');
	console.log(path.map((e) => e.join('')).join('\n'));
	console.log('');
}

for (const [key, value] of endStep.totalCostFromStart) {
	const [dir0, dir1, nbSteps] = key.split('V');
	const direction = [dir0, dir1];

	drawPath({ step: endStep, comingDirection: direction, nbSteps: nbSteps });
}

//drawPath(endStep);

console.log(totalCost);
console.log(endStep);

function logger(...logs) {
	//console.log(...logs);
}
