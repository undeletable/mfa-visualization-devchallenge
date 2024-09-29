import { WebComponent } from "../lib/WebComponent.js";
import { getChartType } from "../state/state.js";

class ChartArea extends WebComponent {
    render() {
        const chartType = getChartType();
        switch (chartType) {
            case "bar":
                return "<bar-chart></bar-chart>";
            case "line":
                return "<line-chart></line-chart>";
            case "pie":
                return "<pie-chart></pie-chart>";
            default:
                return "";
        }
    }
}

export { ChartArea };
