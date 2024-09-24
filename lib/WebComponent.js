import { isFunction } from "../utils/dataTypes";

class WebComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {
        // TODO render() should be a function of attributes; launch it on attributes change (?)
        const html = isFunction(this.render) ? this.render() : "";
        this.shadowRoot.innerHTML = html;
    }
}

const defineComponent = (tagName, componentClass) => {
    return customElements.get(tagName) || customElements.define(tagName, componentClass);
};

export { defineComponent, WebComponent };
