import { GLOBAL_CLASSNAMES } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";

class MaterialIcon extends WebComponent {
    observedAttributes = ["name", "size"];

    render() {
        const name = this.getAttribute("name");
        const size = this.getAttribute("size");

        return `
            ${size ? `
                <style>
                    .${GLOBAL_CLASSNAMES.materialIcon} {
                        font-size: ${size};
                    }
                </style>
            ` : ""}
            <span class="${GLOBAL_CLASSNAMES.materialIcon}">${name}</span>
        `;
    }
}

export { MaterialIcon };
