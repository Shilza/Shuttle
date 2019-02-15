import Http from "../Http";


export function getNotifications() {
    return new Promise((resolve, reject) => {
            Http.get('/api/v1/notifications')
                .then(({data}) => resolve(data))
                .catch(err => reject(err))
        }
    );
}