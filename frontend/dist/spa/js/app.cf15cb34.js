(function(t){function e(e){for(var r,o,u=e[0],c=e[1],s=e[2],l=0,d=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&d.push(i[o][0]),i[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);f&&f(e);while(d.length)d.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,o=1;o<n.length;o++){var u=n[o];0!==i[u]&&(r=!1)}r&&(a.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},o={3:0},i={3:0},a=[];function u(t){return c.p+"js/"+({}[t]||t)+"."+{1:"e942c538",2:"fd373cc6",4:"cc86c098",5:"626cf2ea",6:"0b7d3db3"}[t]+".js"}function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={1:1,4:1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=new Promise((function(e,n){for(var r="css/"+({}[t]||t)+"."+{1:"8d533dd5",2:"31d6cfe0",4:"1af08926",5:"31d6cfe0",6:"31d6cfe0"}[t]+".css",i=c.p+r,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var s=a[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===i))return e()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){s=d[u],l=s.getAttribute("data-href");if(l===r||l===i)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var r=e&&e.target&&e.target.src||i,a=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[t],f.parentNode.removeChild(f),n(a)},f.href=i;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){o[t]=0})));var r=i[t];if(0!==r)if(r)e.push(r[2]);else{var a=new Promise((function(e,n){r=i[t]=[e,n]}));e.push(r[2]=a);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=u(t);var d=new Error;s=function(e){l.onerror=l.onload=null,clearTimeout(f);var n=i[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}i[t]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var d=0;d<s.length;d++)e(s[d]);var f=l;a.push([0,0]),n()})({0:function(t,e,n){t.exports=n("2f39")},"034f":function(t,e,n){"use strict";var r=n("ed82"),o=n.n(r);o.a},"2f39":function(t,e,n){"use strict";n.r(e);var r={};n.r(r),n.d(r,"setAuthState",(function(){return C}));var o={};n.r(o),n.d(o,"createNewUser",(function(){return U})),n.d(o,"loginUser",(function(){return _})),n.d(o,"logoutUser",(function(){return L})),n.d(o,"routeUserToAuth",(function(){return T}));var i={};n.r(i),n.d(i,"auth",(function(){return z})),n.d(i,"ensureAuthIsInitialized",(function(){return M})),n.d(i,"fBInit",(function(){return J})),n.d(i,"handleOnAuthStateChanged",(function(){return K})),n.d(i,"isAuthenticated",(function(){return F})),n.d(i,"logoutUser",(function(){return Q}));var a={};n.r(a),n.d(a,"createUserWithEmail",(function(){return H})),n.d(a,"loginWithEmail",(function(){return X}));n("5319");var u=n("c973"),c=n.n(u),s=(n("573e"),n("7d6e"),n("985d"),n("31cd"),n("2b0e")),l=n("1f91"),d=n("b3f7"),f=n("b05d"),h=n("2a19"),p=n("f508");s["default"].use(f["a"],{config:{},lang:l["a"],iconSet:d["a"],plugins:{Notify:h["a"],Loading:p["a"]}});var v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"q-app"}},[n("transition",{attrs:{name:"fade"}},[n("router-view")],1)],1)},m=[],g=n("e4fd"),b=n.n(g),y=Object(g["defineComponent"])({name:"App"}),w=y,P=(n("034f"),n("2877")),A=Object(P["a"])(w,v,m,!1,null,null,null),j=A.exports,O=n("4bde"),x=n("2f62"),E=n("6d04"),S=n.n(E),k=n("9a1a");function C(t,e){t.isAuthenticated=e.isAuthenticated,t.isReady=e.isReady}var I=function(t,e,n,r){function o(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,i){function a(t){try{c(r.next(t))}catch(e){i(e)}}function u(t){try{c(r["throw"](t))}catch(e){i(e)}}function c(t){t.done?n(t.value):o(t.value).then(a,u)}c((r=r.apply(t,e||[])).next())}))};const U=function(t,e){const n=this.$fb,{email:r,password:o}=e;return n.createUserWithEmail(r,o)},_=function(t,e){const n=this.$fb,{email:r,password:o}=e;return n.loginWithEmail(r,o)},L=function(){return I(this,void 0,void 0,(function*(){const t=this.$fb;yield t.logoutUser()}))};function T(){this.$router.push({path:"/auth/login"})}var $={namespaced:!0,getters:k,mutations:r,actions:o,state:S.a},B=Object(O["store"])((function({Vue:t}){t.use(x["a"]);const e=new x["a"].Store({modules:{auth:$},strict:!1});return e})),N=n("8c4f");const V=[{path:"/",component:()=>Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"713b")),children:[{path:"",component:()=>Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"8b24"))}]},{path:"/auth",component:()=>Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"713b")),children:[{path:"forgotPassword",name:"ForgotPassword",component:()=>Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"1613"))},{path:"login",name:"Login",component:()=>Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"21f3"))},{path:"register",name:"Register",component:()=>Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"21f3"))}]},{path:"*",component:()=>Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"e51e"))}];var R=V,q=n("59ca"),D=n.n(q),W=(n("ea7b"),function(t,e,n,r){function o(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,i){function a(t){try{c(r.next(t))}catch(e){i(e)}}function u(t){try{c(r["throw"](t))}catch(e){i(e)}}function c(t){t.done?n(t.value):o(t.value).then(a,u)}c((r=r.apply(t,e||[])).next())}))});const z=()=>D.a.auth(),M=t=>W(void 0,void 0,void 0,(function*(){var e,n;return!!(null===(n=null===(e=t.state)||void 0===e?void 0:e.auth)||void 0===n?void 0:n.isReady)||new Promise((t,e)=>{const n=D.a.auth().onAuthStateChanged(e=>{t(),n()},()=>{e(new Error("Looks like there is a problem with the firebase service. Please try again later"))})})})),J=t=>D.a.initializeApp(t),K=(t,e)=>{const n=F(t);t.commit("auth/setAuthState",{isAuthenticated:null!==e,isReady:!0}),!e&&n&&t.dispatch("auth/routeUserToAuth")},F=t=>{var e,n;return null===(n=null===(e=null===t||void 0===t?void 0:t.state)||void 0===e?void 0:e.auth)||void 0===n?void 0:n.isAuthenticated},Q=()=>z().signOut();var G=function(t,e,n,r){function o(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,i){function a(t){try{c(r.next(t))}catch(e){i(e)}}function u(t){try{c(r["throw"](t))}catch(e){i(e)}}function c(t){t.done?n(t.value):o(t.value).then(a,u)}c((r=r.apply(t,e||[])).next())}))};const H=(t,e)=>G(void 0,void 0,void 0,(function*(){return D.a.auth().createUserWithEmailAndPassword(t,e)})),X=(t,e)=>D.a.auth().signInWithEmailAndPassword(t,e);var Y=Object.assign(Object.assign({},i),a),Z=function(t,e,n,r){function o(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,i){function a(t){try{c(r.next(t))}catch(e){i(e)}}function u(t){try{c(r["throw"](t))}catch(e){i(e)}}function c(t){t.done?n(t.value):o(t.value).then(a,u)}c((r=r.apply(t,e||[])).next())}))},tt=Object(O["route"])((function({Vue:t}){t.use(N["a"]);const e=new N["a"]({scrollBehavior:()=>({x:0,y:0}),routes:R,mode:"history",base:"/"});return e.beforeEach((t,e,n)=>Z(this,void 0,void 0,(function*(){const{ensureAuthIsInitialized:e,isAuthenticated:r}=Y;try{yield e(B),t.matched.some(t=>t.meta.requiresAuth)?r(B)?n():n("/auth/login"):"/auth/register"===t.path&&r(B)||"/auth/login"===t.path&&r(B)?n("/user"):n()}catch(o){h["a"].create({message:""+o,color:"negative"})}}))),e})),et=function(){return nt.apply(this,arguments)};function nt(){return nt=c()((function*(){const t="function"===typeof B?yield B({Vue:s["default"]}):B,e="function"===typeof tt?yield tt({Vue:s["default"],store:t}):tt;t.$router=e;const n={router:e,store:t,render:t=>t(j),el:"#q-app"};return{app:n,store:t,router:e}})),nt.apply(this,arguments)}var rt=Object(O["boot"])(({Vue:t})=>{t.use(b.a)}),ot=n("bc3a"),it=n.n(ot),at=Object(O["boot"])(({Vue:t})=>{t.prototype.$axios=it.a}),ut=({store:t,Vue:e})=>{const n={apiKey:"AIzaSyAu3v71qDLKEEF4QCpOezDfnJlBMXv3Kno",authDomain:"digital-jukebox.firebaseapp.com",databaseURL:"https://digital-jukebox.firebaseio.com",projectId:"digital-jukebox",storageBucket:"digital-jukebox.appspot.com",messagingSenderId:"120161791220",appId:"1:120161791220:web:741c8add205d08aad302a1",measurementId:"G-RNTY5528DJ"};Y.fBInit(n),Y.auth().onAuthStateChanged(e=>{Y.handleOnAuthStateChanged(t,e)},t=>{console.error(t)}),e.prototype.$fb=Y,t.$fb=Y};const ct="/";function st(){return lt.apply(this,arguments)}function lt(){return lt=c()((function*(){const{app:t,store:e,router:n}=yield et();let r=!1;const o=t=>{r=!0;const e=Object(t)===t?n.resolve(t).route.fullPath:t;window.location.href=e},i=window.location.href.replace(window.location.origin,""),a=[rt,at,ut];for(let c=0;!1===r&&c<a.length;c++)if("function"===typeof a[c])try{yield a[c]({app:t,router:n,store:e,Vue:s["default"],ssrContext:null,redirect:o,urlPath:i,publicPath:ct})}catch(u){return u&&u.url?void(window.location.href=u.url):void console.error("[Quasar] boot error:",u)}!0!==r&&new s["default"](t)})),lt.apply(this,arguments)}st()},"31cd":function(t,e,n){},"6d04":function(t,e,n){},"9a1a":function(t,e,n){},ed82:function(t,e,n){}});