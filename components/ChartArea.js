import { MESSAGES } from "../constants/messages.js";
import { BREAKPOINTS_PX, GLOBAL_CLASSNAMES } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";
import { exportAsPNG, exportAsSVG, printChart } from "../state/state.js";
import { SectionHeading } from "./SectionHeading.js";

class ChartArea extends WebComponent {
    chartSectionId = "chart";

    pngExportButtonId = "export-png";

    svgExportButtonId = "export-svg";

    printButtonId = "print";

    buttonsContainerClassName = "buttons-container";

    onConnected() {
        this.scrollToElement(this.chartSectionId);
        this.shadowRoot.addEventListener("click", event => {
            switch (event.target.id) {
                case this.pngExportButtonId:
                    exportAsPNG();
                    break;
                case this.printButtonId:
                    printChart();
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
                .${this.buttonsContainerClassName} button {
                    flex-grow: 1;
                }
                @media (min-width: ${BREAKPOINTS_PX.small + 1}px) and (max-width: ${BREAKPOINTS_PX.medium}px) {
                    .${this.buttonsContainerClassName} {
                        flex-direction: column;
                        padding: 1em 0;
                    }
                }
                @media (max-width: ${BREAKPOINTS_PX.small}px) {
                    .${this.buttonsContainerClassName} {
                        flex-direction: row;
                        gap: 0.5em;
                        justify-content: space-between;
                        width: 100%;
                    }
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
                        <button
                            class="${GLOBAL_CLASSNAMES.buttonSecondary} ${GLOBAL_CLASSNAMES.textWithIconContainer}"
                            id="${this.printButtonId}"
                        >
                            <material-icon name="print" size="1.5em"></material-icon>
                            ${MESSAGES.print}
                        </button>
                    </div>
                </section-heading>
                <line-chart></line-chart>
            </section>
        `;
    }
}

export { ChartArea };
