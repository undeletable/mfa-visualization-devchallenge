import { WebComponent } from "../lib/WebComponent.js";
import { handleChartDataError, handleChartDataSelection } from "../state/state.js";

class DataPreview extends WebComponent {
    chartData = null;

    chartDataError = null;

    onConnected() {
        handleChartDataSelection(chartData => {
            this.chartData = chartData;
            if (chartData) {
                this.chartDataError = null;
                this.performRender();
            }
        });
        handleChartDataError(error => {
            this.chartDataError = error;
            if (error) {
                this.chartData = null;
                this.performRender();
            }
        })
    }

    render() {
        if (!this.chartData) {
            return `
                <p>${this.chartDataError?.message || "No data selected"}</p>
            `;
        }
        return `
            <table>
                <thead>
                    ${this.mapForRender(this.chartData.headers, header => `<th>${header}</th>`)}
                </thead>
                <tbody>
                    ${this.mapForRender(this.chartData.data, item =>
                        `<tr>
                            ${this.mapForRender(this.chartData.headers, header => `<td>${item[header] || 0}</td>`)}
                        </tr>`
                    )}
                <tbody>
            </table>
        `;
    }
}

export { DataPreview };
