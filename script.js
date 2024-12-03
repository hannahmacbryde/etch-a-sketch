const gridContainer = document.getElementById("grid-container");
let currentSize = 16;
let isDrawing = false; 

const clearBtn = document.getElementById('clearBtn');
clearBtn.onclick = () => reloadGrid();

const resizeBtn = document.getElementById("resizeBtn");

function createGrid(size) {
    gridContainer.innerHTML = ''; // Clear existing grid
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  
    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.addEventListener("mousedown", startDrawing);
        gridItem.addEventListener("mousemove", draw);
        gridItem.addEventListener("mouseup", stopDrawing);
        gridContainer.appendChild(gridItem);
    }
}

// Start drawing when mouse is pressed
function startDrawing(e) {
    isDrawing = true;
    changeColor(e);
}

// Draw only if the mouse is held down
function draw(e) {
    if (isDrawing) {
        changeColor(e);
    }
}

// Stop drawing when mouse is released
function stopDrawing() {
    isDrawing = false;
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function changeColor(e) {
  e.target.style.backgroundColor = getRandomColor();
}

function setGridSize() {
    let newSize = parseInt(prompt("Enter the number of squares per side (max 100):"));
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
      alert("Invalid input! Please enter a number between 1 and 100.");
      return;
    }
    currentSize = newSize;
    createGrid(currentSize);
}
  
function reloadGrid() {
  createGrid(currentSize);
}
  
resizeBtn.addEventListener("click", setGridSize);
clearBtn.addEventListener("click", reloadGrid);

createGrid(currentSize);

gridContainer.addEventListener("mouseleave", stopDrawing);