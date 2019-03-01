import React from "react";
import PropTypes from 'prop-types';
import {getBlacklisted} from "../../services/user";
import Blacklisted from "./Blacklisted";
import style from './blacklist.module.css';
import {connect} from "react-redux";
import Paginator from "../../components/Paginator/Paginator";

const Blacklist = ({dispatch, blacklisted}) => {

    const fetchBlacklisted = page => dispatch(getBlacklisted(page));

    return (
        <div className={style.blacklistContainer}>
            <span className={style.title}>Blacklist</span>
            <Paginator
                fetcher={fetchBlacklisted}
            >
                <div className={style.cardsList}>
                    {
                        blacklisted &&
                        blacklisted.map(user => <Blacklisted key={user.id} {...user}/>)
                    }
                </div>
            </Paginator>
        </div>
    );
};

Blacklist.propTypes = {
    blackListed: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    blacklisted: state.blacklist.users
});

export default connect(mapStateToProps)(Blacklist);