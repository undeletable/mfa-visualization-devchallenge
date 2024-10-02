import { dispatchAction, handleAction } from "../lib/stateManagement.js";

const ACTIONS = {
    displayDotTooltip: "display-dot-tooltip",
    displayLineTooltip: "display-line-tooltip",
    exportAsPNG: "export-png",
    exportAsSVG: "export-svg",
    generateChart: "generate-chart",
    hideDotTooltip: "hide-dot-tooltip",
    hideLineTooltip: "hide-line-tooltip",
    print: "print",
    setChartData: "set-chart-data",
    setChartDataError: "set-chart-data-error",
};

const store = {
    chartData: null,
    chartDataError: null,
};

// TODO define actions-related methods in more convenient way

const setChartData = chartData => {
    dispatchAction(ACTIONS.setChartData, chartData);
    dispatchAction(ACTIONS.setChartDataError, null);
};

const handleChartDataSelection = handler => {
    handleAction(ACTIONS.setChartData, handler);
};

const getChartData = () => store.chartData;

const setChartDataError = error => {
    dispatchAction(ACTIONS.setChartData, null);
    dispatchAction(ACTIONS.setChartDataError, error);
};

const handleChartDataError = handler => {
    handleAction(ACTIONS.setChartDataError, handler);
};

const getChartDataError = () => store.chartDataError;

const generateChart = () => {
    dispatchAction(ACTIONS.generateChart);
};

const handleChartGeneration = handler => {
    handleAction(ACTIONS.generateChart, handler);
};

const exportAsPNG = () => {
    dispatchAction(ACTIONS.exportAsPNG);
};

const handleChartPNGExport = handler => {
    handleAction(ACTIONS.exportAsPNG, handler);
};

const exportAsSVG = () => {
    dispatchAction(ACTIONS.exportAsSVG);
};

const handleChartSVGExport = handler => {
    handleAction(ACTIONS.exportAsSVG, handler);
};

const printChart = () => {
    dispatchAction(ACTIONS.print);
};

const handleChartPrint = handler => {
    handleAction(ACTIONS.print, handler);
};

const displayDotTooltip = ({ leftPosition, topPosition, xLabel, xValue, yLabel, yValue }) => {
    dispatchAction(ACTIONS.displayDotTooltip, {
        leftPosition,
        topPosition,
        xLabel,
        xValue,
        yLabel,
        yValue
    });
};

const handleDotTooltipDisplay = handler => {
    handleAction(ACTIONS.displayDotTooltip, handler);
};

const displayLineTooltip = ({ label, leftPosition, topPosition }) => {
    dispatchAction(ACTIONS.displayLineTooltip, {
        label,
        leftPosition,
        topPosition
    });
};

const handleLineTooltipDisplay = handler => {
    handleAction(ACTIONS.displayLineTooltip, handler);
};

const hideDotTooltip = () => {
    dispatchAction(ACTIONS.hideDotTooltip);
};

const handleDotTooltipHide = handler => {
    handleAction(ACTIONS.hideDotTooltip, handler);
};

const hideLineTooltip = () => {
    dispatchAction(ACTIONS.hideLineTooltip);
};

const handleLineTooltipHide = handler => {
    handleAction(ACTIONS.hideLineTooltip, handler);
};

handleChartDataSelection(fileData => {
    store.chartData = fileData;
});
handleChartDataError(error => {
    store.chartDataError = error;
});

export {
    displayDotTooltip,
    displayLineTooltip,
    exportAsPNG,
    exportAsSVG,
    generateChart,
    getChartData,
    getChartDataError,
    handleChartDataError,
    handleChartDataSelection,
    handleChartGeneration,
    handleChartPNGExport,
    handleChartPrint,
    handleChartSVGExport,
    handleDotTooltipDisplay,
    handleLineTooltipDisplay,
    handleDotTooltipHide,
    handleLineTooltipHide,
    hideDotTooltip,
    hideLineTooltip,
    printChart,
    setChartData,
    setChartDataError,
};
