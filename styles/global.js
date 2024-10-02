import { BREAKPOINTS_PX, COLORS, GLOBAL_CLASSNAMES, HOVER_STYLE, PAGE_MARGIN_PX, TEXT_FLEX_STYLES } from "../constants/styles.js";

const styleSheet = `
    body {
        background-color: ${COLORS.white};
        font-family: sans-serif;
        font-size: 16px;
        line-height: 24px;
        margin: ${PAGE_MARGIN_PX}px;
    }
    main {
        width: 100%;
    }
    h1, h2, h3, h4, h5, h6 {
        color: ${COLORS.primary};
        font-size: 24px;
        font-weight: bold;
        line-height: 32px;
        text-transform: uppercase;
    }
    button {
        border: none;
        border-radius: 0;
        cursor: pointer;
        padding: 12px 24px;
        text-transform: uppercase;
    }
    button:hover {
        ${HOVER_STYLE};
    }
    button.${GLOBAL_CLASSNAMES.buttonError} {
        background-color: ${COLORS.error};
        color: ${COLORS.white};
    }
    button.${GLOBAL_CLASSNAMES.buttonPrimary} {
        background-color: ${COLORS.primary};
        color: ${COLORS.white};
    }
    button.${GLOBAL_CLASSNAMES.buttonSecondary} {
        background-color: ${COLORS.accent};
    }
    section.${GLOBAL_CLASSNAMES.dataSection} {
        overflow: auto;
        width: 100%;
    }
    label, .${GLOBAL_CLASSNAMES.textSmall} {
        color: ${COLORS.secondary};
        font-size: 12px;
        line-height: 16px;
    }
    .${GLOBAL_CLASSNAMES.error} {
        color: ${COLORS.error};
    }
    .${GLOBAL_CLASSNAMES.materialIcon} {
        font-family: "Material Symbols Outlined";
    }
    .${GLOBAL_CLASSNAMES.textWithIconContainer} {
        ${TEXT_FLEX_STYLES}
    }
    .${GLOBAL_CLASSNAMES.hidden} {
        display: none;
    }
`;

let isStyleSheetAdded = false;

const addGlobalStyles = () => {
    const { promise, resolve } = Promise.withResolvers();
    if (!isStyleSheetAdded) {
        const styleElement = document.createElement("style");
        styleElement.innerHTML = styleSheet;
        document.body.appendChild(styleElement);
        isStyleSheetAdded = true;
    }
    resolve();
    return promise;
};

let globalStyleSheets;

const getGlobalStyleSheets = () => {
    if (!globalStyleSheets) {
        globalStyleSheets = Array.from(document.styleSheets).map(styleSheetObject => {
            try {
                const cssStyleSheet = new CSSStyleSheet();
                const style = Array.from(styleSheetObject.cssRules).map(({ cssText }) => cssText).join(" ");
                cssStyleSheet.replaceSync(style);
                return cssStyleSheet;
            } catch (e) {
                return null;
            }
        }).filter(item => !!item);
    }
    return globalStyleSheets;
};

export { addGlobalStyles, getGlobalStyleSheets };
