import { WebComponent } from "../lib/WebComponent.js";

class DataInput extends WebComponent {
    render() {
        return `
            <file-upload></file-upload>
            <chart-type-selector></chart-type-selector>
        `;
    }
}

export { DataInput };
