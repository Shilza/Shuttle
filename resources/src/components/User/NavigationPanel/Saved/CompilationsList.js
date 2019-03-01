import React from "react";
import PropTypes from 'prop-types';
import styles from './saved.module.css';
import Compilation from "./Compilation";

const CompilationsList = ({compilations, goToSavedPosts}) => {
    const loadPosts = compilationName => goToSavedPosts(compilationName);

    return (
        <div className={styles.compilationsList}>
            {
                compilations.map((item, index) => <Compilation key={index} compilation={item} loadPosts={loadPosts}/>)
            }
        </div>
    )
};

CompilationsList.propTypes = {
    compilations: PropTypes.arrayOf(PropTypes.object),
    goToSavedPosts: PropTypes.func.isRequired
};

export default CompilationsList;