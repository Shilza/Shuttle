import {Badge} from 'antd';
import React from "react";
import styles from './subReq.module.css';
import SubRequestList from "./SubRequestsList";

class SubscriptionRequestsLabel extends React.PureComponent {

    state = {
        isListOpen: false
    };

    openList = () => this.setState({isListOpen: true});

    closeList = () => this.setState({isListOpen: false});

    render() {
        return (
            <>
                {
                    this.state.isListOpen ? <SubRequestList/> :
                        <div className={styles.subReqLabel} onClick={this.openList}>
                            <Badge count={this.props.count} className={styles.avatarContainer}>
                                <div style={{width: 50, height: 50, borderRadius: '50%', background: 'yellow'}}/>
                            </Badge>
                            <div className={styles.infoContainer}>
                                <span className={styles.subReqTitle}>Subscriptions</span>
                                <span>Accept or deny</span>
                            </div>
                        </div>
                }
            </>
        );
    }
}

export default SubscriptionRequestsLabel;