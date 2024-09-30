import { addGlobalStyles, getGlobalStyleSheets } from "../styles/global.js";

class WebComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    applyGlobalStyles() {
        addGlobalStyles().then(() => {
            this.shadowRoot.adoptedStyleSheets.push(...getGlobalStyleSheets());
        });
    }

    onConnected() {}

    performRender() {
        const html = this.render();
        this.shadowRoot.innerHTML = html;
        this.applyGlobalStyles();
    }

    connectedCallback() {
        this.performRender();
        this.onConnected();
    }

    attributeChangedCallback() {
        this.performRender();
    }

    render() {
        return "";
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
