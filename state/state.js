import { dispatchAction, handleAction } from "../lib/stateManagement.js";

const ACTIONS = {
    setChartData: "set-chart-data",
    setChartType: "set-chart-type",
};

const store = {
    chartData: null
};

const setChartData = (fileData) => {
    dispatchAction(ACTIONS.setChartData, fileData);
};

const handleChartDataSelection = (handler) => {
    handleAction(ACTIONS.setChartData, handler);
};

const getFileData = () => store.chartData;

handleChartDataSelection((fileData) => {
    store.chartData = fileData;
});

export { getFileData, handleChartDataSelection, setChartData };
