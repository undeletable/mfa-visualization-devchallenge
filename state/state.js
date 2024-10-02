import { dispatchAction, handleAction } from "../lib/stateManagement.js";

const ACTIONS = {
    generateChart: "generate-chart",
    setChartData: "set-chart-data",
    setChartDataError: "set-chart-data-error",
};

const store = {
    chartData: null,
    chartDataError: null,
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

export {
    generateChart,
    getChartData,
    getChartDataError,
    handleChartDataError,
    handleChartDataSelection,
    handleChartGeneration,
    setChartData,
    setChartDataError,
};
