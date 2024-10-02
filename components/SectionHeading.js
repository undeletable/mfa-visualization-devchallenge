import { COLORS, GLOBAL_CLASSNAMES } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";

class SectionHeading extends WebComponent {
    static observedAttributes = ["headingText", "iconName"];

    static rightEdgeSlotName = "right-edge";

    render() {
        const headingText = this.getAttribute("headingText");
        const iconName = this.getAttribute("iconName");

        return `
            <style>
                :host {
                    width: 100%;
                }
            </style>
            <header class="${GLOBAL_CLASSNAMES.headingContainer} ${GLOBAL_CLASSNAMES.textWithIconContainer}">
                <material-icon color=${COLORS.primary} name=${iconName} size="1.5em"></material-icon>
                <h2>${headingText}</h2>
                <slot name="${SectionHeading.rightEdgeSlotName}"></slot>
            </header>
        `;
    }
}

export { SectionHeading };