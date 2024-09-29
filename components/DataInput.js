import { WebComponent } from "../lib/WebComponent.js";

class DataInput extends WebComponent {
    render() {
        return `
            <file-upload></file-upload>
            <data-preview></data-preview>
            <chart-type-selector></chart-type-selector>
            <button>Generate chart</button>
        `;
    }
}

export { DataInput };
