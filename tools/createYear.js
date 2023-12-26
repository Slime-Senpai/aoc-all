const fs = require('fs');

if (process.argv.length !== 3 || process.argv[2].length != 4 || isNaN(+process.argv[2]) || +process.argv[2] < 2015) {
	console.log('Usage:', process.argv[0].split('\\').pop(), process.argv[1].split('\\').pop(), '[YYYY > 2014]');

	return -1;
}

const year = process.argv[2];

const templateData = `const fs = require('fs');

const inputText = fs.readFileSync('./{{inputFile}}', { encoding: 'utf-8' });`;

const pathToYearFolder = '../' + year;

if (fs.existsSync(pathToYearFolder)) {
	console.log('Folder already exist, please choose another year.');

	return -1;
}

fs.mkdirSync(pathToYearFolder);

for (let i = 1; i < 26; i++) {
	// Create the day folder
	const dayNumber = String(i).padStart(2, '0');
	const pathToDay = pathToYearFolder + '/day' + dayNumber;
	fs.mkdirSync(pathToDay);

	// Create the empty input file
	fs.writeFileSync(`${pathToDay}/day${dayNumber}_input.txt`, '', { encoding: 'utf-8' });

	// Create the empty example file
	fs.writeFileSync(`${pathToDay}/day${dayNumber}_example.txt`, '', { encoding: 'utf-8' });

	// Create the base template for the part1
	fs.writeFileSync(`${pathToDay}/day${dayNumber}_part1.js`, templateData.replace('{{inputFile}}', `day${dayNumber}_example.txt`), {
		encoding: 'utf-8'
	});
}

console.log('DONE');
