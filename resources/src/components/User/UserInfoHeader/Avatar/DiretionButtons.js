import styles from './avatar.module.css';
import React from "react";
import {connect} from "react-redux";
import UploadButton from "./UploadButton";
import DeleteButton from "./DeleteButton";

const DirectionButtons = ({avatar, me}) =>
    <>
        {
            me &&
            <div className={styles.buttonsContainer}>
                <UploadButton/>
                {
                    avatar && <DeleteButton/>
                }
            </div>
        }
    </>;

const mapStateToProps = state => ({
    me: state.users.user.id === state.auth.user.id
});

export default connect(mapStateToProps)(DirectionButtons);