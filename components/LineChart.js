import { WebComponent } from "../lib/WebComponent.js";
import { getChartData } from "../state/state.js";
import { generateSVGChart } from "../utils/charts.js";

class LineChart extends WebComponent {
    onConnected() {
        const chartData = getChartData();
        const svg = generateSVGChart(chartData);
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(svg);
    }

    render() {
        return "";
    }
}

export { LineChart };
