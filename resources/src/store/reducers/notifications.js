import {ADD_NOTIFICATIONS} from "../actionTypes/notifications";
import {AUTH_LOGOUT} from "../actionTypes/auth";

const initialState = {
    notifications: []
};

const Notifications = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ADD_NOTIFICATIONS:
            return addNotifications(state, payload);
        case AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

const addNotifications = (state, notifications) => ({
    ...state,
    notifications: {
        ...notifications,
        data: state.notifications.data ? [...state.notifications.data, ...notifications.data] : notifications.data
    }
});

export default Notifications;