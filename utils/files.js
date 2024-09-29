const FILE_NAME_PATTERN = /^[\w\W]+\.(?<extension>[^\.]+)$/;
const CELL_COORDINATE_PATTERN = /^[A-Z]+(?<rowNumber>\d+)$/;

const getFileExtension = fileName => {
    const patternMatch = fileName.match(FILE_NAME_PATTERN);
    return patternMatch.groups.extension;
};

const isCSVFile = extension => extension === "csv";

const isExcelSpreadsheet = extension => ["xls", "xlsx"].includes(extension);

const getCSVRowCells = row => row.split(",");

// TODO doesn't work correctly
const getDataFromExcelSpreadsheet = contents => {
    const parsedSpreadsheet = XLSX.read(contents);
    const firstSheetName = parsedSpreadsheet.SheetNames[0];
    const firstSheetData = parsedSpreadsheet.Sheets[firstSheetName];
    const headers = [];
    const data = [];
    let currentHeader;
    let currentIndex = 0;
    const cellCoordinates = Object.keys(firstSheetData).sort();
    for (let cellCoordinate of cellCoordinates) {
        if (cellCoordinate === "!ref") {
            continue;
        }
        const cellValue = firstSheetData[cellCoordinate].v;
        const patternMatch = cellCoordinate.match(CELL_COORDINATE_PATTERN);
        const { rowNumber } = patternMatch.groups;
        if (rowNumber === "1") {
            currentIndex = 0;
            currentHeader = cellValue;
            headers.push(currentHeader);
        } else {
            let dataItemAtCurrentIndex = data[currentIndex] || {};
            if (data[currentIndex]) {
                data[currentIndex] = dataItemAtCurrentIndex;
            }
            dataItemAtCurrentIndex[currentHeader] = cellValue;
            currentIndex++;
        }
    }
    return {
        headers,
        data
    };
};

const getDataFromCSVFile = (contents) => {
    const rows = contents.split("\n");
    const headersRow = rows[0];
    const headers = getCSVRowCells(headersRow);
    const data = [];
    for (let currentRow of rows) {
        if (currentRow) {
            const currentRowObject = {};
            const cells = getCSVRowCells(currentRow);
            for (let i = 0; i < headers.length; i++) {
                const currentCell = cells[i];
                if (currentCell) {
                    const currentHeader = headers[i];
                    currentRowObject[currentHeader] = currentCell;
                }
            }
            data.push(currentRowObject);
        }
    }
    return {
        headers,
        data
    };
};

const getDataFromJSONFile = contents => {
    const data = JSON.parse(contents);
    const headersMap = {};
    for (let currentRow of data) {
        const presentKeys = Object.keys(currentRow);
        for (let key of presentKeys) {
            if (!headersMap[key]) {
                headersMap[key] = true;
            }
        }
    }
    const headers = Object.keys(headersMap);
    return {
        headers,
        data
    };
};

const getJSONContents = (fileName, contents) => {
    const extension = getFileExtension(fileName);
    if (isExcelSpreadsheet(extension)) {
        return getDataFromExcelSpreadsheet(contents);
    }
    if (isCSVFile(extension)) {
        return getDataFromCSVFile(contents);
    }
    return getDataFromJSONFile(contents);
};

// TODO handle encoding
const getFileContents = fileData => {
    const { promise, resolve } = Promise.withResolvers();
    const fileReader = new FileReader();
    fileReader.onload = event => {
        const contents = event.target.result;
        const fileName = fileData.name;
        const jsonContents = getJSONContents(fileName, contents);
        resolve(jsonContents);
    };
    fileReader.readAsText(fileData);
    return promise;
};

export { getFileContents };
