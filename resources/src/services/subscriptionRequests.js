import Http from "../Http";

export function getSubsRequestsPreview() {
    return new Promise((resolve, reject) => {
            Http.get('/api/v1/subRequests/preview')
                .then(({data}) => resolve(data))
                .catch(err => reject(err))
        }
    );
}

export function getSubsRequests() {
    return new Promise((resolve, reject) => {
            Http.get('/api/v1/subRequests')
                .then(({data}) => resolve(data))
                .catch(err => reject(err))
        }
    );
}

export function acceptSubsRequest(user_id) {
    return new Promise((resolve, reject) => {
            Http.post('/api/v1/subRequests', {user_id})
                .then(() => resolve())
                .catch(err => reject())
        }
    );
}

export function cancelSubsRequest(userId) {
    return new Promise((resolve, reject) => {
            Http.delete('/api/v1/subRequests?user_id=' + userId)
                .then(() => resolve())
                .catch(err => reject())
        }
    );
}
