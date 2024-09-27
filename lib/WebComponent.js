import { isFunction } from "../utils/dataTypes.js";

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
    const existingDefinition = customElements.get(tagName);
    if (existingDefinition) {
        console.error(`${existingDefinition.name} was already used to define ${tagName}`);
        return existingDefinition;
    }
    return customElements.define(tagName, componentClass);
};

export { defineComponent, WebComponent };
