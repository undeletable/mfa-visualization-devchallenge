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

const setChartData = chartData => {
    dispatchAction(ACTIONS.setChartData, chartData);
};

const handleChartDataSelection = (handler) => {
    handleAction(ACTIONS.setChartData, handler);
};

const getChartData = () => store.chartData;

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

const handleChartGeneration = (handler) => {
    handleAction(ACTIONS.generateChart, handler);
};

handleChartDataSelection(fileData => {
    store.chartData = fileData;
});
handleChartTypeSelection(chartType => {
    store.chartType = chartType;
});

export {
    generateChart,
    getChartData,
    getChartType,
    handleChartDataSelection,
    handleChartGeneration,
    handleChartTypeSelection,
    setChartData,
    setChartType
};
