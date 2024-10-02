import { CHART_PADDING, STROKE_WIDTH, SVG_NAMESPACE } from "../constants/charts.js";
import { COLORS } from "../constants/styles.js";
import {
    displayDotTooltip,
    displayLineTooltip,
    hideDotTooltip,
    hideLineTooltip,
} from "../state/state.js";

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

const getXTickText = ({ contents, x, y }) => {
    const xTickText = getText({
        contents,
        x,
        y
    });

    xTickText.setAttribute("transform", `rotate(45 ${x} ${y})`);

    return xTickText;
};

const getCircle = ({ color, radius, x, y }) => {
    const circle = document.createElementNS(SVG_NAMESPACE, "circle");

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color);

    return circle;
};

const getDot = ({ color, x, xLabel, xValue, y, yLabel, yValue }) => {
    const dot = getCircle({
        color,
        radius: STROKE_WIDTH * 2,
        x,
        y
    });

    // TODO fix flickering
    dot.addEventListener("mouseenter", event => {
        displayDotTooltip({
            leftPosition: event.pageX,
            topPosition: event.pageY,
            xLabel,
            xValue,
            yLabel,
            yValue
        });
    });
    dot.addEventListener("mousemove", event => {
        displayDotTooltip({
            leftPosition: event.pageX,
            topPosition: event.pageY,
            xLabel,
            xValue,
            yLabel,
            yValue
        });
    });
    dot.addEventListener("mouseleave", () => {
        hideDotTooltip();
    });

    return dot;
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

    const svgHeight = Math.min(svgWidth / 1.5, window.innerHeight);
    const chartWidth = svgWidth - CHART_PADDING * 2;
    const chartHeight = svgHeight - CHART_PADDING * 2;

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

    const xAxis = getLine({
        color: COLORS.gray,
        x1: CHART_PADDING,
        y1: svgHeight - CHART_PADDING,
        x2: svgWidth - CHART_PADDING,
        y2: svgHeight - CHART_PADDING
    });
    svg.appendChild(xAxis);

    const yAxis = getLine({
        color: COLORS.gray,
        x1: CHART_PADDING,
        y1: CHART_PADDING,
        x2: CHART_PADDING,
        y2: svgHeight - CHART_PADDING
    });
    svg.appendChild(yAxis);

    chartData.data.forEach(item => {
        const xValue = item[xLabel];

        if (xValue > minXValue) {
            const xTickLine = getLine({
                color: COLORS.gray,
                isDashed: true,
                x1: scaleX(xValue) + CHART_PADDING,
                y1: CHART_PADDING,
                x2: scaleX(xValue) + CHART_PADDING,
                y2: svgHeight - CHART_PADDING,
            });
            svg.appendChild(xTickLine);
        }

        const xTickText = getXTickText({
            contents: xValue,
            x: scaleX(xValue) + CHART_PADDING,
            y: svgHeight - CHART_PADDING / 2
        });
        svg.appendChild(xTickText);
    });

    yLabels.forEach((header, index) => {
        // TODO handle case of more than 5 lines
        const lineColor = COLORS.chart[index];
        let path = "";

        for (let i = 0; i < chartData.data.length; i++) {
            const xValue = chartData.data[i][xLabel];
            const yValue = chartData.data[i][header];
            const x = scaleX(xValue) + CHART_PADDING;
            const y = scaleY(yValue) + CHART_PADDING;
            path += `${i === 0 ? "M" : " L"}${x},${y}`;

            const dot = getDot({
                color: lineColor,
                x,
                xLabel,
                xValue,
                y,
                yLabel: header,
                yValue
            });
            svg.appendChild(dot);
        }

        const pathElement = document.createElementNS(SVG_NAMESPACE, "path");
        pathElement.setAttribute("d", path);
        pathElement.setAttribute("fill", "none");
        pathElement.setAttribute("stroke", lineColor);
        pathElement.setAttribute("stroke-width", STROKE_WIDTH);
        
        // TODO fix flickering
        pathElement.addEventListener("mouseenter", event => {
            displayLineTooltip({
                leftPosition: event.pageX,
                topPosition: event.pageY,
                label: header
            });
        });
        pathElement.addEventListener("mousemove", event => {
            displayLineTooltip({
                leftPosition: event.pageX,
                topPosition: event.pageY,
                label: header
            });
        });
        pathElement.addEventListener("mouseleave", () => {
            hideLineTooltip();
        });

        svg.appendChild(pathElement);
    });

    return svg;
};

export { generateSVGChart };
