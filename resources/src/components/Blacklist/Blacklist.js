import React from "react";
import {connect} from "react-redux";
import {getBlacklisted} from "../../services/user";
import Blacklisted from "./Blacklisted";

class Blacklist extends React.Component {

    componentDidMount() {
        this.props.dispatch(getBlacklisted());
    }

    render() {
        const {blacklisted} = this.props;

        return (
            <>
                <span>Blacklist</span>
                {
                    blacklisted &&
                    blacklisted.map(user => <Blacklisted key={user.id} user={user}/>)
                }
            </>
        )
    }
}

const mapStateToProps = state => ({
    blacklisted: state.users.blacklisted
});

export default connect(mapStateToProps)(Blacklist);