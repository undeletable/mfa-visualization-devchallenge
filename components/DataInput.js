import { WebComponent } from "../lib/WebComponent.js";

class DataInput extends WebComponent {
    render() {
        return `
            <file-upload></file-upload>
            <data-preview></data-preview>
        `;
    }
}

export { DataInput };
