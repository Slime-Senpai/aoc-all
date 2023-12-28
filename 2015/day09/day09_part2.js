const fs = require('fs');

const inputText = fs.readFileSync('./day09_input.txt', { encoding: 'utf-8' });

const regex = /(.*) to (.*) = (.*)/;

const roads = new Map();

const cities = [];

inputText.split('\n').forEach((e) => {
	const [, firstCity, secondCity, distance] = e.match(regex);

	const [sortedCity1, sortedCity2] = [firstCity, secondCity].sort();

	roads.set(sortedCity1 + '-' + sortedCity2, +distance);

	if (!cities.includes(firstCity)) {
		cities.push(firstCity);
	}
	if (!cities.includes(secondCity)) {
		cities.push(secondCity);
	}
});

const possibleFirstCities = [...cities];

let currentSteps = possibleFirstCities.map((e) => {
	return { currentCity: e, distance: 0, remainingCities: possibleFirstCities.filter((f) => f !== e) };
});

for (let i = 0; i < cities.length; ++i) {
	let newSteps = [];
	for (const step of currentSteps) {
		for (const nextCity of step.remainingCities) {
			const [sortedCity1, sortedCity2] = [step.currentCity, nextCity].sort();
			const remainingCities = step.remainingCities.filter((e) => e != nextCity);
			newSteps.push({
				currentCity: nextCity,
				distance: step.distance + roads.get(sortedCity1 + '-' + sortedCity2),
				remainingCities: remainingCities
			});
		}
	}
	if (newSteps.length === 0) {
		break;
	}
	currentSteps = newSteps;
}

console.log(currentSteps.sort((a, b) => b.distance - a.distance)[0].distance);
