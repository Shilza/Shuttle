import React from "react";
import {Button, Icon} from "antd";
import {connect} from "react-redux";
import {follow, unfollow} from "../../../services/friendships";

const Direction = ({username, currentAuthId, id, isFollows, dispatch}) => {

    const friendships = () => isFollows ?
        dispatch(unfollow({id})) :
        dispatch(follow({id}));

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{fontSize: 20, marginRight: 20}}>
                {username}
            </span>
            {
                id === currentAuthId ?
                    <>
                        <Button size='small' style={{marginRight: '10px'}}>
                            Edit
                        </Button>
                        <Icon type="setting"/>
                    </>
                    :
                    <Follow isFollows={isFollows} friendships={friendships}/>
            }
        </div>
    );
};

const Follow = ({isFollows, friendships}) => (
    <Button size={'small'} onClick={friendships}>
        {isFollows ? 'Unollow' : 'Follow'}
    </Button>
);

const mapStateToProps = state => {
    return {
        currentAuthId: state.auth.user.id
    }
};

export default connect(mapStateToProps)(Direction);