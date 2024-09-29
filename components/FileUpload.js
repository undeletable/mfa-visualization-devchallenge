import { WebComponent } from "../lib/WebComponent.js";
import { setChartData } from "../state/state.js";
import { getFileContents } from "../utils/files.js";

class FileUpload extends WebComponent {
    inputId = "file-upload";

    onConnected() {
        const fileInputElement = this.shadowRoot.getElementById(this.inputId);
        fileInputElement.addEventListener("change", event => {
            const file = event.target.files[0];
            getFileContents(file).then(setChartData);
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
