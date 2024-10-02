import { MESSAGES } from "../constants/messages.js";
import { GLOBAL_CLASSNAMES } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";
import { exportAsPNG, exportAsSVG } from "../state/state.js";
import { SectionHeading } from "./SectionHeading.js";

class ChartArea extends WebComponent {
    chartSectionId = "chart";

    pngExportButtonId = "export-png";

    svgExportButtonId = "export-svg";

    buttonsContainerClassName = "buttons-container";

    onConnected() {
        this.scrollToElement(this.chartSectionId);
        this.shadowRoot.addEventListener("click", event => {
            switch (event.target.id) {
                case this.pngExportButtonId:
                    exportAsPNG();
                    break;
                case this.svgExportButtonId:
                    exportAsSVG();
                    break;
                default:
                    break;
            }
        });
    }

    render() {
        return `
            <style>
                .${this.buttonsContainerClassName} {
                    display: flex;
                    gap: 1em;
                }
            </style>
            <section class="${GLOBAL_CLASSNAMES.dataSection}" id="${this.chartSectionId}">
                <section-heading headingText="${MESSAGES.visualization}" iconName="monitoring">
                    <div class="${this.buttonsContainerClassName}" slot="${SectionHeading.rightEdgeSlotName}">
                        <button
                            class="${GLOBAL_CLASSNAMES.buttonSecondary} ${GLOBAL_CLASSNAMES.textWithIconContainer}"
                            id="${this.svgExportButtonId}"
                        >
                            <material-icon name="polyline" size="1.5em"></material-icon>
                            ${MESSAGES.svgExport}
                        </button>
                        <button
                            class="${GLOBAL_CLASSNAMES.buttonSecondary} ${GLOBAL_CLASSNAMES.textWithIconContainer}"
                            id="${this.pngExportButtonId}"
                        >
                            <material-icon name="image" size="1.5em"></material-icon>
                            ${MESSAGES.pngExport}
                        </button>
                    </div>
                </section-heading>
                <line-chart></line-chart>
            </section>
        `;
    }
}

export { ChartArea };
