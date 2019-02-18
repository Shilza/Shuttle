import SavedExplainingLabel from "../../../ExplainingLabels/SavedLabel/SavedExplainingLabel";
import CompilationsList from "./CompilationsList";
import React from "react";
import {connect} from "react-redux";

const SavedContainer = ({compilations, goToSavedPosts}) => (
    <>
        {
            compilations.length ? <CompilationsList compilations={compilations} goToSavedPosts={goToSavedPosts}/> :
                <SavedExplainingLabel/>
        }
    </>
);

const mapStateToProps = state => ({
    compilations: state.saved.compilations.data
});

export default connect(mapStateToProps)(SavedContainer);