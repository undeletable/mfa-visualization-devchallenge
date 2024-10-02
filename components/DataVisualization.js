import { WebComponent } from "../lib/WebComponent.js";
import { handleChartGeneration } from "../state/state.js";

class DataVisualization extends WebComponent {
    isChartGenerated = false;

    onConnected() {
        handleChartGeneration(() => {
            this.isChartGenerated = true;
            this.performRender();
        });
    }

    // TODO handle loading
    render() {
        return this.isChartGenerated
            ? "<chart-area></chart-area>"
            : "";
    }
}

export { DataVisualization };
