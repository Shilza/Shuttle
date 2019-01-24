import moment from 'moment';

export function convertTime(time) {
    const now = new Date().getTime();
    const startTime =  moment(time);
    const timeDiff = moment.duration(now - startTime);

    if(Math.round(timeDiff.asSeconds()) < 60)
        return Math.round(timeDiff.asSeconds()) + ' seconds';
    if(Math.round(timeDiff.asSeconds()) >= 60 && Math.round(timeDiff.asMinutes()) < 60)
        return Math.round(timeDiff.asMinutes()) + ' minutes';
    if(Math.round(timeDiff.asMinutes()) >= 60 && Math.round(timeDiff.asHours()) < 24)
        return Math.round(timeDiff.asHours()) + ' hours';
    if(Math.round(timeDiff.asHours()) >= 24 && Math.round(timeDiff.asDays()) < 365)
        return Math.round(timeDiff.asDays()) + ' days';
    if(Math.round(timeDiff.asDays()) >= 365)
        return Math.round(timeDiff.asYears()) + ' years';
}