import React from "react";
import PropTypes from 'prop-types';
import styles from './saved.module.css';
import SingleCompilation from "./SingleCompilation";
import QuadCompilation from "./QuadCompilation";

const Compilation = ({compilation, loadPosts}) => {

    const compilationImages = [...Object.values(compilation)[0]];
    const compilationName = Object.keys(compilation)[0];
    const isQuad = compilationImages.length === 4;

    return (
        <div onClick={() => loadPosts(compilationName)}>
            {
                isQuad ?
                    <div className={styles.compilationContainer}>
                        {
                            compilationImages.map(QuadCompilation)
                        }
                    </div>
                    :
                    SingleCompilation(compilationImages.pop())
            }
            <span className={styles.compilationName}>{compilationName}</span>
        </div>
    )
};

Compilation.propTypes = {
    compilation: PropTypes.object,
    loadPosts: PropTypes.func.isRequired
};

export default Compilation;