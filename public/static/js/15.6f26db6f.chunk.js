(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1214:function(e,a,t){"use strict";var n=t(1),i=t.n(n),r=t(1216),o=t.n(r);a.a=function(e){var a=e.children,t=e.icon,n=e.text;return i.a.createElement("div",{className:o.a.sectionContainer},i.a.createElement("div",{className:o.a.iconContainer},t),i.a.createElement("span",{className:o.a.sectionLabel},n),a)}},1216:function(e,a,t){e.exports={sectionContainer:"explainingLabels_sectionContainer__1n9BX",iconContainer:"explainingLabels_iconContainer__1r1N2",sectionLabel:"explainingLabels_sectionLabel__Jgmvz"}},1237:function(e,a,t){e.exports={notificationsList:"notifications_notificationsList__1-p2v",media:"notifications_media__2FjAF",postLink:"notifications_postLink__icYQe",notificationCard:"notifications_notificationCard__35ewz",comment:"notifications_comment__19L_Y",avatar:"notifications_avatar__3-4mO",infoContainer:"notifications_infoContainer___PKJa",infoWrapper:"notifications_infoWrapper__2zZK_",timeContainer:"notifications_timeContainer__3rGyp",usernameLink:"notifications_usernameLink__1zgax",title:"notifications_title__T15Lp"}},1273:function(e,a,t){e.exports={userCardContainer:"userCard_userCardContainer__4XNbz",subContainer:"userCard_subContainer__3sdXk",actionButtons:"userCard_actionButtons__rOOPM",avatar:"userCard_avatar__PVFxj",usernameLink:"userCard_usernameLink__3ZJAl"}},1274:function(e,a,t){e.exports={subReqLabel:"subReq_subReqLabel__1m7Q3",avatar:"subReq_avatar__1E-Ru",avatarContainer:"subReq_avatarContainer__2yk3i",infoContainer:"subReq_infoContainer__2J8G5",subReqTitle:"subReq_subReqTitle__1LiIl",subsContainer:"subReq_subsContainer__PKBiG",title:"subReq_title__1SEV5",cardsContainer:"subReq_cardsContainer__3bbzI"}},1396:function(e,a,t){e.exports={notificationsContainer:"notifications_notificationsContainer__1_l9J"}},1399:function(e,a,t){e.exports={leave:"transitions_leave__14fWt",leaveActive:"transitions_leaveActive__2XlTe",appear:"transitions_appear__1C8qK",appearActive:"transitions_appearActive__YgUe_"}},1402:function(e,a,t){e.exports={container:"styles_container__24gR4",icon:"styles_icon__XMloT",text:"styles_text__3wWl4"}},1405:function(e,a,t){e.exports={icon:"notificationBlank_icon__2GGtC",blink:"notificationBlank_blink__sewHQ",avatarStub:"notificationBlank_avatarStub__2eXQT notificationBlank_icon__2GGtC",usernameStub:"notificationBlank_usernameStub__2XaBf notificationBlank_icon__2GGtC",infoContainer:"notificationBlank_infoContainer__1QqC- notificationBlank_icon__2GGtC",infoStub:"notificationBlank_infoStub__OAyn7",timeStub:"notificationBlank_timeStub__2DP3- notificationBlank_icon__2GGtC",postImgStub:"notificationBlank_postImgStub__2YLHR notificationBlank_icon__2GGtC"}},1407:function(e,a,t){e.exports={leave:"transitions_leave__2Q0q9",leaveActive:"transitions_leaveActive__1A__h",appear:"transitions_appear__2q_4j",appearActive:"transitions_appearActive__1QO7X"}},1454:function(e,a,t){"use strict";t.r(a);var n=t(1),i=t.n(n),r=t(1396),o=t.n(r),c=t(22),s=t(18),l=t(19),u=function(e){return s.a.post(l.a.subRequests,{user_id:e})},m=function(e){return s.a.delete("".concat(l.a.subRequests,"?user_id=").concat(e))},_=t(1446),f=(t(246),t(131)),p=t(1273),v=t.n(p),b=i.a.memo(function(e){var a=e.id,t=e.deleteFromSubsList,r=Object(n.useState)(!1),o=Object(c.a)(r,2),s=o[0],l=o[1],_=Object(n.useState)(!1),p=Object(c.a)(_,2),b=p[0],E=p[1],d=function(e,n){n(),e(a).then(function(){n(),t(a)}).catch(function(){return n()})};return i.a.createElement("div",{className:v.a.actionButtons},i.a.createElement(f.a,{size:"small",loading:s,onClick:function(){return d(u,function(){return l(!1)})}},"Accept"),i.a.createElement(f.a,{size:"small",loading:b,onClick:function(){return d(m,function(){return E(!0)})}},"Deny"))}),E=t(94),d=i.a.memo(function(e){var a=e.user,t=e.deleteFromSubsList,n=a.username,r=a.avatar;return i.a.createElement("div",{className:v.a.userCardContainer},i.a.createElement(_.a,{className:v.a.avatar,to:"/".concat(n)},r?i.a.createElement("img",{src:r,alt:"avatar"}):i.a.createElement(E.a,{fontSize:"30px"})),i.a.createElement("div",{className:v.a.subContainer},i.a.createElement(_.a,{to:"/".concat(n),className:v.a.usernameLink},n),i.a.createElement(b,{id:a.id,deleteFromSubsList:t})))}),C=t(1215),N=t.n(C),k=t(1399),S=t.n(k),L=t(1274),g=t.n(L),h=i.a.memo(function(){var e=Object(n.useState)(void 0),a=Object(c.a)(e,2),t=a[0],r=a[1];Object(n.useEffect)(function(){s.a.get(l.a.subRequests).then(function(e){var a=e.data;return r(a.data)})},[]);var o=function(e){return r(t.filter(function(a){return e!==a.id}))};return i.a.createElement(i.a.Fragment,null,t&&t.length>0&&i.a.createElement("div",{className:g.a.subsContainer},i.a.createElement("span",{className:g.a.title},"Subscription requests"),i.a.createElement(N.a,{transitionName:S.a,transitionAppear:!0,transitionAppearTimeout:300,transitionEnter:!1,transitionLeave:!0,transitionLeaveTimeout:300},i.a.createElement("div",{className:g.a.cardsContainer},t.map(function(e){return i.a.createElement(d,{key:e.id,user:e,deleteFromSubsList:o})})))))}),q=(t(573),t(535)),x=i.a.memo(function(e){var a=e.count,t=e.openList,n=e.avatar;return i.a.createElement(i.a.Fragment,null,!!a&&i.a.createElement("div",{className:g.a.subReqLabel,onClick:t},i.a.createElement(q.a,{count:a,className:g.a.avatarContainer},i.a.createElement("div",{className:g.a.avatar},n?i.a.createElement("img",{src:n,alt:"avatar"}):i.a.createElement(E.a,{fontSize:"30px"}))),i.a.createElement("div",{className:g.a.infoContainer},i.a.createElement("span",{className:g.a.subReqTitle},"Subscriptions"),i.a.createElement("span",null,"Accept or deny"))))}),O=function(){var e=Object(n.useState)(!1),a=Object(c.a)(e,2),t=a[0],r=a[1],o=Object(n.useState)(void 0),u=Object(c.a)(o,2),m=u[0],_=u[1],f=Object(n.useState)(0),p=Object(c.a)(f,2),v=p[0],b=p[1];Object(n.useEffect)(function(){s.a.get("".concat(l.a.subRequests,"/preview")).then(function(e){var a=e.data,t=a.avatar,n=a.count;_(t),b(n)})},[]);return i.a.createElement(i.a.Fragment,null,t?i.a.createElement(h,null):i.a.createElement(x,{count:v,avatar:m,openList:function(){return r(!0)}}))},j=t(37),R=t(354),B=(t(59),t(17)),y=t(1214),A=t(1402),w=t.n(A),G=function(){return i.a.createElement("div",{className:w.a.container},i.a.createElement(y.a,{icon:i.a.createElement(B.a,{type:"bell",className:w.a.icon}),text:"Notifications"},i.a.createElement("span",{className:w.a.text},"Here you can see the photos in which you are marked")))},z=t(1237),F=t.n(z),T=t(1405),X=t.n(T),Y=function(e,a){var t=e+Math.random()*(a+1-e);return t=Math.floor(t)},J=i.a.memo(function(){return i.a.createElement("div",{className:F.a.notificationCard},i.a.createElement("div",{className:X.a.avatarStub}),i.a.createElement("div",{className:F.a.infoWrapper},i.a.createElement("div",{className:X.a.infoContainer},i.a.createElement("span",{className:X.a.usernameStub,style:{width:Y(40,80)}}),i.a.createElement("span",{className:X.a.infoStub,style:{width:Y(30,140)}}),i.a.createElement("span",{className:X.a.infoStub,style:{width:Y(30,140)}})),i.a.createElement("span",{className:X.a.timeStub})),i.a.createElement("div",{className:X.a.postImgStub}))}),Q=t(1407),M=t.n(Q),P=i.a.memo(function(e){var a=e.count;return i.a.createElement(N.a,{transitionName:M.a,transitionAppear:!1,transitionEnter:!1,transitionLeaveTimeout:500},function(){for(var e=[],t=0;t<a;t++)e.push(i.a.createElement(J,{key:t}));return e}())}),W=t(27),D=t.n(W),I=function(e){var a=e.link,t=e.postSrc;return i.a.createElement(_.a,{to:a,className:F.a.postLink},t.match(".mp4")?i.a.createElement("video",{src:t,className:F.a.media}):i.a.createElement("img",{src:t,alt:"Post mini pic",className:F.a.media}))},K=function(e){var a,t=e.item,n=t.username,r=t.avatar,o=t.info,c=t.post_src,s=t.text,l=t.created_at;return c&&(a="/p/".concat(c.match(/.+?\/.+?\/(.+?)\.+/)[1])),i.a.createElement("div",{className:F.a.notificationCard},i.a.createElement(_.a,{to:"/".concat(n),className:F.a.avatar},r?i.a.createElement("img",{src:r,alt:"avatar"}):i.a.createElement(E.a,{fontSize:"30px"})),i.a.createElement("div",{className:F.a.infoWrapper},i.a.createElement("div",{className:F.a.infoContainer},i.a.createElement(_.a,{to:"/".concat(n),className:F.a.usernameLink},i.a.createElement("span",null,n)),i.a.createElement("span",null,o),s&&i.a.createElement(_.a,{to:a,className:F.a.comment},s)),i.a.createElement("span",{className:F.a.timeContainer},i.a.createElement("time",null,D()(new Date(l),"YYYYMMDD").fromNow()))),c&&i.a.createElement(I,{postSrc:c,link:a}))},H=Object(j.b)(function(e){return{notificationsCount:e.auth.user.notificationsCount,notifications:e.notifications}})(function(e){var a=e.notificationsCount,t=e.dispatch,r=e.notifications,o=Object(n.useState)(!1),s=Object(c.a)(o,2),l=s[0],u=s[1],m=Object(n.useCallback)(function(e){return t.notifications.get(e).then(function(e){return l||u(!0),e})},[]);return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:r.length>0?F.a.notificationsList:""},r.length>0&&i.a.createElement("span",{className:F.a.title},"Notifications"),i.a.createElement(P,{count:a}),i.a.createElement(R.a,{fetcher:m},!!r&&r.map(function(e,a){return i.a.createElement(K,{key:a,item:e})}))),l&&0===r.length&&i.a.createElement(G,null))}),V=function(){return i.a.createElement("div",{className:o.a.notificationsContainer},i.a.createElement(O,null),i.a.createElement(H,null))};t.d(a,"default",function(){return V})}}]);
//# sourceMappingURL=15.6f26db6f.chunk.js.map