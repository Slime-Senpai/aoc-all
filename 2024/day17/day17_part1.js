const fs = require('fs');

const inputText = fs.readFileSync('./day17_input.txt', { encoding: 'utf-8' });

const regex = /Register A: (\d+)\nRegister B: (\d+)\nRegister C: (\d+)\n\nProgram: ((?:\d+,)+)/;

const match = inputText.match(regex);

const baseRegistrars = [+match[1], +match[2], +match[3]];
let registrars = [...baseRegistrars];

const instructions = match[4].split(',').map((e) => +e);

const getValueFromCombo = (operand) => {
	if (operand > 3) {
		return registrars[operand - 4];
	}

	return operand;
};

let ptr = 0;

let out = [];

const opcodes = [
	{
		// adv
		run: (operand) => {
			const value = getValueFromCombo(operand);
			registrars[0] = registrars[0] >> value;

			ptr += 2;
		}
	},
	{
		// bxl
		run: (operand) => {
			registrars[1] = registrars[1] ^ operand;

			ptr += 2;
		}
	},
	{
		// bst
		run: (operand) => {
			const value = getValueFromCombo(operand);
			registrars[1] = value % 8;

			ptr += 2;
		}
	},
	{
		// jnz
		run: (operand) => {
			if (registrars[0] === 0) {
				ptr += 2;

				return;
			}

			ptr = operand;
		}
	},
	{
		// bxc
		run: (operand) => {
			registrars[1] = registrars[1] ^ registrars[2];

			ptr += 2;
		}
	},
	{
		// out
		run: (operand) => {
			const value = getValueFromCombo(operand);

			out.push(value % 8);

			ptr += 2;
		}
	},
	{
		// bdv
		run: (operand) => {
			const value = getValueFromCombo(operand);
			registrars[1] = registrars[0] >> value;

			ptr += 2;
		}
	},
	{
		// cdv
		run: (operand) => {
			const value = getValueFromCombo(operand);
			registrars[2] = registrars[0] >> value;

			ptr += 2;
		}
	}
];

let curr = 0;

while (out.length !== instructions.length || out.some((e, i) => instructions[i] !== e)) {
	ptr = 0;
	registrars = [curr++, baseRegistrars[1], baseRegistrars[2]];
	out = [];

	while (ptr < instructions.length) {
		const instruction = instructions[ptr];
		const operand = instructions[ptr + 1];

		opcodes[instruction].run(operand);

		if (out.some((e, i) => instructions[i] !== e)) {
			break;
		}
	}

	console.log(curr, out);
}

console.log(curr - 1);
