import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import styles from './edit.module.css';
import {connect} from "react-redux";
import {update} from "../../../../services/user";
import {message} from "antd/lib/index";

const EditTitle = ({dispatch, editedData, user}) => {

    const submit = () => {

        const editedData = getFilterEditedData();

        if (Object.keys(editedData).length)
            dispatch(update(editedData))
                .then((data) => message.success(data))
                .catch((data) => message.error(data));
        else
            message.warning('Nothing to update');
    };

    const getFilterEditedData = () => {
        //delete entries that have not changed
        Object.entries(editedData).forEach(e => {
            if (!e[1] || user[e[0]] === e[1])
                delete editedData[e[0]];
        });

        return editedData;
    };

    return (
        <div className={styles.editTitle}>
            <Icon type="left"/>
            <span style={{marginLeft: 15}}>Edit profile</span>
            <Icon className={styles.editTitleCheck} type="check" onClick={submit}/>
        </div>
    );
};

EditTitle.propTypes = {
    editedData: PropTypes.shape({
        username: PropTypes.string,
        bio: PropTypes.string,
        site: PropTypes.string
    }),
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    editedData: {
        username: state.edit.username,
        bio: state.edit.bio,
        site: state.edit.site
    },
    user: state.auth.user
});

export default connect(mapStateToProps)(EditTitle);