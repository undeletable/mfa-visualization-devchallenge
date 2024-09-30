import { WebComponent } from "../lib/WebComponent.js";

class PageHeader extends WebComponent {
    render() {
        return `
            <header>
                <h1>Data visualizer</h1>
            </header>
        `;
    }
}

export { PageHeader };
