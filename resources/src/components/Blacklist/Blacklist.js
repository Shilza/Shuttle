import React from "react";
import {getBlacklisted} from "../../services/user";
import Blacklisted from "./Blacklisted";
import style from './blacklist.module.css';
import {connect} from "react-redux";

class Blacklist extends React.Component {

    componentDidMount() {
        this.props.dispatch(getBlacklisted());
    }

    render() {
        const {blacklisted} = this.props;

        return (
            <div className={style.blacklistContainer}>
                <span className={style.title}>Blacklist</span>
                <div className={style.cardsList}>
                    {
                        blacklisted &&
                        blacklisted.map(user => <Blacklisted key={user.id} user={user}/>)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    blacklisted: state.blacklist.users
});

export default connect(mapStateToProps)(Blacklist);