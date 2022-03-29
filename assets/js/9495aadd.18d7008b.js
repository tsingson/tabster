"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[719],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),h=o,m=d["".concat(l,".").concat(h)]||d[h]||p[h]||r;return n?a.createElement(m,i(i({ref:t},u),{},{components:n})):a.createElement(m,i({ref:t},u))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7574:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return u}});var a=n(7462),o=n(3366),r=(n(7294),n(3905)),i=["components"],s={},l='Concept <img src="/img/catconcept.png" width="166" height="128" style=',c={unversionedId:"concept",id:"concept",title:'Concept <img src="/img/catconcept.png" width="166" height="128" style=',description:"About",source:"@site/docs/concept.md",sourceDirName:".",slug:"/concept",permalink:"/docs/concept",tags:[],version:"current",frontMatter:{}},u=[{value:"About",id:"about",children:[],level:2},{value:"How it works",id:"how-it-works",children:[{value:"Controlling Tab programmatically",id:"controlling-tab-programmatically",children:[],level:3},{value:"Using invisible dummy inputs to redirect focus",id:"using-invisible-dummy-inputs-to-redirect-focus",children:[],level:3}],level:2},{value:"IFrames",id:"iframes",children:[],level:2},{value:"Summary",id:"summary",children:[],level:2}],p={toc:u};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"concept-"},"Concept ",(0,r.kt)("img",{src:"/img/catconcept.png",width:"166",height:"128",style:{"vertical-align":"-40px"}})),(0,r.kt)("h2",{id:"about"},"About"),(0,r.kt)("p",null,"Web applications contain many actionable elements in various combinations."),(0,r.kt)("p",null,"From the acccessibility perspective the application should be usable with keyboard only."),(0,r.kt)("p",null,"Some HTML elements like ",(0,r.kt)("inlineCode",{parentName:"p"},"<button>")," are focusable by default (we can reach them pressing\nTab key), for other HTML elements we can use ",(0,r.kt)("inlineCode",{parentName:"p"},"tabindex")," attribute to make them focusable."),(0,r.kt)("p",null,"But that is practically all we have from the web browser perspective. Unfortunately,\nmaking actionable element focusable is not enough. Consider, for example, an infinite\nnews feed. It would be impossible to reach something after the infinite news feed using\nTab key presses, because the news feed is infinite and as you Tab through it, new actionable\nelements appear."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Tabster")," is a set of tools to handle complex keyboard navigation scenarios as they would\nbe natively supported by the browser. In a declarative way, by simply adding an attribute\nto the DOM elements, Tabster allows to group focusable elements so that they can\nbehave as a single logical entity, it allows to define areas where focus is moved not just\nusing Tab key, but using arrow keys, it can help restore focus when something currently focused\nhas been removed from the DOM, it can help building modal dialogs and popups, it provides\na bunch of other functions, like the keyboard navigation state and functions to traverse\nthe focusable elements in the DOM, and many more."),(0,r.kt)("p",null,"The browsers should eventually have native alternatives for the things Tabster provide,\nbut for now it's what we can offer to make keyboard navigation implementation easier."),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"/docs/core"},"Core")," documentation for more."),(0,r.kt)("h2",{id:"how-it-works"},"How it works"),(0,r.kt)("p",null,"Tabster offers two approaches to managing focus. Both have advantages and disadvantages and the choice of which one to use depends on your particular scenario."),(0,r.kt)("h3",{id:"controlling-tab-programmatically"},"Controlling Tab programmatically"),(0,r.kt)("p",null,"First approach is good when you have the entire application under your control. If you don't have third party components you cannot easily change, which implement custom keyboard navigation inside, controlling Tab is a nice option. Tabster intercepts all Tab presses and programmatically decides which element should be focused next."),(0,r.kt)("h3",{id:"using-invisible-dummy-inputs-to-redirect-focus"},"Using invisible dummy inputs to redirect focus"),(0,r.kt)("p",null,"Second approach is to add invisible dummy inputs around particular areas in the DOM. We don't need to interfere with the default browser behaviour for Tab press in general. Only things like ",(0,r.kt)("a",{parentName:"p",href:"/docs/mover"},"Mover")," and ",(0,r.kt)("a",{parentName:"p",href:"/docs/groupper"},"Groupper")," are affecting the tabbing order, so for the rest of the application, we can avoid controlling Tab presses programmatically and rely on the default browser action for Tab. The rest of the scenarios which need custom Tab handling (like Mover and Groupper just mentioned above) add special invisible dummy inputs around the particular area. The default action will move focus to that dummy input and once the dummy input is focused, Tabster decides what actual element needs to be focused and redirects the focus. It all happens transparently, you don't have to think about those dummy inputs, but internally it is a DOM change to add those inputs. Depending on the application implementation, that DOM change might have side effects."),(0,r.kt)("h2",{id:"iframes"},"IFrames"),(0,r.kt)("p",null,"One special case which adds complexity is when your application uses ",(0,r.kt)("inlineCode",{parentName:"p"},"<iframe>")," (especially the cross origin ones). IFrames are isolated from each other from the eventing perspective. Meaning that if you hit Tab in one ",(0,r.kt)("inlineCode",{parentName:"p"},"<iframe>")," the other one will never receive that event. Tabster has the cross origin part which allows forwarding some particular events between the IFrames. For example, Tabster has a thing called Keyboard Navigation State \u2014 a boolean flag (and event to observe) telling if the user is using keyboard to navigate instead of mouse. With the cross origin module this state will be automatically synchronized between iframes, so when you start tabbing in one iframe, the other one automatically knows you're navigating with keyboard. There are also other cool possibilities like cross origin ",(0,r.kt)("a",{parentName:"p",href:"/docs/observed"},"Observed Element API")," when you can give an element a name in one ",(0,r.kt)("inlineCode",{parentName:"p"},"<iframe>")," and focus that element from another ",(0,r.kt)("inlineCode",{parentName:"p"},"<iframe>")," by name (or get events when that element appears in the DOM). Though the cross origin scenarios are pretty rare and specific, and not docummented yet."),(0,r.kt)("h2",{id:"summary"},"Summary"),(0,r.kt)("p",null,"Tabster aims to solve things in a way the browser would do. Everything is defined using data attributes on the DOM elements (like setting the ",(0,r.kt)("inlineCode",{parentName:"p"},"tabindex")," attribute). There are a lot of corner cases and limitations, but we hope to eventually bring similar functionality to the browsers to make building accessible applications less painful."))}d.isMDXComponent=!0}}]);