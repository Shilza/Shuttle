import {Icon} from "antd";
import React from "react";
import styles from './edit.module.css';
import {connect} from "react-redux";
import {update} from "../../../../services/user";
import {message} from "antd/lib/index";

class EditTitle extends React.Component {

    submit = () => {
        const {dispatch} = this.props;

        const editedData = this.getFilterEditedData();

        if (Object.keys(editedData).length)
            dispatch(update(editedData))
                .then((data) => message.success(data))
                .catch((data) => message.error(data));
        else
            message.warning('Nothing to update');
    };

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    getFilterEditedData() {
        const { editedData, user } = this.props;

        //delete entries that have not changed
        Object.entries(editedData).forEach( e => {
            if(!e[1] || user[e[0]] === e[1])
                delete editedData[e[0]];
        });

        return editedData;
    }

    render() {
        console.log('re-render');
        return (
            <div className={styles.editTitle}>
                <Icon type="left"/>
                <span style={{marginLeft: 15}}>Edit profile</span>
                <Icon className={styles.editTitleCheck} type="check" onClick={this.submit}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    editedData: {
        username: state.edit.username,
        bio: state.edit.bio,
        site: state.edit.site
    },
    user: state.auth.user
});

export default connect(mapStateToProps)(EditTitle);