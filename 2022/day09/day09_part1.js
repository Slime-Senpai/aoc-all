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
						h: { x: 0, y: 0 },
						t: { x: 0, y: 0 },
						visited: new Set(),
						increment: function (isX, n) {
							Array(2)
								.fill(0)
								.forEach((_, i) =>
									i === 0
										? isX
											? (this.h.x += n)
											: (this.h.y += n)
										: this.dist(isX) > 1
										? Array(3)
												.fill(0)
												.forEach((t, i) =>
													i === 0
														? isX
															? (this.t.x = this.h.x - n)
															: (this.t.x = this.h.x)
														: i === 1
														? isX
															? (this.t.y = this.h.y)
															: (this.t.y = this.h.y - n)
														: this.visited.add(this.t.x + '-' + this.t.y)
												)
										: ''
								);
						},
						dist: function (isX) {
							return Math.abs(isX ? this.h.x - this.t.x : this.h.y - this.t.y);
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
		.reduce((a, b) => window.obj.visited.size)
);
