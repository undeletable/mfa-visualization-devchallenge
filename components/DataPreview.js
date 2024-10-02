import { MESSAGES } from "../constants/messages.js";
import { COLORS, GLOBAL_CLASSNAMES } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";
import { generateChart, handleChartDataError, handleChartDataSelection } from "../state/state.js";

class DataPreview extends WebComponent {
    previewSectionId = "preview";

    previewSectionClassName = "preview";

    generateButtonId = "generate-chart-button";

    chartData = null;

    chartDataError = null;

    onConnected() {
        handleChartDataSelection(chartData => {
            this.chartData = chartData;
            if (chartData) {
                this.chartDataError = null;
                this.performRender();
                this.scrollToElement(this.previewSectionId);
                const generateButtonElement = this.getElement(this.generateButtonId);
                generateButtonElement.addEventListener("click", () => {
                    generateChart();
                });
            }
        });
        handleChartDataError(error => {
            this.chartDataError = error;
            if (error) {
                this.chartData = null;
                this.performRender();
            }
        });
    }

    render() {
        return `
            <style>
                .${GLOBAL_CLASSNAMES.dataSection} {
                    align-items: flex-start;
                    display: flex;
                    flex-direction: column;
                }
                table, th, td {
                    border: 1px solid ${COLORS.secondary};
                    border-collapse: collapse;
                }
                table {
                    margin-top: 12px;
                }
                th, td {
                    padding: 2px;
                }
            </style>
            <section class="${GLOBAL_CLASSNAMES.dataSection}" id="${this.previewSectionId}">
                <h2 class="${GLOBAL_CLASSNAMES.textWithIconContainer}">
                    <material-icon name="data_table"></material-icon>
                    ${MESSAGES.preview}
                </h2>
                ${this.chartData
                    ? `
                        <button
                            class="${GLOBAL_CLASSNAMES.buttonPrimary} ${GLOBAL_CLASSNAMES.textWithIconContainer}"
                            id="${this.generateButtonId}"
                        >
                            <material-icon name="monitoring" size="1.5em"></material-icon>
                            ${MESSAGES.generateChartButtonLabel}
                        </button>
                        <table>
                            <thead>
                                ${this.mapForRender(this.chartData.headers, header =>`<th>${header}</th>`)}
                            </thead>
                            <tbody>
                                ${this.mapForRender(this.chartData.data, item =>
                                    `<tr>
                                        ${this.mapForRender(this.chartData.headers, header => `<td>${item[header]}</td>`)}
                                    </tr>`
                                )}
                            <tbody>
                        </table>
                    `
                    : `<div>
                        ${this.chartDataError
                            ? `<span class="${GLOBAL_CLASSNAMES.error}">
                                ${MESSAGES.unableToParseData}: ${this.chartDataError.message}
                            </span>`
                            : `<span>${MESSAGES.noDataSelected}</span>`
                        }
                    </div>`
                }
            </section>
        `;
    }
}

export { DataPreview };
