const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// distant (in pixels) between parallel grid lines
const scale = 100;

// the topleft corner of each obstacle point
const obstacles = [
  [1, 1],
  [2, 1],
  [3, 1],
  [3, 2],

  [1, 3],
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 4],
];

let whereUserClicked, whereMouseIs;
let gridWidth, gridHeight;

onWindowResize();
window.addEventListener('resize', onWindowResize);

canvas.addEventListener('click', ({ x, y }) => {
  whereUserClicked = whereUserClicked ? undefined : [x / scale, y / scale];
  drawEverything();
});

canvas.addEventListener('mousemove', ({ x, y }) => {
  whereMouseIs = [x / scale, y / scale];
  if (whereUserClicked) {
    drawEverything();
  }
});

function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.scale(scale, scale);
  ctx.font = `${0.54}px Arial`;
  
  gridWidth = canvas.width / scale;
  gridHeight = canvas.height / scale;

  drawEverything();
}

function drawGridLines() {
  ctx.strokeStyle = 'gray';
  ctx.lineWidth = 1 / scale / 2;

  // Draw vertical lines
  for (let x = 0; x < gridWidth; ++x) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, gridHeight);
    ctx.stroke();
  }

  // Draw horizontal lines
  for (let y = 0; y < gridHeight; ++y) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(gridWidth, y);
    ctx.stroke();
  }
}

function drawLine(x1, y1, x2, y2, color = 'rgb(200 0 0 / .6)') {
  ctx.strokeStyle = color;
  ctx.lineWidth = (1 / scale) * 3;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawPoint(x, y, color = 'rgb(0 128 0)') {
  ctx.beginPath();
  ctx.arc(x, y, 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawText(text, x, y, color = 'rgb(255 255 0 / .3)') {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function drawObstacle(x, y, color = 'purple') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

function drawEverything() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const [x, y] of obstacles) {
    drawObstacle(x, y);
  }
  drawGridLines();
  if (whereUserClicked) {
    if (whereMouseIs) {
      drawLine(...whereUserClicked, ...whereMouseIs);
      drawIntersections();
      drawPoint(...whereMouseIs);
    }
    drawPoint(...whereUserClicked);
  }
}

function vecDiff([x1, y1], [x2, y2]) {
  return [x1 - x2, y1 - y2];
}

function vecDistSqr([x1, y1], [x2, y2]) {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

function nextLatticePoint(x1, y1, dx, dy) {
  // calculations below are derived from
  // m = dy / dx
  // y - y1 = m (x - x1)
  // but due to the magic of javascript, it works even if dx = 0

  const m = dy / dx;

  const pointOnX = [dx > 0 ? Math.ceil(x1) : Math.floor(x1), NaN];
  pointOnX[1] = m * pointOnX[0] + (y1 - m * x1);

  const pointOnY = [NaN, dy > 0 ? Math.ceil(y1) : Math.floor(y1)];
  pointOnY[0] = (pointOnY[1] - y1) / m + x1;

  const distToX = vecDistSqr([x1, y1], pointOnX);
  const distToY = vecDistSqr([x1, y1], pointOnY);

  return distToX < distToY ? pointOnX : pointOnY;
}

function nextRepresentableNumber(num, direction) {
  return num + Math.sign(direction) * Math.abs(num) * Number.EPSILON;
}

function drawIntersections() {
  const intersectionObstacles = [];

  const [dx, dy] = vecDiff(whereMouseIs, whereUserClicked);
  
  let [x1, y1] = whereUserClicked;
  while (true) {
    [x1, y1] = nextLatticePoint(x1, y1, dx, dy);

    // if dx or dy changed signed, we've passed where mouse is, so we're done
    const [dxNow, dyNow] = vecDiff(whereMouseIs, [x1, y1]);
    const goneTooFar = Math.sign(dxNow) != Math.sign(dx) || Math.sign(dyNow) != Math.sign(dy);
    if (goneTooFar) {
      break;
    }
    
    // proceed a tiny bit from the lattice point into the center of the cell
    x1 = nextRepresentableNumber(x1, dx);
    y1 = nextRepresentableNumber(y1, dy);

    const xGridCell = Math.floor(x1);
    const yGridCell = Math.floor(y1);
    
    const isObstacle = !!obstacles.find(([x, y]) => x == xGridCell && y == yGridCell);
    if (isObstacle) {
      intersectionObstacles.push([xGridCell, yGridCell]);
    }
  }

  intersectionObstacles.forEach(([x, y], index) => {
    drawObstacle(x, y, 'rgb(255 255 0 / .3)');
    drawText(index.toString(), x + 0.05, y + 0.5, 'rgb(255 255 0 / .3)');
  });
}
