import { ChartArea } from "./components/ChartArea.js";
import { ChartSettings } from "./components/ChartSettings.js";
import { ChartTypeSelector } from "./components/ChartTypeSelector.js";
import { DataInput } from "./components/DataInput.js";
import { DataVisualization } from "./components/DataVisualization.js";
import { ExportControls } from "./components/ExportControls.js";
import { FileUpload } from "./components/FileUpload.js";
import { PageHeader } from "./components/PageHeader.js";
import { defineComponent } from "./lib/WebComponent.js";

defineComponent("chart-area", ChartArea);
defineComponent("chart-settings", ChartSettings);
defineComponent("chart-type-selector", ChartTypeSelector);
defineComponent("data-input", DataInput);
defineComponent("data-visualization", DataVisualization);
defineComponent("export-controls", ExportControls);
defineComponent("file-upload", FileUpload);
defineComponent("page-header", PageHeader);
