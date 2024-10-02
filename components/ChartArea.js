import { MESSAGES } from "../constants/messages.js";
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
                <section-heading headingText="${MESSAGES.visualization}" iconName="monitoring">
                    <!-- export button(s) -->
                </section-heading>
                <line-chart></line-chart>
            </section>
        `;
    }
}

export { ChartArea };
