import { isFunction } from "../utils/dataTypes";

class WebComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {
        const html = isFunction(this.render) ? this.render() : "";
        this.shadowRoot.innerHTML = html;
    }
}

export { WebComponent };
