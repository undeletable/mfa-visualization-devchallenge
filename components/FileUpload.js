import { MESSAGES } from "../constants/messages.js";
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

    // TODO add manual input
    render() {
        return `
            <style>
                .${this.dragNDropAreaClassName} {
                    align-items: center;
                    background-color: ${COLORS.gray};
                    border: 1px dashed ${COLORS.secondary};
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    height: min(50vh, 300px);
                    justify-content: center;
                    width: 100%;
                }
                .${this.dragNDropAreaClassName}:hover,
                .${this.dragNDropAreaClassName}.${this.dragNDropAreaActiveClassName} {
                    ${HOVER_STYLE};
                }
            </style>
            <label for="${this.inputId}">
                <div class="${this.dragNDropAreaClassName}" id=${this.dragNDropAreaId}>
                    <material-icon name="upload_file" size="2em"></material-icon>
                    <span>${MESSAGES.dragNDropAreaLabel}</span>
                </div>
            </label>
            <!-- TODO add xls and xlsx support -->
            <input
                accept=".csv,.json"
                aria-label="${MESSAGES.dragNDropAreaLabel}"
                hidden
                id="${this.inputId}"
                type="file"
            >
            </input>
        `;
    }
}

export { FileUpload };
