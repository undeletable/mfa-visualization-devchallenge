import { WebComponent } from "../lib/WebComponent.js";

class DataVisualization extends WebComponent {
    render() {
        return `
            <chart-area></chart-area>
            <chart-settings></chart-settings>
        `;
    }
}

export { DataVisualization };
