import { COLORS, HOVER_STYLE } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";
import { setChartData, setChartDataError } from "../state/state.js";
import { getDataForChart } from "../utils/dataProcessing.js";

class FileUpload extends WebComponent {
    inputId = "file-upload";

    dragNDropAreaId = "drag-n-drop-area";

    dragNDropAreaClassName = "drag-n-drop-area";

    dragNDropAreaActiveClassName = "drag-n-drop-area-active";

    processInput(file) {
        getDataForChart(file).then(setChartData).catch(setChartDataError);
    }

    onConnected() {
        const dragNDropAreaElement = this.getElement(this.dragNDropAreaId);
        const fileInputElement = this.getElement(this.inputId);
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
            event.target.classList.add(this.dragNDropAreaActiveClassName);
            event.preventDefault();
        });
        dragNDropAreaElement.addEventListener("dragleave", event => {
            event.target.classList.remove(this.dragNDropAreaActiveClassName);
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
                    align-items: center;
                    background-color: ${COLORS.gray};
                    border: 1px dashed ${COLORS.secondary};
                    cursor: pointer;
                    display: flex;
                    height: min(50vh, 300px);
                    justify-content: center;
                    width: 100%;
                }
                .${this.dragNDropAreaClassName}:hover,
                .${this.dragNDropAreaClassName}.${this.dragNDropAreaActiveClassName} {
                    ${HOVER_STYLE};
                }
            </style>
            <label for=${this.inputId}>
                <div class="${this.dragNDropAreaClassName}" id=${this.dragNDropAreaId}>
                    <span>Drag your file here or click to select</span>
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
