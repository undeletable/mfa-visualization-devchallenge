import { GLOBAL_CLASSNAMES } from "../constants/styles.js";
import { WebComponent } from "../lib/WebComponent.js";

class MaterialIcon extends WebComponent {
    static observedAttributes = ["color", "name", "size"];

    render() {
        const color = this.getAttribute("color");
        const name = this.getAttribute("name");
        const size = this.getAttribute("size");

        return `
            ${(color || size) ? `
                <style>
                    .${GLOBAL_CLASSNAMES.materialIcon} {
                        ${color ? `color: ${color};` : ""}
                        ${size ? `font-size: ${size};` : ""}
                    }
                </style>
            ` : ""}
            <span class="${GLOBAL_CLASSNAMES.materialIcon}">${name}</span>
        `;
    }
}

export { MaterialIcon };
