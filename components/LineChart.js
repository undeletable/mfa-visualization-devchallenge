import { COLORS, GLOBAL_CLASSNAMES } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";
import {
    getChartData,
    handleChartPNGExport,
    handleChartPrint,
    handleChartSVGExport,
    handleDotTooltipDisplay,
    handleDotTooltipHide,
    handleLineTooltipDisplay,
    handleLineTooltipHide
} from "../state/state.js";
import { exportPNG, exportSVG, printSVG } from "../utils/export.js";
import { generateSVGChart } from "../utils/visualization.js";

class LineChart extends WebComponent {
    chartContainerId = "chart-container";

    chartContainerClassName = "chart-container";

    tooltipId = "chart-tooltip";

    tooltipClassName = "chart-tooltip";

    showTooltip(contents) {
        const tooltipElement = this.getElement(this.tooltipId);
        tooltipElement.classList.remove(GLOBAL_CLASSNAMES.hidden);
        tooltipElement.innerHTML = contents;
    }

    positionTooltip({ leftPosition, topPosition }) {
        const tooltipElement = this.getElement(this.tooltipId);
        tooltipElement.style.left = `${leftPosition}px`;
        tooltipElement.style.top = `${topPosition}px`;
    }

    hideTooltip() {
        const tooltipElement = this.getElement(this.tooltipId);
        tooltipElement.classList.add(GLOBAL_CLASSNAMES.hidden);
    }

    onConnected() {
        const chartContainerElement = this.getElement(this.chartContainerId);
        const svgWidth = chartContainerElement.clientWidth;
        const chartData = getChartData();
        const svg = generateSVGChart({
            chartData,
            svgWidth
        });
        chartContainerElement.appendChild(svg);
        handleChartSVGExport(() => exportSVG(svg));
        handleChartPNGExport(() => exportPNG(svg));
        handleChartPrint(() => printSVG(svg));
        
        const tooltipElement = this.getElement(this.tooltipId);
        
        const showTooltip = ({ contents, leftPosition, topPosition }) => {
            tooltipElement.style.left = `${leftPosition}px`;
            tooltipElement.style.top = `${topPosition}px`;
            tooltipElement.innerHTML = contents;
            tooltipElement.classList.remove(GLOBAL_CLASSNAMES.hidden);
        }
    
        const hideTooltip = () => {
            tooltipElement.classList.add(GLOBAL_CLASSNAMES.hidden);
        };
        
        handleDotTooltipDisplay(({ leftPosition, topPosition, xLabel, xValue, yLabel, yValue }) => {
            showTooltip({
                contents:`
                    <chart-dot-tooltip
                        xLabel="${xLabel}"
                        xValue="${xValue}"
                        yLabel="${yLabel}"
                        yValue="${yValue}"
                    >
                    </chart-dot-tooltip>
                `,
                leftPosition,
                topPosition
            });
        });
        handleDotTooltipHide(hideTooltip);
        handleLineTooltipDisplay(({ label, leftPosition, topPosition }) => {
            showTooltip({
                contents: `<label>${label}</label>`,
                leftPosition,
                topPosition
            });
        });
        handleLineTooltipHide(hideTooltip);
    }

    // TODO add animations
    render() {
        return `
            <style>
                .${this.chartContainerClassName} {
                    width: 100%;
                }
                .${this.tooltipClassName} {
                    background-color: ${COLORS.gray};
                    border: 1px solid ${COLORS.primary};
                    padding: 5px;
                    position: absolute;
                }
            </style>
            <div class="${this.chartContainerId}" id="${this.chartContainerId}"></div>
            <div
                class="${GLOBAL_CLASSNAMES.textSmall} ${GLOBAL_CLASSNAMES.hidden} ${this.tooltipClassName}"
                id="${this.tooltipId}"
            ></div>
        `;
    }
}

export { LineChart };
