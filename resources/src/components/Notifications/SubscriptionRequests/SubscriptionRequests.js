import React from "react";
import SubRequestList from "./SubRequestsList";
import {getSubsRequestsPreview} from "../../../services/subscriptionRequests";
import SubscriptionRequestsLabel from "./SubscriptionRequestsLabel";

class SubscriptionRequests extends React.PureComponent {

    state = {
        isListOpen: false,
        avatar: null,
        count: 0,
        isLoading: true
    };

    componentDidMount() {
        getSubsRequestsPreview().then(data => this.setState({
            avatar: data.avatar,
            count: data.count,
            isLoading: false
        }));
    }

    openList = () => this.setState({isListOpen: true});

    closeList = () => this.setState({isListOpen: false});

    render() {
        const {count, avatar, isListOpen} = this.state;

        return (
            <>
                {
                    isListOpen ? <SubRequestList/>
                        : <SubscriptionRequestsLabel
                            count={count}
                            avatar={avatar}
                            openList={this.openList}
                        />
                }
            </>
        );
    }
}

export default SubscriptionRequests;