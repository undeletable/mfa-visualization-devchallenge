import { MESSAGES } from "../constants/messages.js";
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
                <h1>${MESSAGES.pageTitle}</h1>
            </header>
        `;
    }
}

export { PageHeader };
