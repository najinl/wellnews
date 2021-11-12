(this.webpackJsonpwellnews=this.webpackJsonpwellnews||[]).push([[0],{16:function(e,t,c){},17:function(e,t,c){},18:function(e,t,c){},27:function(e,t,c){},37:function(e,t,c){},38:function(e,t,c){},39:function(e,t,c){},40:function(e,t,c){},41:function(e,t,c){},42:function(e,t,c){"use strict";c.r(t);var n=c(1),i=c.n(n),s=c(19),r=c.n(s),a=c(22),l=c(8),o=c(3),d=c(2),u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"home";return fetch("https://api.nytimes.com/svc/topstories/v2/".concat(e,".json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr")).then((function(e){return j(e)})).then((function(e){return m(e.results.slice(0,10))}))},j=function(e){if(!e.ok)throw new Error("".concat(e.status," Error"));return e.json()},m=function(e){return e.map((function(e){var t=e.section,c=e.title,n=e.abstract,i=e.short_url,s=e.multimedia,r=e.url;return{topic:t,title:c,abstract:n,short_url:i,sentiment:0,multimedia:s[0],id:r.slice(24,-5).replace(/\//g,"-")}}))},b=(c(27),c(0)),h=function(e){var t=e.updateUserSentiment,c=Object(d.f)(),n=function(e){t(e),c.push("/feed")};return Object(b.jsxs)("section",{className:"questionnaire",children:[Object(b.jsx)("header",{className:"questionnaire-header",children:Object(b.jsx)("div",{className:"blue-stripe",children:Object(b.jsxs)("h1",{className:"header-text cy-header-text",children:["Well",Object(b.jsx)("span",{className:"header-text-2",children:"News"})]})})}),Object(b.jsx)("h2",{className:"cy-sentiment-question",children:"What kind of mood are you in?"}),Object(b.jsxs)("div",{className:"sentiments-container",children:[Object(b.jsx)("button",{className:"sentiment-btn cy-strongly-negative-btn","aria-label":"strongly negative",title:"strongly negative",onClick:function(){return n(0)},children:"\u2639\ufe0f"}),Object(b.jsx)("button",{className:"sentiment-btn cy-negative-btn","aria-label":"negative",title:"negative",onClick:function(){return n(2)},children:"\ud83d\ude41"}),Object(b.jsx)("button",{className:"sentiment-btn cy-neutral-btn","aria-label":"neutral",title:"neutral",onClick:function(){return n(5)},children:"\ud83d\ude36"}),Object(b.jsx)("button",{className:"sentiment-btn cy-positive-btn","aria-label":"positive",title:"positive",onClick:function(){return n(8)},children:"\ud83d\ude42"}),Object(b.jsx)("button",{className:"sentiment-btn cy-strongly-positive-btn","aria-label":"strongly positive",title:"strongly positive",onClick:function(){return n(10)},children:"\ud83d\ude01"})]}),Object(b.jsx)("button",{className:"skip-btn",onClick:function(){return n(5)},children:"Skip"}),Object(b.jsx)("button",{className:"view-synopsis-button cy-view-synopsis-button",name:"viewSynopsisButton",onClick:function(e){e.preventDefault(),document.getElementById("synopsisInfo").classList.toggle("hidden")},children:"Why we ask? \u25bd"}),Object(b.jsxs)("article",{className:"hidden wellnews-synopsis cy-wellnews-synopsis",id:"synopsisInfo",children:[Object(b.jsx)("p",{children:"Based on your mood and the articles you read, we dynamically sort your feed and nudge you toward sentimental balance. We don't filter your feed."}),Object(b.jsx)("p",{children:"If you prefer, skip the questionnare and we'll sort your feed based only on the articles you read."})]})]})},O=(c(16),function(e){var t=e.title,c=e.image,n=e.id,i=e.sentiment,s=e.topic,r=e.updateUserSentiment,a=e.storeArticle;return Object(b.jsx)("div",{className:"article-boundary",children:Object(b.jsx)("div",{className:"card-container",children:Object(b.jsxs)("article",{className:"news-card cy-article-card",children:[Object(b.jsxs)(o.b,{to:"/feed/".concat(n),onClick:function(){a(n),r(i)},className:"cy-article-link",children:[Object(b.jsxs)("div",{className:"article-image-container",children:[i>=7&&Object(b.jsx)("h3",{className:"article-sentiment green",children:i}),i<=3&&Object(b.jsx)("h3",{className:"article-sentiment red",children:i}),i>=4&&i<=6&&Object(b.jsx)("h3",{className:"article-sentiment blue",children:i}),Object(b.jsx)("img",{className:"article-image cy-article-image",src:c,alt:t})]}),Object(b.jsx)("div",{className:"topic-container",children:Object(b.jsx)("p",{className:"topic-text",children:s})}),Object(b.jsx)("h2",{className:"article-title cy-article-title",children:t})]}),Object(b.jsx)("div",{className:"divider"})]})})})}),p=(c(17),function(){return Object(b.jsx)("header",{className:"header",children:Object(b.jsxs)("div",{className:"header-elements-container",children:[Object(b.jsx)(o.b,{to:"/",children:Object(b.jsx)("button",{className:"check-in-btn",children:Object(b.jsx)("span",{className:"check-in-text",children:"Check In"})})}),Object(b.jsxs)("h1",{className:"header-txt cy-header-txt",children:["Well",Object(b.jsx)("span",{className:"header-text-2",children:"News"})]}),Object(b.jsx)(o.b,{to:"/history",children:Object(b.jsx)("button",{className:"history-btn",children:"History"})}),Object(b.jsx)(o.b,{to:"/search-topic",children:Object(b.jsx)("button",{className:"list-btn","aria-label":"Browse by Topic"})})]})})}),x=(c(18),function(e){var t=e.unreadArticles,c=e.updateUserSentiment,n=e.storeArticle,i=[];return t&&(i=t.map((function(e){return Object(b.jsx)(O,{title:e.title,image:e.multimedia.url,id:e.id,sentiment:e.sentiment,topic:e.topic,updateUserSentiment:c,storeArticle:n},e.title)}))),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(p,{}),Object(b.jsx)("div",{className:"articles-container",children:Object(b.jsx)("section",{className:"articles-display",children:i.length?i:Object(b.jsx)(o.b,{to:"/search-topic",children:Object(b.jsx)("button",{className:"find-more-btn",children:"Find more articles by topic"})})})})]})}),f=(c(37),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. A diam maecenas sed enim. Ipsum dolor sit amet consectetur. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Tellus integer feugiat scelerisque varius morbi. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. Gravida neque convallis a cras semper auctor. Suspendisse in est ante in nibh mauris cursus mattis molestie."),g=function(e){var t=e.title,c=e.image,n=e.abstract,i=e.caption;e.selectedTopic;return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(p,{}),Object(b.jsxs)("section",{className:"single-article-container",children:[Object(b.jsxs)("figure",{children:[Object(b.jsx)("img",{src:c,alt:i,className:"single-article-image cy-single-article-image"}),Object(b.jsx)("figcaption",{className:"single-article-caption cy-single-article-caption",children:i})]}),Object(b.jsx)("h2",{className:"single-article-title cy-single-article-title",children:t}),Object(b.jsx)("p",{className:"cy-single-article-abstract",children:n}),Object(b.jsx)("p",{children:f}),Object(b.jsx)("p",{children:f}),Object(b.jsx)("p",{children:f}),Object(b.jsx)("p",{children:f}),Object(b.jsx)("p",{children:f})]})]})},y=(c(38),function(e){var t=e.assignTopic,c=["arts","automobiles","books","business","fashion","food","health","home","insider","magazine","movies","nyregion","obituaries","opinion","politics","realestate","science","sports","sundayreview","technology","theater","t-magazine","travel","upshot","us","world"].map((function(e){return Object(b.jsx)(o.b,{className:"topic",to:"/feed/".concat(e),onClick:function(){return t(e)},children:e},e)}));return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(p,{}),Object(b.jsx)("h3",{className:"browse-topics",children:"Browse articles by topic:"}),Object(b.jsx)("form",{className:"cy-topic-selection",children:c})]})}),N=function(e){var t=e.title,c=e.image,n=e.id,i=e.sentiment,s=e.topic,r=e.updateUserSentiment,a=e.selectedTopic,l=e.storeArticle;return Object(b.jsx)("div",{className:"card-container",children:Object(b.jsxs)("article",{className:"news-card cy-article-card",children:[Object(b.jsxs)(o.b,{to:"/feed/".concat(a,"/").concat(n),onClick:function(){r(i),l(n)},className:"cy-article-link",children:[Object(b.jsxs)("div",{className:"article-image-container",children:[i>=7&&Object(b.jsx)("h3",{className:"article-sentiment green",children:i}),i<=3&&Object(b.jsx)("h3",{className:"article-sentiment red",children:i}),i>=4&&i<=6&&Object(b.jsx)("h3",{className:"article-sentiment blue",children:i}),Object(b.jsx)("img",{className:"article-image cy-article-image",src:c,alt:t})]}),Object(b.jsx)("div",{className:"topic-container",children:Object(b.jsx)("p",{className:"topic-text",children:s})}),Object(b.jsx)("h2",{className:"article-title cy-article-title",children:t})]}),Object(b.jsx)("div",{className:"divider"})]})})},v=function(e){var t=e.unreadArticles,c=e.updateUserSentiment,n=e.selectedTopic,i=e.storeArticle,s=[];return t&&(s=t.map((function(e){return Object(b.jsx)(N,{title:e.title,image:e.multimedia.url,id:e.id,sentiment:e.sentiment,updateUserSentiment:c,storeArticle:i,selectedTopic:n,topic:e.topic},e.title)}))),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(p,{}),Object(b.jsx)("div",{className:"articles-container",children:Object(b.jsx)("section",{className:"articles-display",children:s.length>0?s:Object(b.jsx)(o.b,{to:"/search-topic",children:Object(b.jsx)("button",{className:"find-more-btn",children:"Find more articles by topic"})})})})]})},w=(c(39),function(){var e=Object(d.g)();return Object(b.jsxs)("div",{children:[Object(b.jsxs)("h3",{className:"cy-error-message",children:["No match for ",Object(b.jsx)("code",{children:e.pathname})]}),Object(b.jsx)(o.b,{to:"/feed",className:"cy-feed-link",children:"Back to Feed"})]})}),S=(c(40),function(e){var t=e.history,c=e.storeArticle,n=e.updateUserSentiment,i=[];return t&&(i=t.map((function(e){return Object(b.jsx)(O,{title:e.title,image:e.multimedia.url,sentiment:e.sentiment,id:e.id,topic:e.topic,storeArticle:c,updateUserSentiment:n},e.title)}))),Object(b.jsx)("div",{className:"articles-container",children:Object(b.jsx)("section",{className:"articles-display",children:i.length?i:Object(b.jsx)("h3",{children:"No history"})})})}),k=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),c=t[0],i=t[1],s=Object(n.useState)([]),r=Object(l.a)(s,2),m=r[0],O=r[1],f=Object(n.useState)([]),N=Object(l.a)(f,2),k=N[0],A=N[1],U=Object(n.useState)(""),C=Object(l.a)(U,2),I=C[0],T=C[1],q=Object(n.useState)(null),F=Object(l.a)(q,2),B=F[0],E=F[1],J=Object(n.useState)([]),M=Object(l.a)(J,2),W=(M[0],M[1],Object(n.useState)("")),H=Object(l.a)(W,2),L=H[0],z=H[1];Object(n.useEffect)((function(){u().then((function(e){X(e).then((function(t){var c=e.map((function(e,c){return e.sentiment=Math.round(5*(t[c]+1)),e}));i(c)}))})).catch((function(e){return T(e.message)}))}),[]),Object(n.useEffect)((function(){var e=D();i(e)}),[B]),Object(n.useEffect)((function(){var e=G();O(e)}),[c,k]);var D=function(){return B>=0&&B<=3?c.slice().sort((function(e,t){return t.sentiment-e.sentiment})):B<=10&&B>=7?c.slice().sort((function(e,t){return e.sentiment-t.sentiment})):c.slice().sort((function(e,t){return.5-Math.random()}))},G=function(){return k.length?c.filter((function(e){return!k.find((function(t){return t.id===e.id}))})):c},X=function(e){return Promise.all(e.map((function(e){return t=e.title,c=e.abstract,fetch("https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=".concat(t+" "+c,"&token=8e05e6c7e8c24d05bb09b53e7f472df2")).then((function(e){return j(e)})).then((function(e){return e.sentiment.score})).catch((function(e){return console.log("error: ",e)}));var t,c})))},_=function(e){if(null===B)return E(e);E((B+e)/2)},K=function(e){var t=c.find((function(t){return t.id===e})),n=JSON.parse(localStorage.getItem("wellnewsHistory"));if(!n)return localStorage.setItem("wellnewsHistory",JSON.stringify([e])),A([t]);n.includes(e)||(n.push(e),localStorage.setItem("wellnewsHistory",JSON.stringify(n)),A([].concat(Object(a.a)(k),[t])))};return Object(b.jsx)("div",{className:"app-container",children:Object(b.jsx)(o.a,{children:Object(b.jsxs)(d.c,{children:[Object(b.jsx)(d.a,{exact:!0,path:"/",children:Object(b.jsx)(h,{updateUserSentiment:_})}),Object(b.jsx)(d.a,{exact:!0,path:"/feed",render:function(){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(x,{unreadArticles:m,updateUserSentiment:_,storeArticle:K}),0===c.length&&Object(b.jsx)("h2",{className:"loading-text",children:"Loading... "}),I&&Object(b.jsx)("h2",{children:I})]})}}),Object(b.jsx)(d.a,{exact:!0,path:"/feed/".concat(L),render:function(){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(v,{unreadArticles:m,updateUserSentiment:_,selectedTopic:L,storeArticle:K}),!c.length&&Object(b.jsx)("h2",{children:"Loading.. "}),I&&Object(b.jsx)("h2",{children:I})]})}}),Object(b.jsx)(d.a,{exact:!0,path:"/search-topic",children:Object(b.jsx)(y,{assignTopic:function(e){z(e),u(e).then((function(e){X(e).then((function(t){var c=e.map((function(e,c){return e.sentiment=Math.round(5*(t[c]+1)),e}));i(c)}))})).catch((function(e){return T(e.message)}))}})}),Object(b.jsx)(d.a,{exact:!0,path:"/feed/:id",render:function(e){var t=e.match.params.id,n=c.find((function(e){return e.id===t}));return n?Object(b.jsx)(g,{title:n.title,image:n.multimedia.url,caption:n.multimedia.caption,abstract:n.abstract,selectedTopic:L},n.title):Object(b.jsx)(w,{})}}),Object(b.jsx)(d.a,{exact:!0,path:"/feed/".concat(L,"/:id"),render:function(e){var t=e.match.params.id,n=c.find((function(e){return e.id===t}));return n?Object(b.jsx)(g,{title:n.title,image:n.multimedia.url,caption:n.multimedia.caption,abstract:n.abstract,selectedTopic:L},n.title):Object(b.jsx)(w,{})}}),Object(b.jsx)(d.a,{exact:!0,path:"/history",render:function(){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(p,{}),Object(b.jsx)(S,{history:k,storeArticle:K,updateUserSentiment:_}),I&&Object(b.jsx)("h2",{children:I})]})}}),Object(b.jsx)(d.a,{path:"*",component:w})]})})})};c(41);r.a.render(Object(b.jsx)(i.a.StrictMode,{children:Object(b.jsx)(k,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.d9942759.chunk.js.map