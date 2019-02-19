import React, {useEffect} from "react";
import {getCompilations} from "../../../../services/saved";
import SavedBarCompilation from "./SavedBarCompilation";
import styles from '../savebar.module.css';
import {connect} from "react-redux";

const SavedBarCompilationsList = ({dispatch, postId, closeDrawer, compilations}) => {
    useEffect(() => {
        if(!compilations)
            dispatch(getCompilations(1));
    }, []);

    return (
        <div className={styles.compilationsList}>
            {
                compilations && compilations.map((item, index) =>
                    <SavedBarCompilation
                        key={index}
                        compilation={item}
                    />
                )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    compilations: state.saved.compilations.data,
});

export default connect(mapStateToProps)(SavedBarCompilationsList);