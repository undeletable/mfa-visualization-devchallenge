import { ChartArea } from "./components/ChartArea.js";
import { ChartDotTooltip } from "./components/ChartDotTooltip.js";
import { DataInput } from "./components/DataInput.js";
import { DataPreview } from "./components/DataPreview.js";
import { DataVisualization } from "./components/DataVisualization.js";
import { FileUpload } from "./components/FileUpload.js";
import { LineChart } from "./components/LineChart.js";
import { MaterialIcon } from "./components/MaterialIcon.js";
import { PageHeader } from "./components/PageHeader.js";
import { SectionHeading } from "./components/SectionHeading.js";
import { defineComponent } from "./lib/WebComponent.js";
import { addGlobalStyles } from "./styles/global.js";

addGlobalStyles();

defineComponent("chart-area", ChartArea);
defineComponent("chart-dot-tooltip", ChartDotTooltip);
defineComponent("data-input", DataInput);
defineComponent("data-preview", DataPreview);
defineComponent("data-visualization", DataVisualization);
defineComponent("file-upload", FileUpload);
defineComponent("line-chart", LineChart);
defineComponent("material-icon", MaterialIcon);
defineComponent("page-header", PageHeader);
defineComponent("section-heading", SectionHeading);
