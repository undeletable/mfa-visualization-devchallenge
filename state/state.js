import { dispatchAction, handleAction } from "../lib/stateManagement.js";

const ACTIONS = {
    generateChart: "generate-chart",
    setChartData: "set-chart-data",
    setChartType: "set-chart-type",
};

const store = {
    chartData: null,
    chartType: null,
};

const setChartData = (fileData) => {
    dispatchAction(ACTIONS.setChartData, fileData);
};

const handleChartDataSelection = (handler) => {
    handleAction(ACTIONS.setChartData, handler);
};

const getFileData = () => store.chartData;

const setChartType = (chartType) => {
    dispatchAction(ACTIONS.setChartType, chartType);
};

const handleChartTypeSelection = (handler) => {
    handleAction(ACTIONS.setChartType, handler);
};

const getChartType = () => store.chartType;

const generateChart = () => {
    dispatchAction(ACTIONS.generateChart);
};

handleChartDataSelection(fileData => {
    store.chartData = fileData;
});
handleChartTypeSelection(chartType => {
    store.chartType = chartType;
});

export {
    generateChart,
    getChartType,
    getFileData,
    handleChartDataSelection,
    handleChartTypeSelection,
    setChartData,
    setChartType
};
