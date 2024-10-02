const FILE_NAME = "chart";

const getSVGBlob = svgElement => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    return new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8"
    });
};

const downloadFileWithLink = (fileData, fileName) => {
    const linkElement = document.createElement("a");
    linkElement.href = fileData;
    linkElement.download = fileName;
    linkElement.click();
};

const exportSVG = svgElement => {
    const blob = getSVGBlob(svgElement);
    const urlObject = URL.createObjectURL(blob);
    downloadFileWithLink(URL.createObjectURL(blob), `${FILE_NAME}.svg`);
    URL.revokeObjectURL(urlObject);
};

const exportPNG = svgElement => {
    const blob = getSVGBlob(svgElement);

    const image = new Image();
    const urlObject = URL.createObjectURL(blob);

    image.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = svgElement.width.baseVal.value;
        canvas.height = svgElement.height.baseVal.value;

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);

        const pngData = canvas.toDataURL("image/png");
        downloadFileWithLink(pngData, `${FILE_NAME}.png`);

        URL.revokeObjectURL(urlObject);
    };
    image.src = urlObject;
};


const printSVG = svgElement => {
    const iFrameElement = document.createElement("iframe");
    iFrameElement.style.position = "absolute";
    iFrameElement.style.top = `-${window.innerHeight}`;
    document.body.appendChild(iFrameElement);

    const iFrameDocument = iFrameElement.contentWindow.document;
    iFrameDocument.open();
    iFrameDocument.write(svgElement.outerHTML);
    iFrameDocument.close();

    iFrameElement.contentWindow.focus();
    iFrameElement.contentWindow.print();

    setTimeout(() => {
        document.body.removeChild(iFrameElement);
    }, 1000);
};

export { exportPNG, exportSVG, printSVG };
