import { WebComponent } from "../lib/WebComponent.js";
import { setChartType } from "../state/state.js";

class ChartTypeSelector extends WebComponent {
    options = [
        {
            label: "Line chart",
            value: "line"
        },
        {
            label: "Bar chart",
            value: "bar"
        },
        {
            label: "Pie chart",
            value: "pie"
        }
    ];

    selectId = "chart-type-select";

    onConnected() {
        const selectElement = document.getElementById(this.selectId);
        selectElement.addEventListener("change", event => {
            const chartType = event.target.value;
            setChartType(chartType);
        });
    }

    render() {
        return `
            <select id=${this.selectId}>
                ${this.options.map(({ label, value }) =>
                    `<option value="${value}">${label}</option>`
                )}
            </select>
        `;
    }
}

export { ChartTypeSelector };
