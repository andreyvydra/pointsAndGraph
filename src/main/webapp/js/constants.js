// Constants for x, y, r
export const xValues = [5., 4., 3., 2., 1., 0., -1., -2., -3.];
export const [yMin, yMax] = [-5., 3.];
export const [rMin, rMax] = [1., 4.];

// Constants for notifications
export const autoClose = true;
export const timeout = 5000;
export const errorStatus = "error";
export const warningStatus = "warning"

// Constants for pagination
export const minPageCount = 5;

// graph
export const graphTop = 0;
export const graphBottom = 10;
export const graphLeft = 0;
export const graphRight = 10;
export const centerX = (graphRight + graphLeft) / 2
export const centerY = (graphTop + graphBottom) / 2
export const cellCount = 10
export const cellSize = (graphRight - graphLeft) / cellCount
export const lineWidth = 0.04;
export const padding = 0.2;

// Json returned point
export const xField = "x";
export const yField = "y";
export const rField = "r";
export const inAreaField = "inArea";
export const calcTimeField = "calculationTime";
export const dateTimeField = "calculatedAt";