(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1214:function(e,a,t){"use strict";var n=t(1),r=t.n(n),c=t(1216),i=t.n(c);a.a=function(e){var a=e.children,t=e.icon,n=e.text;return r.a.createElement("div",{className:i.a.sectionContainer},r.a.createElement("div",{className:i.a.iconContainer},t),r.a.createElement("span",{className:i.a.sectionLabel},n),a)}},1216:function(e,a,t){e.exports={sectionContainer:"explainingLabels_sectionContainer__1n9BX",iconContainer:"explainingLabels_iconContainer__1r1N2",sectionLabel:"explainingLabels_sectionLabel__Jgmvz"}},1225:function(e,a,t){"use strict";t.d(a,"a",function(){return c}),t.d(a,"b",function(){return i});var n=t(18),r=t(19),c=function(e){return n.a.get("".concat(r.a.dialogs,"?page=").concat(e))},i=function(e,a){return n.a.get("".concat(r.a.dialogs,"/").concat(e,"?page=").concat(a))}},1247:function(e,a,t){"use strict";var n=t(22),r=t(26),c=t(13),i=t(1),s=t(190),o=t(361),u=t(1225),l={dialogs:[]},d="SET_DIALOGS",f="ADD_DIALOGS",g="SET_IS_TYPING",m="READ_MESSAGES";function p(e,a){switch(a.type){case d:return Object(c.a)({},e,{dialogs:a.payload});case f:return Object(c.a)({},e,{dialogs:Object(s.a)([].concat(Object(r.a)(e.dialogs),Object(r.a)(a.payload)))});case g:return Object(c.a)({},e,{dialogs:e.dialogs.map(function(e){return e.user.id===a.payload.userId?(e.isTyping=a.payload.state,Object(c.a)({},e)):e})});case m:return Object(c.a)({},e,{dialogs:e.dialogs.map(function(e){return e.read||e.user.id!==a.payload?e:(e.read=!0,Object(c.a)({},e))})})}}var _=function(e){return{type:d,payload:e}},b=function(e){return{type:f,payload:e}},v=function(e){return{type:g,payload:e}};a.a=function(){var e=Object(i.useReducer)(p,l),a=Object(n.a)(e,2),t=a[0].dialogs,c=a[1],s=Object(i.useRef)([]),d=Object(i.useRef)([]),f=Object(i.useRef)(!1),g=Object(i.useCallback)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return u.a(e).then(function(e){var a=e.data;return f.current||(f.current=!0),s.current=[].concat(Object(r.a)(s.current),Object(r.a)(a.data)),c(b(a.data)),a})},[f,s]);return{dialogs:t,addMessage:function(e){var a=s.current.findIndex(function(a){return a.user.id===e.owner_id});s.current=-1!==a?s.current.map(function(a){return a.user.id===e.owner_id&&(a=e),a}):[].concat(Object(r.a)(s.current),[e]),s.current=s.current.sort(function(e,a){return new Date(a.created_at)-new Date(e.created_at)}),c(_(s.current))},search:function(e){if(e.length>0){var a=s.current.map(function(a){if(a.user&&a.user.username&&a.user.username.startsWith(e))return a}).filter(Boolean);c(_("undefined"===typeof a?[]:a))}else t.length!==s.current.length&&c(_(s.current))},privateSearch:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(e.length>0)return o.a(e,a).then(function(e){var t=e.data;return c(1===a?_(t.data):b(t.data)),t});t.length!==s.current.length&&c(_(s.current))},readAllMessages:function(e){c({type:m,payload:e})},setIsTyping:function(e){c(v({userId:e,state:!0}));var a=d.current.find(function(a){return a.userId===e});a&&(clearInterval(a.timerId),d.current=d.current.filter(function(a){return a.userId!==e}));var t=Date.now(),n=setTimeout(function(){t+1500<=Date.now()&&(d.current=d.current.filter(function(a){return a.userId!==e}),c(v({userId:e,state:!1})))},1600);d.current.push({timerId:n,userId:e})},fetchDialogs:g,firstLoading:f.current,defaultDialogs:s.current}}},1261:function(e,a,t){"use strict";var n=t(22),r=t(1),c=t.n(r),i=function(e){var a=e.className,t=Object(r.useState)(3),i=Object(n.a)(t,2),s=i[0],o=i[1];return Object(r.useEffect)(function(){var e=setTimeout(function(){o(3===s?1:s+1)},300);return function(){return clearTimeout(e)}}),c.a.createElement("span",{className:a},"is typing ",".".repeat(s))};t.d(a,"a",function(){return i})},1409:function(e,a,t){e.exports={container:"dialog_container__3OWkF",unreadContainer:"dialog_unreadContainer__3wec2 dialog_container__3OWkF",infoContainer:"dialog_infoContainer__3CH20",infoHeader:"dialog_infoHeader__2nIIN",username:"dialog_username__2UrDo",avatar:"dialog_avatar__2cC0x",text:"dialog_text__LeY7b",myMessageIsUnread:"dialog_myMessageIsUnread__3YHSS dialog_text__LeY7b"}},1411:function(e,a,t){e.exports={container:"dialogs_container__3byAz",labelContainer:"dialogs_labelContainer__2gUuQ"}},1456:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),c=t(37),i=(t(59),t(17)),s=t(1214),o=function(){return r.a.createElement(s.a,{icon:r.a.createElement(i.a,{type:"message",style:{fontSize:"24px"}}),text:"No messages yet"},r.a.createElement("span",null,"Write a message to one of your friends, it's easy!"))},u=t(1247),l=t(359),d=t(0),f=t.n(d),g=t(224),m=t(196),p=t(1446),_=t(27),b=t.n(_),v=t(94),y=t(1261),h=t(1409),E=t.n(h),I=function(e){var a=e.ownerId,t=e.username,n=e.avatar,c=e.text,i=e.read,s=e.myId,o=e.createdAt,u=e.isTyping,l=c.match(/https?:\/\/[^"' ]+\.(?:png|jpg|jpeg|gif|mp4).*?(?=( |$))/g,""),d=l&&l.length>0&&"Image",f=c.match(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/i),g=f&&f.length>=2&&f[1]===window.location.host&&"Post";return r.a.createElement("div",{className:i||a===s?E.a.container:E.a.unreadContainer},r.a.createElement(p.a,{to:"/".concat(t),className:E.a.avatar},n?r.a.createElement("img",{src:n,alt:"avatar"}):r.a.createElement(v.a,{fontSize:"30px"})),r.a.createElement(p.a,{to:"/u/messages/".concat(t),className:E.a.infoContainer},r.a.createElement("div",{className:E.a.infoHeader},r.a.createElement("span",{className:E.a.username},t),r.a.createElement("time",{dateTime:o},b()(new Date(o),"YYYYMMDD").fromNow())),u?r.a.createElement(y.a,null):r.a.createElement("div",{className:i||a!==s?E.a.text:E.a.myMessageIsUnread},g||d||c)))},O=r.a.memo(function(e){var a=e.dialogs,t=e.myId,n=e.fetchDialogs,c=e.search;return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{search:c}),r.a.createElement(m.a,{fetcher:n},a.map(function(e,a){return r.a.createElement(I,{key:a,avatar:e.user.avatar,ownerId:e.owner_id,username:e.user.username,text:e.message,myId:t,read:e.read,createdAt:e.created_at,isTyping:e.isTyping})})))});O.propTypes={dialogs:f.a.array,myId:f.a.number.isRequired,search:f.a.func.isRequired,fetchDialogs:f.a.func.isRequired};var j=O,w=t(1411),N=t.n(w),D=Object(c.b)(function(e){return{myId:e.auth.user.id}})(function(e){var a=e.myId,t=Object(u.a)(),c=t.dialogs,i=t.addMessage,s=t.readAllMessages,d=t.search,f=t.setIsTyping,g=t.firstLoading,m=t.fetchDialogs,p=t.defaultDialogs,_=Object(n.useMemo)(function(){return"dialogs:".concat(a)},[a]);return Object(n.useEffect)(function(){var e=l.a.getSubscription(_),a=function(e){switch(e.type){case l.c.MESSAGE:i(e.message);break;case l.c.CONNECTION:case l.c.READ:s(e.receiver_id);break;case l.c.IS_TYPING:f(e.owner_id)}};if(e)return e.on("message",a),function(){return e.off("message",a)}},[]),r.a.createElement("div",{className:N.a.container},g&&0===p.length?r.a.createElement("div",{className:N.a.labelContainer},r.a.createElement(o,null)):r.a.createElement(j,{dialogs:c,search:d,fetchDialogs:m,myId:a}))});t.d(a,"default",function(){return D})}}]);
//# sourceMappingURL=16.b32bfece.chunk.js.map