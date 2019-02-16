import * as ActionTypes from "../actionTypes/likes";


export function like(payload){
    return {
        type: getLikeType(payload.type),
        payload: payload.entity_id
    }
}

export function unlike(payload){
    return {
        type: getUnlikeType(payload.type),
        payload: payload.entity_id
    }
}

const getLikeType = type => {
    switch (type) {
        case 'comment':
            return ActionTypes.COMMENT_LIKE;
        case 'post':
            return ActionTypes.POST_LIKE;
        default:
    }
};

const getUnlikeType = type => {
    switch (type) {
        case 'comment':
            return ActionTypes.COMMENT_UNLIKE;
        case 'post':
            return ActionTypes.POST_UNLIKE;
        default:
    }
};