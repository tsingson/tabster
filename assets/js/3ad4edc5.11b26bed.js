"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[179],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return p}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),u=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(n),p=o,b=d["".concat(i,".").concat(p)]||d[p]||m[p]||a;return n?r.createElement(b,l(l({ref:t},c),{},{components:n})):r.createElement(b,l({ref:t},c))}));function p(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:o,l[1]=s;for(var u=2;u<a;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},104:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return i},default:function(){return p},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return m}});var r=n(3117),o=n(102),a=(n(7294),n(3905)),l=["components"],s={},i='Observed Element <img src="/img/catobserved.png" className="image image_header" />',u={unversionedId:"observed",id:"observed",title:'Observed Element <img src="/img/catobserved.png" className="image image_header" />',description:"About",source:"@site/docs/observed.md",sourceDirName:".",slug:"/observed",permalink:"/docs/observed",tags:[],version:"current",frontMatter:{}},c={},m=[{value:"About",id:"about",level:2},{value:"Setup",id:"setup",level:2},{value:"Methods",id:"methods",level:2},{value:"getElement()",id:"getelement",level:3},{value:"waitElement()",id:"waitelement",level:3},{value:"requestFocus()",id:"requestfocus",level:3},{value:"Examples",id:"examples",level:2}],d={toc:m};function p(e){var t=e.components,n=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"observed-element-"},"Observed Element ",(0,a.kt)("img",{src:"/img/catobserved.png",className:"image image_header"})),(0,a.kt)("h2",{id:"about"},"About"),(0,a.kt)("p",null,"Observed Element allows finding and focusing elements which are not yet in the DOM."),(0,a.kt)("p",null,"All we do is mark an element as observed by giving it a name."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<button data-tabster=\'{"observed": {"name": "observedButton"}}\'>\n    Observed\n</button>\n')),(0,a.kt)("h2",{id:"setup"},"Setup"),(0,a.kt)("p",null,"To get Observed Element working, we need to call ",(0,a.kt)("inlineCode",{parentName:"p"},"getObservedElement()")," function:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import { createTabster, getObservedElement } from "tabster";\n\nlet tabsterCore = createTabster(window);\n\nlet observedElement = getObservedElement(tabsterCore);\n\nobservedElement.requestFocus("observedButton", 100500);\n')),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("h3",{id:"getelement"},"getElement()"),(0,a.kt)("p",null,"Returns observed element by the name if it's present in the application."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import { createTabster, getObservedElement } from "tabster";\n\nlet tabsterCore = createTabster(window);\n\nlet observedElement = getObservedElement(tabsterCore);\n\nlet element = observedElement.getElement("observedButton");\n')),(0,a.kt)("h3",{id:"waitelement"},"waitElement()"),(0,a.kt)("p",null,"Waits for an element for the specified time, returns an element if it appears."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import { createTabster, getObservedElement, Types } from "tabster";\n\nlet tabsterCore = createTabster(window);\n\nlet observedElement = getObservedElement(tabsterCore);\n\nlet wait = observed.waitElement(\n    "observedButton", // Name set using Tabster attribute.\n    100500, // Timeout.\n    Types.ObservedElementAccesibilities.Focusable // Only return when the\n    // element becomes focusable.\n);\n\n// The result promise will be resolved once the element is mounted.\nwait.result.then((value) => {\n    console.log("Observed element:", value);\n});\n\n// We can also cancel the wait request.\nwait.cancel();\n')),(0,a.kt)("h3",{id:"requestfocus"},"requestFocus()"),(0,a.kt)("p",null,"Waits for the observed element to appear in the DOM and focuses it."),(0,a.kt)("p",null,"A consecutive ",(0,a.kt)("inlineCode",{parentName:"p"},"requestFocus()")," call or a manual focus movement inside the application\nwill cancel the focus request automatically."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import { createTabster, getObservedElement, Types } from "tabster";\n\nlet tabsterCore = createTabster(window);\n\nlet observedElement = getObservedElement(tabsterCore);\n\nlet focus = observed.requestFocus("observedButton", 100500);\n\n// The result promise will be resolved once the element is focused (or timed out).\nfocus.result.then((value: boolean) => {\n    console.log("Observed element is focused:", value);\n});\n\n// We can also cancel the focus request.\nfocus.cancel();\n')),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)("p",null,"Here be dragons."))}p.isMDXComponent=!0}}]);