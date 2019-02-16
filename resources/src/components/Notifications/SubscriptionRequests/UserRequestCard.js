import React from "react";
import {Button} from "antd";
import styles from './userCard.module.css';
import DefaultAvatar from "../../DefaultAvatar/DefaultAvatar";
import {Link} from "react-router-dom";
import {acceptSubsRequest, cancelSubsRequest} from "../../../services/subscriptionRequests";

class UserRequestCard extends React.PureComponent {

    state = {
        acceptLoading: false,
        cancelLoading: false
    };

    accept = () => this.interactionWithSubRequest(acceptSubsRequest, () => ({acceptLoading: false}));

    cancel = () => this.interactionWithSubRequest(cancelSubsRequest, () => ({cancelLoading: true}));

    interactionWithSubRequest = (loader, setStateCallback) => {
        const {user, deleteFromSubsList} = this.props;
        this.setState(setStateCallback);

        loader(user.id)
            .then(() => {
                this.setState(setStateCallback);
                deleteFromSubsList(user.id);
            }).catch(() => this.setState(setStateCallback));
    };

    render() {
        const {username, avatar} = this.props.user;
        const {acceptLoading, cancelLoading} = this.state;

        return (
            <div className={styles.userCardContainer}>
                <Link className={styles.avatar} to={`/${username}`}>
                    {
                        avatar ? <img src={avatar} alt={'avatar'}/> : <DefaultAvatar fontSize={'30px'}/>
                    }
                </Link>
                <div className={styles.subContainer}>
                    <Link to={`/${username}`} className={styles.usernameLink}>
                        {username}
                    </Link>
                    <div className={styles.actionButtons}>
                        <Button size={'small'}
                                loading={acceptLoading}
                                onClick={this.accept}
                        >
                            Accept
                        </Button>
                        <Button size={'small'}
                                loading={cancelLoading}
                                onClick={this.cancel}
                        >
                            Deny
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserRequestCard;