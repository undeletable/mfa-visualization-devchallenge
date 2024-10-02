import { WebComponent } from "../lib/WebComponent.js";
import { setChartData, setChartDataError } from "../state/state.js";
import { COLORS } from "../styles/constants.js";
import { getDataForChart } from "../utils/dataProcessing.js";

class FileUpload extends WebComponent {
    inputId = "file-upload";

    dragNDropAreaId = "drag-n-drop-area";

    dragNDropAreaClassName = "drag-n-drop-area";

    processInput(file) {
        getDataForChart(file).then(setChartData).catch(setChartDataError);
    }

    onConnected() {
        const dragNDropAreaElement = this.shadowRoot.getElementById(this.dragNDropAreaId);
        const fileInputElement = this.shadowRoot.getElementById(this.inputId);
        dragNDropAreaElement.addEventListener("drop", event => {
            event.preventDefault();
            if (event.dataTransfer.items) {
                const firstItem = event.dataTransfer.items[0];
                if (firstItem.kind === "file") {
                    const file = firstItem.getAsFile();
                    this.processInput(file);
                }
            } else {
                const firstFile = event.dataTransfer.files[0];
                this.processInput(firstFile);
            }
        });
        dragNDropAreaElement.addEventListener("dragover", event => {
            event.preventDefault();
        });
        fileInputElement.addEventListener("change", event => {
            const file = event.target.files[0];
            this.processInput(file);
        });
    }

    render() {
        return `
            <style>
                .${this.dragNDropAreaClassName} {
                    border: 1px dashed ${COLORS.secondary};
                    cursor: pointer;
                }
            </style>
            <label for=${this.inputId}>
                <div class="${this.dragNDropAreaClassName}" id=${this.dragNDropAreaId}>
                    Drag your file here or click to select
                </div>
            </label>
            <input
                accept=".csv,.json,.xls,.xlsx"
                hidden
                id=${this.inputId}
                type="file"
            >
            </input>
        `;
    }
}

export { FileUpload };
