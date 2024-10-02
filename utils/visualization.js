// TODO width should be dynamic
// TODO colours should be different and taken from theme

import { SVG_NAMESPACE } from "../constants/charts.js";
import { COLORS } from "../constants/styles.js";

const getLine = ({ color, isDashed, x1, y1, x2, y2 }) => {
    const line = document.createElementNS(SVG_NAMESPACE, "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", color);
    if (isDashed) {
        line.setAttribute("stroke-dasharray", 4);
    }
    return line;
};

const getText = ({ contents, x, y }) => {
    const text = document.createElementNS(SVG_NAMESPACE, "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.innerHTML = contents;
    return text;
};

const generateSVGChart = ({ chartData, svgWidth }) => {
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

    const svgHeight = svgWidth / 1.5;
    const padding = 50;
    const chartWidth = svgWidth - padding * 2;
    const chartHeight = svgHeight - padding * 2;

    const scaleX = value => {
        return ((value - minXValue) / xRange) * chartWidth;
    };
    const scaleY = value => {
        return chartHeight - (value / maxYValue) * chartHeight;
    }

    const svg = document.createElementNS(SVG_NAMESPACE, "svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.setAttribute("xmlns", SVG_NAMESPACE);

    chartData.data.forEach(item => {
        const xValue = item[xLabel];

        if (xValue > minXValue) {
            const xTickLine = getLine({
                color: COLORS.gray,
                isDashed: true,
                x1: scaleX(xValue) + padding,
                y1: padding,
                x2: scaleX(xValue) + padding,
                y2: svgHeight - padding,
            });
            svg.appendChild(xTickLine);
        }

        const xTickText = getText({
            contents: xValue,
            x: scaleX(xValue) + padding,
            y: svgHeight - padding / 2
        });
        svg.appendChild(xTickText);
    });

    const drawnYTicks = {};

    yLabels.forEach((header, index) => {
        // TODO handle case of more than 5 lines
        const lineColor = COLORS.chart[index];
        let path = `M${scaleX(chartData.data[0][xLabel]) + padding},${scaleY(chartData.data[0][header]) + padding}`;
        for (let i = 1; i < chartData.data.length; i++) {
            const x = scaleX(chartData.data[i][xLabel]) + padding;
            const y = scaleY(chartData.data[i][header]) + padding;
            path += ` L${x},${y}`;

            if (!drawnYTicks[y] && chartData.data[i][header] !== 0) {
                const yTickLine = getLine({
                    color: COLORS.gray,
                    isDashed: true,
                    x1: padding,
                    y1: y,
                    x2: svgWidth - padding,
                    y2: y,
                });
                const yTickText = getText({
                    contents: chartData.data[i][header],
                    x: padding / 2,
                    y,
                });
                svg.appendChild(yTickLine);
                svg.appendChild(yTickText);
                drawnYTicks[y] = true;
            }
        }

        const pathElement = document.createElementNS(SVG_NAMESPACE, "path");
        pathElement.setAttribute("d", path);
        pathElement.setAttribute("fill", "none");
        pathElement.setAttribute("stroke", lineColor);
        pathElement.setAttribute("stroke-width", "2");
        svg.appendChild(pathElement);
    });

    const xAxis = getLine({
        color: COLORS.gray,
        x1: padding,
        y1: svgHeight - padding,
        x2: svgWidth - padding,
        y2: svgHeight - padding
    });
    svg.appendChild(xAxis);

    const yAxis = getLine({
        color: COLORS.gray,
        x1: padding,
        y1: padding,
        x2: padding,
        y2: svgHeight - padding
    });
    svg.appendChild(yAxis);

    return svg;
};

export { generateSVGChart };
