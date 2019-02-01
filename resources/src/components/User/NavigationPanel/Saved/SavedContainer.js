import SavedExplainingLabel from "./SavedExplainingLabel";
import CompilationsList from "./CompilationsList";
import React from "react";

const SavedContainer = ({compilations}) => (
    <>
        {
            compilations ? <CompilationsList compilations={compilations}/> :
                <SavedExplainingLabel/>
        }
    </>
);

export default SavedContainer;