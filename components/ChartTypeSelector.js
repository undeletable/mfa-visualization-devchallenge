import { WebComponent } from "../lib/WebComponent.js";
import { setChartType } from "../state/state.js";

class ChartTypeSelector extends WebComponent {
    options = [
        {
            isInitialSelection: true,
            label: "Select chart type",
            value: "",
        },
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
        const selectElement = this.shadowRoot.getElementById(this.selectId);
        selectElement.addEventListener("change", event => {
            const chartType = event.target.value;
            setChartType(chartType);
        });
    }

    render() {
        return `
            <select id=${this.selectId}>
                ${this.options.map(({ isInitialSelection, label, value }) =>
                    `<option value="${value}"${isInitialSelection ? " selected" : ""}>
                        ${label}
                    </option>`
                )}
            </select>
        `;
    }
}

export { ChartTypeSelector };
