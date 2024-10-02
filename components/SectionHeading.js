import { BREAKPOINTS_PX, COLORS, GLOBAL_CLASSNAMES, TEXT_FLEX_STYLES } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";

class SectionHeading extends WebComponent {
    static observedAttributes = ["headingText", "iconName"];

    static rightEdgeSlotName = "right-edge";

    headingContainerClassName = "heading-container";

    render() {
        const headingText = this.getAttribute("headingText");
        const iconName = this.getAttribute("iconName");

        return `
            <style>
                :host {
                    width: 100%;
                }
                .${this.headingContainerClassName}, .${this.headingContainerClassName} header {
                    ${TEXT_FLEX_STYLES}
                    justify-content: space-between;
                    width: 100%;
                }
                @media (max-width: ${BREAKPOINTS_PX.small}px) {
                    .${this.headingContainerClassName} {
                        align-items: stretch;
                        flex-direction: column;
                    }
                }
                .${this.headingContainerClassName} h1,
                .${this.headingContainerClassName} h2,
                .${this.headingContainerClassName} h3,
                .${this.headingContainerClassName} h4,
                .${this.headingContainerClassName} h5,
                .${this.headingContainerClassName} h6 {
                    flex-grow: 1;
                }
            </style>
            <div class="${this.headingContainerClassName}">
                <header class="${GLOBAL_CLASSNAMES.textWithIconContainer}">
                    <material-icon color=${COLORS.primary} name=${iconName} size="1.5em"></material-icon>
                    <h2>${headingText}</h2>
                </header>
                <slot name="${SectionHeading.rightEdgeSlotName}"></slot>
            </header>
        `;
    }
}

export { SectionHeading };