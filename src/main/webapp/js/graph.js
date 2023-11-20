import * as c from "./constants";


export const canvas = document.getElementById("graph-canvas");
export const context = canvas.getContext("2d");
context.scale(25, 25);

export function addPoint(x, y) {
    context.fillStyle = "rgba(0, 0, 139, 0.8)";
    context.beginPath();
    context.arc(c.centerX + x, c.centerY - y, 0.1, 0, Math.PI * 2);
    context.fill();
}

export function updateGraph(r) {
    context.clearRect(c.graphLeft, c.graphTop, c.graphRight, c.graphBottom);
    if (r < c.rMax && r > c.rMin) {

        drawFigures(r);
        drawAxis();
        drawRLabels(r);
    }
}

function drawFigures(r) {
    drawCircle(r);
    context.fillRect(c.centerX - r, c.centerY - r, r, r);
    drawTriangle(r);
}

function drawCircle(r) {
    context.fillStyle = "rgba(138, 43, 226, 0.65)";
    context.beginPath();
    context.arc(c.centerX, c.centerY, r, 0, Math.PI * 2);
    context.fill();
    context.clearRect(c.centerX, c.centerY, -r, -r);
    context.clearRect(c.centerX, c.centerY, r, -r);
    context.clearRect(c.centerX, c.centerY, r, r);
}

function drawTriangle(r) {
    context.fillStyle = "rgba(138, 43, 226, 0.65)";
    context.beginPath();
    context.moveTo(c.centerX, c.centerY);
    context.lineTo(c.centerX + r / 2, c.centerY);
    context.lineTo(c.centerX, c.centerY - r / 2);
    context.fill();
}

function drawAxis() {
    drawXAxis();
    drawYAxis();
}

function drawXAxis() {
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.lineWidth = c.lineWidth;
    context.beginPath();
    context.moveTo(c.graphLeft, c.centerY);
    context.lineTo(c.graphRight, c.centerY);
    context.stroke();
    for (let i = 0; i <= c.cellCount; i++) {
        context.beginPath();
        context.moveTo(i * c.cellSize, c.centerY - c.padding);
        context.lineTo(i * c.cellSize, c.centerY + c.padding);
        context.stroke();
    }
}

function drawYAxis() {
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.beginPath();
    context.moveTo(c.centerX, c.graphTop);
    context.lineTo(c.centerX, c.graphBottom);
    context.stroke();
    for (let i = 0; i <= c.cellCount; i++) {
        context.beginPath();
        context.moveTo(c.centerX - c.padding, i * c.cellSize);
        context.lineTo(c.centerX + c.padding, i * c.cellSize);
        context.stroke();
    }
}

function drawRLabels(r) {
    // x
    context.font = "0.6px Arial"
    context.fillText("-R", c.centerX - r - 0.25, c.centerY + 0.7);
    context.fillText("R", c.centerX + r - 0.15, c.centerY + 0.7);

    // y
    context.fillText("R", c.centerX + 0.25, c.centerY - r + 0.15);
    context.fillText("-R", c.centerX + 0.25, c.centerY + r + 0.15);
}