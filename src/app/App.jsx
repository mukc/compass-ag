import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { isEmpty } from "lodash";
import { BASE_URL, PRODUCT_INGREDIENT_CONTEXT_PATH, COL_DEFINITIONS, NO_INGREDIENT_PRODUCTS_ERROR_MSG, INGREDIENT_PRODUCTS_API_ERROR } from "../utils/constants";
import { IoWarning } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./App.css";
import logo from '../images/logo.png';

function App() {
    const [ingredientName, setIngredientName] = useState("");
    const [rowData, setRowData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    // Fetch data from API and handles post completion process
    const fetchGridData = () => {
        setLoading(true);
        setInitialLoad(false);
        setRowData([]);
        setErrorMessage("");

        const apiUrl = `${BASE_URL}${PRODUCT_INGREDIENT_CONTEXT_PATH}${ingredientName}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);

                // No Results from API case
                if (isEmpty(data.items) || data.items.length === 0) {
                    setErrorMessage(
                        NO_INGREDIENT_PRODUCTS_ERROR_MSG(ingredientName),
                    );
                    return;
                }

                // Set data to display in table
                setRowData(data.items);
            })
            .catch(() => {
                setLoading(false);
                setErrorMessage(
                    INGREDIENT_PRODUCTS_API_ERROR(ingredientName),
                );
            });
    };

    // Handles the case where user presses "Enter" instead of search button
    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !isEmpty(ingredientName)) {
            fetchGridData();
        }
    };

    // Default config for Ag-grid table, floating filters
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 200,
            floatingFilter: true,
        };
    }, []);

    return (
        <div className="app-container">
            <h1 className="title-container">
                <img
                    src={logo}
                    alt="COMPASS AG Logo"
                    className="logo-background"
                ></img>
                Pesticide Ingredients Search
            </h1>

            <div className="search-container">
                <input
                    type="text"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter Ingredient Name"
                />
                <button
                    id="searchButton"
                    onClick={fetchGridData}
                    disabled={ingredientName.length === 0 || loading}
                    className={
                        ingredientName.length === 0 || loading ? "disabled-button" : ""
                    }
                >
                    Search
                </button>
            </div>

            {/* Loading spinner UI */}
            {loading && (
                <div className="loading-spinner">
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                    <p className="loading-text">Loading search results...</p>
                </div>
            )}

            {/* Initial state of the page before user search */}
            {initialLoad && (
                <div className="info-container">
                    <p>
                        <FaInfoCircle className="info-icon" /> Search pesticide
                        products by entering Ingredient name.
                    </p>
                </div>
            )}

            {/* Handles No results & error status from API */}
            {!initialLoad && !loading && rowData.length === 0 && errorMessage && (
                <div className="info-container error-info">
                    <p>
                        <IoWarning className="error-icon" />{" "}
                        {errorMessage}
                    </p>
                </div>
            )}

            {/* Ag Grid table*/}
            {rowData.length > 0 && (
                <div className="ag-theme-quartz">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={COL_DEFINITIONS}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={20}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
