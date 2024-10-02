import { PAGE_MARGIN_PX } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";
import { getChartData } from "../state/state.js";
import { generateSVGChart } from "../utils/visualization.js";

class LineChart extends WebComponent {
    chartContainerId = "chart-container";

    chartContainerClassName = "chart-container";

    onConnected() {
        const chartContainerElement = this.getElement(this.chartContainerId);
        const svgWidth = chartContainerElement.clientWidth;
        const chartData = getChartData();
        const svg = generateSVGChart({
            chartData,
            svgWidth
        });
        chartContainerElement.appendChild(svg);
    }

    render() {
        return `
            <style>
                .${this.chartContainerClassName} {
                    width: 100%;
                }
            </style>
            <div class="${this.chartContainerId}" id="${this.chartContainerId}"></div>
        `;
    }
}

export { LineChart };
