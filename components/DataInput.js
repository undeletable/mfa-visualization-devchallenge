import { WebComponent } from "../lib/WebComponent.js";
import { generateChart } from "../state/state.js";
import { CLASSNAMES } from "../styles/constants.js";

class DataInput extends WebComponent {
    generateButtonId = "generate-chart-button";

    onConnected() {
        const generateButtonElement = this.shadowRoot.getElementById(this.generateButtonId);
        generateButtonElement.addEventListener("click", () => {
            generateChart();
        });
    }

    render() {
        return `
            <file-upload></file-upload>
            <data-preview /></data-preview>
            <chart-type-selector></chart-type-selector>
            <button class=${CLASSNAMES.buttonPrimary} id=${this.generateButtonId}>
                Generate chart
            </button>
        `;
    }
}

export { DataInput };
