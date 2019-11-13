import {NotificationsService} from 'services';

const initialState = [];

export const notifications = {
  state: [],
  reducers: {
    addNotifications(state, notifications) {
      return [...state, ...notifications];
    },
    reset() {
      return initialState;
    }
  },
  effects: (dispatch) => ({
    async get(page) {
      const {data} = await NotificationsService.getNotifications(page);
      dispatch.notifications.addNotifications(data.data);
      dispatch.auth.resetNotifications();
      return data;
    }
  })
};
