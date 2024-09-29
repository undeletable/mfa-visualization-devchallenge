import { dispatchAction, handleAction } from "../lib/stateManagement.js";

const ACTIONS = {
    setFile: "set-file",
};

const setSelectedFileData = (fileData) => {
    dispatchAction(ACTIONS.setFile, fileData);
};

const handleFileDataSelection = (handler) => {
    handleAction(ACTIONS.setFile, handler);
};

export { handleFileDataSelection, setSelectedFileData };
