// TODO width should be dynamic
// TODO colours should be different and taken from theme

import { COLORS } from "../constants/styles.js";

// TODO add ticks
const generateSVGChart = chartData => {
    const xLabel = chartData.headers[0];
    const yLabels = chartData.headers.slice(1);
    const sortedChartData = chartData.data.toSorted((itemA, itemB) => {
        return itemA[xLabel] - itemB[xLabel];
    });
    const maxYValues = yLabels.map(header => {
        return Math.max(...sortedChartData.map(item => item[header] || 0));
    });
    const minXValue = sortedChartData[0][xLabel];
    const maxXValue = sortedChartData[sortedChartData.length - 1][xLabel];
    const xRange = maxXValue - minXValue;
    const maxYValue = Math.max(...maxYValues);

    const svgWidth = 600;
    const svgHeight = 400;
    const padding = 50;
    const chartWidth = svgWidth - padding * 2;
    const chartHeight = svgHeight - padding * 2;

    const scaleX = value => {
        return chartWidth - ((value - minXValue) / xRange) * chartWidth;
    };
    const scaleY = value => {
        return chartHeight - (value / maxYValue) * chartHeight;
    }

    // Create the SVG element
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.setAttribute("xmlns", svgNS);

    yLabels.forEach((header, index) => {
        // TODO handle case of more than 5 lines
        const lineColor = COLORS.chart[index];
        // Create the path for the line chart
        let path = `M${scaleX(chartData.data[0][xLabel]) + padding},${scaleY(chartData.data[0][header]) + padding}`;
        for (let i = 1; i < chartData.data.length; i++) {
            const x = scaleX(chartData.data[i][xLabel]) + padding;
            const y = scaleY(chartData.data[i][header]) + padding;
            path += ` L${x},${y}`;
        }

        const pathElement = document.createElementNS(svgNS, "path");
        pathElement.setAttribute("d", path);
        pathElement.setAttribute("fill", "none");
        pathElement.setAttribute("stroke", lineColor);
        pathElement.setAttribute("stroke-width", "2");
        svg.appendChild(pathElement);
    });

    // X-axis
    const xAxis = document.createElementNS(svgNS, "line");
    xAxis.setAttribute("x1", padding);
    xAxis.setAttribute("y1", svgHeight - padding);
    xAxis.setAttribute("x2", svgWidth - padding);
    xAxis.setAttribute("y2", svgHeight - padding);
    xAxis.setAttribute("stroke", COLORS.primary);
    svg.appendChild(xAxis);

    // Y-axis
    const yAxis = document.createElementNS(svgNS, "line");
    yAxis.setAttribute("x1", padding);
    yAxis.setAttribute("y1", padding);
    yAxis.setAttribute("x2", padding);
    yAxis.setAttribute("y2", svgHeight - padding);
    yAxis.setAttribute("stroke", COLORS.primary);
    svg.appendChild(yAxis);

    return svg;
};

export { generateSVGChart };
