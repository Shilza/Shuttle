import React from "react";
import PropTypes from 'prop-types';
import styles from './saved.module.css';
import SingleCompilation from "./SingleCompilation";
import QuadCompilation from "./QuadCompilation";

const Compilation = ({compilation, loadPosts = () => {}}) => {

    const compilationImages = [...Object.values(compilation)[0]];
    const compilationName = Object.keys(compilation)[0];
    const isQuad = compilationImages.length === 4;

    return (
        <div onClick={() => loadPosts(compilationName)}>
            <div className={styles.compilationContainer}>
                {
                    isQuad ?
                        compilationImages.map(QuadCompilation)
                        :
                        <SingleCompilation src={compilationImages.pop()}/>
                }
            </div>
            <span className={styles.compilationName}>{compilationName}</span>
        </div>
    )
};

Compilation.propTypes = {
    compilation: PropTypes.object,
    loadPosts: PropTypes.func
};

export default Compilation;