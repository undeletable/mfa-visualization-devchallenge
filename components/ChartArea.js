import { GLOBAL_CLASSNAMES } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";

class ChartArea extends WebComponent {
    chartSectionId = "chart";

    onConnected() {
        this.scrollToElement(this.chartSectionId);
    }

    render() {
        return `
            <section class="${GLOBAL_CLASSNAMES.dataSection}" id="${this.chartSectionId}">
                <h2>Visualization</h2>
                <line-chart></line-chart>
            </section>
        `;
    }
}

export { ChartArea };
