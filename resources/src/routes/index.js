import React, {useEffect} from 'react'
import {BrowserRouter, Switch} from 'react-router-dom'
import {routes} from './routes'
import PublicRoute from "./Public";
import PrivateRoute from "./Private";
import ws from "../Ws"
import {types as WsTypes} from "../Ws"
import {addUnreadDialog} from "../store/actions/auth"
import {connect} from "react-redux"

const Routes = ({myId, dispatch}) => {
  useEffect(() => {
    const topicName = `dialogs:${myId}`
    let wsThread = ws.getSubscription(topicName);
    if (Object.is(wsThread, undefined))
      wsThread = ws.subscribe(topicName);

    wsThread.on('message', ({type, message}) => {
      const arr = window.location.href.split('/');
      if (type === WsTypes.MESSAGE && message.owner_id !== myId && arr[arr.length - 2] !== 'messages')
        dispatch(addUnreadDialog(message.owner_id));
    });

    return () => wsThread.close();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {
          routes.map((route, i) => {
              if (route.auth)
                return <PrivateRoute key={i} {...route}/>;
              else
                return <PublicRoute key={i} {...route}/>;
            }
          )}
      </Switch>
    </BrowserRouter>
  );
}

export default connect(state => ({myId: state.auth.user.id}))(Routes);
