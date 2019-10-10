import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import SavedExplainingLabel from "components/ExplainingLabels/SavedLabel/SavedExplainingLabel";
import SavedBarCompilation from "./SavedBarCompilation";

import styles from '../savebar.module.css';

const SavedBarCompilationsList = ({dispatch, compilations}) => {
  useEffect(() => {
    dispatch.saved.fetchCompilations(1);
  }, []);

  return (
    <div className={styles.compilationsList}>
      {
        compilations && (
          compilations.length === 0
            ? <SavedExplainingLabel text={'Here will displayed your photos compilations'}/>
            : compilations.map((item, index) =>
              <SavedBarCompilation
                key={index}
                compilation={item}
              />
            )
        )
      }
    </div>
  );
};

SavedBarCompilationsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  compilations: PropTypes.array
};

const mapStateToProps = state => ({
  compilations: state.saved.compilations,
});

export default connect(mapStateToProps)(SavedBarCompilationsList);
