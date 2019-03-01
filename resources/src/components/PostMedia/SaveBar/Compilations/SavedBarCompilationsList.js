import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {getCompilations} from "../../../../services/saved";
import SavedBarCompilation from "./SavedBarCompilation";
import styles from '../savebar.module.css';
import {connect} from "react-redux";

const SavedBarCompilationsList = ({dispatch, postId, compilations}) => {
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

SavedBarCompilationsList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    postId: PropTypes.number,
    compilations: PropTypes.array
};

const mapStateToProps = state => ({
    compilations: state.saved.compilations.data,
});

export default connect(mapStateToProps)(SavedBarCompilationsList);