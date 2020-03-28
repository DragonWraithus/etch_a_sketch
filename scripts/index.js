// Please edit the typescript file, index.js should not be edited directly.
"use strict";
var _a, _b;
const gridContainer = document.querySelector('div');
const resetBtn = document.querySelector('.reset');
const setSidesBtn = document.querySelector('.squares');
const sideLength = 960;
let gridSideCount = 16;
let squareSize = String(sideLength / gridSideCount) + 'px';
function createGrid(gridSideLength) {
    var _a;
    let grid = [];
    for (let row = 0; row < gridSideLength; row++) {
        grid.push([]);
        const divRow = createDiv(gridContainer, 'row', '100%', squareSize);
        for (let col = 0; col < gridSideLength; col++) {
            grid[row].push({ brightness: 10, ...genRGB() });
            const divCol = createDiv(divRow, 'col', (squareSize), squareSize);
            (_a = divCol) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseenter', (e) => {
                grid[row][col].brightness--;
                divCol.style.background = rgbToString(grid[row][col]);
            });
        }
    }
}
(_a = resetBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const divCols = document.querySelectorAll('.col');
    cleanBoard(gridSideCount);
});
(_b = setSidesBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
    do {
        gridSideCount = Number(prompt("How many squares per side?"));
    } while (gridSideCount == NaN && gridSideCount <= 0);
    cleanBoard(gridSideCount);
});
function cleanBoard(gridSideCount) {
    squareSize = String(sideLength / gridSideCount) + 'px';
    removeChildren(gridContainer);
    createGrid(gridSideCount);
}
function createDiv(currentNode, nodeId, nodeWidth, nodeHeight) {
    const div = document.createElement('div');
    div.setAttribute('class', nodeId);
    div.setAttribute('style', `
		width: ${nodeWidth}; 
		height: ${nodeHeight};`);
    currentNode.appendChild(div);
    return div;
}
function removeChildren(node) {
    Array.from(node.children).forEach(child => node.removeChild(child));
}
function genRGB() {
    // random number between 0 and 256.
    let gen256 = () => Math.floor(Math.random() * 256);
    return {
        red: gen256(),
        green: gen256(),
        blue: gen256(),
    };
}
function rgbToString(square) {
    let dim = (color) => (square.brightness / 10) * color;
    return `rgb(${dim(square.red)}, ${dim(square.green)}, ${dim(square.blue)})`;
}
createGrid(gridSideCount);
