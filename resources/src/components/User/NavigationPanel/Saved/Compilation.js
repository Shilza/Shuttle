import React from "react";
import styles from './saved.module.css';

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

const QuadCompilation = (item, index) => (
    <div className={styles.pic} key={index}>
        <img src={item} alt={'Compilation'}/>
    </div>
);

const SingleCompilation = src => (
    <div>
        <div className={styles.singlePic}>
            <img src={src} alt={'Compilation'}/>
        </div>
    </div>
);

export default Compilation;