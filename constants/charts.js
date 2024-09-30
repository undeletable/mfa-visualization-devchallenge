const CHART_TYPES = {
    bar: "bar",
    line: "line",
    pie: "pie"
};

const CHART_TYPES_SELECT_OPTIONS = [
    {
        isDisabled: true,
        isInitialSelection: true,
        label: "Select chart type",
        value: "",
    },
    {
        label: "Line chart",
        value: CHART_TYPES.line
    },
    {
        label: "Bar chart",
        value: CHART_TYPES.bar
    },
    {
        label: "Pie chart",
        value: CHART_TYPES.pie
    }
];

export { CHART_TYPES, CHART_TYPES_SELECT_OPTIONS };