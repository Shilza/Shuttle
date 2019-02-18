import {ADD_NOTIFICATIONS} from "../actionTypes/notifications";

const initialState = {
    notifications: []
};

const Notifications = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ADD_NOTIFICATIONS:
            return addNotifications(state, payload);
        default:
            return state;
    }
};

const addNotifications = (state, notifications) => ({
    ...state,
    notifications: {
        ...notifications,
        data: state.notifications.data ? state.notifications.data.concat(notifications.data) : notifications.data
    }
});

export default Notifications;