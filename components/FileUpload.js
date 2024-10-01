import { WebComponent } from "../lib/WebComponent.js";
import { setChartData, setChartDataError } from "../state/state.js";
import { getDataForChart } from "../utils/dataProcessing.js";

class FileUpload extends WebComponent {
    inputId = "file-upload";

    onConnected() {
        const fileInputElement = this.shadowRoot.getElementById(this.inputId);
        fileInputElement.addEventListener("change", event => {
            const file = event.target.files[0];
            getDataForChart(file)
                .then(setChartData)
                .catch(setChartDataError);
        });
    }

    // TODO add drag area
    render() {
        return `
            <label for=${this.inputId}>Drag your file here</label>
            <input
                accept=".csv,.json,.xls,.xlsx"
                id=${this.inputId}
                type="file"
            >
            </input>
        `;
    }
}

export { FileUpload };
