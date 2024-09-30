import { CHART_TYPES_SELECT_OPTIONS } from "../constants/charts.js";
import { WebComponent } from "../lib/WebComponent.js";
import { setChartType } from "../state/state.js";

class ChartTypeSelector extends WebComponent {
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
                ${CHART_TYPES_SELECT_OPTIONS.map(
                    ({isDisabled, isInitialSelection, label, value }) =>
                        `<option
                            value="${value}"${
                                isInitialSelection ? " selected" : ""
                            }${
                                isDisabled ? " disabled" : ""
                            }
                        >
                            ${label}
                        </option>`
                )}
            </select>
        `;
    }
}

export { ChartTypeSelector };
