import { WebComponent } from "../lib/WebComponent.js";
import { handleChartDataSelection } from "../state/state.js";

class DataPreview extends WebComponent {
    onConnected() {
        handleChartDataSelection((data) => {
            this.shadowRoot.innerText = data;
        })
    }

    render() {
        return ``;
    }
}

export { DataPreview };
