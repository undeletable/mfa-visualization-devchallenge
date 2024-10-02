import { WebComponent } from "../lib/WebComponent.js";

class PageHeader extends WebComponent {
    render() {
        return `
            <style>
                h1 {
                    text-align: center;
                }
            </style>
            <header>
                <h1>Data visualizer</h1>
            </header>
        `;
    }
}

export { PageHeader };
