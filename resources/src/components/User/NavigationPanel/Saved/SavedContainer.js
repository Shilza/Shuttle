import React from "react";
import PropTypes from 'prop-types';
import SavedExplainingLabel from "../../../ExplainingLabels/SavedLabel/SavedExplainingLabel";
import CompilationsList from "./CompilationsList";
import {connect} from "react-redux";

const SavedContainer = ({compilations, goToSavedPosts}) => (
    <>
        {
            compilations.length ? <CompilationsList compilations={compilations} goToSavedPosts={goToSavedPosts}/> :
                <SavedExplainingLabel/>
        }
    </>
);

SavedContainer.propTypes = {
    compilation: PropTypes.array,
    goToSavedPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    compilations: state.saved.compilations.data
});

export default connect(mapStateToProps)(SavedContainer);