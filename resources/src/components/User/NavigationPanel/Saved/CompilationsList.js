import styles from './saved.module.css';
import Compilation from "./Compilation";
import React from "react";
import {connect} from "react-redux";
import {getSavedPosts} from "../../../../services/post";

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

export default CompilationsList;