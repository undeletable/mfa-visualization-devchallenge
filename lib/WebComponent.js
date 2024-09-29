import { isFunction } from "../utils/dataTypes.js";

class WebComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    performRender() {
        const html = isFunction(this.render) ? this.render() : "";
        this.shadowRoot.innerHTML = html;
    }

    connectedCallback() {
        this.performRender();
        if (isFunction(this.onConnected)) {
            this.onConnected();
        }
    }

    attributeChangedCallback() {
        this.performRender();
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
