// Please edit the typescript file, index.js should not be edited directly.
"use strict";
const page = {
    gridContainer: document.querySelector('div'),
    resetBtn: document.querySelector('.reset'),
    setSidesBtn: document.querySelector('.squares'),
    colorPicker: document.querySelector('#color_picker'),
    colorResetBtn: document.querySelector('.color_reset'),
    sideLength: 600,
};
/* Model */
let grid = [];
let gridSideCount = 16;
let squareSize = String(page.sideLength / gridSideCount) + 'px';
let squareColor = '';
/* View */
page.colorPicker.addEventListener('change', watchColorPicker, false);
page.colorResetBtn.addEventListener('click', () => squareColor = '');
page.resetBtn.addEventListener('click', cleanBoard);
page.setSidesBtn.addEventListener('click', getSideLength);
function getSideLength() {
    do {
        gridSideCount = Number(prompt("How many squares per side?"));
    } while (gridSideCount == NaN && gridSideCount <= 0);
    cleanBoard();
}
function cleanBoard() {
    squareSize = String(page.sideLength / gridSideCount) + 'px';
    removeChildren(page.gridContainer);
    createGrid(gridSideCount);
}
function watchColorPicker(event) {
    squareColor = event.target.value;
}
// Bypass default listener arguments.
function mouseenterEventOn(square) {
    var _a;
    (_a = square.div) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseenter', () => {
        square.b_rgb.brightness--;
        if (squareColor) {
            square.div.style.background = String(squareColor);
        }
        else {
            square.div.style.background = rgbToString(square.b_rgb);
        }
    });
}
function createDiv(currentNode, nodeId, nodeWidth) {
    const div = document.createElement('div');
    div.setAttribute('class', nodeId);
    div.setAttribute('style', `
		width: ${nodeWidth}; 
		height: ${squareSize};`);
    currentNode.appendChild(div);
    return div;
}
function removeChildren(node) {
    Array.from(node.children).forEach(child => node.removeChild(child));
}
/* Controller */
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
function rgbToString(b_rgb) {
    let dim = (color) => (b_rgb.brightness / 10) * color;
    return `rgb(${dim(b_rgb.red)}, ${dim(b_rgb.green)}, ${dim(b_rgb.blue)})`;
}
function createGrid(gridSideLength) {
    grid = [];
    for (let row = 0; row < gridSideLength; row++) {
        grid.push([]);
        const divRow = createDiv(page.gridContainer, 'row', '100%');
        for (let col = 0; col < gridSideLength; col++) {
            const divSquare = createDiv(divRow, 'col', squareSize);
            grid[row].push({ div: divSquare, b_rgb: { brightness: 10, ...genRGB() } });
            mouseenterEventOn(grid[row][col]);
        }
    }
}
createGrid(gridSideCount);
