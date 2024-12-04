const fs = require('fs');

const inputText = fs.readFileSync('./day09_input.txt', { encoding: 'utf-8' });

// HACK for nodejs, we'll define window
let window = {};

console.log(
	inputText
		.split('\n')
		.flatMap((e, i) => (i === 0 ? [e, e] : e))
		.map((e) => [e.split(' ')[0], parseInt(e.split(' ')[1])])
		.map((e, i, arr) =>
			i === 0
				? (window.obj = {
						knots: Array(10)
							.fill()
							.map((_) => {
								return { x: 0, y: 0 };
							}),
						visited: Array(10)
							.fill()
							.map((_) => new Set()),
						increment: function (isX, n) {
							Array(10)
								.fill(0)
								.map((_, knotIndex) =>
									knotIndex === 0
										? isX
											? (this.knots[knotIndex].x += n)
											: (this.knots[knotIndex].y += n)
										: Array(2)
												.fill(0)
												.forEach((_) =>
													this.distTooFar(knotIndex)
														? Array(3)
																.fill(0)
																.forEach((_, i) =>
																	i === 0
																		? (this.knots[knotIndex].x =
																				this.knots[knotIndex].x +
																				Math.min(Math.max(this.knots[knotIndex - 1].x - this.knots[knotIndex].x, -1), 1))
																		: i === 1
																		? (this.knots[knotIndex].y =
																				this.knots[knotIndex].y +
																				Math.min(Math.max(this.knots[knotIndex - 1].y - this.knots[knotIndex].y, -1), 1))
																		: this.visited[knotIndex].add(this.knots[knotIndex].x + '-' + this.knots[knotIndex].y)
																)
														: ''
												)
								);
						},
						distTooFar: function (knotIndex) {
							return (
								Math.abs(this.knots[knotIndex - 1].x - this.knots[knotIndex].x) > 1 ||
								Math.abs(this.knots[knotIndex - 1].y - this.knots[knotIndex].y) > 1
							);
						}
				  })
				: Array(e[1])
						.fill(0)
						.forEach((_) =>
							e[0] === 'L'
								? window.obj.increment(true, -1)
								: e[0] === 'R'
								? window.obj.increment(true, 1)
								: e[0] === 'U'
								? window.obj.increment(false, 1)
								: window.obj.increment(false, -1)
						)
		)
		.reduce((a, b) => window.obj.visited[window.obj.visited.length - 1].size + 1)
);
