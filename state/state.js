import { dispatchAction, handleAction } from "../lib/stateManagement.js";

const ACTIONS = {
    generateChart: "generate-chart",
    setChartData: "set-chart-data",
    setChartData: "set-chart-data-error",
    setChartType: "set-chart-type",
};

const store = {
    chartData: null,
    chartDataError: null,
    chartType: null,
};

const setChartData = chartData => {
    dispatchAction(ACTIONS.setChartData, chartData);
    dispatchAction(ACTIONS.setChartDataError, null);
};

const handleChartDataSelection = (handler) => {
    handleAction(ACTIONS.setChartData, handler);
};

const getChartData = () => store.chartData;

const setChartDataError = error => {
    dispatchAction(ACTIONS.setChartData, null);
    dispatchAction(ACTIONS.setChartDataError, error);
};

const handleChartDataError = (handler) => {
    handleAction(ACTIONS.setChartDataError, handler);
};

const getChartDataError = () => store.chartDataError;

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
handleChartDataError(error => {
    store.chartDataError = error;
});
handleChartTypeSelection(chartType => {
    store.chartType = chartType;
});

export {
    generateChart,
    getChartData,
    getChartDataError,
    getChartType,
    handleChartDataError,
    handleChartDataSelection,
    handleChartGeneration,
    handleChartTypeSelection,
    setChartData,
    setChartDataError,
    setChartType
};
