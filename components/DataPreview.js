import { WebComponent } from "../lib/WebComponent.js";
import { handleChartDataSelection } from "../state/state.js";

class DataPreview extends WebComponent {
    chartData = [];

    onConnected() {
        handleChartDataSelection(chartData => {
            this.chartData = chartData;
            this.performRender();
        })
    }

    render() {
        if (this.chartData.length === 0) {
            return "";
        }
        return `
            <table>
                <thead>
                    ${this.chartData.headers.map(header => `<th>${header}</th>`)}
                </thead>
                <tbody>
                    ${this.chartData.data.map(item =>
                        `<tr>
                            ${this.chartData.headers.map(header => `<td>${item[header] || 0}</td>`)}
                        </tr>`
                    )}
                <tbody>
            </table>
        `;
    }
}

export { DataPreview };
