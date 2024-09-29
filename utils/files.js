// TODO handle encoding
const getFileContents = fileData => {
    const { promise, resolve } = Promise.withResolvers();
    const fileReader = new FileReader();
    fileReader.onload = event => {
        const contents = event.target.result;
        resolve(contents);
    };
    fileReader.readAsText(fileData);
    return promise;
};

export { getFileContents };
