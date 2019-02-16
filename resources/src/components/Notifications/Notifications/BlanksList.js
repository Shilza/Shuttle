import React from "react";
import NotificationBlank from "./NotificationBlank";

const BlanksList = ({count}) => {
    const getNotificationsBlanks = () => {
        const notificationsBlanks = [];

        for (let i = 0; i < count; i++)
            notificationsBlanks.push(<NotificationBlank key={i}/>);

        return notificationsBlanks;
    };

    return (
        <>
            {
                getNotificationsBlanks()
            }
        </>
    );
};

export default BlanksList;