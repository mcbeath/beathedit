(function(c,a,e){var b=a.module("ngTouch",[]);b.factory("$swipe",[function(){var i=10;var h={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"}};
function f(j){var l=j.touches&&j.touches.length?j.touches:[j];var k=(j.changedTouches&&j.changedTouches[0])||(j.originalEvent&&j.originalEvent.changedTouches&&j.originalEvent.changedTouches[0])||l[0].originalEvent||l[0];
return{x:k.clientX,y:k.clientY}}function g(j,l){var k=[];a.forEach(j,function(m){var n=h[m][l];if(n){k.push(n)}});return k.join(" ")}return{bind:function(o,j,k){var n,l;
var q;var p;var m=false;k=k||["mouse","touch"];o.on(g(k,"start"),function(s){q=f(s);m=true;n=0;l=0;p=q;j.start&&j.start(q,s)});var r=g(k,"cancel");if(r){o.on(r,function(s){m=false;
j.cancel&&j.cancel(s)})}o.on(g(k,"move"),function(s){if(!m){return}if(!q){return}var t=f(s);n+=Math.abs(t.x-p.x);l+=Math.abs(t.y-p.y);p=t;if(n<i&&l<i){return
}if(l>n){m=false;j.cancel&&j.cancel(s);return}else{s.preventDefault();j.move&&j.move(t,s)}});o.on(g(k,"end"),function(s){if(!m){return}m=false;j.end&&j.end(f(s),s)
})}}}]);b.config(["$provide",function(f){f.decorator("ngClickDirective",["$delegate",function(g){g.shift();return g}])}]);b.directive("ngClick",["$parse","$timeout","$rootElement",function(m,k,u){var s=750;
var r=12;var n=2500;var q=25;var j="ng-click-active";var p;var i;var g;function f(w,y,v,x){return Math.abs(w-v)<q&&Math.abs(y-x)<q}function l(A,v,z){for(var w=0;
w<A.length;w+=2){if(f(A[w],A[w+1],v,z)){A.splice(w,w+2);return true}}return false}function t(w){if(Date.now()-p>n){return}var z=w.touches&&w.touches.length?w.touches:[w];
var v=z[0].clientX;var A=z[0].clientY;if(v<1&&A<1){return}if(g&&g[0]===v&&g[1]===A){return}if(g){g=null}if(w.target.tagName.toLowerCase()==="label"){g=[v,A]
}if(l(i,v,A)){return}w.stopPropagation();w.preventDefault();w.target&&w.target.blur()}function o(w){var z=w.touches&&w.touches.length?w.touches:[w];var v=z[0].clientX;
var A=z[0].clientY;i.push(v,A);k(function(){for(var x=0;x<i.length;x+=2){if(i[x]==v&&i[x+1]==A){i.splice(x,x+2);return}}},n,false)}function h(v,w){if(!i){u[0].addEventListener("click",t,true);
u[0].addEventListener("touchstart",o,true);i=[]}p=Date.now();l(i,v,w)}return function(E,z,B){var C=m(B.ngClick),D=false,A,x,w,v;function y(){D=false;z.removeClass(j)
}z.on("touchstart",function(F){D=true;A=F.target?F.target:F.srcElement;if(A.nodeType==3){A=A.parentNode}z.addClass(j);x=Date.now();var H=F.touches&&F.touches.length?F.touches:[F];
var G=H[0].originalEvent||H[0];w=G.clientX;v=G.clientY});z.on("touchmove",function(F){y()});z.on("touchcancel",function(F){y()});z.on("touchend",function(G){var J=Date.now()-x;
var I=(G.changedTouches&&G.changedTouches.length)?G.changedTouches:((G.touches&&G.touches.length)?G.touches:[G]);var H=I[0].originalEvent||I[0];var F=H.clientX;
var L=H.clientY;var K=Math.sqrt(Math.pow(F-w,2)+Math.pow(L-v,2));if(D&&J<s&&K<r){h(F,L);if(A){A.blur()}if(!a.isDefined(B.disabled)||B.disabled===false){z.triggerHandler("click",[G])
}}y()});z.onclick=function(F){};z.on("click",function(F,G){E.$apply(function(){C(E,{$event:(G||F)})})});z.on("mousedown",function(F){z.addClass(j)});z.on("mousemove mouseup",function(F){z.removeClass(j)
})}}]);function d(h,g,f){b.directive(h,["$parse","$swipe",function(k,m){var l=75;var j=0.3;var i=30;return function(q,p,n){var t=k(n[h]);var s,r;function u(x){if(!s){return false
}var v=Math.abs(x.y-s.y);var w=(x.x-s.x)*g;return r&&v<l&&w>0&&w>i&&v/w<j}var o=["touch"];if(!a.isDefined(n.ngSwipeDisableMouse)){o.push("mouse")}m.bind(p,{start:function(w,v){s=w;
r=true},cancel:function(v){r=false},end:function(w,v){if(u(w)){q.$apply(function(){p.triggerHandler(f);t(q,{$event:v})})}}},o)}}])}d("ngSwipeLeft",-1,"swipeleft");
d("ngSwipeRight",1,"swiperight")})(window,window.angular);if(typeof module==="object"&&module&&typeof module.exports==="object"){module.exports=angular
}else{if(typeof define==="function"&&define){define("lib/angular/angular-touch",[],function(){return angular})}}if(typeof window==="object"&&typeof window.document==="object"){window.angular=window.$=angular
};