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