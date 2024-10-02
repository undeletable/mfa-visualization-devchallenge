import { COLORS, GLOBAL_CLASSNAMES } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";
import { getChartData, handleChartPNGExport, handleChartSVGExport, handleDotTooltipDisplay, handleDotTooltipHide, handleDotTooltipPosition, handleLineTooltipDisplay, handleLineTooltipHide, handleLineTooltipPosition } from "../state/state.js";
import { exportPNG, exportSVG } from "../utils/export.js";
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
        handleDotTooltipDisplay(({ xLabel, xValue, yLabel, yValue }) => {
            this.showTooltip(`
                <chart-dot-tooltip
                    xLabel="${xLabel}"
                    xValue="${xValue}"
                    yLabel="${yLabel}"
                    yValue="${yValue}"
                >
                </chart-dot-tooltip>
            `);
        });
        handleDotTooltipPosition(({ leftPosition, topPosition }) => {
            this.positionTooltip({
                leftPosition,
                topPosition
            });
        });
        handleDotTooltipHide(this.hideTooltip);
        handleLineTooltipDisplay(label => {
            this.showTooltip(`<label>${label}</label>`);
        });
        handleLineTooltipPosition(({ leftPosition, topPosition }) => {
            this.positionTooltip({
                leftPosition,
                topPosition
            });
        });
        handleLineTooltipHide(this.hideTooltip);
    }

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
