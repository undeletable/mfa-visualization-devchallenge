const BREAKPOINTS_PX = {
    small: 480,
    medium: 690
};

const COLORS = {
    accent: "#FFD700",
    chart: ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F"],
    error: "#D32F2F",
    gray: "#F1F1F1",
    primary: "#003366",
    secondary: "#0056A2",
    text: "#000000",
    transparent: "transparent",
    white: "#FFFFFF"
};

const GLOBAL_CLASSNAMES = {
    buttonError: "button-error",
    buttonPrimary: "button-primary",
    buttonSecondary: "button-secondary",
    dataSection: "data-section",
    error: "error",
    hidden: "hidden",
    materialIcon: "material-symbols-outlined",
    textSmall: "text-small",
    textWithIconContainer: "text-with-icon"
};

const HOVER_STYLE = "opacity: 0.8;";

const PAGE_MARGIN_PX = 5;

const TEXT_FLEX_STYLES = `
    align-items: center;
    display: flex;
    gap: 0.25em;
`;

export {
    BREAKPOINTS_PX,
    COLORS,
    GLOBAL_CLASSNAMES,
    HOVER_STYLE,
    PAGE_MARGIN_PX,
    TEXT_FLEX_STYLES
};