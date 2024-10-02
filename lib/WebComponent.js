import { addGlobalStyles, getGlobalStyleSheets } from "../styles/global.js";

class WebComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {
        this.performRender();
        this.onConnected();
    }

    attributeChangedCallback() {
        this.performRender();
    }

    applyGlobalStyles() {
        addGlobalStyles().then(() => {
            this.shadowRoot.adoptedStyleSheets.push(...getGlobalStyleSheets());
        });
    }

    getElement(id) {
        return this.shadowRoot.getElementById(id);
    }

    mapForRender(array, callback) {
        return array.map(callback).join("");
    }

    performRender() {
        const html = this.render();
        this.shadowRoot.innerHTML = html;
        this.applyGlobalStyles();
    }

    scrollToElement(id) {
        const element = this.getElement(id);
        element.scrollIntoView(true);
    }

    onConnected() {}

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
