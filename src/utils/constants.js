import { dateComparator } from "./dateComparator";

export const BASE_URL = "https://ordspub.epa.gov"
export const PRODUCT_INGREDIENT_CONTEXT_PATH = "/ords/pesticides/ProductSearch/searchWithIngName/v1/"

export const COL_DEFINITIONS = [
    {
        headerName: "Ingredient Name",
        field: "ingredientname",
        filter: "agTextColumnFilter",
        filterParams: {
            applyMiniFilterWhileTyping: true,
        },
    },
    {
        headerName: "Product Name",
        field: "productname",
        filter: "agTextColumnFilter",
        filterParams: {
            applyMiniFilterWhileTyping: true,
        },
    },
    {
        headerName: "Product Name Status",
        field: "productnamestatus",
        filter: "agSetColumnFilter",
        filterParams: {
            applyMiniFilterWhileTyping: true,
        },
        menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
    },
    {
        headerName: "Registration Status",
        field: "registrationstatus",
        filter: "agSetColumnFilter",
        menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
    },
    {
        headerName: "Product Status Date",
        field: "productstatusdate",
        filter: "agDateColumnFilter",
        comparator: dateComparator,
        filterParams: {
            comparator: (filterDate, cellValue) => {
                const dateAsString = cellValue;

                if (dateAsString == null) {
                    return 0;
                }
                const cellDate = new Date(dateAsString);

                // Now that both parameters are Date objects, we can compare
                if (cellDate < filterDate) {
                    return -1;
                } else if (cellDate > filterDate) {
                    return 1;
                }
                return 0;
            },
        },
    },
    {
        headerName: "PCC Code",
        field: "pccode",
        filter: "agTextColumnFilter",
        filterParams: {
            applyMiniFilterWhileTyping: true,
        },
    },
    {
        headerName: "Cas Number",
        field: "casnumber",
        filter: "agTextColumnFilter",
        filterParams: {
            applyMiniFilterWhileTyping: true,
        },
    },
    {
        headerName: "EPA Registration Number",
        field: "eparegnumber",
        filter: "agTextColumnFilter",
        filterParams: {
            applyMiniFilterWhileTyping: true,
        },
    },
];

// No results from API error message
export const NO_INGREDIENT_PRODUCTS_ERROR_MSG = (ingredientName) => {
    return `No products found for searched ingredient (${ingredientName}). Please try searching for a different ingredient.`;
}

// Error from API message
export const INGREDIENT_PRODUCTS_API_ERROR = (ingredientName) => {
    return `Error fetching products for ingredient: ${ingredientName}.`;
}