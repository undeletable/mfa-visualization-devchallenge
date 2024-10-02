import { WebComponent } from "../lib/WebComponent.js";

class ChartDotTooltip extends WebComponent {
    static observedAttributes = ["xLabel", "xValue", "yLabel", "yValue"];

    render() {
        const xLabel = this.getAttribute("xLabel");
        const xValue = this.getAttribute("xValue");
        const yLabel = this.getAttribute("yLabel");
        const yValue = this.getAttribute("yValue");

        return `
            <style>
                dl {
                    margin: 0;
                }
                dt {
                    font-weight: bold;
                }
                dd {
                    margin: 0;
                }
            </style>
            <dl>
                <dt>${xLabel}:</dt>
                <dd>${xValue}</dd>
                <dt>${yLabel}:</dt>
                <dd>${yValue}</dd>
            </dl>
        `;
    }
}

export { ChartDotTooltip };
