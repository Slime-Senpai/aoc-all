const fs = require('fs');

const inputText = fs.readFileSync('./day11_input_part2.txt', { encoding: 'utf-8' });

const firstRequirement = (password) => {
	for (let i = 2; i < password.length; i++) {
		if (password.charCodeAt(i - 2) + 1 === password.charCodeAt(i - 1) && password.charCodeAt(i - 2) + 2 === password.charCodeAt(i)) {
			return true;
		}
	}

	return false;
};

const thirdRequirement = (password) => {
	let nbPairs = 0;
	for (let i = 1; i < password.length; i++) {
		if (password.charAt(i) === password.charAt(i - 1)) {
			i++;
			if (++nbPairs > 1) {
				return true;
			}
		}
	}

	return false;
};

const goodAlphabet = 'abcdefghjkmnpqrstuvwxyz';

let currentPassword = inputText;
while (!firstRequirement(currentPassword) || !thirdRequirement(currentPassword)) {
	let newPassword = '';
	let changeNext = true;
	for (let i = currentPassword.length - 1; i >= 0; --i) {
		if (!changeNext) {
			newPassword = currentPassword[i] + newPassword;
			continue;
		}
		let indexOfNewLetter = goodAlphabet.indexOf(currentPassword[i]) + 1;
		if (indexOfNewLetter === goodAlphabet.length) {
			indexOfNewLetter = 0;
			changeNext = true;
		} else {
			changeNext = false;
		}
		newPassword = goodAlphabet[indexOfNewLetter] + newPassword;
	}
	currentPassword = newPassword;
}

console.log(currentPassword);
