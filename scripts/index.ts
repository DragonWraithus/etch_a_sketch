// Please edit the typescript file, index.js should not be edited directly.
"use strict"
const gridContainer = document.querySelector('div')!;
const resetBtn = document.querySelector('.reset')!;
const setSidesBtn = document.querySelector('.squares')!;
const sideLength: number = 960;
let gridSideCount: number = 16;
let squareSize: string = String(sideLength / gridSideCount) + 'px';

function createGrid(gridSideLength: number) {
	let grid: Array<Array<any>> = [];

	for (let row = 0; row < gridSideLength; row++) {
		grid.push([]);
		const divRow = createDiv(gridContainer, 'row', '100%', squareSize);
		for (let col = 0; col < gridSideLength; col++) {
			grid[row].push({brightness: 10, ...genRGB()});
			const divCol = createDiv(divRow, 'col', (squareSize), squareSize);
			divCol?.addEventListener('mouseenter', (e: any) => {
				grid[row][col].brightness--;
				divCol.style.background = rgbToString(grid[row][col]);
			});
		}
	}
}

resetBtn?.addEventListener('click', () => {
	const divCols = document.querySelectorAll('.col');
	cleanBoard(gridSideCount);
});

setSidesBtn?.addEventListener('click', (e) => {
	do {
		gridSideCount = Number(prompt("How many squares per side?"));
	} while (gridSideCount == NaN && gridSideCount <= 0)

	cleanBoard(gridSideCount);
});

function cleanBoard(gridSideCount: number){
	squareSize = String(sideLength / gridSideCount) + 'px';
	removeChildren(gridContainer);
	createGrid(gridSideCount);
}

function createDiv(currentNode: HTMLDivElement, nodeId: string, nodeWidth: string, nodeHeight: string) {
	const div = document.createElement('div');

	div.setAttribute('class', nodeId);
		div.setAttribute('style', `
		width: ${nodeWidth}; 
		height: ${nodeHeight};`
	);

	currentNode.appendChild(div);
	return div;
}

function removeChildren(node: HTMLDivElement) {
	Array.from(node.children).forEach(child => node.removeChild(child));
}

function genRGB() {
	// Random number between 0 and 256.
	let gen256 = () => Math.floor(Math.random() * 256);

	// Return an rgb object.
	return {
		red: gen256(),
		green: gen256(), 
		blue: gen256(),
	};
}

function rgbToString(square: any) {
	let dim = (color: number) => (square.brightness / 10) * color;
	return `rgb(${dim(square.red)}, ${dim(square.green)}, ${dim(square.blue)})`;
}

// TODO
// Add a save function.
// Add a color picker.

createGrid(gridSideCount);
