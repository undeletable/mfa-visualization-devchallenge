import { WebComponent } from "../lib/WebComponent.js";
import { handleChartDataSelection } from "../state/state.js";

class DataPreview extends WebComponent {
    onConnected() {
        handleChartDataSelection((data) => {
            // TODO display as table
            this.shadowRoot.innerHTML = JSON.stringify(data);
        })
    }

    render() {
        return ``;
    }
}

export { DataPreview };
