(function(e){var a,d;(function(){var j={};d=function(m,l,k){j[m]={id:m,deps:l,factory:k,defined:0,exports:{},require:i(m)}};a=i("");function h(l,r){if(!r){return l
}if(l.indexOf(".")===0){var s=r.split("/");var q=l.split("/");var k=s.length-1;var m=q.length;var o=0;var n=0;pathLoop:for(var p=0;p<m;p++){switch(q[p]){case"..":if(o<k){o++;
n++}else{break pathLoop}break;case".":n++;break;default:break pathLoop}}s.length=k-o;q=q.slice(n);return s.concat(q).join("/")}return l}function i(l){var k={};
function m(p,o){if(typeof p==="string"){var n=k[p];if(!n){n=g(h(p,l));k[p]=n}return n}else{if(p instanceof Array){o=o||function(){};o.apply(this,f(p,o,l))
}}}return m}function f(k,p,s){var r=[];var q=j[s];for(var o=0,n=Math.min(k.length,p.length);o<n;o++){var m=h(k[o],s);var t;switch(m){case"require":t=(q&&q.require)||a;
break;case"exports":t=q.exports;break;case"module":t=q;break;default:t=g(m)}r.push(t)}return r}function g(n){var l=j[n];if(!l){throw new Error("No "+n)
}if(!l.defined){var k=l.factory;var m=k.apply(this,f(l.deps||[],k,n));if(typeof m!=="undefined"){l.exports=m}l.defined=1}return l.exports}}());d("echarts/chart/line",["require","./base","zrender/shape/Polyline","../util/shape/Icon","../util/shape/HalfSmoothPolygon","../component/axis","../component/grid","../component/dataZoom","../config","../util/ecData","zrender/tool/util","zrender/tool/color","../chart"],function(l){var k=l("./base");
var f=l("zrender/shape/Polyline");var j=l("../util/shape/Icon");var o=l("../util/shape/HalfSmoothPolygon");l("../component/axis");l("../component/grid");
l("../component/dataZoom");var p=l("../config");p.line={zlevel:0,z:2,clickable:true,legendHoverLink:true,xAxisIndex:0,yAxisIndex:0,dataFilter:"nearest",itemStyle:{normal:{label:{show:false},lineStyle:{width:2,type:"solid",shadowColor:"rgba(0,0,0,0)",shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0}},emphasis:{label:{show:false}}},symbolSize:2,showAllSymbol:false};
var i=l("../util/ecData");var m=l("zrender/tool/util");var h=l("zrender/tool/color");function n(t,q,u,s,r){k.call(this,t,q,u,s,r);this.refresh(s)}n.prototype={type:p.CHART_TYPE_LINE,_buildShape:function(){this.finalPLMap={};
this._buildPosition()},_buildHorizontal:function(M,s,r,O){var z=this.series;var K=r[0][0];var D=z[K];var B=this.component.xAxis.getAxis(D.xAxisIndex||0);
var L;var w;var v;var Q;var u;var q;var A;var N={};var R;var F;for(var J=0,G=s;J<G;J++){if(B.getNameByIndex(J)==null){break}w=B.getCoordByIndex(J);for(var I=0,H=r.length;
I<H;I++){L=this.component.yAxis.getAxis(z[r[I][0]].yAxisIndex||0);u=Q=A=q=L.getCoord(0);for(var E=0,C=r[I].length;E<C;E++){K=r[I][E];D=z[K];R=D.data[J];
F=this.getDataFromOption(R,"-");N[K]=N[K]||[];O[K]=O[K]||{min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY,sum:0,counter:0,average:0};if(F==="-"){if(N[K].length>0){this.finalPLMap[K]=this.finalPLMap[K]||[];
this.finalPLMap[K].push(N[K]);N[K]=[]}continue}if(F>=0){Q-=E>0?L.getCoordSize(F):(u-L.getCoord(F));v=Q}else{if(F<0){q+=E>0?L.getCoordSize(F):(L.getCoord(F)-A);
v=q}}N[K].push([w,v,J,B.getNameByIndex(J),w,u]);if(O[K].min>F){O[K].min=F;O[K].minY=v;O[K].minX=w}if(O[K].max<F){O[K].max=F;O[K].maxY=v;O[K].maxX=w}O[K].sum+=F;
O[K].counter++}}Q=this.component.grid.getY();var P;for(var I=0,H=r.length;I<H;I++){for(var E=0,C=r[I].length;E<C;E++){K=r[I][E];D=z[K];R=D.data[J];F=this.getDataFromOption(R,"-");
if(F!="-"){continue}if(this.deepQuery([R,D,this.option],"calculable")){P=this.deepQuery([R,D],"symbolSize");Q+=P*2+5;v=Q;this.shapeList.push(this._getCalculableItem(K,J,B.getNameByIndex(J),w,v,"horizontal"))
}}}}for(var t in N){if(N[t].length>0){this.finalPLMap[t]=this.finalPLMap[t]||[];this.finalPLMap[t].push(N[t]);N[t]=[]}}this._calculMarkMapXY(O,r,"y");this._buildBorkenLine(M,this.finalPLMap,B,"horizontal")
},_buildVertical:function(N,t,s,P){var z=this.series;var L=s[0][0];var D=z[L];var A=this.component.yAxis.getAxis(D.yAxisIndex||0);var M;var w;var v;var B;
var q;var G;var r;var O={};var R;var F;for(var K=0,H=t;K<H;K++){if(A.getNameByIndex(K)==null){break}v=A.getCoordByIndex(K);for(var J=0,I=s.length;J<I;J++){M=this.component.xAxis.getAxis(z[s[J][0]].xAxisIndex||0);
q=B=r=G=M.getCoord(0);for(var E=0,C=s[J].length;E<C;E++){L=s[J][E];D=z[L];R=D.data[K];F=this.getDataFromOption(R,"-");O[L]=O[L]||[];P[L]=P[L]||{min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY,sum:0,counter:0,average:0};
if(F==="-"){if(O[L].length>0){this.finalPLMap[L]=this.finalPLMap[L]||[];this.finalPLMap[L].push(O[L]);O[L]=[]}continue}if(F>=0){B+=E>0?M.getCoordSize(F):(M.getCoord(F)-q);
w=B}else{if(F<0){G-=E>0?M.getCoordSize(F):(r-M.getCoord(F));w=G}}O[L].push([w,v,K,A.getNameByIndex(K),q,v]);if(P[L].min>F){P[L].min=F;P[L].minX=w;P[L].minY=v
}if(P[L].max<F){P[L].max=F;P[L].maxX=w;P[L].maxY=v}P[L].sum+=F;P[L].counter++}}B=this.component.grid.getXend();var Q;for(var J=0,I=s.length;J<I;J++){for(var E=0,C=s[J].length;
E<C;E++){L=s[J][E];D=z[L];R=D.data[K];F=this.getDataFromOption(R,"-");if(F!="-"){continue}if(this.deepQuery([R,D,this.option],"calculable")){Q=this.deepQuery([R,D],"symbolSize");
B-=Q*2+5;w=B;this.shapeList.push(this._getCalculableItem(L,K,A.getNameByIndex(K),w,v,"vertical"))}}}}for(var u in O){if(O[u].length>0){this.finalPLMap[u]=this.finalPLMap[u]||[];
this.finalPLMap[u].push(O[u]);O[u]=[]}}this._calculMarkMapXY(P,s,"x");this._buildBorkenLine(N,this.finalPLMap,A,"vertical")},_buildOther:function(K,t,s,M){var A=this.series;
var L={};var v;for(var H=0,G=s.length;H<G;H++){for(var E=0,C=s[H].length;E<C;E++){var J=s[H][E];var B=A[J];v=this.component.xAxis.getAxis(B.xAxisIndex||0);
var r=this.component.yAxis.getAxis(B.yAxisIndex||0);var q=r.getCoord(0);L[J]=L[J]||[];M[J]=M[J]||{min0:Number.POSITIVE_INFINITY,min1:Number.POSITIVE_INFINITY,max0:Number.NEGATIVE_INFINITY,max1:Number.NEGATIVE_INFINITY,sum0:0,sum1:0,counter0:0,counter1:0,average0:0,average1:0};
for(var I=0,F=B.data.length;I<F;I++){var N=B.data[I];var D=this.getDataFromOption(N,"-");if(!(D instanceof Array)){continue}var z=v.getCoord(D[0]);var w=r.getCoord(D[1]);
L[J].push([z,w,I,D[0],z,q]);if(M[J].min0>D[0]){M[J].min0=D[0];M[J].minY0=w;M[J].minX0=z}if(M[J].max0<D[0]){M[J].max0=D[0];M[J].maxY0=w;M[J].maxX0=z}M[J].sum0+=D[0];
M[J].counter0++;if(M[J].min1>D[1]){M[J].min1=D[1];M[J].minY1=w;M[J].minX1=z}if(M[J].max1<D[1]){M[J].max1=D[1];M[J].maxY1=w;M[J].maxX1=z}M[J].sum1+=D[1];
M[J].counter1++}}}for(var u in L){if(L[u].length>0){this.finalPLMap[u]=this.finalPLMap[u]||[];this.finalPLMap[u].push(L[u]);L[u]=[]}}this._calculMarkMapXY(M,s,"xy");
this._buildBorkenLine(K,this.finalPLMap,v,"other")},_buildBorkenLine:function(M,E,C,t){var B=t=="other"?"horizontal":t;var A=this.series;var P;for(var Q=M.length-1;
Q>=0;Q--){var K=M[Q];var D=A[K];var O=E[K];if(D.type===this.type&&O!=null){var r=this._getBbox(K,B);var I=this._sIndex2ColorMap[K];var q=this.query(D,"itemStyle.normal.lineStyle.width");
var N=this.query(D,"itemStyle.normal.lineStyle.type");var s=this.query(D,"itemStyle.normal.lineStyle.color");var y=this.getItemStyleColor(this.query(D,"itemStyle.normal.color"),K,-1);
var L=this.query(D,"itemStyle.normal.areaStyle")!=null;var w=this.query(D,"itemStyle.normal.areaStyle.color");for(var J=0,F=O.length;J<F;J++){var x=O[J];
var v=t!="other"&&this._isLarge(B,x);if(!v){for(var H=0,G=x.length;H<G;H++){P=D.data[x[H][2]];if(this.deepQuery([P,D,this.option],"calculable")||this.deepQuery([P,D],"showAllSymbol")||(C.type==="categoryAxis"&&C.isMainAxis(x[H][2])&&this.deepQuery([P,D],"symbol")!="none")){this.shapeList.push(this._getSymbol(K,x[H][2],x[H][3],x[H][0],x[H][1],B))
}}}else{x=this._getLargePointList(B,x,D.dataFilter)}var u=new f({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{miterLimit:q,pointList:x,strokeColor:s||y||I,lineWidth:q,lineType:N,smooth:this._getSmooth(D.smooth),smoothConstraint:r,shadowColor:this.query(D,"itemStyle.normal.lineStyle.shadowColor"),shadowBlur:this.query(D,"itemStyle.normal.lineStyle.shadowBlur"),shadowOffsetX:this.query(D,"itemStyle.normal.lineStyle.shadowOffsetX"),shadowOffsetY:this.query(D,"itemStyle.normal.lineStyle.shadowOffsetY")},hoverable:false,_main:true,_seriesIndex:K,_orient:B});
i.pack(u,A[K],K,0,J,A[K].name);this.shapeList.push(u);if(L){var z=new o({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{miterLimit:q,pointList:m.clone(x).concat([[x[x.length-1][4],x[x.length-1][5]],[x[0][4],x[0][5]]]),brushType:"fill",smooth:this._getSmooth(D.smooth),smoothConstraint:r,color:w?w:h.alpha(I,0.5)},highlightStyle:{brushType:"fill"},hoverable:false,_main:true,_seriesIndex:K,_orient:B});
i.pack(z,A[K],K,0,J,A[K].name);this.shapeList.push(z)}}}}},_getBbox:function(q,r){var t=this.component.grid.getBbox();var s=this.xMarkMap[q];if(s.minX0!=null){return[[Math.min(s.minX0,s.maxX0,s.minX1,s.maxX1),Math.min(s.minY0,s.maxY0,s.minY1,s.maxY1)],[Math.max(s.minX0,s.maxX0,s.minX1,s.maxX1),Math.max(s.minY0,s.maxY0,s.minY1,s.maxY1)]]
}else{if(r==="horizontal"){t[0][1]=Math.min(s.minY,s.maxY);t[1][1]=Math.max(s.minY,s.maxY)}else{t[0][0]=Math.min(s.minX,s.maxX);t[1][0]=Math.max(s.minX,s.maxX)
}}return t},_isLarge:function(q,r){if(r.length<2){return false}else{return q==="horizontal"?(Math.abs(r[0][0]-r[1][0])<0.5):(Math.abs(r[0][1]-r[1][1])<0.5)
}},_getLargePointList:function(v,F,q){var D;if(v==="horizontal"){D=this.component.grid.getWidth()}else{D=this.component.grid.getHeight()}var B=F.length;
var r=[];if(typeof(q)!="function"){switch(q){case"min":q=function(H){return Math.max.apply(null,H)};break;case"max":q=function(H){return Math.min.apply(null,H)
};break;case"average":q=function(H){var J=0;for(var I=0;I<H.length;I++){J+=H[I]}return J/H.length};break;default:q=function(H){return H[0]}}}var t=[];for(var w=0;
w<D;w++){var A=Math.floor(B/D*w);var y=Math.min(Math.floor(B/D*(w+1)),B);if(y<=A){continue}for(var u=A;u<y;u++){t[u-A]=v==="horizontal"?F[u][1]:F[u][0]
}t.length=y-A;var x=q(t);var G=-1;var E=Infinity;for(var u=A;u<y;u++){var s=v==="horizontal"?F[u][1]:F[u][0];var C=Math.abs(s-x);if(C<E){G=u;E=C}}var z=F[G].slice();
if(v==="horizontal"){z[1]=x}else{z[0]=x}r.push(z)}return r},_getSmooth:function(q){if(q){return 0.3}else{return 0}},_getCalculableItem:function(u,z,r,A,w,t){var v=this.series;
var s=v[u].calculableHolderColor||this.ecTheme.calculableHolderColor||p.calculableHolderColor;var q=this._getSymbol(u,z,r,A,w,t);q.style.color=s;q.style.strokeColor=s;
q.rotation=[0,0];q.hoverable=false;q.draggable=false;q.style.text=undefined;return q},_getSymbol:function(t,A,r,B,z,s){var v=this.series;var w=v[t];var u=w.data[A];
var q=this.getSymbolShape(w,t,u,A,r,B,z,this._sIndex2ShapeMap[t],this._sIndex2ColorMap[t],"#fff",s==="vertical"?"horizontal":"vertical");q.zlevel=this.getZlevelBase();
q.z=this.getZBase()+1;if(this.deepQuery([u,w,this.option],"calculable")){this.setCalculable(q);q.draggable=true}return q},getMarkCoord:function(r,v){var t=this.series[r];
var s=this.xMarkMap[r];var u=this.component.xAxis.getAxis(t.xAxisIndex);var q=this.component.yAxis.getAxis(t.yAxisIndex);if(v.type&&(v.type==="max"||v.type==="min"||v.type==="average")){var w=v.valueIndex!=null?v.valueIndex:s.maxX0!=null?"1":"";
return[s[v.type+"X"+w],s[v.type+"Y"+w],s[v.type+"Line"+w],s[v.type+w]]}return[typeof v.xAxis!="string"&&u.getCoordByIndex?u.getCoordByIndex(v.xAxis||0):u.getCoord(v.xAxis||0),typeof v.yAxis!="string"&&q.getCoordByIndex?q.getCoordByIndex(v.yAxis||0):q.getCoord(v.yAxis||0)]
},refresh:function(q){if(q){this.option=q;this.series=q.series}this.backupShapeList();this._buildShape()},ontooltipHover:function(q,A){var u=q.seriesIndex;
var y=q.dataIndex;var w;var z;var x=u.length;while(x--){w=this.finalPLMap[u[x]];if(w){for(var v=0,r=w.length;v<r;v++){z=w[v];for(var t=0,s=z.length;t<s;
t++){if(y===z[t][2]){A.push(this._getSymbol(u[x],z[t][2],z[t][3],z[t][0],z[t][1],"horizontal"))}}}}}},addDataAnimation:function(I,C){var w=this.series;
var B={};for(var F=0,E=I.length;F<E;F++){B[I[F][0]]=I[F]}var v;var A;var u;var z;var G;var D;var t;var r=0;function q(){r--;if(r===0){C&&C()}}function J(x){x.style.controlPointList=null
}for(var F=this.shapeList.length-1;F>=0;F--){G=this.shapeList[F]._seriesIndex;if(B[G]&&!B[G][3]){if(this.shapeList[F]._main&&this.shapeList[F].style.pointList.length>1){D=this.shapeList[F].style.pointList;
A=Math.abs(D[0][0]-D[1][0]);z=Math.abs(D[0][1]-D[1][1]);t=this.shapeList[F]._orient==="horizontal";if(B[G][2]){if(this.shapeList[F].type==="half-smooth-polygon"){var H=D.length;
this.shapeList[F].style.pointList[H-3]=D[H-2];this.shapeList[F].style.pointList[H-3][t?0:1]=D[H-4][t?0:1];this.shapeList[F].style.pointList[H-2]=D[H-1]
}this.shapeList[F].style.pointList.pop();t?(v=A,u=0):(v=0,u=-z)}else{this.shapeList[F].style.pointList.shift();if(this.shapeList[F].type==="half-smooth-polygon"){var s=this.shapeList[F].style.pointList.pop();
t?(s[0]=D[0][0]):(s[1]=D[0][1]);this.shapeList[F].style.pointList.push(s)}t?(v=-A,u=0):(v=0,u=z)}this.shapeList[F].style.controlPointList=null;this.zr.modShape(this.shapeList[F])
}else{if(B[G][2]&&this.shapeList[F]._dataIndex===w[G].data.length-1){this.zr.delShape(this.shapeList[F].id);continue}else{if(!B[G][2]&&this.shapeList[F]._dataIndex===0){this.zr.delShape(this.shapeList[F].id);
continue}}}this.shapeList[F].position=[0,0];r++;this.zr.animate(this.shapeList[F].id,"").when(this.query(this.option,"animationDurationUpdate"),{position:[v,u]}).during(J).done(q).start()
}}if(!r){q()}}};function g(D,r,v){var A=r.x;var z=r.y;var s=r.width;var B=r.height;var E=B/2;if(r.symbol.match("empty")){D.fillStyle="#fff"}r.brushType="both";
var u=r.symbol.replace("empty","").toLowerCase();if(u.match("star")){E=(u.replace("star","")-0)||5;z-=1;u="star"}else{if(u==="rectangle"||u==="arrow"){A+=(s-B)/2;
s=B}}var t="";if(u.match("image")){t=u.replace(new RegExp("^image:\\/\\/"),"");u="image";A+=Math.round((s-B)/2)-1;s=B=B+2}u=j.prototype.iconLibrary[u];
if(u){var q=r.x;var w=r.y;D.moveTo(q,w+E);D.lineTo(q+5,w+E);D.moveTo(q+r.width-5,w+E);D.lineTo(q+r.width,w+E);var C=this;u(D,{x:A+4,y:z+4,width:s-8,height:B-8,n:E,image:t},function(){C.modSelf();
v()})}else{D.moveTo(A,z+E);D.lineTo(A+s,z+E)}}j.prototype.iconLibrary.legendLineIcon=g;m.inherits(n,k);l("../chart").define("line",n);return n});d("echarts/chart/bar",["require","./base","zrender/shape/Rectangle","../component/axis","../component/grid","../component/dataZoom","../config","../util/ecData","zrender/tool/util","zrender/tool/color","../chart"],function(i){var l=i("./base");
var k=i("zrender/shape/Rectangle");i("../component/axis");i("../component/grid");i("../component/dataZoom");var f=i("../config");f.bar={zlevel:0,z:2,clickable:true,legendHoverLink:true,xAxisIndex:0,yAxisIndex:0,barMinHeight:0,barGap:"30%",barCategoryGap:"20%",itemStyle:{normal:{barBorderColor:"#fff",barBorderRadius:0,barBorderWidth:0,label:{show:false}},emphasis:{barBorderColor:"#fff",barBorderRadius:0,barBorderWidth:0,label:{show:false}}}};
var j=i("../util/ecData");var g=i("zrender/tool/util");var m=i("zrender/tool/color");function h(q,n,r,p,o){l.call(this,q,n,r,p,o);this.refresh(p)}h.prototype={type:f.CHART_TYPE_BAR,_buildShape:function(){this._buildPosition()
},_buildNormal:function(H,N,I,K,D){var s=this.series;var ad=I[0][0];var F=s[ad];var Q=D=="horizontal";var G=this.component.xAxis;var z=this.component.yAxis;
var v=Q?G.getAxis(F.xAxisIndex):z.getAxis(F.yAxisIndex);var t;var r=this._mapSize(v,I);var A=r.gap;var R=r.barGap;var E=r.barWidthMap;var M=r.barMaxWidthMap;
var J=r.barWidth;var w=r.barMinHeightMap;var q;var p;var o=r.interval;var P;var O;var B;var Y;var C;var ab;var Z;var ac;var S;var L=this.deepQuery([this.ecTheme,f],"island.r");
for(var aa=0,V=N;aa<V;aa++){if(v.getNameByIndex(aa)==null){break}Q?(P=v.getCoordByIndex(aa)-A/2):(O=v.getCoordByIndex(aa)+A/2);for(var X=0,W=I.length;X<W;
X++){var u=s[I[X][0]].yAxisIndex||0;var ae=s[I[X][0]].xAxisIndex||0;t=Q?z.getAxis(u):G.getAxis(ae);Y=B=ab=C=t.getCoord(0);for(var U=0,T=I[X].length;U<T;
U++){ad=I[X][U];F=s[ad];ac=F.data[aa];S=this.getDataFromOption(ac,"-");K[ad]=K[ad]||{min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY,sum:0,counter:0,average:0};
p=Math.min(M[ad]||Number.MAX_VALUE,E[ad]||J);if(S==="-"){continue}if(S>0){q=U>0?t.getCoordSize(S):(Q?(Y-t.getCoord(S)):(t.getCoord(S)-Y));if(T===1&&w[ad]>q){q=w[ad]
}if(Q){B-=q;O=B}else{P=B;B+=q}}else{if(S<0){q=U>0?t.getCoordSize(S):(Q?(t.getCoord(S)-ab):(ab-t.getCoord(S)));if(T===1&&w[ad]>q){q=w[ad]}if(Q){O=C;C+=q
}else{C-=q;P=C}}else{q=0;if(Q){B-=q;O=B}else{P=B;B+=q}}}K[ad][aa]=Q?(P+p/2):(O-p/2);if(K[ad].min>S){K[ad].min=S;if(Q){K[ad].minY=O;K[ad].minX=K[ad][aa]
}else{K[ad].minX=P+q;K[ad].minY=K[ad][aa]}}if(K[ad].max<S){K[ad].max=S;if(Q){K[ad].maxY=O;K[ad].maxX=K[ad][aa]}else{K[ad].maxX=P+q;K[ad].maxY=K[ad][aa]
}}K[ad].sum+=S;K[ad].counter++;if(aa%o===0){Z=this._getBarItem(ad,aa,v.getNameByIndex(aa),P,O-(Q?0:p),Q?p:q,Q?q:p,Q?"vertical":"horizontal");this.shapeList.push(new k(Z))
}}for(var U=0,T=I[X].length;U<T;U++){ad=I[X][U];F=s[ad];ac=F.data[aa];S=this.getDataFromOption(ac,"-");p=Math.min(M[ad]||Number.MAX_VALUE,E[ad]||J);if(S!="-"){continue
}if(this.deepQuery([ac,F,this.option],"calculable")){if(Q){B-=L;O=B}else{P=B;B+=L}Z=this._getBarItem(ad,aa,v.getNameByIndex(aa),P,O-(Q?0:p),Q?p:L,Q?L:p,Q?"vertical":"horizontal");
Z.hoverable=false;Z.draggable=false;Z.style.lineWidth=1;Z.style.brushType="stroke";Z.style.strokeColor=F.calculableHolderColor||this.ecTheme.calculableHolderColor||f.calculableHolderColor;
this.shapeList.push(new k(Z))}}Q?(P+=(p+R)):(O-=(p+R))}}this._calculMarkMapXY(K,I,Q?"y":"x")},_buildHorizontal:function(q,o,p,n){return this._buildNormal(q,o,p,n,"horizontal")
},_buildVertical:function(q,o,p,n){return this._buildNormal(q,o,p,n,"vertical")},_buildOther:function(O,u,s,P){var B=this.series;for(var L=0,J=s.length;
L<J;L++){for(var H=0,F=s[L].length;H<F;H++){var N=s[L][H];var E=B[N];var t=E.xAxisIndex||0;var v=this.component.xAxis.getAxis(t);var q=v.getCoord(0);var D=E.yAxisIndex||0;
var p=this.component.yAxis.getAxis(D);var o=p.getCoord(0);P[N]=P[N]||{min0:Number.POSITIVE_INFINITY,min1:Number.POSITIVE_INFINITY,max0:Number.NEGATIVE_INFINITY,max1:Number.NEGATIVE_INFINITY,sum0:0,sum1:0,counter0:0,counter1:0,average0:0,average1:0};
for(var M=0,I=E.data.length;M<I;M++){var Q=E.data[M];var G=this.getDataFromOption(Q,"-");if(!(G instanceof Array)){continue}var A=v.getCoord(G[0]);var w=p.getCoord(G[1]);
var r=[Q,E];var C=this.deepQuery(r,"barWidth")||10;var K=this.deepQuery(r,"barHeight");var z;var R;if(K!=null){z="horizontal";if(G[0]>0){C=A-q;A-=C}else{if(G[0]<0){C=q-A
}else{C=0}}R=this._getBarItem(N,M,G[0],A,w-K/2,C,K,z)}else{z="vertical";if(G[1]>0){K=o-w}else{if(G[1]<0){K=w-o;w-=K}else{K=0}}R=this._getBarItem(N,M,G[0],A-C/2,w,C,K,z)
}this.shapeList.push(new k(R));A=v.getCoord(G[0]);w=p.getCoord(G[1]);if(P[N].min0>G[0]){P[N].min0=G[0];P[N].minY0=w;P[N].minX0=A}if(P[N].max0<G[0]){P[N].max0=G[0];
P[N].maxY0=w;P[N].maxX0=A}P[N].sum0+=G[0];P[N].counter0++;if(P[N].min1>G[1]){P[N].min1=G[1];P[N].minY1=w;P[N].minX1=A}if(P[N].max1<G[1]){P[N].max1=G[1];
P[N].maxY1=w;P[N].maxX1=A}P[N].sum1+=G[1];P[N].counter1++}}}this._calculMarkMapXY(P,s,"xy")},_mapSize:function(s,x,p){var u=this._findSpecialBarSzie(x,p);
var r=u.barWidthMap;var n=u.barMaxWidthMap;var y=u.barMinHeightMap;var t=u.sBarWidthCounter;var w=u.sBarWidthTotal;var v=u.barGap;var q=u.barCategoryGap;
var z;var A;var o=1;if(x.length!=t){if(!p){z=typeof q==="string"&&q.match(/%$/)?((s.getGap()*(100-parseFloat(q))/100).toFixed(2)-0):(s.getGap()-q);if(typeof v==="string"&&v.match(/%$/)){v=parseFloat(v)/100;
A=+((z-w)/((x.length-1)*v+x.length-t)).toFixed(2);v=A*v}else{v=parseFloat(v);A=+((z-w-v*(x.length-1))/(x.length-t)).toFixed(2)}if(A<=0){return this._mapSize(s,x,true)
}}else{z=s.getGap();v=0;A=+(z/x.length).toFixed(2);if(A<=0){o=Math.floor(x.length/z);A=1}}}else{z=t>1?(typeof q==="string"&&q.match(/%$/))?+(s.getGap()*(100-parseFloat(q))/100).toFixed(2):(s.getGap()-q):w;
A=0;v=t>1?+((z-w)/(t-1)).toFixed(2):0;if(v<0){return this._mapSize(s,x,true)}}return this._recheckBarMaxWidth(x,r,n,y,z,A,v,o)},_findSpecialBarSzie:function(t,u){var x=this.series;
var A={};var p={};var v={};var I;var r;var H=0;var J=0;var D;var w;for(var F=0,E=t.length;F<E;F++){var o={barWidth:false,barMaxWidth:false};for(var C=0,B=t[F].length;
C<B;C++){var G=t[F][C];var q=x[G];if(!u){if(!o.barWidth){I=this.query(q,"barWidth");if(I!=null){A[G]=I;J+=I;H++;o.barWidth=true;for(var z=0,y=C;z<y;z++){var s=t[F][z];
A[s]=I}}}else{A[G]=I}if(!o.barMaxWidth){r=this.query(q,"barMaxWidth");if(r!=null){p[G]=r;o.barMaxWidth=true;for(var z=0,y=C;z<y;z++){var s=t[F][z];p[s]=r
}}}else{p[G]=r}}v[G]=this.query(q,"barMinHeight");D=D!=null?D:this.query(q,"barGap");w=w!=null?w:this.query(q,"barCategoryGap")}}return{barWidthMap:A,barMaxWidthMap:p,barMinHeightMap:v,sBarWidth:I,sBarMaxWidth:r,sBarWidthCounter:H,sBarWidthTotal:J,barGap:D,barCategoryGap:w}
},_recheckBarMaxWidth:function(t,s,n,u,w,x,v,o){for(var r=0,p=t.length;r<p;r++){var q=t[r][0];if(n[q]&&n[q]<x){w-=x-n[q]}}return{barWidthMap:s,barMaxWidthMap:n,barMinHeightMap:u,gap:w,barWidth:x,barGap:v,interval:o}
},_getBarItem:function(F,G,L,r,q,A,u,t){var s=this.series;var K;var z=s[F];var I=z.data[G];var D=this._sIndex2ColorMap[F];var n=[I,z];var H=this.deepMerge(n,"itemStyle.normal");
var B=this.deepMerge(n,"itemStyle.emphasis");var v=H.barBorderWidth;K={zlevel:this.getZlevelBase(),z:this.getZBase(),clickable:this.deepQuery(n,"clickable"),style:{x:r,y:q,width:A,height:u,brushType:"both",color:this.getItemStyleColor(this.deepQuery(n,"itemStyle.normal.color")||D,F,G,I),radius:H.barBorderRadius,lineWidth:v,strokeColor:H.barBorderColor},highlightStyle:{color:this.getItemStyleColor(this.deepQuery(n,"itemStyle.emphasis.color"),F,G,I),radius:B.barBorderRadius,lineWidth:B.barBorderWidth,strokeColor:B.barBorderColor},_orient:t};
var J=K.style;K.highlightStyle.color=K.highlightStyle.color||(typeof J.color==="string"?m.lift(J.color,-0.3):J.color);J.x=Math.floor(J.x);J.y=Math.floor(J.y);
J.height=Math.ceil(J.height);J.width=Math.ceil(J.width);if(v>0&&J.height>v&&J.width>v){J.y+=v/2;J.height-=v;J.x+=v/2;J.width-=v}else{J.brushType="fill"
}K.highlightStyle.textColor=K.highlightStyle.color;K=this.addLabel(K,z,I,L,t);var p=[J,K.highlightStyle];for(var E=0,C=p.length;E<C;E++){var o=p[E].textPosition;
if(o==="insideLeft"||o==="insideRight"||o==="insideTop"||o==="insideBottom"){var w=5;switch(o){case"insideLeft":p[E].textX=J.x+w;p[E].textY=J.y+J.height/2;
p[E].textAlign="left";p[E].textBaseline="middle";break;case"insideRight":p[E].textX=J.x+J.width-w;p[E].textY=J.y+J.height/2;p[E].textAlign="right";p[E].textBaseline="middle";
break;case"insideTop":p[E].textX=J.x+J.width/2;p[E].textY=J.y+w/2;p[E].textAlign="center";p[E].textBaseline="top";break;case"insideBottom":p[E].textX=J.x+J.width/2;
p[E].textY=J.y+J.height-w/2;p[E].textAlign="center";p[E].textBaseline="bottom";break}p[E].textPosition="specific";p[E].textColor=p[E].textColor||"#fff"
}}if(this.deepQuery([I,z,this.option],"calculable")){this.setCalculable(K);K.draggable=true}j.pack(K,s[F],F,s[F].data[G],G,L);return K},getMarkCoord:function(q,r){var s=this.series[q];
var p=this.xMarkMap[q];var o=this.component.xAxis.getAxis(s.xAxisIndex);var n=this.component.yAxis.getAxis(s.yAxisIndex);var z;var v;if(r.type&&(r.type==="max"||r.type==="min"||r.type==="average")){var u=r.valueIndex!=null?r.valueIndex:p.maxX0!=null?"1":"";
v=[p[r.type+"X"+u],p[r.type+"Y"+u],p[r.type+"Line"+u],p[r.type+u]]}else{if(p.isHorizontal){z=typeof r.xAxis==="string"&&o.getIndexByName?o.getIndexByName(r.xAxis):(r.xAxis||0);
var w=p[z];w=w!=null?w:typeof r.xAxis!="string"&&o.getCoordByIndex?o.getCoordByIndex(r.xAxis||0):o.getCoord(r.xAxis||0);v=[w,n.getCoord(r.yAxis||0)]}else{z=typeof r.yAxis==="string"&&n.getIndexByName?n.getIndexByName(r.yAxis):(r.yAxis||0);
var t=p[z];t=t!=null?t:typeof r.yAxis!="string"&&n.getCoordByIndex?n.getCoordByIndex(r.yAxis||0):n.getCoord(r.yAxis||0);v=[o.getCoord(r.xAxis||0),t]}}return v
},refresh:function(n){if(n){this.option=n;this.series=n.series}this.backupShapeList();this._buildShape()},addDataAnimation:function(o,q){var r=this.series;
var C={};for(var s=0,n=o.length;s<n;s++){C[o[s][0]]=o[s]}var z;var D;var u;var B;var t;var p;var w;var v=0;function A(){v--;if(v===0){q&&q()}}for(var s=this.shapeList.length-1;
s>=0;s--){p=j.get(this.shapeList[s],"seriesIndex");if(C[p]&&!C[p][3]){if(this.shapeList[s].type==="rectangle"){w=j.get(this.shapeList[s],"dataIndex");t=r[p];
if(C[p][2]&&w===t.data.length-1){this.zr.delShape(this.shapeList[s].id);continue}else{if(!C[p][2]&&w===0){this.zr.delShape(this.shapeList[s].id);continue
}}if(this.shapeList[s]._orient==="horizontal"){B=this.component.yAxis.getAxis(t.yAxisIndex||0).getGap();u=C[p][2]?-B:B;z=0}else{D=this.component.xAxis.getAxis(t.xAxisIndex||0).getGap();
z=C[p][2]?D:-D;u=0}this.shapeList[s].position=[0,0];v++;this.zr.animate(this.shapeList[s].id,"").when(this.query(this.option,"animationDurationUpdate"),{position:[z,u]}).done(A).start()
}}}if(!v){A()}}};g.inherits(h,l);i("../chart").define("bar",h);return h});d("echarts/echarts",["require","./config","zrender/tool/util","zrender/tool/event","zrender/tool/env","zrender","zrender/config","./chart/island","./component/toolbox","./component","./component/title","./component/tooltip","./component/legend","./util/ecData","./chart","zrender/tool/color","./component/timeline","zrender/shape/Image","zrender/loadingEffect/Bar","zrender/loadingEffect/Bubble","zrender/loadingEffect/DynamicLine","zrender/loadingEffect/Ring","zrender/loadingEffect/Spin","zrender/loadingEffect/Whirling","./theme/macarons","./theme/infographic"],function(h){var p=h("./config");
var j=h("zrender/tool/util");var q=h("zrender/tool/event");var r={};var g=h("zrender/tool/env").canvasSupported;var l=new Date()-0;var s={};var n="_echarts_instance_";
r.version="2.2.2";r.dependencies={zrender:"2.0.8"};r.init=function(w,v){var u=h("zrender");if((u.version.replace(".","")-0)<(r.dependencies.zrender.replace(".","")-0)){console.error("ZRender "+u.version+" is too old for ECharts "+r.version+". Current version need ZRender "+r.dependencies.zrender+"+")
}w=w instanceof Array?w[0]:w;var t=w.getAttribute(n);if(!t){t=l++;w.setAttribute(n,t)}if(s[t]){s[t].dispose()}s[t]=new o(w);s[t].id=t;s[t].canvasSupported=g;
s[t].setTheme(v);return s[t]};r.getInstanceById=function(t){return s[t]};function f(){q.Dispatcher.call(this)}j.merge(f.prototype,q.Dispatcher.prototype,true);
function o(t){t.innerHTML="";this._themeConfig={};this.dom=t;this._connected=false;this._status={dragIn:false,dragOut:false,needRefresh:false};this._curEventType=false;
this._chartList=[];this._messageCenter=new f();this._messageCenterOutSide=new f();this.resize=this.resize();this._init()}var i=h("zrender/config").EVENT;
var m=["CLICK","DBLCLICK","MOUSEOVER","MOUSEOUT","DRAGSTART","DRAGEND","DRAGENTER","DRAGOVER","DRAGLEAVE","DROP"];function k(y,v,x,w,u){var A=y._chartList;
var t=A.length;while(t--){var z=A[t];if(typeof z[v]==="function"){z[v](x,w,u)}}}o.prototype={_init:function(){var D=this;var t=h("zrender").init(this.dom);
this._zr=t;this._messageCenter.dispatch=function(F,H,E,G){E=E||{};E.type=F;E.event=H;D._messageCenter.dispatchWithContext(F,E,G);if(F!="HOVER"&&F!="MOUSEOUT"){setTimeout(function(){D._messageCenterOutSide.dispatchWithContext(F,E,G)
},50)}else{D._messageCenterOutSide.dispatchWithContext(F,E,G)}};this._onevent=function(E){return D.__onevent(E)};for(var z in p.EVENT){if(z!="CLICK"&&z!="DBLCLICK"&&z!="HOVER"&&z!="MOUSEOUT"&&z!="MAP_ROAM"){this._messageCenter.bind(p.EVENT[z],this._onevent,this)
}}var C={};this._onzrevent=function(E){return D[C[E.type]](E)};for(var w=0,y=m.length;w<y;w++){var x=m[w];var u=i[x];C[u]="_on"+x.toLowerCase();t.on(u,this._onzrevent)
}this.chart={};this.component={};var B=h("./chart/island");this._island=new B(this._themeConfig,this._messageCenter,t,{},this);this.chart.island=this._island;
var v=h("./component/toolbox");this._toolbox=new v(this._themeConfig,this._messageCenter,t,{},this);this.component.toolbox=this._toolbox;var A=h("./component");
A.define("title",h("./component/title"));A.define("tooltip",h("./component/tooltip"));A.define("legend",h("./component/legend"));if(t.getWidth()===0||t.getHeight()===0){console.error("Dom’s width & height should be ready before init.")
}},__onevent:function(w){w.__echartsId=w.__echartsId||this.id;var y=(w.__echartsId===this.id);if(!this._curEventType){this._curEventType=w.type}switch(w.type){case p.EVENT.LEGEND_SELECTED:this._onlegendSelected(w);
break;case p.EVENT.DATA_ZOOM:if(!y){var t=this.component.dataZoom;if(t){t.silence(true);t.absoluteZoom(w.zoom);t.silence(false)}}this._ondataZoom(w);break;
case p.EVENT.DATA_RANGE:y&&this._ondataRange(w);break;case p.EVENT.MAGIC_TYPE_CHANGED:if(!y){var u=this.component.toolbox;if(u){u.silence(true);u.setMagicType(w.magicType);
u.silence(false)}}this._onmagicTypeChanged(w);break;case p.EVENT.DATA_VIEW_CHANGED:y&&this._ondataViewChanged(w);break;case p.EVENT.TOOLTIP_HOVER:y&&this._tooltipHover(w);
break;case p.EVENT.RESTORE:this._onrestore();break;case p.EVENT.REFRESH:y&&this._onrefresh(w);break;case p.EVENT.TOOLTIP_IN_GRID:case p.EVENT.TOOLTIP_OUT_GRID:if(!y){var v=this.component.grid;
if(v){this._zr.trigger("mousemove",{connectTrigger:true,zrenderX:v.getX()+w.x*v.getWidth(),zrenderY:v.getY()+w.y*v.getHeight()})}}else{if(this._connected){var v=this.component.grid;
if(v){w.x=(w.event.zrenderX-v.getX())/v.getWidth();w.y=(w.event.zrenderY-v.getY())/v.getHeight()}}}break}if(this._connected&&y&&this._curEventType===w.type){for(var x in this._connected){this._connected[x].connectedEventHandler(w)
}this._curEventType=null}if(!y||(!this._connected&&y)){this._curEventType=null}},_onclick:function(u){k(this,"onclick",u);if(u.target){var t=this._eventPackage(u.target);
if(t&&t.seriesIndex!=null){this._messageCenter.dispatch(p.EVENT.CLICK,u.event,t,this)}}},_ondblclick:function(u){k(this,"ondblclick",u);if(u.target){var t=this._eventPackage(u.target);
if(t&&t.seriesIndex!=null){this._messageCenter.dispatch(p.EVENT.DBLCLICK,u.event,t,this)}}},_onmouseover:function(u){if(u.target){var t=this._eventPackage(u.target);
if(t&&t.seriesIndex!=null){this._messageCenter.dispatch(p.EVENT.HOVER,u.event,t,this)}}},_onmouseout:function(u){if(u.target){var t=this._eventPackage(u.target);
if(t&&t.seriesIndex!=null){this._messageCenter.dispatch(p.EVENT.MOUSEOUT,u.event,t,this)}}},_ondragstart:function(t){this._status={dragIn:false,dragOut:false,needRefresh:false};
k(this,"ondragstart",t)},_ondragenter:function(t){k(this,"ondragenter",t)},_ondragover:function(t){k(this,"ondragover",t)},_ondragleave:function(t){k(this,"ondragleave",t)
},_ondrop:function(t){k(this,"ondrop",t,this._status);this._island.ondrop(t,this._status)},_ondragend:function(u){k(this,"ondragend",u,this._status);this._timeline&&this._timeline.ondragend(u,this._status);
this._island.ondragend(u,this._status);if(this._status.needRefresh){this._syncBackupData(this._option);var t=this._messageCenter;t.dispatch(p.EVENT.DATA_CHANGED,u.event,this._eventPackage(u.target),this);
t.dispatch(p.EVENT.REFRESH,null,null,this)}},_onlegendSelected:function(t){this._status.needRefresh=false;k(this,"onlegendSelected",t,this._status);if(this._status.needRefresh){this._messageCenter.dispatch(p.EVENT.REFRESH,null,null,this)
}},_ondataZoom:function(t){this._status.needRefresh=false;k(this,"ondataZoom",t,this._status);if(this._status.needRefresh){this._messageCenter.dispatch(p.EVENT.REFRESH,null,null,this)
}},_ondataRange:function(t){this._clearEffect();this._status.needRefresh=false;k(this,"ondataRange",t,this._status);if(this._status.needRefresh){this._zr.refreshNextFrame()
}},_onmagicTypeChanged:function(){this._clearEffect();this._render(this._toolbox.getMagicOption())},_ondataViewChanged:function(t){this._syncBackupData(t.option);
this._messageCenter.dispatch(p.EVENT.DATA_CHANGED,null,t,this);this._messageCenter.dispatch(p.EVENT.REFRESH,null,null,this)},_tooltipHover:function(u){var t=[];
k(this,"ontooltipHover",u,t)},_onrestore:function(){this.restore()},_onrefresh:function(t){this._refreshInside=true;this.refresh(t);this._refreshInside=false
},_syncBackupData:function(t){this.component.dataZoom&&this.component.dataZoom.syncBackupData(t)},_eventPackage:function(w){if(w){var v=h("./util/ecData");
var t=v.get(w,"seriesIndex");var u=v.get(w,"dataIndex");u=t!=-1&&this.component.dataZoom?this.component.dataZoom.getRealDataIndex(t,u):u;return{seriesIndex:t,seriesName:(v.get(w,"series")||{}).name,dataIndex:u,data:v.get(w,"data"),name:v.get(w,"name"),value:v.get(w,"value"),special:v.get(w,"special")}
}return},_noDataCheck:function(x){var v=x.series;for(var u=0,t=v.length;u<t;u++){if(v[u].type==p.CHART_TYPE_MAP||(v[u].data&&v[u].data.length>0)||(v[u].markPoint&&v[u].markPoint.data&&v[u].markPoint.data.length>0)||(v[u].markLine&&v[u].markLine.data&&v[u].markLine.data.length>0)||(v[u].nodes&&v[u].nodes.length>0)||(v[u].links&&v[u].links.length>0)||(v[u].matrix&&v[u].matrix.length>0)||(v[u].eventList&&v[u].eventList.length>0)){return false
}}var w=(this._option&&this._option.noDataLoadingOption)||this._themeConfig.noDataLoadingOption||p.noDataLoadingOption||{text:(this._option&&this._option.noDataText)||this._themeConfig.noDataText||p.noDataText,effect:(this._option&&this._option.noDataEffect)||this._themeConfig.noDataEffect||p.noDataEffect};
this.clear();this.showLoading(w);return true},_render:function(B){this._mergeGlobalConifg(B);if(this._noDataCheck(B)){return}var J=B.backgroundColor;if(J){if(!g&&J.indexOf("rgba")!=-1){var A=J.split(",");
this.dom.style.filter="alpha(opacity="+A[3].substring(0,A[3].lastIndexOf(")"))*100+")";A.length=3;A[0]=A[0].replace("a","");this.dom.style.backgroundColor=A.join(",")+")"
}else{this.dom.style.backgroundColor=J}}this._zr.clearAnimation();this._chartList=[];var w=h("./chart");var I=h("./component");if(B.xAxis||B.yAxis){B.grid=B.grid||{};
B.dataZoom=B.dataZoom||{}}var v=["title","legend","tooltip","dataRange","roamController","grid","dataZoom","xAxis","yAxis","polar"];var u;var x;var H;for(var D=0,z=v.length;
D<z;D++){x=v[D];H=this.component[x];if(B[x]){if(H){H.refresh&&H.refresh(B)}else{u=I.get(/^[xy]Axis$/.test(x)?"axis":x);H=new u(this._themeConfig,this._messageCenter,this._zr,B,this,x);
this.component[x]=H}this._chartList.push(H)}else{if(H){H.dispose();this.component[x]=null;delete this.component[x]}}}var E;var G;var F;var y={};for(var D=0,z=B.series.length;
D<z;D++){G=B.series[D].type;if(!G){console.error("series["+D+"] chart type has not been defined.");continue}if(!y[G]){y[G]=true;E=w.get(G);if(E){if(this.chart[G]){F=this.chart[G];
F.refresh(B)}else{F=new E(this._themeConfig,this._messageCenter,this._zr,B,this)}this._chartList.push(F);this.chart[G]=F}else{console.error(G+" has not been required.")
}}}for(G in this.chart){if(G!=p.CHART_TYPE_ISLAND&&!y[G]){this.chart[G].dispose();this.chart[G]=null;delete this.chart[G]}}this.component.grid&&this.component.grid.refixAxisShape(this.component);
this._island.refresh(B);this._toolbox.refresh(B);B.animation&&!B.renderAsImage?this._zr.refresh():this._zr.render();var t="IMG"+this.id;var C=document.getElementById(t);
if(B.renderAsImage&&g){if(C){C.src=this.getDataURL(B.renderAsImage)}else{C=this.getImage(B.renderAsImage);C.id=t;C.style.position="absolute";C.style.left=0;
C.style.top=0;this.dom.firstChild.appendChild(C)}this.un();this._zr.un();this._disposeChartList();this._zr.clear()}else{if(C){C.parentNode.removeChild(C)
}}C=null;this._option=B},restore:function(){this._clearEffect();this._option=j.clone(this._optionRestore);this._disposeChartList();this._island.clear();
this._toolbox.reset(this._option,true);this._render(this._option)},refresh:function(v){this._clearEffect();v=v||{};var w=v.option;if(!this._refreshInside&&w){w=this.getOption();
j.merge(w,v.option,true);j.merge(this._optionRestore,v.option,true);this._toolbox.reset(w)}this._island.refresh(w);this._toolbox.refresh(w);this._zr.clearAnimation();
for(var u=0,t=this._chartList.length;u<t;u++){this._chartList[u].refresh&&this._chartList[u].refresh(w)}this.component.grid&&this.component.grid.refixAxisShape(this.component);
this._zr.refresh()},_disposeChartList:function(){this._clearEffect();this._zr.clearAnimation();var t=this._chartList.length;while(t--){var v=this._chartList[t];
if(v){var u=v.type;this.chart[u]&&delete this.chart[u];this.component[u]&&delete this.component[u];v.dispose&&v.dispose()}}this._chartList=[]},_mergeGlobalConifg:function(x){var v=["backgroundColor","calculable","calculableColor","calculableHolderColor","nameConnector","valueConnector","animation","animationThreshold","animationDuration","animationDurationUpdate","animationEasing","addDataAnimation","symbolList","DRAG_ENABLE_TIME"];
var t=v.length;while(t--){var u=v[t];if(x[u]==null){x[u]=this._themeConfig[u]!=null?this._themeConfig[u]:p[u]}}var w=x.color;if(!(w&&w.length)){w=this._themeConfig.color||p.color
}this._zr.getColor=function(y){var z=h("zrender/tool/color");return z.getColor(y,w)};if(!g){x.animation=false;x.addDataAnimation=false}},setOption:function(t,u){if(!t.timeline){return this._setOption(t,u)
}else{return this._setTimelineOption(t)}},_setOption:function(t,u){if(!u&&this._option){this._option=j.merge(this.getOption(),j.clone(t),true)}else{this._option=j.clone(t)
}this._optionRestore=j.clone(this._option);if(!this._option.series||this._option.series.length===0){this._zr.clear();return}if(this.component.dataZoom&&(this._option.dataZoom||(this._option.toolbox&&this._option.toolbox.feature&&this._option.toolbox.feature.dataZoom&&this._option.toolbox.feature.dataZoom.show))){this.component.dataZoom.syncOption(this._option)
}this._toolbox.reset(this._option);this._render(this._option);return this},getOption:function(){var v=j.clone(this._option);var t=this;function u(y){var x=t._optionRestore[y];
if(x){if(x instanceof Array){var w=x.length;while(w--){v[y][w].data=j.clone(x[w].data)}}else{v[y].data=j.clone(x.data)}}}u("xAxis");u("yAxis");u("series");
return v},setSeries:function(t,u){if(!u){this.setOption({series:t})}else{this._option.series=t;this.setOption(this._option,u)}return this},getSeries:function(){return this.getOption().series
},_setTimelineOption:function(t){this._timeline&&this._timeline.dispose();var v=h("./component/timeline");var u=new v(this._themeConfig,this._messageCenter,this._zr,t,this);
this._timeline=u;this.component.timeline=this._timeline;return this},addData:function(F,T,D,x,A){var P=F instanceof Array?F:[[F,T,D,x,A]];var I=this.getOption();
var y=this._optionRestore;for(var L=0,K=P.length;L<K;L++){F=P[L][0];T=P[L][1];D=P[L][2];x=P[L][3];A=P[L][4];var J=y.series[F];var R=D?"unshift":"push";
var Q=D?"pop":"shift";if(J){var C=J.data;var v=I.series[F].data;C[R](T);v[R](T);if(!x){C[Q]();T=v[Q]()}if(A!=null){var u;var w;if(J.type===p.CHART_TYPE_PIE&&(u=y.legend)&&(w=u.data)){var E=I.legend.data;
w[R](A);E[R](A);if(!x){var O=j.indexOf(w,T.name);O!=-1&&w.splice(O,1);O=j.indexOf(E,T.name);O!=-1&&E.splice(O,1)}}else{if(y.xAxis!=null&&y.yAxis!=null){var z;
var H;var B=J.xAxisIndex||0;if(y.xAxis[B].type==null||y.xAxis[B].type==="category"){z=y.xAxis[B].data;H=I.xAxis[B].data;z[R](A);H[R](A);if(!x){z[Q]();H[Q]()
}}B=J.yAxisIndex||0;if(y.yAxis[B].type==="category"){z=y.yAxis[B].data;H=I.yAxis[B].data;z[R](A);H[R](A);if(!x){z[Q]();H[Q]()}}}}}this._option.series[F].data=I.series[F].data
}}this._zr.clearAnimation();var S=this._chartList;var N=0;var M=function(){N--;if(N===0){t()}};for(var L=0,K=S.length;L<K;L++){if(I.addDataAnimation&&S[L].addDataAnimation){N++;
S[L].addDataAnimation(P,M)}}this.component.dataZoom&&this.component.dataZoom.syncOption(I);this._option=I;var G=this;function t(){if(!G._zr){return}G._zr.clearAnimation();
for(var V=0,U=S.length;V<U;V++){S[V].motionlessOnce=I.addDataAnimation&&S[V].addDataAnimation}G._messageCenter.dispatch(p.EVENT.REFRESH,null,{option:I},G)
}if(!I.addDataAnimation){setTimeout(t,0)}return this},addMarkPoint:function(t,u){return this._addMark(t,u,"markPoint")},addMarkLine:function(t,u){return this._addMark(t,u,"markLine")
},_addMark:function(B,x,D){var w=this._option.series;var A;if(w&&(A=w[B])){var v=this._optionRestore.series;var t=v[B];var u=A[D];var z=t[D];u=A[D]=u||{data:[]};
z=t[D]=z||{data:[]};for(var C in x){if(C==="data"){u.data=u.data.concat(x.data);z.data=z.data.concat(x.data)}else{if(typeof x[C]!="object"||u[C]==null){u[C]=z[C]=x[C]
}else{j.merge(u[C],x[C],true);j.merge(z[C],x[C],true)}}}var y=this.chart[A.type];y&&y.addMark(B,x,D)}return this},delMarkPoint:function(u,t){return this._delMark(u,t,"markPoint")
},delMarkLine:function(u,t){return this._delMark(u,t,"markLine")},_delMark:function(C,v,E){var z=this._option.series;var B;var x;var D;if(!(z&&(B=z[C])&&(x=B[E])&&(D=x.data))){return this
}v=v.split(" > ");var u=-1;for(var y=0,w=D.length;y<w;y++){var t=D[y];if(t instanceof Array){if(t[0].name===v[0]&&t[1].name===v[1]){u=y;break}}else{if(t.name===v[0]){u=y;
break}}}if(u>-1){D.splice(u,1);this._optionRestore.series[C][E].data.splice(u,1);var A=this.chart[B.type];A&&A.delMark(C,v.join(" > "),E)}return this},getDom:function(){return this.dom
},getZrender:function(){return this._zr},getDataURL:function(v){if(!g){return""}if(this._chartList.length===0){var u="IMG"+this.id;var t=document.getElementById(u);
if(t){return t.src}}var x=this.component.tooltip;x&&x.hideTip();switch(v){case"jpeg":break;default:v="png"}var w=this._option.backgroundColor;if(w&&w.replace(" ","")==="rgba(0,0,0,0)"){w="#fff"
}return this._zr.toDataURL("image/"+v,w)},getImage:function(u){var v=this._optionRestore.title;var t=document.createElement("img");t.src=this.getDataURL(u);
t.title=(v&&v.text)||"ECharts";return t},getConnectedDataURL:function(z){if(!this.isConnected()){return this.getDataURL(z)}var D=this.dom;var x={self:{img:this.getDataURL(z),left:D.offsetLeft,top:D.offsetTop,right:D.offsetLeft+D.offsetWidth,bottom:D.offsetTop+D.offsetHeight}};
var A=x.self.left;var y=x.self.top;var B=x.self.right;var F=x.self.bottom;for(var C in this._connected){D=this._connected[C].getDom();x[C]={img:this._connected[C].getDataURL(z),left:D.offsetLeft,top:D.offsetTop,right:D.offsetLeft+D.offsetWidth,bottom:D.offsetTop+D.offsetHeight};
A=Math.min(A,x[C].left);y=Math.min(y,x[C].top);B=Math.max(B,x[C].right);F=Math.max(F,x[C].bottom)}var u=document.createElement("div");u.style.position="absolute";
u.style.left="-4000px";u.style.width=(B-A)+"px";u.style.height=(F-y)+"px";document.body.appendChild(u);var v=h("zrender").init(u);var t=h("zrender/shape/Image");
for(var C in x){v.addShape(new t({style:{x:x[C].left-A,y:x[C].top-y,image:x[C].img}}))}v.render();var E=this._option.backgroundColor;if(E&&E.replace(/ /g,"")==="rgba(0,0,0,0)"){E="#fff"
}var w=v.toDataURL("image/png",E);setTimeout(function(){v.dispose();u.parentNode.removeChild(u);u=null},100);return w},getConnectedImage:function(u){var v=this._optionRestore.title;
var t=document.createElement("img");t.src=this.getConnectedDataURL(u);t.title=(v&&v.text)||"ECharts";return t},on:function(u,t){this._messageCenterOutSide.bind(u,t,this);
return this},un:function(u,t){this._messageCenterOutSide.unbind(u,t);return this},connect:function(u){if(!u){return this}if(!this._connected){this._connected={}
}if(u instanceof Array){for(var v=0,t=u.length;v<t;v++){this._connected[u[v].id]=u[v]}}else{this._connected[u.id]=u}return this},disConnect:function(v){if(!v||!this._connected){return this
}if(v instanceof Array){for(var w=0,t=v.length;w<t;w++){delete this._connected[v[w].id]}}else{delete this._connected[v.id]}for(var u in this._connected){return u,this
}this._connected=false;return this},connectedEventHandler:function(t){if(t.__echartsId!=this.id){this._onevent(t)}},isConnected:function(){return !!this._connected
},showLoading:function(x){var v={bar:h("zrender/loadingEffect/Bar"),bubble:h("zrender/loadingEffect/Bubble"),dynamicLine:h("zrender/loadingEffect/DynamicLine"),ring:h("zrender/loadingEffect/Ring"),spin:h("zrender/loadingEffect/Spin"),whirling:h("zrender/loadingEffect/Whirling")};
this._toolbox.hideDataView();x=x||{};var w=x.textStyle||{};x.textStyle=w;var u=j.merge(j.merge(j.clone(w),this._themeConfig.textStyle),p.textStyle);w.textFont=u.fontStyle+" "+u.fontWeight+" "+u.fontSize+"px "+u.fontFamily;
w.text=x.text||(this._option&&this._option.loadingText)||this._themeConfig.loadingText||p.loadingText;if(x.x!=null){w.x=x.x}if(x.y!=null){w.y=x.y}x.effectOption=x.effectOption||{};
x.effectOption.textStyle=w;var t=x.effect;if(typeof t==="string"||t==null){t=v[x.effect||(this._option&&this._option.loadingEffect)||this._themeConfig.loadingEffect||p.loadingEffect]||v.spin
}this._zr.showLoading(new t(x.effectOption));return this},hideLoading:function(){this._zr.hideLoading();return this},setTheme:function(t){if(t){if(typeof t==="string"){switch(t){case"macarons":t=h("./theme/macarons");
break;case"infographic":t=h("./theme/infographic");break;default:t={}}}else{t=t||{}}this._themeConfig=t}if(!g){var u=this._themeConfig.textStyle;u&&u.fontFamily&&u.fontFamily2&&(u.fontFamily=u.fontFamily2);
u=p.textStyle;u.fontFamily=u.fontFamily2}this._timeline&&this._timeline.setTheme(true);this._optionRestore&&this.restore()},resize:function(){var t=this;
return function(){t._clearEffect();t._zr.resize();if(t._option&&t._option.renderAsImage&&g){t._render(t._option);return t}t._zr.clearAnimation();t._island.resize();
t._toolbox.resize();t._timeline&&t._timeline.resize();for(var v=0,u=t._chartList.length;v<u;v++){t._chartList[v].resize&&t._chartList[v].resize()}t.component.grid&&t.component.grid.refixAxisShape(t.component);
t._zr.refresh();t._messageCenter.dispatch(p.EVENT.RESIZE,null,null,t);return t}},_clearEffect:function(){this._zr.modLayer(p.EFFECT_ZLEVEL,{motionBlur:false});
this._zr.painter.clearLayer(p.EFFECT_ZLEVEL)},clear:function(){this._disposeChartList();this._zr.clear();this._option={};this._optionRestore={};this.dom.style.backgroundColor=null;
return this},dispose:function(){var t=this.dom.getAttribute(n);t&&delete s[t];this._island.dispose();this._toolbox.dispose();this._timeline&&this._timeline.dispose();
this._messageCenter.unbind();this.clear();this._zr.dispose();this._zr=null}};return r});d("zrender/shape/Polyline",["require","./Base","./util/smoothSpline","./util/smoothBezier","./util/dashedLineTo","./Polygon","../tool/util"],function(h){var i=h("./Base");
var k=h("./util/smoothSpline");var j=h("./util/smoothBezier");var f=h("./util/dashedLineTo");var g=function(l){this.brushTypeOnly="stroke";this.textPosition="end";
i.call(this,l)};g.prototype={type:"polyline",buildPath:function(v,m){var l=m.pointList;if(l.length<2){return}var t=Math.min(m.pointList.length,Math.round(m.pointListLength||m.pointList.length));
if(m.smooth&&m.smooth!=="spline"){if(!m.controlPointList){this.updateControlPoints(m)}var u=m.controlPointList;v.moveTo(l[0][0],l[0][1]);var s;var q;var o;
for(var r=0;r<t-1;r++){s=u[r*2];q=u[r*2+1];o=l[r+1];v.bezierCurveTo(s[0],s[1],q[0],q[1],o[0],o[1])}}else{if(m.smooth==="spline"){l=k(l);t=l.length}if(!m.lineType||m.lineType=="solid"){v.moveTo(l[0][0],l[0][1]);
for(var r=1;r<t;r++){v.lineTo(l[r][0],l[r][1])}}else{if(m.lineType=="dashed"||m.lineType=="dotted"){var n=(m.lineWidth||1)*(m.lineType=="dashed"?5:1);v.moveTo(l[0][0],l[0][1]);
for(var r=1;r<t;r++){f(v,l[r-1][0],l[r-1][1],l[r][0],l[r][1],n)}}}}return},updateControlPoints:function(l){l.controlPointList=j(l.pointList,l.smooth,false,l.smoothConstraint)
},getRect:function(l){return h("./Polygon").prototype.getRect(l)}};h("../tool/util").inherits(g,i);return g});d("echarts/util/shape/HalfSmoothPolygon",["require","zrender/shape/Base","zrender/shape/util/smoothBezier","zrender/tool/util","zrender/shape/Polygon"],function(g){var h=g("zrender/shape/Base");
var j=g("zrender/shape/util/smoothBezier");var f=g("zrender/tool/util");function i(k){h.call(this,k)}i.prototype={type:"half-smooth-polygon",buildPath:function(t,m){var k=m.pointList;
if(k.length<2){return}if(m.smooth){var u=j(k.slice(0,-2),m.smooth,false,m.smoothConstraint);t.moveTo(k[0][0],k[0][1]);var s;var q;var n;var o=k.length;
for(var r=0;r<o-3;r++){s=u[r*2];q=u[r*2+1];n=k[r+1];t.bezierCurveTo(s[0],s[1],q[0],q[1],n[0],n[1])}t.lineTo(k[o-2][0],k[o-2][1]);t.lineTo(k[o-1][0],k[o-1][1]);
t.lineTo(k[0][0],k[0][1])}else{g("zrender/shape/Polygon").prototype.buildPath(t,m)}return}};f.inherits(i,h);return i});d("echarts/util/shape/Icon",["require","zrender/tool/util","zrender/shape/Star","zrender/shape/Heart","zrender/shape/Droplet","zrender/shape/Image","zrender/shape/Base"],function(s){var x=s("zrender/tool/util");
function I(M,O){var K=O.x;var P=O.y;var N=O.width/16;var L=O.height/16;M.moveTo(K,P+O.height);M.lineTo(K+5*N,P+14*L);M.lineTo(K+O.width,P+3*L);M.lineTo(K+13*N,P);
M.lineTo(K+2*N,P+11*L);M.lineTo(K,P+O.height);M.moveTo(K+6*N,P+10*L);M.lineTo(K+14*N,P+2*L);M.moveTo(K+10*N,P+13*L);M.lineTo(K+O.width,P+13*L);M.moveTo(K+13*N,P+10*L);
M.lineTo(K+13*N,P+O.height)}function l(M,O){var K=O.x;var P=O.y;var N=O.width/16;var L=O.height/16;M.moveTo(K,P+O.height);M.lineTo(K+5*N,P+14*L);M.lineTo(K+O.width,P+3*L);
M.lineTo(K+13*N,P);M.lineTo(K+2*N,P+11*L);M.lineTo(K,P+O.height);M.moveTo(K+6*N,P+10*L);M.lineTo(K+14*N,P+2*L);M.moveTo(K+10*N,P+13*L);M.lineTo(K+O.width,P+13*L)
}function o(M,O){var K=O.x;var P=O.y;var N=O.width/16;var L=O.height/16;M.moveTo(K+4*N,P+15*L);M.lineTo(K+9*N,P+13*L);M.lineTo(K+14*N,P+8*L);M.lineTo(K+11*N,P+5*L);
M.lineTo(K+6*N,P+10*L);M.lineTo(K+4*N,P+15*L);M.moveTo(K+5*N,P);M.lineTo(K+11*N,P);M.moveTo(K+5*N,P+L);M.lineTo(K+11*N,P+L);M.moveTo(K,P+2*L);M.lineTo(K+O.width,P+2*L);
M.moveTo(K,P+5*L);M.lineTo(K+3*N,P+O.height);M.lineTo(K+13*N,P+O.height);M.lineTo(K+O.width,P+5*L)}function H(M,O){var K=O.x;var P=O.y;var N=O.width/16;
var L=O.height/16;M.moveTo(K,P+3*L);M.lineTo(K+6*N,P+3*L);M.moveTo(K+3*N,P);M.lineTo(K+3*N,P+6*L);M.moveTo(K+3*N,P+8*L);M.lineTo(K+3*N,P+O.height);M.lineTo(K+O.width,P+O.height);
M.lineTo(K+O.width,P+3*L);M.lineTo(K+8*N,P+3*L)}function y(M,O){var K=O.x;var P=O.y;var N=O.width/16;var L=O.height/16;M.moveTo(K+6*N,P);M.lineTo(K+2*N,P+3*L);
M.lineTo(K+6*N,P+6*L);M.moveTo(K+2*N,P+3*L);M.lineTo(K+14*N,P+3*L);M.lineTo(K+14*N,P+11*L);M.moveTo(K+2*N,P+5*L);M.lineTo(K+2*N,P+13*L);M.lineTo(K+14*N,P+13*L);
M.moveTo(K+10*N,P+10*L);M.lineTo(K+14*N,P+13*L);M.lineTo(K+10*N,P+O.height)}function m(M,O){var K=O.x;var Q=O.y;var N=O.width/16;var L=O.height/16;var P=O.width/2;
M.lineWidth=1.5;M.arc(K+P,Q+P,P-N,0,Math.PI*2/3);M.moveTo(K+3*N,Q+O.height);M.lineTo(K+0*N,Q+12*L);M.lineTo(K+5*N,Q+11*L);M.moveTo(K,Q+8*L);M.arc(K+P,Q+P,P-N,Math.PI,Math.PI*5/3);
M.moveTo(K+13*N,Q);M.lineTo(K+O.width,Q+4*L);M.lineTo(K+11*N,Q+5*L)}function B(M,O){var K=O.x;var P=O.y;var N=O.width/16;var L=O.height/16;M.moveTo(K,P);
M.lineTo(K,P+O.height);M.lineTo(K+O.width,P+O.height);M.moveTo(K+2*N,P+14*L);M.lineTo(K+7*N,P+6*L);M.lineTo(K+11*N,P+11*L);M.lineTo(K+15*N,P+2*L)}function r(M,O){var K=O.x;
var P=O.y;var N=O.width/16;var L=O.height/16;M.moveTo(K,P);M.lineTo(K,P+O.height);M.lineTo(K+O.width,P+O.height);M.moveTo(K+3*N,P+14*L);M.lineTo(K+3*N,P+6*L);
M.lineTo(K+4*N,P+6*L);M.lineTo(K+4*N,P+14*L);M.moveTo(K+7*N,P+14*L);M.lineTo(K+7*N,P+2*L);M.lineTo(K+8*N,P+2*L);M.lineTo(K+8*N,P+14*L);M.moveTo(K+11*N,P+14*L);
M.lineTo(K+11*N,P+9*L);M.lineTo(K+12*N,P+9*L);M.lineTo(K+12*N,P+14*L)}function z(M,O){var L=O.x;var Q=O.y;var N=O.width-2;var K=O.height-2;var P=Math.min(N,K)/2;
Q+=2;M.moveTo(L+P+3,Q+P-3);M.arc(L+P+3,Q+P-3,P-1,0,-Math.PI/2,true);M.lineTo(L+P+3,Q+P-3);M.moveTo(L+P,Q);M.lineTo(L+P,Q+P);M.arc(L+P,Q+P,P,-Math.PI/2,Math.PI*2,true);
M.lineTo(L+P,Q+P);M.lineWidth=1.5}function J(M,O){var K=O.x;var P=O.y;var N=O.width/16;var L=O.height/16;P-=L;M.moveTo(K+1*N,P+2*L);M.lineTo(K+15*N,P+2*L);
M.lineTo(K+14*N,P+3*L);M.lineTo(K+2*N,P+3*L);M.moveTo(K+3*N,P+6*L);M.lineTo(K+13*N,P+6*L);M.lineTo(K+12*N,P+7*L);M.lineTo(K+4*N,P+7*L);M.moveTo(K+5*N,P+10*L);
M.lineTo(K+11*N,P+10*L);M.lineTo(K+10*N,P+11*L);M.lineTo(K+6*N,P+11*L);M.moveTo(K+7*N,P+14*L);M.lineTo(K+9*N,P+14*L);M.lineTo(K+8*N,P+15*L);M.lineTo(K+7*N,P+15*L)
}function A(Q,L){var O=L.x;var N=L.y;var M=L.width;var P=L.height;var S=M/16;var R=P/16;var K=Math.min(S,R)*2;Q.moveTo(O+S+K,N+R+K);Q.arc(O+S,N+R,K,Math.PI/4,Math.PI*3);
Q.lineTo(O+7*S-K,N+6*R-K);Q.arc(O+7*S,N+6*R,K,Math.PI/4*5,Math.PI*4);Q.arc(O+7*S,N+6*R,K/2,Math.PI/4*5,Math.PI*4);Q.moveTo(O+7*S-K/2,N+6*R+K);Q.lineTo(O+S+K,N+14*R-K);
Q.arc(O+S,N+14*R,K,-Math.PI/4,Math.PI*2);Q.moveTo(O+7*S+K/2,N+6*R);Q.lineTo(O+14*S-K,N+10*R-K/2);Q.moveTo(O+16*S,N+10*R);Q.arc(O+14*S,N+10*R,K,0,Math.PI*3);
Q.lineWidth=1.5}function g(M,O){var L=O.x;var Q=O.y;var N=O.width;var K=O.height;var P=Math.min(N,K)/2;M.moveTo(L+N,Q+K/2);M.arc(L+P,Q+P,P,0,Math.PI*2);
M.arc(L+P,Q,P,Math.PI/4,Math.PI/5*4);M.arc(L,Q+P,P,-Math.PI/3,Math.PI/3);M.arc(L+N,Q+K,P,Math.PI,Math.PI/2*3);M.lineWidth=1.5}function D(R,K){var O=K.x;
var N=K.y;var L=K.width;var Q=K.height;var S=Math.round(Q/3);var P=Math.round((S-2)/2);var M=3;while(M--){R.rect(O,N+S*M+P,L,2)}}function G(R,K){var O=K.x;
var N=K.y;var L=K.width;var Q=K.height;var S=Math.round(L/3);var P=Math.round((S-2)/2);var M=3;while(M--){R.rect(O+S*M+P,N,2,Q)}}function q(L,N){var K=N.x;
var O=N.y;var M=N.width/16;L.moveTo(K+M,O);L.lineTo(K+M,O+N.height);L.lineTo(K+15*M,O+N.height);L.lineTo(K+15*M,O);L.lineTo(K+M,O);L.moveTo(K+3*M,O+3*M);
L.lineTo(K+13*M,O+3*M);L.moveTo(K+3*M,O+6*M);L.lineTo(K+13*M,O+6*M);L.moveTo(K+3*M,O+9*M);L.lineTo(K+13*M,O+9*M);L.moveTo(K+3*M,O+12*M);L.lineTo(K+9*M,O+12*M)
}function n(M,O){var K=O.x;var P=O.y;var N=O.width/16;var L=O.height/16;M.moveTo(K,P);M.lineTo(K,P+O.height);M.lineTo(K+O.width,P+O.height);M.lineTo(K+O.width,P);
M.lineTo(K,P);M.moveTo(K+4*N,P);M.lineTo(K+4*N,P+8*L);M.lineTo(K+12*N,P+8*L);M.lineTo(K+12*N,P);M.moveTo(K+6*N,P+11*L);M.lineTo(K+6*N,P+13*L);M.lineTo(K+10*N,P+13*L);
M.lineTo(K+10*N,P+11*L);M.lineTo(K+6*N,P+11*L)}function h(M,O){var L=O.x;var P=O.y;var N=O.width;var K=O.height;M.moveTo(L,P+K/2);M.lineTo(L+N,P+K/2);M.moveTo(L+N/2,P);
M.lineTo(L+N/2,P+K)}function t(L,N){var M=N.width/2;var K=N.height/2;var O=Math.min(M,K);L.moveTo(N.x+M+O,N.y+K);L.arc(N.x+M,N.y+K,O,0,Math.PI*2);L.closePath()
}function C(K,L){K.rect(L.x,L.y,L.width,L.height);K.closePath()}function j(M,O){var N=O.width/2;var L=O.height/2;var K=O.x+N;var Q=O.y+L;var P=Math.min(N,L);
M.moveTo(K,Q-P);M.lineTo(K+P,Q+P);M.lineTo(K-P,Q+P);M.lineTo(K,Q-P);M.closePath()}function w(M,O){var N=O.width/2;var L=O.height/2;var K=O.x+N;var Q=O.y+L;
var P=Math.min(N,L);M.moveTo(K,Q-P);M.lineTo(K+P,Q);M.lineTo(K,Q+P);M.lineTo(K-P,Q);M.lineTo(K,Q-P);M.closePath()}function f(L,N){var K=N.x;var O=N.y;var M=N.width/16;
L.moveTo(K+8*M,O);L.lineTo(K+M,O+N.height);L.lineTo(K+8*M,O+N.height/4*3);L.lineTo(K+15*M,O+N.height);L.lineTo(K+8*M,O);L.closePath()}function p(L,O){var M=s("zrender/shape/Star");
var N=O.width/2;var K=O.height/2;M.prototype.buildPath(L,{x:O.x+N,y:O.y+K,r:Math.min(N,K),n:O.n||5})}function k(K,M){var L=s("zrender/shape/Heart");L.prototype.buildPath(K,{x:M.x+M.width/2,y:M.y+M.height*0.2,a:M.width/2,b:M.height*0.8})
}function F(K,L){var M=s("zrender/shape/Droplet");M.prototype.buildPath(K,{x:L.x+L.width*0.5,y:L.y+L.height*0.5,a:L.width*0.5,b:L.height*0.8})}function E(M,O){var L=O.x;
var Q=O.y-O.height/2*1.5;var N=O.width/2;var K=O.height/2;var P=Math.min(N,K);M.arc(L+N,Q+K,P,Math.PI/5*4,Math.PI/5);M.lineTo(L+N,Q+K+P*1.5);M.closePath()
}function v(L,N,K){var O=s("zrender/shape/Image");this._imageShape=this._imageShape||new O({style:{}});for(var M in N){this._imageShape.style[M]=N[M]}this._imageShape.brush(L,false,K)
}var u=s("zrender/shape/Base");function i(K){u.call(this,K)}i.prototype={type:"icon",iconLibrary:{mark:I,markUndo:l,markClear:o,dataZoom:H,dataZoomReset:y,restore:m,lineChart:B,barChart:r,pieChart:z,funnelChart:J,forceChart:A,chordChart:g,stackChart:D,tiledChart:G,dataView:q,saveAsImage:n,cross:h,circle:t,rectangle:C,triangle:j,diamond:w,arrow:f,star:p,heart:k,droplet:F,pin:E,image:v},brush:function(M,P,K){var N=P?this.highlightStyle:this.style;
N=N||{};var L=N.iconType||this.style.iconType;if(L==="image"){var O=s("zrender/shape/Image");O.prototype.brush.call(this,M,P,K)}else{var N=this.beforeBrush(M,P);
M.beginPath();this.buildPath(M,N,K);switch(N.brushType){case"both":M.fill();case"stroke":N.lineWidth>0&&M.stroke();break;default:M.fill()}this.drawText(M,N,this.style);
this.afterBrush(M)}},buildPath:function(L,M,K){if(this.iconLibrary[M.iconType]){this.iconLibrary[M.iconType].call(this,L,M,K)}else{L.moveTo(M.x,M.y);L.lineTo(M.x+M.width,M.y);
L.lineTo(M.x+M.width,M.y+M.height);L.lineTo(M.x,M.y+M.height);L.lineTo(M.x,M.y);L.closePath()}return},getRect:function(K){if(K.__rect){return K.__rect}K.__rect={x:Math.round(K.x),y:Math.round(K.y-(K.iconType=="pin"?(K.height/2*1.5):0)),width:K.width,height:K.height*(K.iconType==="pin"?1.25:1)};
return K.__rect},isCover:function(K,O){var M=this.transformCoordToLocal(K,O);K=M[0];O=M[1];var L=this.style.__rect;if(!L){L=this.style.__rect=this.getRect(this.style)
}var N=(L.height<8||L.width<8)?4:0;return K>=L.x-N&&K<=(L.x+L.width+N)&&O>=L.y-N&&O<=(L.y+L.height+N)}};x.inherits(i,u);return i});d("echarts/component/axis",["require","./base","zrender/shape/Line","../config","../util/ecData","zrender/tool/util","zrender/tool/color","./categoryAxis","./valueAxis","../component"],function(i){var k=i("./base");
var l=i("zrender/shape/Line");var f=i("../config");var j=i("../util/ecData");var g=i("zrender/tool/util");var m=i("zrender/tool/color");function h(r,o,s,q,p,n){k.call(this,r,o,s,q,p);
this.axisType=n;this._axisList=[];this.refresh(q)}h.prototype={type:f.COMPONENT_TYPE_AXIS,axisBase:{_buildAxisLine:function(){var n=this.option.axisLine.lineStyle.width;
var o=n/2;var r={_axisShape:"axisLine",zlevel:this.getZlevelBase(),z:this.getZBase()+3,hoverable:false};var p=this.grid;switch(this.option.position){case"left":r.style={xStart:p.getX()-o,yStart:p.getYend(),xEnd:p.getX()-o,yEnd:p.getY(),lineCap:"round"};
break;case"right":r.style={xStart:p.getXend()+o,yStart:p.getYend(),xEnd:p.getXend()+o,yEnd:p.getY(),lineCap:"round"};break;case"bottom":r.style={xStart:p.getX(),yStart:p.getYend()+o,xEnd:p.getXend(),yEnd:p.getYend()+o,lineCap:"round"};
break;case"top":r.style={xStart:p.getX(),yStart:p.getY()-o,xEnd:p.getXend(),yEnd:p.getY()-o,lineCap:"round"};break}var q=r.style;if(this.option.name!==""){q.text=this.option.name;
q.textPosition=this.option.nameLocation;q.textFont=this.getFont(this.option.nameTextStyle);if(this.option.nameTextStyle.align){q.textAlign=this.option.nameTextStyle.align
}if(this.option.nameTextStyle.baseline){q.textBaseline=this.option.nameTextStyle.baseline}if(this.option.nameTextStyle.color){q.textColor=this.option.nameTextStyle.color
}}q.strokeColor=this.option.axisLine.lineStyle.color;q.lineWidth=n;if(this.isHorizontal()){q.yStart=q.yEnd=this.subPixelOptimize(q.yEnd,n)}else{q.xStart=q.xEnd=this.subPixelOptimize(q.xEnd,n)
}q.lineType=this.option.axisLine.lineStyle.type;r=new l(r);this.shapeList.push(r)},_axisLabelClickable:function(n,o){if(n){j.pack(o,undefined,-1,undefined,-1,o.style.text);
o.hoverable=true;o.clickable=true;o.highlightStyle={color:m.lift(o.style.color,1),brushType:"fill"};return o}else{return o}},refixAxisShape:function(r,q){if(!this.option.axisLine.onZero){return
}var p;if(this.isHorizontal()&&q!=null){for(var o=0,n=this.shapeList.length;o<n;o++){if(this.shapeList[o]._axisShape==="axisLine"){this.shapeList[o].style.yStart=this.shapeList[o].style.yEnd=this.subPixelOptimize(q,this.shapeList[o].stylelineWidth);
this.zr.modShape(this.shapeList[o].id)}else{if(this.shapeList[o]._axisShape==="axisTick"){p=this.shapeList[o].style.yEnd-this.shapeList[o].style.yStart;
this.shapeList[o].style.yStart=q-p;this.shapeList[o].style.yEnd=q;this.zr.modShape(this.shapeList[o].id)}}}}if(!this.isHorizontal()&&r!=null){for(var o=0,n=this.shapeList.length;
o<n;o++){if(this.shapeList[o]._axisShape==="axisLine"){this.shapeList[o].style.xStart=this.shapeList[o].style.xEnd=this.subPixelOptimize(r,this.shapeList[o].stylelineWidth);
this.zr.modShape(this.shapeList[o].id)}else{if(this.shapeList[o]._axisShape==="axisTick"){p=this.shapeList[o].style.xEnd-this.shapeList[o].style.xStart;
this.shapeList[o].style.xStart=r;this.shapeList[o].style.xEnd=r+p;this.zr.modShape(this.shapeList[o].id)}}}}},getPosition:function(){return this.option.position
},isHorizontal:function(){return this.option.position==="bottom"||this.option.position==="top"}},reformOption:function(p){if(!p||(p instanceof Array&&p.length===0)){p=[{type:f.COMPONENT_TYPE_AXIS_VALUE}]
}else{if(!(p instanceof Array)){p=[p]}}if(p.length>2){p=[p[0],p[1]]}if(this.axisType==="xAxis"){if(!p[0].position||(p[0].position!="bottom"&&p[0].position!="top")){p[0].position="bottom"
}if(p.length>1){p[1].position=p[0].position==="bottom"?"top":"bottom"}for(var o=0,n=p.length;o<n;o++){p[o].type=p[o].type||"category";p[o].xAxisIndex=o;
p[o].yAxisIndex=-1}}else{if(!p[0].position||(p[0].position!="left"&&p[0].position!="right")){p[0].position="left"}if(p.length>1){p[1].position=p[0].position==="left"?"right":"left"
}for(var o=0,n=p.length;o<n;o++){p[o].type=p[o].type||"value";p[o].xAxisIndex=-1;p[o].yAxisIndex=o}}return p},refresh:function(p){var s;if(p){this.option=p;
if(this.axisType==="xAxis"){this.option.xAxis=this.reformOption(p.xAxis);s=this.option.xAxis}else{this.option.yAxis=this.reformOption(p.yAxis);s=this.option.yAxis
}this.series=p.series}var q=i("./categoryAxis");var r=i("./valueAxis");var n=Math.max((s&&s.length||0),this._axisList.length);for(var o=0;o<n;o++){if(this._axisList[o]&&p&&(!s[o]||this._axisList[o].type!=s[o].type)){this._axisList[o].dispose&&this._axisList[o].dispose();
this._axisList[o]=false}if(this._axisList[o]){this._axisList[o].refresh&&this._axisList[o].refresh(s?s[o]:false,this.series)}else{if(s&&s[o]){this._axisList[o]=s[o].type==="category"?new q(this.ecTheme,this.messageCenter,this.zr,s[o],this.myChart,this.axisBase):new r(this.ecTheme,this.messageCenter,this.zr,s[o],this.myChart,this.axisBase,this.series)
}}}},getAxis:function(n){return this._axisList[n]},getAxisCount:function(){return this._axisList.length},clear:function(){for(var o=0,n=this._axisList.length;
o<n;o++){this._axisList[o].dispose&&this._axisList[o].dispose()}this._axisList=[]}};g.inherits(h,k);i("../component").define("axis",h);return h});d("echarts/chart/base",["require","zrender/shape/Image","../util/shape/Icon","../util/shape/MarkLine","../util/shape/Symbol","zrender/shape/Polyline","zrender/shape/ShapeBundle","../config","../util/ecData","../util/ecAnimation","../util/ecEffect","../util/accMath","../component/base","../layout/EdgeBundling","zrender/tool/util","zrender/tool/area"],function(k){var i=k("zrender/shape/Image");
var u=k("../util/shape/Icon");var g=k("../util/shape/MarkLine");var w=k("../util/shape/Symbol");var o=k("zrender/shape/Polyline");var v=k("zrender/shape/ShapeBundle");
var n=k("../config");var t=k("../util/ecData");var m=k("../util/ecAnimation");var h=k("../util/ecEffect");var j=k("../util/accMath");var q=k("../component/base");
var f=k("../layout/EdgeBundling");var s=k("zrender/tool/util");var l=k("zrender/tool/area");function r(x){return x.x!=null&&x.y!=null}function p(B,x,C,A,z){q.call(this,B,x,C,A,z);
var y=this;this.selectedMap={};this.lastShapeList=[];this.shapeHandler={onclick:function(){y.isClick=true},ondragover:function(I){var E=I.target;E.highlightStyle=E.highlightStyle||{};
var F=E.highlightStyle;var H=F.brushTyep;var G=F.strokeColor;var D=F.lineWidth;F.brushType="stroke";F.strokeColor=y.ecTheme.calculableColor||n.calculableColor;
F.lineWidth=E.type==="icon"?30:10;y.zr.addHoverShape(E);setTimeout(function(){if(F){F.brushType=H;F.strokeColor=G;F.lineWidth=D}},20)},ondrop:function(D){if(t.get(D.dragged,"data")!=null){y.isDrop=true
}},ondragend:function(){y.isDragend=true}}}p.prototype={setCalculable:function(x){x.dragEnableTime=this.ecTheme.DRAG_ENABLE_TIME||n.DRAG_ENABLE_TIME;x.ondragover=this.shapeHandler.ondragover;
x.ondragend=this.shapeHandler.ondragend;x.ondrop=this.shapeHandler.ondrop;return x},ondrop:function(y,B){if(!this.isDrop||!y.target||B.dragIn){return}var F=y.target;
var G=y.dragged;var A=t.get(F,"seriesIndex");var I=t.get(F,"dataIndex");var E=this.series;var D;var J=this.component.legend;if(I===-1){if(t.get(G,"seriesIndex")==A){B.dragOut=B.dragIn=B.needRefresh=true;
this.isDrop=false;return}D={value:t.get(G,"value"),name:t.get(G,"name")};if(this.type===n.CHART_TYPE_PIE&&D.value<0){D.value=0}var x=false;var H=E[A].data;
for(var C=0,z=H.length;C<z;C++){if(H[C].name===D.name&&H[C].value==="-"){E[A].data[C].value=D.value;x=true}}!x&&E[A].data.push(D);J&&J.add(D.name,G.style.color||G.style.strokeColor)
}else{D=E[A].data[I]||"-";if(D.value!=null){if(D.value!="-"){E[A].data[I].value=j.accAdd(E[A].data[I].value,t.get(G,"value"))}else{E[A].data[I].value=t.get(G,"value")
}if(this.type===n.CHART_TYPE_FUNNEL||this.type===n.CHART_TYPE_PIE){J&&J.getRelatedAmount(D.name)===1&&this.component.legend.del(D.name);D.name+=this.option.nameConnector+t.get(G,"name");
J&&J.add(D.name,G.style.color||G.style.strokeColor)}}else{if(D!="-"){E[A].data[I]=j.accAdd(E[A].data[I],t.get(G,"value"))}else{E[A].data[I]=t.get(G,"value")
}}}B.dragIn=B.dragIn||true;this.isDrop=false;var K=this;setTimeout(function(){K.zr.trigger("mousemove",y.event)},300);return},ondragend:function(E,x){if(!this.isDragend||!E.target||x.dragOut){return
}var D=E.target;var y=t.get(D,"seriesIndex");var B=t.get(D,"dataIndex");var A=this.series;if(A[y].data[B].value!=null){A[y].data[B].value="-";var z=A[y].data[B].name;
var C=this.component.legend;if(C&&C.getRelatedAmount(z)===0){C.del(z)}}else{A[y].data[B]="-"}x.dragOut=true;x.needRefresh=true;this.isDragend=false;return
},onlegendSelected:function(A,x){var z=A.selected;for(var y in this.selectedMap){if(this.selectedMap[y]!=z[y]){x.needRefresh=true}this.selectedMap[y]=z[y]
}return},_buildPosition:function(){this._symbol=this.option.symbolList;this._sIndex2ShapeMap={};this._sIndex2ColorMap={};this.selectedMap={};this.xMarkMap={};
var A=this.series;var F={top:[],bottom:[],left:[],right:[],other:[]};var C;var E;var y;var x;for(var B=0,z=A.length;B<z;B++){if(A[B].type===this.type){A[B]=this.reformOption(A[B]);
this.legendHoverLink=A[B].legendHoverLink||this.legendHoverLink;C=A[B].xAxisIndex;E=A[B].yAxisIndex;y=this.component.xAxis.getAxis(C);x=this.component.yAxis.getAxis(E);
if(y.type===n.COMPONENT_TYPE_AXIS_CATEGORY){F[y.getPosition()].push(B)}else{if(x.type===n.COMPONENT_TYPE_AXIS_CATEGORY){F[x.getPosition()].push(B)}else{F.other.push(B)
}}}}for(var D in F){if(F[D].length>0){this._buildSinglePosition(D,F[D])}}this.addShapeList()},_buildSinglePosition:function(x,D){var C=this._mapData(D);
var B=C.locationMap;var A=C.maxDataLength;if(A===0||B.length===0){return}switch(x){case"bottom":case"top":this._buildHorizontal(D,A,B,this.xMarkMap);break;
case"left":case"right":this._buildVertical(D,A,B,this.xMarkMap);break;case"other":this._buildOther(D,A,B,this.xMarkMap);break}for(var z=0,y=D.length;z<y;
z++){this.buildMark(D[z])}},_mapData:function(E){var F=this.series;var G;var L=0;var I={};var B="__kener__stack__";var C;var z;var M=this.component.legend;
var K=[];var H=0;var x;for(var D=0,A=E.length;D<A;D++){G=F[E[D]];z=G.name;this._sIndex2ShapeMap[E[D]]=this._sIndex2ShapeMap[E[D]]||this.query(G,"symbol")||this._symbol[D%this._symbol.length];
if(M){this.selectedMap[z]=M.isSelected(z);this._sIndex2ColorMap[E[D]]=M.getColor(z);x=M.getItemShape(z);if(x){var y=x.style;if(this.type==n.CHART_TYPE_LINE){y.iconType="legendLineIcon";
y.symbol=this._sIndex2ShapeMap[E[D]]}else{if(G.itemStyle.normal.barBorderWidth>0){var J=x.highlightStyle;y.brushType="both";y.x+=1;y.y+=1;y.width-=2;y.height-=2;
y.strokeColor=J.strokeColor=G.itemStyle.normal.barBorderColor;J.lineWidth=3}}M.setItemShape(z,x)}}else{this.selectedMap[z]=true;this._sIndex2ColorMap[E[D]]=this.zr.getColor(E[D])
}if(this.selectedMap[z]){C=G.stack||(B+E[D]);if(I[C]==null){I[C]=L;K[L]=[E[D]];L++}else{K[I[C]].push(E[D])}}H=Math.max(H,G.data.length)}return{locationMap:K,maxDataLength:H}
},_calculMarkMapXY:function(B,K,M){var G=this.series;for(var F=0,D=K.length;F<D;F++){for(var C=0,A=K[F].length;C<A;C++){var E=K[F][C];var J=M=="xy"?0:"";
var z=this.component.grid;var H=B[E];if(M.indexOf("x")!="-1"){if(H["counter"+J]>0){H["average"+J]=H["sum"+J]/H["counter"+J]}var L=this.component.xAxis.getAxis(G[E].xAxisIndex||0).getCoord(H["average"+J]);
H["averageLine"+J]=[[L,z.getYend()],[L,z.getY()]];H["minLine"+J]=[[H["minX"+J],z.getYend()],[H["minX"+J],z.getY()]];H["maxLine"+J]=[[H["maxX"+J],z.getYend()],[H["maxX"+J],z.getY()]];
H.isHorizontal=false}J=M=="xy"?1:"";if(M.indexOf("y")!="-1"){if(H["counter"+J]>0){H["average"+J]=H["sum"+J]/H["counter"+J]}var I=this.component.yAxis.getAxis(G[E].yAxisIndex||0).getCoord(H["average"+J]);
H["averageLine"+J]=[[z.getX(),I],[z.getXend(),I]];H["minLine"+J]=[[z.getX(),H["minY"+J]],[z.getXend(),H["minY"+J]]];H["maxLine"+J]=[[z.getX(),H["maxY"+J]],[z.getXend(),H["maxY"+J]]];
H.isHorizontal=true}}}},addLabel:function(y,F,E,z,D){var A=[E,F];var B=this.deepMerge(A,"itemStyle.normal.label");var G=this.deepMerge(A,"itemStyle.emphasis.label");
var I=B.textStyle||{};var C=G.textStyle||{};if(B.show){var x=y.style;x.text=this._getLabelText(F,E,z,"normal");x.textPosition=B.position==null?(D==="horizontal"?"right":"top"):B.position;
x.textColor=I.color;x.textFont=this.getFont(I);x.textAlign=I.align;x.textBaseline=I.baseline}if(G.show){var H=y.highlightStyle;H.text=this._getLabelText(F,E,z,"emphasis");
H.textPosition=B.show?y.style.textPosition:(G.position==null?(D==="horizontal"?"right":"top"):G.position);H.textColor=C.color;H.textFont=this.getFont(C);
H.textAlign=C.align;H.textBaseline=C.baseline}return y},_getLabelText:function(A,C,y,x){var z=this.deepQuery([C,A],"itemStyle."+x+".label.formatter");if(!z&&x==="emphasis"){z=this.deepQuery([C,A],"itemStyle.normal.label.formatter")
}var B=this.getDataFromOption(C,"-");if(z){if(typeof z==="function"){return z.call(this.myChart,{seriesName:A.name,series:A,name:y,value:B,data:C,status:x})
}else{if(typeof z==="string"){z=z.replace("{a}","{a0}").replace("{b}","{b0}").replace("{c}","{c0}").replace("{a0}",A.name).replace("{b0}",y).replace("{c0}",this.numAddCommas(B));
return z}}}else{if(B instanceof Array){return B[2]!=null?this.numAddCommas(B[2]):(B[0]+" , "+B[1])}else{return this.numAddCommas(B)}}},buildMark:function(x){var y=this.series[x];
if(this.selectedMap[y.name]){y.markLine&&this._buildMarkLine(x);y.markPoint&&this._buildMarkPoint(x)}},_buildMarkPoint:function(A){var D=(this.markAttachStyle||{})[A];
var E=this.series[A];var C;var F;var H=s.clone(E.markPoint);for(var B=0,z=H.data.length;B<z;B++){C=H.data[B];F=this.getMarkCoord(A,C);C.x=C.x!=null?C.x:F[0];
C.y=C.y!=null?C.y:F[1];if(C.type&&(C.type==="max"||C.type==="min")){C.value=F[3];C.name=C.name||C.type;C.symbolSize=C.symbolSize||(l.getTextWidth(F[3],this.getFont())/2+5)
}}var y=this._markPoint(A,H);for(var B=0,z=y.length;B<z;B++){var x=y[B];x.zlevel=this.getZlevelBase();x.z=this.getZBase()+1;for(var G in D){x[G]=s.clone(D[G])
}this.shapeList.push(x)}if(this.type===n.CHART_TYPE_FORCE||this.type===n.CHART_TYPE_CHORD){for(var B=0,z=y.length;B<z;B++){this.zr.addShape(y[B])}}},_buildMarkLine:function(C){var F=(this.markAttachStyle||{})[C];
var G=this.series[C];var H;var z=s.clone(G.markLine);for(var D=0,B=z.data.length;D<B;D++){var J=z.data[D];if(J.type&&(J.type==="max"||J.type==="min"||J.type==="average")){H=this.getMarkCoord(C,J);
z.data[D]=[s.clone(J),{}];z.data[D][0].name=J.name||J.type;z.data[D][0].value=J.type!=="average"?H[3]:+H[3].toFixed(z.precision!=null?z.precision:this.deepQuery([this.ecTheme,n],"markLine.precision"));
H=H[2];J=[{},{}]}else{H=[this.getMarkCoord(C,J[0]),this.getMarkCoord(C,J[1])]}if(H==null||H[0]==null||H[1]==null){continue}z.data[D][0].x=J[0].x!=null?J[0].x:H[0][0];
z.data[D][0].y=J[0].y!=null?J[0].y:H[0][1];z.data[D][1].x=J[1].x!=null?J[1].x:H[1][0];z.data[D][1].y=J[1].y!=null?J[1].y:H[1][1]}var A=this._markLine(C,z);
var I=z.large;if(I){var E=new v({style:{shapeList:A}});var y=A[0];if(y){s.merge(E.style,y.style);s.merge(E.highlightStyle={},y.highlightStyle);E.style.brushType="stroke";
E.zlevel=this.getZlevelBase();E.z=this.getZBase()+1;E.hoverable=false;for(var K in F){E[K]=s.clone(F[K])}}this.shapeList.push(E);this.zr.addShape(E);E._mark="largeLine";
var L=z.effect;if(L.show){E.effect=L}}else{for(var D=0,B=A.length;D<B;D++){var x=A[D];x.zlevel=this.getZlevelBase();x.z=this.getZBase()+1;for(var K in F){x[K]=s.clone(F[K])
}this.shapeList.push(x)}if(this.type===n.CHART_TYPE_FORCE||this.type===n.CHART_TYPE_CHORD){for(var D=0,B=A.length;D<B;D++){this.zr.addShape(A[D])}}}},_markPoint:function(O,B){var J=this.series[O];
var G=this.component;s.merge(s.merge(B,s.clone(this.ecTheme.markPoint||{})),s.clone(n.markPoint));B.name=J.name;var C=[];var P=B.data;var I;var D=G.dataRange;
var y=G.legend;var M;var K;var A;var F;var E;var H;var x=this.zr.getWidth();var z=this.zr.getHeight();if(!B.large){for(var N=0,L=P.length;N<L;N++){if(P[N].x==null||P[N].y==null){continue
}K=P[N].value!=null?P[N].value:"";if(y){M=y.getColor(J.name)}if(D){M=isNaN(K)?M:D.getColor(K);A=[P[N],B];F=this.deepQuery(A,"itemStyle.normal.color")||M;
E=this.deepQuery(A,"itemStyle.emphasis.color")||F;if(F==null&&E==null){continue}}M=M==null?this.zr.getColor(O):M;P[N].tooltip=P[N].tooltip||B.tooltip||{trigger:"item"};
P[N].name=P[N].name!=null?P[N].name:"";P[N].value=K;I=this.getSymbolShape(B,O,P[N],N,P[N].name,this.parsePercent(P[N].x,x),this.parsePercent(P[N].y,z),"pin",M,"rgba(0,0,0,0)","horizontal");
I._mark="point";H=this.deepMerge([P[N],B],"effect");if(H.show){I.effect=H}if(J.type===n.CHART_TYPE_MAP){I._geo=this.getMarkGeo(P[N])}t.pack(I,J,O,P[N],N,P[N].name,K);
C.push(I)}}else{I=this.getLargeMarkPointShape(O,B);I._mark="largePoint";I&&C.push(I)}return C},_markLine:(function(){function x(z,y){z[y]=z[y] instanceof Array?z[y].length>1?z[y]:[z[y][0],z[y][0]]:[z[y],z[y]]
}return function(V,X){var P=this.series[V];var K=this.component;var F=K.dataRange;var z=K.legend;s.merge(s.merge(X,s.clone(this.ecTheme.markLine||{})),s.clone(n.markLine));
var T=z?z.getColor(P.name):this.zr.getColor(V);x(X,"symbol");x(X,"symbolSize");x(X,"symbolRotate");var Y=X.data;var B=[];var y=this.zr.getWidth();var A=this.zr.getHeight();
for(var U=0;U<Y.length;U++){var E=Y[U];if(r(E[0])&&r(E[1])){var D=this.deepMerge(E);var C=[D,X];var S=T;var Q=D.value!=null?D.value:"";if(F){S=isNaN(Q)?S:F.getColor(Q);
var J=this.deepQuery(C,"itemStyle.normal.color")||S;var H=this.deepQuery(C,"itemStyle.emphasis.color")||J;if(J==null&&H==null){continue}}E[0].tooltip=D.tooltip||X.tooltip||{trigger:"item"};
E[0].name=E[0].name||"";E[1].name=E[1].name||"";E[0].value=Q;B.push({points:[[this.parsePercent(E[0].x,y),this.parsePercent(E[0].y,A)],[this.parsePercent(E[1].x,y),this.parsePercent(E[1].y,A)]],rawData:E,color:S})
}}var N=this.query(X,"bundling.enable");if(N){var I=new f();I.maxTurningAngle=this.query(X,"bundling.maxTurningAngle")/180*Math.PI;B=I.run(B)}X.name=P.name;
var M=[];for(var U=0,R=B.length;U<R;U++){var G=B[U];var W=G.rawEdge||G;var E=W.rawData;var Q=E.value!=null?E.value:"";var O=this.getMarkLineShape(X,V,E,U,G.points,N,W.color);
O._mark="line";var L=this.deepMerge([E[0],E[1],X],"effect");if(L.show){O.effect=L;O.effect.large=X.large}if(P.type===n.CHART_TYPE_MAP){O._geo=[this.getMarkGeo(E[0]),this.getMarkGeo(E[1])]
}t.pack(O,P,V,E[0],U,E[0].name+(E[1].name!==""?(" > "+E[1].name):""),Q);M.push(O)}return M}})(),getMarkCoord:function(){return[0,0]},getSymbolShape:function(M,R,V,T,W,E,D,Q,P,I,F){var A=[V,M];
var N=this.getDataFromOption(V,"-");Q=this.deepQuery(A,"symbol")||Q;var S=this.deepQuery(A,"symbolSize");S=typeof S==="function"?S(N):S;if(typeof S==="number"){S=[S,S]
}var B=this.deepQuery(A,"symbolRotate");var U=this.deepMerge(A,"itemStyle.normal");var O=this.deepMerge(A,"itemStyle.emphasis");var z=U.borderWidth!=null?U.borderWidth:(U.lineStyle&&U.lineStyle.width);
if(z==null){z=Q.match("empty")?2:0}var H=O.borderWidth!=null?O.borderWidth:(O.lineStyle&&O.lineStyle.width);if(H==null){H=z+2}var G=this.getItemStyleColor(U.color,R,T,V);
var C=this.getItemStyleColor(O.color,R,T,V);var L=S[0];var J=S[1];var K=new u({style:{iconType:Q.replace("empty","").toLowerCase(),x:E-L,y:D-J,width:L*2,height:J*2,brushType:"both",color:Q.match("empty")?I:(G||P),strokeColor:U.borderColor||G||P,lineWidth:z},highlightStyle:{color:Q.match("empty")?I:(C||G||P),strokeColor:O.borderColor||U.borderColor||C||G||P,lineWidth:H},clickable:this.deepQuery(A,"clickable")});
if(Q.match("image")){K.style.image=Q.replace(new RegExp("^image:\\/\\/"),"");K=new i({style:K.style,highlightStyle:K.highlightStyle,clickable:this.deepQuery(A,"clickable")})
}if(B!=null){K.rotation=[B*Math.PI/180,E,D]}if(Q.match("star")){K.style.iconType="star";K.style.n=(Q.replace("empty","").replace("star","")-0)||5}if(Q==="none"){K.invisible=true;
K.hoverable=false}K=this.addLabel(K,M,V,W,F);if(Q.match("empty")){if(K.style.textColor==null){K.style.textColor=K.style.strokeColor}if(K.highlightStyle.textColor==null){K.highlightStyle.textColor=K.highlightStyle.strokeColor
}}t.pack(K,M,R,V,T,W);K._x=E;K._y=D;K._dataIndex=T;K._seriesIndex=R;return K},getMarkLineShape:function(O,N,S,Q,M,T,K){var G=S[0].value!=null?S[0].value:"-";
var F=S[1].value!=null?S[1].value:"-";var L=[S[0].symbol||O.symbol[0],S[1].symbol||O.symbol[1]];var P=[S[0].symbolSize||O.symbolSize[0],S[1].symbolSize||O.symbolSize[1]];
P[0]=typeof P[0]==="function"?P[0](G):P[0];P[1]=typeof P[1]==="function"?P[1](F):P[1];var C=[this.query(S[0],"symbolRotate")||O.symbolRotate[0],this.query(S[1],"symbolRotate")||O.symbolRotate[1]];
var z=[S[0],S[1],O];var R=this.deepMerge(z,"itemStyle.normal");R.color=this.getItemStyleColor(R.color,N,Q,S);var J=this.deepMerge(z,"itemStyle.emphasis");
J.color=this.getItemStyleColor(J.color,N,Q,S);var B=R.lineStyle;var E=J.lineStyle;var x=B.width;if(x==null){x=R.borderWidth}var D=E.width;if(D==null){D=J.borderWidth!=null?J.borderWidth:(x+2)
}var y=this.deepQuery(z,"smoothness");if(!this.deepQuery(z,"smooth")){y=0}var A=T?o:g;var H=new A({style:{symbol:L,symbolSize:P,symbolRotate:C,brushType:"both",lineType:B.type,shadowColor:B.shadowColor||B.color||R.borderColor||R.color||K,shadowBlur:B.shadowBlur,shadowOffsetX:B.shadowOffsetX,shadowOffsetY:B.shadowOffsetY,color:R.color||K,strokeColor:B.color||R.borderColor||R.color||K,lineWidth:x,symbolBorderColor:R.borderColor||R.color||K,symbolBorder:R.borderWidth},highlightStyle:{shadowColor:E.shadowColor,shadowBlur:E.shadowBlur,shadowOffsetX:E.shadowOffsetX,shadowOffsetY:E.shadowOffsetY,color:J.color||R.color||K,strokeColor:E.color||B.color||J.borderColor||R.borderColor||J.color||R.color||K,lineWidth:D,symbolBorderColor:J.borderColor||R.borderColor||J.color||R.color||K,symbolBorder:J.borderWidth==null?(R.borderWidth+2):(J.borderWidth)},clickable:this.deepQuery(z,"clickable")});
var I=H.style;if(T){I.pointList=M;I.smooth=y}else{I.xStart=M[0][0];I.yStart=M[0][1];I.xEnd=M[1][0];I.yEnd=M[1][1];I.curveness=y;H.updatePoints(H.style)
}H=this.addLabel(H,O,S[0],S[0].name+" : "+S[1].name);return H},getLargeMarkPointShape:function(C,G){var E=this.series[C];var H=this.component;var D=G.data;
var x;var F=H.dataRange;var K=H.legend;var B;var J;var z=[D[0],G];var L;var y;var M;if(K){B=K.getColor(E.name)}if(F){J=D[0].value!=null?D[0].value:"";B=isNaN(J)?B:F.getColor(J);
L=this.deepQuery(z,"itemStyle.normal.color")||B;y=this.deepQuery(z,"itemStyle.emphasis.color")||L;if(L==null&&y==null){return}}B=this.deepMerge(z,"itemStyle.normal").color||B;
var A=this.deepQuery(z,"symbol")||"circle";A=A.replace("empty","").replace(/\d/g,"");M=this.deepMerge([D[0],G],"effect");var I=window.devicePixelRatio||1;
x=new w({style:{pointList:D,color:B,strokeColor:B,shadowColor:M.shadowColor||B,shadowBlur:(M.shadowBlur!=null?M.shadowBlur:8)*I,size:this.deepQuery(z,"symbolSize"),iconType:A,brushType:"fill",lineWidth:1},draggable:false,hoverable:false});
if(M.show){x.effect=M}return x},backupShapeList:function(){if(this.shapeList&&this.shapeList.length>0){this.lastShapeList=this.shapeList;this.shapeList=[]
}else{this.lastShapeList=[]}},addShapeList:function(){var y=this.option.animationThreshold/(this.canvasSupported?2:4);var F=this.lastShapeList;var A=this.shapeList;
var I=F.length>0;var B=I?this.query(this.option,"animationDurationUpdate"):this.query(this.option,"animationDuration");var E=this.query(this.option,"animationEasing");
var D;var H;var G={};var x={};if(this.option.animation&&!this.option.renderAsImage&&A.length<y&&!this.motionlessOnce){for(var C=0,z=F.length;C<z;C++){H=this._getAnimationKey(F[C]);
if(H.match("undefined")){this.zr.delShape(F[C].id)}else{H+=F[C].type;if(G[H]){this.zr.delShape(F[C].id)}else{G[H]=F[C]}}}for(var C=0,z=A.length;C<z;C++){H=this._getAnimationKey(A[C]);
if(H.match("undefined")){this.zr.addShape(A[C])}else{H+=A[C].type;x[H]=A[C]}}for(H in G){if(!x[H]){this.zr.delShape(G[H].id)}}for(H in x){if(G[H]){this.zr.delShape(G[H].id);
this._animateMod(G[H],x[H],B,E,0,I)}else{D=(this.type==n.CHART_TYPE_LINE||this.type==n.CHART_TYPE_RADAR)&&H.indexOf("icon")!==0?B/2:0;this._animateMod(false,x[H],B,E,D,I)
}}this.zr.refresh();this.animationEffect()}else{this.motionlessOnce=false;this.zr.delShape(F);for(var C=0,z=A.length;C<z;C++){this.zr.addShape(A[C])}}},_getAnimationKey:function(x){if(this.type!=n.CHART_TYPE_MAP&&this.type!=n.CHART_TYPE_TREEMAP&&this.type!=n.CHART_TYPE_VENN){return t.get(x,"seriesIndex")+"_"+t.get(x,"dataIndex")+(x._mark?x._mark:"")+(this.type===n.CHART_TYPE_RADAR?t.get(x,"special"):"")
}else{return t.get(x,"seriesIndex")+"_"+t.get(x,"dataIndex")+(x._mark?x._mark:"undefined")}},_animateMod:function(B,y,A,C,x,z){switch(y.type){case"polyline":case"half-smooth-polygon":m.pointList(this.zr,B,y,A,C);
break;case"rectangle":m.rectangle(this.zr,B,y,A,C);break;case"image":case"icon":m.icon(this.zr,B,y,A,C,x);break;case"candle":if(!z){m.candle(this.zr,B,y,A,C)
}else{this.zr.addShape(y)}break;case"ring":case"sector":case"circle":if(!z){m.ring(this.zr,B,y,A+((t.get(y,"dataIndex")||0)%20*100),C)}else{if(y.type==="sector"){m.sector(this.zr,B,y,A,C)
}else{this.zr.addShape(y)}}break;case"text":m.text(this.zr,B,y,A,C);break;case"polygon":if(!z){m.polygon(this.zr,B,y,A,C)}else{m.pointList(this.zr,B,y,A,C)
}break;case"ribbon":m.ribbon(this.zr,B,y,A,C);break;case"gauge-pointer":m.gaugePointer(this.zr,B,y,A,C);break;case"mark-line":m.markline(this.zr,B,y,A,C);
break;case"bezier-curve":case"line":m.line(this.zr,B,y,A,C);break;default:this.zr.addShape(y);break}},animationMark:function(A,B,z){var z=z||this.shapeList;
for(var y=0,x=z.length;y<x;y++){if(!z[y]._mark){continue}this._animateMod(false,z[y],A,B,0,true)}this.animationEffect(z)},animationEffect:function(B){!B&&this.clearEffectShape();
B=B||this.shapeList;if(B==null){return}var x=n.EFFECT_ZLEVEL;if(this.canvasSupported){this.zr.modLayer(x,{motionBlur:true,lastFrameAlpha:0.95})}var z;for(var A=0,y=B.length;
A<y;A++){z=B[A];if(!(z._mark&&z.effect&&z.effect.show&&h[z._mark])){continue}h[z._mark](this.zr,this.effectList,z,x);this.effectList[this.effectList.length-1]._mark=z._mark
}},clearEffectShape:function(x){var z=this.effectList;if(this.zr&&z&&z.length>0){x&&this.zr.modLayer(n.EFFECT_ZLEVEL,{motionBlur:false});this.zr.delShape(z);
for(var y=0;y<z.length;y++){if(z[y].effectAnimator){z[y].effectAnimator.stop()}}}this.effectList=[]},addMark:function(z,D,F){var C=this.series[z];if(this.selectedMap[C.name]){var y=this.query(this.option,"animationDurationUpdate");
var E=this.query(this.option,"animationEasing");var B=C[F].data;var G=this.shapeList.length;C[F].data=D.data;this["_build"+F.replace("m","M")](z);if(this.option.animation&&!this.option.renderAsImage){this.animationMark(y,E,this.shapeList.slice(G))
}else{for(var A=G,x=this.shapeList.length;A<x;A++){this.zr.addShape(this.shapeList[A])}this.zr.refreshNextFrame()}C[F].data=B}},delMark:function(A,x,F){F=F.replace("mark","").replace("large","").toLowerCase();
var C=this.series[A];if(this.selectedMap[C.name]){var E=false;var z=[this.shapeList,this.effectList];var D=2;while(D--){for(var B=0,y=z[D].length;B<y;B++){if(z[D][B]._mark==F&&t.get(z[D][B],"seriesIndex")==A&&t.get(z[D][B],"name")==x){this.zr.delShape(z[D][B].id);
z[D].splice(B,1);E=true;break}}}E&&this.zr.refreshNextFrame()}}};s.inherits(p,q);return p});d("echarts/component/grid",["require","./base","zrender/shape/Rectangle","../config","zrender/tool/util","../component"],function(i){var j=i("./base");
var k=i("zrender/shape/Rectangle");var f=i("../config");f.grid={zlevel:0,z:0,x:80,y:60,x2:80,y2:60,backgroundColor:"rgba(0,0,0,0)",borderWidth:1,borderColor:"#ccc"};
var h=i("zrender/tool/util");function g(o,l,p,n,m){j.call(this,o,l,p,n,m);this.refresh(n)}g.prototype={type:f.COMPONENT_TYPE_GRID,getX:function(){return this._x
},getY:function(){return this._y},getWidth:function(){return this._width},getHeight:function(){return this._height},getXend:function(){return this._x+this._width
},getYend:function(){return this._y+this._height},getArea:function(){return{x:this._x,y:this._y,width:this._width,height:this._height}},getBbox:function(){return[[this._x,this._y],[this.getXend(),this.getYend()]]
},refixAxisShape:function(n){var q;var p;var m=n.xAxis._axisList.concat(n.yAxis?n.yAxis._axisList:[]);var l=m.length;var o;while(l--){o=m[l];if(o.type==f.COMPONENT_TYPE_AXIS_VALUE&&o._min<0&&o._max>=0){o.isHorizontal()?(q=o.getCoord(0)):(p=o.getCoord(0))
}}if(typeof q!="undefined"||typeof p!="undefined"){l=m.length;while(l--){m[l].refixAxisShape(q,p)}}},refresh:function(o){if(o||this._zrWidth!=this.zr.getWidth()||this._zrHeight!=this.zr.getHeight()){this.clear();
this.option=o||this.option;this.option.grid=this.reformOption(this.option.grid);var l=this.option.grid;this._zrWidth=this.zr.getWidth();this._zrHeight=this.zr.getHeight();
this._x=this.parsePercent(l.x,this._zrWidth);this._y=this.parsePercent(l.y,this._zrHeight);var m=this.parsePercent(l.x2,this._zrWidth);var n=this.parsePercent(l.y2,this._zrHeight);
if(typeof l.width=="undefined"){this._width=this._zrWidth-this._x-m}else{this._width=this.parsePercent(l.width,this._zrWidth)}this._width=this._width<=0?10:this._width;
if(typeof l.height=="undefined"){this._height=this._zrHeight-this._y-n}else{this._height=this.parsePercent(l.height,this._zrHeight)}this._height=this._height<=0?10:this._height;
this._x=this.subPixelOptimize(this._x,l.borderWidth);this._y=this.subPixelOptimize(this._y,l.borderWidth);this.shapeList.push(new k({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:this._x,y:this._y,width:this._width,height:this._height,brushType:l.borderWidth>0?"both":"fill",color:l.backgroundColor,strokeColor:l.borderColor,lineWidth:l.borderWidth}}));
this.zr.addShape(this.shapeList[0])}}};h.inherits(g,j);i("../component").define("grid",g);return g});d("echarts/util/ecData",[],function(){function g(o,m,k,l,q,j,p,n){var r;
if(typeof l!="undefined"){r=l.value==null?l:l.value}o._echartsData={_series:m,_seriesIndex:k,_data:l,_dataIndex:q,_name:j,_value:r,_special:p,_special2:n};
return o._echartsData}function f(j,k){var l=j._echartsData;if(!k){return l}switch(k){case"series":case"seriesIndex":case"data":case"dataIndex":case"name":case"value":case"special":case"special2":return l&&l["_"+k]
}return null}function i(j,k,l){j._echartsData=j._echartsData||{};switch(k){case"series":case"seriesIndex":case"data":case"dataIndex":case"name":case"value":case"special":case"special2":j._echartsData["_"+k]=l;
break}}function h(j,k){k._echartsData={_series:j._echartsData._series,_seriesIndex:j._echartsData._seriesIndex,_data:j._echartsData._data,_dataIndex:j._echartsData._dataIndex,_name:j._echartsData._name,_value:j._echartsData._value,_special:j._echartsData._special,_special2:j._echartsData._special2}
}return{pack:g,set:i,get:f,clone:h}});d("echarts/config",[],function(){var f={CHART_TYPE_LINE:"line",CHART_TYPE_BAR:"bar",CHART_TYPE_SCATTER:"scatter",CHART_TYPE_PIE:"pie",CHART_TYPE_RADAR:"radar",CHART_TYPE_VENN:"venn",CHART_TYPE_TREEMAP:"treemap",CHART_TYPE_MAP:"map",CHART_TYPE_K:"k",CHART_TYPE_ISLAND:"island",CHART_TYPE_FORCE:"force",CHART_TYPE_CHORD:"chord",CHART_TYPE_GAUGE:"gauge",CHART_TYPE_FUNNEL:"funnel",CHART_TYPE_EVENTRIVER:"eventRiver",COMPONENT_TYPE_TITLE:"title",COMPONENT_TYPE_LEGEND:"legend",COMPONENT_TYPE_DATARANGE:"dataRange",COMPONENT_TYPE_DATAVIEW:"dataView",COMPONENT_TYPE_DATAZOOM:"dataZoom",COMPONENT_TYPE_TOOLBOX:"toolbox",COMPONENT_TYPE_TOOLTIP:"tooltip",COMPONENT_TYPE_GRID:"grid",COMPONENT_TYPE_AXIS:"axis",COMPONENT_TYPE_POLAR:"polar",COMPONENT_TYPE_X_AXIS:"xAxis",COMPONENT_TYPE_Y_AXIS:"yAxis",COMPONENT_TYPE_AXIS_CATEGORY:"categoryAxis",COMPONENT_TYPE_AXIS_VALUE:"valueAxis",COMPONENT_TYPE_TIMELINE:"timeline",COMPONENT_TYPE_ROAMCONTROLLER:"roamController",backgroundColor:"rgba(0,0,0,0)",color:["#ff7f50","#87cefa","#da70d6","#32cd32","#6495ed","#ff69b4","#ba55d3","#cd5c5c","#ffa500","#40e0d0","#1e90ff","#ff6347","#7b68ee","#00fa9a","#ffd700","#6699FF","#ff6666","#3cb371","#b8860b","#30e0e0"],markPoint:{clickable:true,symbol:"pin",symbolSize:10,large:false,effect:{show:false,loop:true,period:15,type:"scale",scaleSize:2,bounceDistance:10},itemStyle:{normal:{borderWidth:2,label:{show:true,position:"inside"}},emphasis:{label:{show:true}}}},markLine:{clickable:true,symbol:["circle","arrow"],symbolSize:[2,4],smoothness:0.2,precision:2,effect:{show:false,loop:true,period:15,scaleSize:2},bundling:{enable:false,maxTurningAngle:45},itemStyle:{normal:{borderWidth:1.5,label:{show:true,position:"end"},lineStyle:{type:"dashed"}},emphasis:{label:{show:false},lineStyle:{}}}},textStyle:{decoration:"none",fontFamily:"Arial, Verdana, sans-serif",fontFamily2:"微软雅黑",fontSize:12,fontStyle:"normal",fontWeight:"normal"},EVENT:{REFRESH:"refresh",RESTORE:"restore",RESIZE:"resize",CLICK:"click",DBLCLICK:"dblclick",HOVER:"hover",MOUSEOUT:"mouseout",DATA_CHANGED:"dataChanged",DATA_ZOOM:"dataZoom",DATA_RANGE:"dataRange",DATA_RANGE_SELECTED:"dataRangeSelected",DATA_RANGE_HOVERLINK:"dataRangeHoverLink",LEGEND_SELECTED:"legendSelected",LEGEND_HOVERLINK:"legendHoverLink",MAP_SELECTED:"mapSelected",PIE_SELECTED:"pieSelected",MAGIC_TYPE_CHANGED:"magicTypeChanged",DATA_VIEW_CHANGED:"dataViewChanged",TIMELINE_CHANGED:"timelineChanged",MAP_ROAM:"mapRoam",FORCE_LAYOUT_END:"forceLayoutEnd",TOOLTIP_HOVER:"tooltipHover",TOOLTIP_IN_GRID:"tooltipInGrid",TOOLTIP_OUT_GRID:"tooltipOutGrid",ROAMCONTROLLER:"roamController"},DRAG_ENABLE_TIME:120,EFFECT_ZLEVEL:10,symbolList:["circle","rectangle","triangle","diamond","emptyCircle","emptyRectangle","emptyTriangle","emptyDiamond"],loadingEffect:"spin",loadingText:"数据读取中...",noDataEffect:"bubble",noDataText:"暂无数据",calculable:false,calculableColor:"rgba(255,165,0,0.6)",calculableHolderColor:"#ccc",nameConnector:" & ",valueConnector:": ",animation:true,addDataAnimation:true,animationThreshold:2000,animationDuration:2000,animationDurationUpdate:500,animationEasing:"ExponentialOut"};
return f});d("zrender/tool/color",["require","../tool/util"],function(j){var m=j("../tool/util");var x;var W=["#ff9277"," #dddd00"," #ffc877"," #bbe3ff"," #d5ffbb","#bbbbff"," #ddb000"," #b0dd00"," #e2bbff"," #ffbbe3","#ff7777"," #ff9900"," #83dd00"," #77e3ff"," #778fff","#c877ff"," #ff77ab"," #ff6600"," #aa8800"," #77c7ff","#ad77ff"," #ff77ff"," #dd0083"," #777700"," #00aa00","#0088aa"," #8400dd"," #aa0088"," #dd0000"," #772e00"];
var r=W;var g="rgba(255,255,0,0.5)";var k=g;var Y=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i;
var L={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#0ff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000",blanchedalmond:"#ffebcd",blue:"#00f",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#0ff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#f0f",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#789",lightslategrey:"#789",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#0f0",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#f0f",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#f00",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#fff",whitesmoke:"#f5f5f5",yellow:"#ff0",yellowgreen:"#9acd32"};
function w(ab){W=ab}function s(){W=r}function B(ab,ac){ab=ab|0;ac=ac||W;return ac[ab%ac.length]}function v(ab){g=ab}function u(){k=g}function X(){return g
}function O(ac,ak,ae,ab,aj,ad,ah){if(!x){x=m.getContext()}var ai=x.createRadialGradient(ac,ak,ae,ab,aj,ad);for(var ag=0,af=ah.length;ag<af;ag++){ai.addColorStop(ah[ag][0],ah[ag][1])
}ai.__nonRecursion=true;return ai}function l(af,ah,ac,ag,ae){if(!x){x=m.getContext()}var ai=x.createLinearGradient(af,ah,ac,ag);for(var ad=0,ab=ae.length;
ad<ab;ad++){ai.addColorStop(ae[ad][0],ae[ad][1])}ai.__nonRecursion=true;return ai}function t(ad,ag,af){ad=N(ad);ag=N(ag);ad=y(ad);ag=y(ag);var ac=[];var ae=(ag[0]-ad[0])/af;
var aj=(ag[1]-ad[1])/af;var am=(ag[2]-ad[2])/af;var an=(ag[3]-ad[3])/af;for(var ah=0,ab=ad[0],ai=ad[1],ak=ad[2],al=ad[3];ah<af;ah++){ac[ah]=V([Z(Math.floor(ab),[0,255]),Z(Math.floor(ai),[0,255]),Z(Math.floor(ak),[0,255]),al.toFixed(4)-0],"rgba");
ab+=ae;ai+=aj;ak+=am;al+=an}ab=ag[0];ai=ag[1];ak=ag[2];al=ag[3];ac[ah]=V([ab,ai,ak,al],"rgba");return ac}function R(ac,ag){var ae=[];var ab=ac.length;if(ag===undefined){ag=20
}if(ab===1){ae=t(ac[0],ac[0],ag)}else{if(ab>1){for(var af=0,ah=ab-1;af<ah;af++){var ad=t(ac[af],ac[af+1],ag);if(af<ah-1){ad.pop()}ae=ae.concat(ad)}}}return ae
}function V(ab,ac){ac=ac||"rgb";if(ab&&(ab.length===3||ab.length===4)){ab=F(ab,function(ae){return ae>1?Math.ceil(ae):ae});if(ac.indexOf("hex")>-1){return"#"+((1<<24)+(ab[0]<<16)+(ab[1]<<8)+(+ab[2])).toString(16).slice(1)
}else{if(ac.indexOf("hs")>-1){var ad=F(ab.slice(1,3),function(ae){return ae+"%"});ab[1]=ad[0];ab[2]=ad[1]}}if(ac.indexOf("a")>-1){if(ab.length===3){ab.push(1)
}ab[3]=Z(ab[3],[0,1]);return ac+"("+ab.slice(0,4).join(",")+")"}return ac+"("+ab.slice(0,3).join(",")+")"}}function z(ab){ab=f(ab);if(ab.indexOf("rgba")<0){ab=N(ab)
}var ad=[];var ac=0;ab.replace(/[\d.]+/g,function(ae){if(ac<3){ae=ae|0}else{ae=+ae}ad[ac++]=ae});return ad}function P(ab,ae){if(!q(ab)){return ab}var ac=y(ab);
var ad=ac[3];if(typeof ad==="undefined"){ad=1}if(ab.indexOf("hsb")>-1){ac=i(ac)}else{if(ab.indexOf("hsl")>-1){ac=h(ac)}}if(ae.indexOf("hsb")>-1||ae.indexOf("hsv")>-1){ac=H(ac)
}else{if(ae.indexOf("hsl")>-1){ac=E(ac)}}ac[3]=ad;return V(ac,ae)}function N(ab){return P(ab,"rgba")}function A(ab){return P(ab,"rgb")}function p(ab){return P(ab,"hex")
}function K(ab){return P(ab,"hsva")}function D(ab){return P(ab,"hsv")}function o(ab){return P(ab,"hsba")}function M(ab){return P(ab,"hsb")}function aa(ab){return P(ab,"hsla")
}function G(ab){return P(ab,"hsl")}function I(ab){for(var ac in L){if(p(L[ac])===p(ab)){return ac}}return null}function f(ab){return String(ab).replace(/\s+/g,"")
}function U(ac){if(L[ac]){ac=L[ac]}ac=f(ac);ac=ac.replace(/hsv/i,"hsb");if(/^#[\da-f]{3}$/i.test(ac)){ac=parseInt(ac.slice(1),16);var ae=(ac&3840)<<8;var ad=(ac&240)<<4;
var ab=ac&15;ac="#"+((1<<24)+(ae<<4)+ae+(ad<<4)+ad+(ab<<4)+ab).toString(16).slice(1)}return ac}function J(ab,af){if(!q(ab)){return ab}var ae=af>0?1:-1;
if(typeof af==="undefined"){af=0}af=Math.abs(af)>1?1:Math.abs(af);ab=A(ab);var ad=y(ab);for(var ac=0;ac<3;ac++){if(ae===1){ad[ac]=ad[ac]*(1-af)|0}else{ad[ac]=((255-ad[ac])*af+ad[ac])|0
}}return"rgb("+ad.join(",")+")"}function Q(ab){if(!q(ab)){return ab}var ac=y(N(ab));ac=F(ac,function(ad){return 255-ad});return V(ac,"rgb")}function S(am,al,ag){if(!q(am)||!q(al)){return am
}if(typeof ag==="undefined"){ag=0.5}ag=1-Z(ag,[0,1]);var ak=ag*2-1;var ad=y(N(am));var ab=y(N(al));var ai=ad[3]-ab[3];var aj=(((ak*ai===-1)?ak:(ak+ai)/(1+ak*ai))+1)/2;
var ah=1-aj;var af=[];for(var ae=0;ae<3;ae++){af[ae]=ad[ae]*aj+ab[ae]*ah}var ac=ad[3]*ag+ab[3]*(1-ag);ac=Math.max(0,Math.min(1,ac));if(ad[3]===1&&ab[3]===1){return V(af,"rgb")
}af[3]=ac;return V(af,"rgba")}function C(){return"#"+(Math.random().toString(16)+"0000").slice(2,8)}function y(ad){ad=U(ad);var ab=ad.match(Y);if(ab===null){throw new Error("The color format error")
}var ag;var aj;var ae=[];var ah;if(ab[2]){ag=ab[2].replace("#","").split("");ah=[ag[0]+ag[1],ag[2]+ag[3],ag[4]+ag[5]];ae=F(ah,function(am){return Z(parseInt(am,16),[0,255])
})}else{if(ab[4]){var ac=(ab[4]).split(",");aj=ac[3];ah=ac.slice(0,3);ae=F(ah,function(am){am=Math.floor(am.indexOf("%")>0?parseInt(am,0)*2.55:am);return Z(am,[0,255])
});if(typeof aj!=="undefined"){ae.push(Z(parseFloat(aj),[0,1]))}}else{if(ab[5]||ab[6]){var ak=(ab[5]||ab[6]).split(",");var af=parseInt(ak[0],0)/360;var al=ak[1];
var ai=ak[2];aj=ak[3];ae=F([al,ai],function(am){return Z(parseFloat(am)/100,[0,1])});ae.unshift(af);if(typeof aj!=="undefined"){ae.push(Z(parseFloat(aj),[0,1]))
}}}}return ae}function T(ac,ab){if(!q(ac)){return ac}if(ab===null){ab=1}var ad=y(N(ac));ad[3]=Z(Number(ab).toFixed(4),[0,1]);return V(ad,"rgba")}function F(ae,ac){if(typeof ac!=="function"){throw new TypeError()
}var ab=ae?ae.length:0;for(var ad=0;ad<ab;ad++){ae[ad]=ac(ae[ad])}return ae}function Z(ab,ac){if(ab<=ac[0]){ab=ac[0]}else{if(ab>=ac[1]){ab=ac[1]}}return ab
}function q(ab){return ab instanceof Array||typeof ab==="string"}function i(ag){var ao=ag[0];var ae=ag[1];var ad=ag[2];var ah;var ap;var ac;if(ae===0){ah=ad*255;
ap=ad*255;ac=ad*255}else{var ai=ao*6;if(ai===6){ai=0}var af=ai|0;var an=ad*(1-ae);var am=ad*(1-ae*(ai-af));var al=ad*(1-ae*(1-(ai-af)));var ab=0;var aj=0;
var ak=0;if(af===0){ab=ad;aj=al;ak=an}else{if(af===1){ab=am;aj=ad;ak=an}else{if(af===2){ab=an;aj=ad;ak=al}else{if(af===3){ab=an;aj=am;ak=ad}else{if(af===4){ab=al;
aj=an;ak=ad}else{ab=ad;aj=an;ak=am}}}}}ah=ab*255;ap=aj*255;ac=ak*255}return[ah,ap,ac]}function h(ad){var ai=ad[0];var ac=ad[1];var af=ad[2];var ae;var aj;
var ab;if(ac===0){ae=af*255;aj=af*255;ab=af*255}else{var ag;if(af<0.5){ag=af*(1+ac)}else{ag=(af+ac)-(ac*af)}var ah=2*af-ag;ae=255*n(ah,ag,ai+(1/3));aj=255*n(ah,ag,ai);
ab=255*n(ah,ag,ai-(1/3))}return[ae,aj,ab]}function n(ad,ac,ab){if(ab<0){ab+=1}if(ab>1){ab-=1}if((6*ab)<1){return(ad+(ac-ad)*6*ab)}if((2*ab)<1){return(ac)
}if((3*ab)<2){return(ad+(ac-ad)*((2/3)-ab)*6)}return ad}function H(ag){var ah=(ag[0]/255);var am=(ag[1]/255);var ac=(ag[2]/255);var aj=Math.min(ah,am,ac);
var an=Math.max(ah,am,ac);var al=an-aj;var ad=an;var ak;var af;if(al===0){ak=0;af=0}else{af=al/an;var ai=(((an-ah)/6)+(al/2))/al;var ab=(((an-am)/6)+(al/2))/al;
var ae=(((an-ac)/6)+(al/2))/al;if(ah===an){ak=ae-ab}else{if(am===an){ak=(1/3)+ai-ae}else{if(ac===an){ak=(2/3)+ab-ai}}}if(ak<0){ak+=1}if(ak>1){ak-=1}}ak=ak*360;
af=af*100;ad=ad*100;return[ak,af,ad]}function E(af){var ag=(af[0]/255);var am=(af[1]/255);var ac=(af[2]/255);var ai=Math.min(ag,am,ac);var an=Math.max(ag,am,ac);
var al=an-ai;var aj=(an+ai)/2;var ak;var ae;if(al===0){ak=0;ae=0}else{if(aj<0.5){ae=al/(an+ai)}else{ae=al/(2-an-ai)}var ah=(((an-ag)/6)+(al/2))/al;var ab=(((an-am)/6)+(al/2))/al;
var ad=(((an-ac)/6)+(al/2))/al;if(ag===an){ak=ad-ab}else{if(am===an){ak=(1/3)+ah-ad}else{if(ac===an){ak=(2/3)+ab-ah}}}if(ak<0){ak+=1}if(ak>1){ak-=1}}ak=ak*360;
ae=ae*100;aj=aj*100;return[ak,ae,aj]}return{customPalette:w,resetPalette:s,getColor:B,getHighlightColor:X,customHighlight:v,resetHighlight:u,getRadialGradient:O,getLinearGradient:l,getGradientColors:R,getStepColors:t,reverse:Q,mix:S,lift:J,trim:f,random:C,toRGB:A,toRGBA:N,toHex:p,toHSL:G,toHSLA:aa,toHSB:M,toHSBA:o,toHSV:D,toHSVA:K,toName:I,toColor:V,toArray:z,alpha:T,getData:y}
});d("echarts/component/dataZoom",["require","./base","zrender/shape/Rectangle","zrender/shape/Polygon","../util/shape/Icon","../config","../util/date","zrender/tool/util","../component"],function(g){var j=g("./base");
var m=g("zrender/shape/Rectangle");var i=g("zrender/shape/Polygon");var f=g("../util/shape/Icon");var l=g("../config");l.dataZoom={zlevel:0,z:4,show:false,orient:"horizontal",backgroundColor:"rgba(0,0,0,0)",dataBackgroundColor:"#eee",fillerColor:"rgba(144,197,237,0.2)",handleColor:"rgba(70,130,180,0.8)",handleSize:8,showDetail:true,realtime:true};
var n=g("../util/date");var h=g("zrender/tool/util");function k(s,o,t,r,q){j.call(this,s,o,t,r,q);var p=this;p._ondrift=function(v,u){return p.__ondrift(this,v,u)
};p._ondragend=function(){return p.__ondragend()};this._fillerSize=30;this._isSilence=false;this._zoom={};this.option.dataZoom=this.reformOption(this.option.dataZoom);
this.zoomOption=this.option.dataZoom;this._handleSize=this.zoomOption.handleSize;if(!this.myChart.canvasSupported){this.zoomOption.realtime=false}this._location=this._getLocation();
this._zoom=this._getZoom();this._backupData();if(this.option.dataZoom.show){this._buildShape()}this._syncData()}k.prototype={type:l.COMPONENT_TYPE_DATAZOOM,_buildShape:function(){this._buildBackground();
this._buildFiller();this._buildHandle();this._buildFrame();for(var p=0,o=this.shapeList.length;p<o;p++){this.zr.addShape(this.shapeList[p])}this._syncFrameShape()
},_getLocation:function(){var p;var s;var r;var o;var q=this.component.grid;if(this.zoomOption.orient=="horizontal"){r=this.zoomOption.width||q.getWidth();
o=this.zoomOption.height||this._fillerSize;p=this.zoomOption.x!=null?this.zoomOption.x:q.getX();s=this.zoomOption.y!=null?this.zoomOption.y:(this.zr.getHeight()-o-2)
}else{r=this.zoomOption.width||this._fillerSize;o=this.zoomOption.height||q.getHeight();p=this.zoomOption.x!=null?this.zoomOption.x:2;s=this.zoomOption.y!=null?this.zoomOption.y:q.getY()
}return{x:p,y:s,width:r,height:o}},_getZoom:function(){var w=this.option.series;var q=this.option.xAxis;if(q&&!(q instanceof Array)){q=[q];this.option.xAxis=q
}var o=this.option.yAxis;if(o&&!(o instanceof Array)){o=[o];this.option.yAxis=o}var A=[];var y;var B;var r=this.zoomOption.xAxisIndex;if(q&&r==null){y=[];
for(var x=0,s=q.length;x<s;x++){if(q[x].type=="category"||q[x].type==null){y.push(x)}}}else{if(r instanceof Array){y=r}else{if(r!=null){y=[r]}else{y=[]
}}}r=this.zoomOption.yAxisIndex;if(o&&r==null){B=[];for(var x=0,s=o.length;x<s;x++){if(o[x].type=="category"){B.push(x)}}}else{if(r instanceof Array){B=r
}else{if(r!=null){B=[r]}else{B=[]}}}var z;for(var x=0,s=w.length;x<s;x++){z=w[x];if(z.type!=l.CHART_TYPE_LINE&&z.type!=l.CHART_TYPE_BAR&&z.type!=l.CHART_TYPE_SCATTER&&z.type!=l.CHART_TYPE_K){continue
}for(var v=0,u=y.length;v<u;v++){if(y[v]==(z.xAxisIndex||0)){A.push(x);break}}for(var v=0,u=B.length;v<u;v++){if(B[v]==(z.yAxisIndex||0)){A.push(x);break
}}if(this.zoomOption.xAxisIndex==null&&this.zoomOption.yAxisIndex==null&&z.data&&this.getDataFromOption(z.data[0]) instanceof Array&&(z.type==l.CHART_TYPE_SCATTER||z.type==l.CHART_TYPE_LINE||z.type==l.CHART_TYPE_BAR)){A.push(x)
}}var p=this._zoom.start!=null?this._zoom.start:(this.zoomOption.start!=null?this.zoomOption.start:0);var t=this._zoom.end!=null?this._zoom.end:(this.zoomOption.end!=null?this.zoomOption.end:100);
if(p>t){p=p+t;t=p-t;p=p-t}var C=Math.round((t-p)/100*(this.zoomOption.orient=="horizontal"?this._location.width:this._location.height));return{start:p,end:t,start2:0,end2:100,size:C,xAxisIndex:y,yAxisIndex:B,seriesIndex:A,scatterMap:this._zoom.scatterMap||{}}
},_backupData:function(){this._originalData={xAxis:{},yAxis:{},series:{}};var p=this.option.xAxis;var u=this._zoom.xAxisIndex;for(var s=0,q=u.length;s<q;
s++){this._originalData.xAxis[u[s]]=p[u[s]].data}var o=this.option.yAxis;var w=this._zoom.yAxisIndex;for(var s=0,q=w.length;s<q;s++){this._originalData.yAxis[w[s]]=o[w[s]].data
}var t=this.option.series;var r=this._zoom.seriesIndex;var v;for(var s=0,q=r.length;s<q;s++){v=t[r[s]];this._originalData.series[r[s]]=v.data;if(v.data&&this.getDataFromOption(v.data[0]) instanceof Array&&(v.type==l.CHART_TYPE_SCATTER||v.type==l.CHART_TYPE_LINE||v.type==l.CHART_TYPE_BAR)){this._backupScale();
this._calculScatterMap(r[s])}}},_calculScatterMap:function(p){this._zoom.scatterMap=this._zoom.scatterMap||{};this._zoom.scatterMap[p]=this._zoom.scatterMap[p]||{};
var s=g("../component");var o=s.get("axis");var t=h.clone(this.option.xAxis);if(t[0].type=="category"){t[0].type="value"}if(t[1]&&t[1].type=="category"){t[1].type="value"
}var r=new o(this.ecTheme,null,false,{xAxis:t,series:this.option.series},this,"xAxis");var q=this.option.series[p].xAxisIndex||0;this._zoom.scatterMap[p].x=r.getAxis(q).getExtremum();
r.dispose();t=h.clone(this.option.yAxis);if(t[0].type=="category"){t[0].type="value"}if(t[1]&&t[1].type=="category"){t[1].type="value"}r=new o(this.ecTheme,null,false,{yAxis:t,series:this.option.series},this,"yAxis");
q=this.option.series[p].yAxisIndex||0;this._zoom.scatterMap[p].y=r.getAxis(q).getExtremum();r.dispose()},_buildBackground:function(){var B=this._location.width;
var z=this._location.height;this.shapeList.push(new m({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:this._location.x,y:this._location.y,width:B,height:z,color:this.zoomOption.backgroundColor}}));
var q=0;var s=this._originalData.xAxis;var p=this._zoom.xAxisIndex;for(var F=0,E=p.length;F<E;F++){q=Math.max(q,s[p[F]].length)}var o=this._originalData.yAxis;
var A=this._zoom.yAxisIndex;for(var F=0,E=A.length;F<E;F++){q=Math.max(q,o[A[F]].length)}var G=this._zoom.seriesIndex[0];var I=this._originalData.series[G];
var H=Number.MIN_VALUE;var w=Number.MAX_VALUE;var C;for(var F=0,E=I.length;F<E;F++){C=this.getDataFromOption(I[F],0);if(this.option.series[G].type==l.CHART_TYPE_K){C=C[1]
}if(isNaN(C)){C=0}H=Math.max(H,C);w=Math.min(w,C)}var v=H-w;var D=[];var u=B/(q-(q>1?1:0));var t=z/(q-(q>1?1:0));var r=1;if(this.zoomOption.orient=="horizontal"&&u<1){r=Math.floor(q*3/B)
}else{if(this.zoomOption.orient=="vertical"&&t<1){r=Math.floor(q*3/z)}}for(var F=0,E=q;F<E;F+=r){C=this.getDataFromOption(I[F],0);if(this.option.series[G].type==l.CHART_TYPE_K){C=C[1]
}if(isNaN(C)){C=0}if(this.zoomOption.orient=="horizontal"){D.push([this._location.x+u*F,this._location.y+z-1-Math.round((C-w)/v*(z-10))])}else{D.push([this._location.x+1+Math.round((C-w)/v*(B-10)),this._location.y+t*(E-F-1)])
}}if(this.zoomOption.orient=="horizontal"){D.push([this._location.x+B,this._location.y+z]);D.push([this._location.x,this._location.y+z])}else{D.push([this._location.x,this._location.y]);
D.push([this._location.x,this._location.y+z])}this.shapeList.push(new i({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{pointList:D,color:this.zoomOption.dataBackgroundColor},hoverable:false}))
},_buildFiller:function(){this._fillerShae={zlevel:this.getZlevelBase(),z:this.getZBase(),draggable:true,ondrift:this._ondrift,ondragend:this._ondragend,_type:"filler"};
if(this.zoomOption.orient=="horizontal"){this._fillerShae.style={x:this._location.x+Math.round(this._zoom.start/100*this._location.width)+this._handleSize,y:this._location.y,width:this._zoom.size-this._handleSize*2,height:this._location.height,color:this.zoomOption.fillerColor,text:":::",textPosition:"inside"}
}else{this._fillerShae.style={x:this._location.x,y:this._location.y+Math.round(this._zoom.start/100*this._location.height)+this._handleSize,width:this._location.width,height:this._zoom.size-this._handleSize*2,color:this.zoomOption.fillerColor,text:"::",textPosition:"inside"}
}this._fillerShae.highlightStyle={brushType:"fill",color:"rgba(0,0,0,0)"};this._fillerShae=new m(this._fillerShae);this.shapeList.push(this._fillerShae)
},_buildHandle:function(){var o=this.zoomOption.showDetail?this._getDetail():{start:"",end:""};this._startShape={zlevel:this.getZlevelBase(),z:this.getZBase(),draggable:true,style:{iconType:"rectangle",x:this._location.x,y:this._location.y,width:this._handleSize,height:this._handleSize,color:this.zoomOption.handleColor,text:"=",textPosition:"inside"},highlightStyle:{text:o.start,brushType:"fill",textPosition:"left"},ondrift:this._ondrift,ondragend:this._ondragend};
if(this.zoomOption.orient=="horizontal"){this._startShape.style.height=this._location.height;this._endShape=h.clone(this._startShape);this._startShape.style.x=this._fillerShae.style.x-this._handleSize,this._endShape.style.x=this._fillerShae.style.x+this._fillerShae.style.width;
this._endShape.highlightStyle.text=o.end;this._endShape.highlightStyle.textPosition="right"}else{this._startShape.style.width=this._location.width;this._endShape=h.clone(this._startShape);
this._startShape.style.y=this._fillerShae.style.y+this._fillerShae.style.height;this._startShape.highlightStyle.textPosition="bottom";this._endShape.style.y=this._fillerShae.style.y-this._handleSize;
this._endShape.highlightStyle.text=o.end;this._endShape.highlightStyle.textPosition="top"}this._startShape=new f(this._startShape);this._endShape=new f(this._endShape);
this.shapeList.push(this._startShape);this.shapeList.push(this._endShape)},_buildFrame:function(){var o=this.subPixelOptimize(this._location.x,1);var p=this.subPixelOptimize(this._location.y,1);
this._startFrameShape={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:o,y:p,width:this._location.width-(o>this._location.x?1:0),height:this._location.height-(p>this._location.y?1:0),lineWidth:1,brushType:"stroke",strokeColor:this.zoomOption.handleColor}};
this._endFrameShape=h.clone(this._startFrameShape);this._startFrameShape=new m(this._startFrameShape);this._endFrameShape=new m(this._endFrameShape);this.shapeList.push(this._startFrameShape);
this.shapeList.push(this._endFrameShape);return},_syncHandleShape:function(){if(this.zoomOption.orient=="horizontal"){this._startShape.style.x=this._fillerShae.style.x-this._handleSize;
this._endShape.style.x=this._fillerShae.style.x+this._fillerShae.style.width;this._zoom.start=(this._startShape.style.x-this._location.x)/this._location.width*100;
this._zoom.end=(this._endShape.style.x+this._handleSize-this._location.x)/this._location.width*100}else{this._startShape.style.y=this._fillerShae.style.y+this._fillerShae.style.height;
this._endShape.style.y=this._fillerShae.style.y-this._handleSize;this._zoom.start=(this._location.y+this._location.height-this._startShape.style.y)/this._location.height*100;
this._zoom.end=(this._location.y+this._location.height-this._endShape.style.y-this._handleSize)/this._location.height*100}this.zr.modShape(this._startShape.id);
this.zr.modShape(this._endShape.id);this._syncFrameShape();this.zr.refreshNextFrame()},_syncFillerShape:function(){var p;var o;if(this.zoomOption.orient=="horizontal"){p=this._startShape.style.x;
o=this._endShape.style.x;this._fillerShae.style.x=Math.min(p,o)+this._handleSize;this._fillerShae.style.width=Math.abs(p-o)-this._handleSize;this._zoom.start=(Math.min(p,o)-this._location.x)/this._location.width*100;
this._zoom.end=(Math.max(p,o)+this._handleSize-this._location.x)/this._location.width*100}else{p=this._startShape.style.y;o=this._endShape.style.y;this._fillerShae.style.y=Math.min(p,o)+this._handleSize;
this._fillerShae.style.height=Math.abs(p-o)-this._handleSize;this._zoom.start=(this._location.y+this._location.height-Math.max(p,o))/this._location.height*100;
this._zoom.end=(this._location.y+this._location.height-Math.min(p,o)-this._handleSize)/this._location.height*100}this.zr.modShape(this._fillerShae.id);
this._syncFrameShape();this.zr.refreshNextFrame()},_syncFrameShape:function(){if(this.zoomOption.orient=="horizontal"){this._startFrameShape.style.width=this._fillerShae.style.x-this._location.x;
this._endFrameShape.style.x=this._fillerShae.style.x+this._fillerShae.style.width;this._endFrameShape.style.width=this._location.x+this._location.width-this._endFrameShape.style.x
}else{this._startFrameShape.style.y=this._fillerShae.style.y+this._fillerShae.style.height;this._startFrameShape.style.height=this._location.y+this._location.height-this._startFrameShape.style.y;
this._endFrameShape.style.height=this._fillerShae.style.y-this._location.y}this.zr.modShape(this._startFrameShape.id);this.zr.modShape(this._endFrameShape.id)
},_syncShape:function(){if(!this.zoomOption.show){return}if(this.zoomOption.orient=="horizontal"){this._startShape.style.x=this._location.x+this._zoom.start/100*this._location.width;
this._endShape.style.x=this._location.x+this._zoom.end/100*this._location.width-this._handleSize;this._fillerShae.style.x=this._startShape.style.x+this._handleSize;
this._fillerShae.style.width=this._endShape.style.x-this._startShape.style.x-this._handleSize}else{this._startShape.style.y=this._location.y+this._location.height-this._zoom.start/100*this._location.height;
this._endShape.style.y=this._location.y+this._location.height-this._zoom.end/100*this._location.height-this._handleSize;this._fillerShae.style.y=this._endShape.style.y+this._handleSize;
this._fillerShae.style.height=this._startShape.style.y-this._endShape.style.y-this._handleSize}this.zr.modShape(this._startShape.id);this.zr.modShape(this._endShape.id);
this.zr.modShape(this._fillerShae.id);this._syncFrameShape();this.zr.refresh()},_syncData:function(q){var u;var v;var p;var s;var t;for(var r in this._originalData){u=this._originalData[r];
for(var o in u){t=u[o];if(t==null){continue}s=t.length;v=Math.floor(this._zoom.start/100*s);p=Math.ceil(this._zoom.end/100*s);if(!(this.getDataFromOption(t[0]) instanceof Array)||this.option[r][o].type==l.CHART_TYPE_K){this.option[r][o].data=t.slice(v,p)
}else{this._setScale();this.option[r][o].data=this._synScatterData(o,t)}}}if(!this._isSilence&&(this.zoomOption.realtime||q)){this.messageCenter.dispatch(l.EVENT.DATA_ZOOM,null,{zoom:this._zoom},this.myChart)
}},_synScatterData:function(r,t){if(this._zoom.start===0&&this._zoom.end==100&&this._zoom.start2===0&&this._zoom.end2==100){return t}var A=[];var q=this._zoom.scatterMap[r];
var w;var v;var o;var z;var y;if(this.zoomOption.orient=="horizontal"){w=q.x.max-q.x.min;v=this._zoom.start/100*w+q.x.min;o=this._zoom.end/100*w+q.x.min;
w=q.y.max-q.y.min;z=this._zoom.start2/100*w+q.y.min;y=this._zoom.end2/100*w+q.y.min}else{w=q.x.max-q.x.min;v=this._zoom.start2/100*w+q.x.min;o=this._zoom.end2/100*w+q.x.min;
w=q.y.max-q.y.min;z=this._zoom.start/100*w+q.y.min;y=this._zoom.end/100*w+q.y.min}var u;if(u=q.x.dataMappingMethods){v=u.coord2Value(v);o=u.coord2Value(o)
}if(u=q.y.dataMappingMethods){z=u.coord2Value(z);y=u.coord2Value(y)}var x;for(var s=0,p=t.length;s<p;s++){x=t[s].value||t[s];if(x[0]>=v&&x[0]<=o&&x[1]>=z&&x[1]<=y){A.push(t[s])
}}return A},_setScale:function(){var p=this._zoom.start!==0||this._zoom.end!==100||this._zoom.start2!==0||this._zoom.end2!==100;var s={xAxis:this.option.xAxis,yAxis:this.option.yAxis};
for(var r in s){for(var q=0,o=s[r].length;q<o;q++){s[r][q].scale=p||s[r][q]._scale}}},_backupScale:function(){var r={xAxis:this.option.xAxis,yAxis:this.option.yAxis};
for(var q in r){for(var p=0,o=r[q].length;p<o;p++){r[q][p]._scale=r[q][p].scale}}},_getDetail:function(){var C=["xAxis","yAxis"];for(var v=0,q=C.length;
v<q;v++){var w=this._originalData[C[v]];for(var A in w){var u=w[A];if(u==null){continue}var p=u.length;var o=Math.floor(this._zoom.start/100*p);var r=Math.ceil(this._zoom.end/100*p);
r-=r>0?1:0;return{start:this.getDataFromOption(u[o]),end:this.getDataFromOption(u[r])}}}C=this.zoomOption.orient=="horizontal"?"xAxis":"yAxis";var t=this._zoom.seriesIndex[0];
var D=this.option.series[t][C+"Index"]||0;var B=this.option[C][D].type;var s=this._zoom.scatterMap[t][C.charAt(0)].min;var x=this._zoom.scatterMap[t][C.charAt(0)].max;
var y=x-s;if(B=="value"){return{start:s+y*this._zoom.start/100,end:s+y*this._zoom.end/100}}else{if(B=="time"){x=s+y*this._zoom.end/100;s=s+y*this._zoom.start/100;
var z=n.getAutoFormatter(s,x).formatter;return{start:n.format(z,s),end:n.format(z,x)}}}return{start:"",end:""}},__ondrift:function(q,p,o){if(this.zoomOption.zoomLock){q=this._fillerShae
}var s=q._type=="filler"?this._handleSize:0;if(this.zoomOption.orient=="horizontal"){if(q.style.x+p-s<=this._location.x){q.style.x=this._location.x+s}else{if(q.style.x+p+q.style.width+s>=this._location.x+this._location.width){q.style.x=this._location.x+this._location.width-q.style.width-s
}else{q.style.x+=p}}}else{if(q.style.y+o-s<=this._location.y){q.style.y=this._location.y+s}else{if(q.style.y+o+q.style.height+s>=this._location.y+this._location.height){q.style.y=this._location.y+this._location.height-q.style.height-s
}else{q.style.y+=o}}}if(q._type=="filler"){this._syncHandleShape()}else{this._syncFillerShape()}if(this.zoomOption.realtime){this._syncData()}if(this.zoomOption.showDetail){var r=this._getDetail();
this._startShape.style.text=this._startShape.highlightStyle.text=r.start;this._endShape.style.text=this._endShape.highlightStyle.text=r.end;this._startShape.style.textPosition=this._startShape.highlightStyle.textPosition;
this._endShape.style.textPosition=this._endShape.highlightStyle.textPosition}return true},__ondragend:function(){if(this.zoomOption.showDetail){this._startShape.style.text=this._endShape.style.text="=";
this._startShape.style.textPosition=this._endShape.style.textPosition="inside";this.zr.modShape(this._startShape.id);this.zr.modShape(this._endShape.id);
this.zr.refreshNextFrame()}this.isDragend=true},ondragend:function(p,o){if(!this.isDragend||!p.target){return}!this.zoomOption.realtime&&this._syncData();
o.dragOut=true;o.dragIn=true;if(!this._isSilence&&!this.zoomOption.realtime){this.messageCenter.dispatch(l.EVENT.DATA_ZOOM,null,{zoom:this._zoom},this.myChart)
}o.needRefresh=false;this.isDragend=false;return},ondataZoom:function(p,o){o.needRefresh=true;return},absoluteZoom:function(o){this._zoom.start=o.start;
this._zoom.end=o.end;this._zoom.start2=o.start2;this._zoom.end2=o.end2;this._syncShape();this._syncData(true);return},rectZoom:function(v){if(!v){this._zoom.start=this._zoom.start2=0;
this._zoom.end=this._zoom.end2=100;this._syncShape();this._syncData(true);return this._zoom}var p=this.component.grid.getArea();var u={x:v.x,y:v.y,width:v.width,height:v.height};
if(u.width<0){u.x+=u.width;u.width=-u.width}if(u.height<0){u.y+=u.height;u.height=-u.height}if(u.x>p.x+p.width||u.y>p.y+p.height){return false}if(u.x<p.x){u.x=p.x
}if(u.x+u.width>p.x+p.width){u.width=p.x+p.width-u.x}if(u.y+u.height>p.y+p.height){u.height=p.y+p.height-u.y}var t;var r=(u.x-p.x)/p.width;var s=1-(u.x+u.width-p.x)/p.width;
var o=1-(u.y+u.height-p.y)/p.height;var q=(u.y-p.y)/p.height;if(this.zoomOption.orient=="horizontal"){t=this._zoom.end-this._zoom.start;this._zoom.start+=t*r;
this._zoom.end-=t*s;t=this._zoom.end2-this._zoom.start2;this._zoom.start2+=t*o;this._zoom.end2-=t*q}else{t=this._zoom.end-this._zoom.start;this._zoom.start+=t*o;
this._zoom.end-=t*q;t=this._zoom.end2-this._zoom.start2;this._zoom.start2+=t*r;this._zoom.end2-=t*s}this._syncShape();this._syncData(true);return this._zoom
},syncBackupData:function(q){var o;var w=this._originalData.series;var p=q.series;var v;for(var u=0,r=p.length;u<r;u++){v=p[u].data||p[u].eventList;if(w[u]){o=Math.floor(this._zoom.start/100*w[u].length)
}else{o=0}for(var t=0,s=v.length;t<s;t++){if(w[u]){w[u][t+o]=v[t]}}}},syncOption:function(o){this.silence(true);this.option=o;this.option.dataZoom=this.reformOption(this.option.dataZoom);
this.zoomOption=this.option.dataZoom;if(!this.myChart.canvasSupported){this.zoomOption.realtime=false}this.clear();this._location=this._getLocation();this._zoom=this._getZoom();
this._backupData();if(this.option.dataZoom&&this.option.dataZoom.show){this._buildShape()}this._syncData();this.silence(false)},silence:function(o){this._isSilence=o
},getRealDataIndex:function(p,q){if(!this._originalData||(this._zoom.start===0&&this._zoom.end==100)){return q}var o=this._originalData.series;if(o[p]){return Math.floor(this._zoom.start/100*o[p].length)+q
}return -1},resize:function(){this.clear();this._location=this._getLocation();this._zoom=this._getZoom();if(this.option.dataZoom.show){this._buildShape()
}}};h.inherits(k,j);g("../component").define("dataZoom",k);return k});d("zrender/tool/util",["require","../dep/excanvas"],function(p){var g={"[object Function]":1,"[object RegExp]":1,"[object Date]":1,"[object Error]":1,"[object CanvasGradient]":1};
var i=Object.prototype.toString;function y(z){return z&&z.nodeType===1&&typeof(z.nodeName)=="string"}function w(D){if(typeof D=="object"&&D!==null){var A=D;
if(D instanceof Array){A=[];for(var C=0,z=D.length;C<z;C++){A[C]=w(D[C])}}else{if(!g[i.call(D)]&&!y(D)){A={};for(var B in D){if(D.hasOwnProperty(B)){A[B]=w(D[B])
}}}}return A}return D}function f(D,C,B,A){if(C.hasOwnProperty(B)){var z=D[B];if(typeof z=="object"&&!g[i.call(z)]&&!y(z)){l(D[B],C[B],A)}else{if(A||!(B in D)){D[B]=C[B]
}}}}function l(C,B,z){for(var A in B){f(C,B,A,z)}return C}var v;function o(){if(!v){p("../dep/excanvas");if(window.G_vmlCanvasManager){var z=document.createElement("div");
z.style.position="absolute";z.style.top="-1000px";document.body.appendChild(z);v=G_vmlCanvasManager.initElement(z).getContext("2d")}else{v=document.createElement("canvas").getContext("2d")
}}return v}var t;var s;var k;var x;var n=0;var m=0;function j(){if(!s){t=document.createElement("canvas");k=t.width;x=t.height;s=t.getContext("2d")}return s
}function u(z,C){var A=100;var B;if(z+n>k){k=z+n+A;t.width=k;B=true}if(C+m>x){x=C+m+A;t.height=x;B=true}if(z<-n){n=Math.ceil(-z/A)*A;k+=n;t.width=k;B=true
}if(C<-m){m=Math.ceil(-C/A)*A;x+=m;t.height=x;B=true}if(B){s.translate(n,m)}}function q(){return{x:n,y:m}}function h(C,B){if(C.indexOf){return C.indexOf(B)
}for(var A=0,z=C.length;A<z;A++){if(C[A]===B){return A}}return -1}function r(A,z){var B=A.prototype;function C(){}C.prototype=z.prototype;A.prototype=new C();
for(var D in B){A.prototype[D]=B[D]}A.constructor=A}return{inherits:r,clone:w,merge:l,getContext:o,getPixelContext:j,getPixelOffset:q,adjustCanvasSize:u,indexOf:h}
});d("echarts/chart",[],function(){var f={};var g={};f.define=function(i,h){g[i]=h;return f};f.get=function(h){return g[h]};return f});d("zrender/shape/Rectangle",["require","./Base","../tool/util"],function(f){var h=f("./Base");
var g=function(i){h.call(this,i)};g.prototype={type:"rectangle",_buildRadiusPath:function(u,k){var s=k.x;var q=k.y;var m=k.width;var t=k.height;var i=k.radius;
var o;var n;var l;var j;if(typeof i==="number"){o=n=l=j=i}else{if(i instanceof Array){if(i.length===1){o=n=l=j=i[0]}else{if(i.length===2){o=l=i[0];n=j=i[1]
}else{if(i.length===3){o=i[0];n=j=i[1];l=i[2]}else{o=i[0];n=i[1];l=i[2];j=i[3]}}}}else{o=n=l=j=0}}var p;if(o+n>m){p=o+n;o*=m/p;n*=m/p}if(l+j>m){p=l+j;l*=m/p;
j*=m/p}if(n+l>t){p=n+l;n*=t/p;l*=t/p}if(o+j>t){p=o+j;o*=t/p;j*=t/p}u.moveTo(s+o,q);u.lineTo(s+m-n,q);n!==0&&u.quadraticCurveTo(s+m,q,s+m,q+n);u.lineTo(s+m,q+t-l);
l!==0&&u.quadraticCurveTo(s+m,q+t,s+m-l,q+t);u.lineTo(s+j,q+t);j!==0&&u.quadraticCurveTo(s,q+t,s,q+t-j);u.lineTo(s,q+o);o!==0&&u.quadraticCurveTo(s,q,s+o,q)
},buildPath:function(i,j){if(!j.radius){i.moveTo(j.x,j.y);i.lineTo(j.x+j.width,j.y);i.lineTo(j.x+j.width,j.y+j.height);i.lineTo(j.x,j.y+j.height);i.lineTo(j.x,j.y)
}else{this._buildRadiusPath(i,j)}i.closePath();return},getRect:function(j){if(j.__rect){return j.__rect}var i;if(j.brushType=="stroke"||j.brushType=="fill"){i=j.lineWidth||1
}else{i=0}j.__rect={x:Math.round(j.x-i/2),y:Math.round(j.y-i/2),width:j.width+i,height:j.height+i};return j.__rect}};f("../tool/util").inherits(g,h);return g
});d("zrender/tool/event",["require","../mixin/Eventful"],function(h){var k=h("../mixin/Eventful");function g(l){return typeof l.zrenderX!="undefined"&&l.zrenderX||typeof l.offsetX!="undefined"&&l.offsetX||typeof l.layerX!="undefined"&&l.layerX||typeof l.clientX!="undefined"&&l.clientX
}function f(l){return typeof l.zrenderY!="undefined"&&l.zrenderY||typeof l.offsetY!="undefined"&&l.offsetY||typeof l.layerY!="undefined"&&l.layerY||typeof l.clientY!="undefined"&&l.clientY
}function j(l){return typeof l.zrenderDelta!="undefined"&&l.zrenderDelta||typeof l.wheelDelta!="undefined"&&l.wheelDelta||typeof l.detail!="undefined"&&-l.detail
}var i=typeof window.addEventListener==="function"?function(l){l.preventDefault();l.stopPropagation();l.cancelBubble=true}:function(l){l.returnValue=false;
l.cancelBubble=true};return{getX:g,getY:f,getDelta:j,stop:i,Dispatcher:k}});d("zrender/config",[],function(){var f={EVENT:{RESIZE:"resize",CLICK:"click",DBLCLICK:"dblclick",MOUSEWHEEL:"mousewheel",MOUSEMOVE:"mousemove",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",GLOBALOUT:"globalout",DRAGSTART:"dragstart",DRAGEND:"dragend",DRAGENTER:"dragenter",DRAGOVER:"dragover",DRAGLEAVE:"dragleave",DROP:"drop",touchClickDelay:300},catchBrushException:false,debugMode:0,devicePixelRatio:Math.max(window.devicePixelRatio||1,1)};
return f});d("zrender/zrender",["require","./dep/excanvas","./tool/util","./tool/log","./tool/guid","./Handler","./Painter","./Storage","./animation/Animation","./tool/env"],function(h){h("./dep/excanvas");
var k=h("./tool/util");var i=h("./tool/log");var o=h("./tool/guid");var n=h("./Handler");var j=h("./Painter");var q=h("./Storage");var l=h("./animation/Animation");
var p={};var g={};g.version="2.0.8";g.init=function(s){var r=new f(o(),s);p[r.id]=r;return r};g.dispose=function(s){if(s){s.dispose()}else{for(var r in p){p[r].dispose()
}p={}}return g};g.getInstance=function(r){return p[r]};g.delInstance=function(r){delete p[r];return g};function m(r){return function(){var t=r.animatingElements;
for(var u=0,s=t.length;u<s;u++){r.storage.mod(t[u].id)}if(t.length||r._needsRefreshNextFrame){r.refresh()}}}var f=function(v,t){this.id=v;this.env=h("./tool/env");
this.storage=new q();this.painter=new j(t,this.storage);this.handler=new n(t,this.storage,this.painter);this.animatingElements=[];this.animation=new l({stage:{update:m(this)}});
this.animation.start();var r=this;this.painter.refreshNextFrame=function(){r.refreshNextFrame()};this._needsRefreshNextFrame=false;var r=this;var u=this.storage;
var s=u.delFromMap;u.delFromMap=function(w){var x=u.get(w);r.stopAnimation(x);s.call(u,w)}};f.prototype.getId=function(){return this.id};f.prototype.addShape=function(r){this.addElement(r);
return this};f.prototype.addGroup=function(r){this.addElement(r);return this};f.prototype.delShape=function(r){this.delElement(r);return this};f.prototype.delGroup=function(r){this.delElement(r);
return this};f.prototype.modShape=function(s,r){this.modElement(s,r);return this};f.prototype.modGroup=function(r,s){this.modElement(r,s);return this};
f.prototype.addElement=function(r){this.storage.addRoot(r);this._needsRefreshNextFrame=true;return this};f.prototype.delElement=function(r){this.storage.delRoot(r);
this._needsRefreshNextFrame=true;return this};f.prototype.modElement=function(r,s){this.storage.mod(r,s);this._needsRefreshNextFrame=true;return this};
f.prototype.modLayer=function(s,r){this.painter.modLayer(s,r);this._needsRefreshNextFrame=true;return this};f.prototype.addHoverShape=function(r){this.storage.addHover(r);
return this};f.prototype.render=function(r){this.painter.render(r);this._needsRefreshNextFrame=false;return this};f.prototype.refresh=function(r){this.painter.refresh(r);
this._needsRefreshNextFrame=false;return this};f.prototype.refreshNextFrame=function(){this._needsRefreshNextFrame=true;return this};f.prototype.refreshHover=function(r){this.painter.refreshHover(r);
return this};f.prototype.refreshShapes=function(r,s){this.painter.refreshShapes(r,s);return this};f.prototype.resize=function(){this.painter.resize();return this
};f.prototype.animate=function(s,B,y){if(typeof(s)==="string"){s=this.storage.get(s)}if(s){var z;if(B){var A=B.split(".");var r=s;for(var x=0,v=A.length;
x<v;x++){if(!r){continue}r=r[A[x]]}if(r){z=r}}else{z=s}if(!z){i('Property "'+B+'" is not existed in element '+s.id);return}var t=this.animatingElements;
if(s.__animators==null){s.__animators=[]}var w=s.__animators;if(w.length===0){t.push(s)}var u=this.animation.animate(z,{loop:y}).done(function(){var C=k.indexOf(s.__animators,u);
if(C>=0){w.splice(C,1)}if(w.length===0){var C=k.indexOf(t,s);t.splice(C,1)}});w.push(u);return u}else{i("Element not existed")}};f.prototype.stopAnimation=function(v){if(v.__animators){var w=v.__animators;
var s=w.length;for(var u=0;u<s;u++){w[u].stop()}if(s>0){var t=this.animatingElements;var r=k.indexOf(t,v);if(r>=0){t.splice(r,1)}}w.length=0}return this
};f.prototype.clearAnimation=function(){this.animation.clear();this.animatingElements.length=0;return this};f.prototype.showLoading=function(r){this.painter.showLoading(r);
return this};f.prototype.hideLoading=function(){this.painter.hideLoading();return this};f.prototype.getWidth=function(){return this.painter.getWidth()};
f.prototype.getHeight=function(){return this.painter.getHeight()};f.prototype.toDataURL=function(t,r,s){return this.painter.toDataURL(t,r,s)};f.prototype.shapeToImage=function(t,s,r){var u=o();
return this.painter.shapeToImage(u,t,s,r)};f.prototype.on=function(r,t,s){this.handler.on(r,t,s);return this};f.prototype.un=function(r,s){this.handler.un(r,s);
return this};f.prototype.trigger=function(r,s){this.handler.trigger(r,s);return this};f.prototype.clear=function(){this.storage.delRoot();this.painter.clear();
return this};f.prototype.dispose=function(){this.animation.stop();this.clear();this.storage.dispose();this.painter.dispose();this.handler.dispose();this.animation=this.animatingElements=this.storage=this.painter=this.handler=null;
g.delInstance(this.id)};return g});d("echarts/chart/island",["require","./base","zrender/shape/Circle","../config","../util/ecData","zrender/tool/util","zrender/tool/event","zrender/tool/color","../util/accMath","../chart"],function(j){var m=j("./base");
var g=j("zrender/shape/Circle");var f=j("../config");f.island={zlevel:0,z:5,r:15,calculateStep:0.1};var l=j("../util/ecData");var h=j("zrender/tool/util");
var i=j("zrender/tool/event");function k(r,n,s,q,p){m.call(this,r,n,s,q,p);this._nameConnector;this._valueConnector;this._zrHeight=this.zr.getHeight();
this._zrWidth=this.zr.getWidth();var o=this;o.shapeHandler.onmousewheel=function(y){var t=y.target;var v=y.event;var z=i.getDelta(v);z=z>0?(-1):1;t.style.r-=z;
t.style.r=t.style.r<5?5:t.style.r;var w=l.get(t,"value");var x=w*o.option.island.calculateStep;w=x>1?(Math.round(w-x*z)):+(w-x*z).toFixed(2);var u=l.get(t,"name");
t.style.text=u+":"+w;l.set(t,"value",w);l.set(t,"name",u);o.zr.modShape(t.id);o.zr.refreshNextFrame();i.stop(v)}}k.prototype={type:f.CHART_TYPE_ISLAND,_combine:function(q,n){var s=j("zrender/tool/color");
var p=j("../util/accMath");var r=p.accAdd(l.get(q,"value"),l.get(n,"value"));var o=l.get(q,"name")+this._nameConnector+l.get(n,"name");q.style.text=o+this._valueConnector+r;
l.set(q,"value",r);l.set(q,"name",o);q.style.r=this.option.island.r;q.style.color=s.mix(q.style.color,n.style.color)},refresh:function(n){if(n){n.island=this.reformOption(n.island);
this.option=n;this._nameConnector=this.option.nameConnector;this._valueConnector=this.option.valueConnector}},getOption:function(){return this.option},resize:function(){var r=this.zr.getWidth();
var p=this.zr.getHeight();var s=r/(this._zrWidth||r);var q=p/(this._zrHeight||p);if(s===1&&q===1){return}this._zrWidth=r;this._zrHeight=p;for(var o=0,n=this.shapeList.length;
o<n;o++){this.zr.modShape(this.shapeList[o].id,{style:{x:Math.round(this.shapeList[o].style.x*s),y:Math.round(this.shapeList[o].style.y*q)}})}},add:function(p){var q=l.get(p,"name");
var s=l.get(p,"value");var n=l.get(p,"series")!=null?l.get(p,"series").name:"";var o=this.getFont(this.option.island.textStyle);var r={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:p.style.x,y:p.style.y,r:this.option.island.r,color:p.style.color||p.style.strokeColor,text:q+this._valueConnector+s,textFont:o},draggable:true,hoverable:true,onmousewheel:this.shapeHandler.onmousewheel,_type:"island"};
if(r.style.color==="#fff"){r.style.color=p.style.strokeColor}this.setCalculable(r);r.dragEnableTime=0;l.pack(r,{name:n},-1,s,-1,q);r=new g(r);this.shapeList.push(r);
this.zr.addShape(r)},del:function(o){this.zr.delShape(o.id);var p=[];for(var q=0,n=this.shapeList.length;q<n;q++){if(this.shapeList[q].id!=o.id){p.push(this.shapeList[q])
}}this.shapeList=p},ondrop:function(q,o){if(!this.isDrop||!q.target){return}var p=q.target;var n=q.dragged;this._combine(p,n);this.zr.modShape(p.id);o.dragIn=true;
this.isDrop=false;return},ondragend:function(p,n){var o=p.target;if(!this.isDragend){if(!n.dragIn){o.style.x=i.getX(p.event);o.style.y=i.getY(p.event);
this.add(o);n.needRefresh=true}}else{if(n.dragIn){this.del(o);n.needRefresh=true}}this.isDragend=false;return}};h.inherits(k,m);j("../chart").define("island",k);
return k});d("zrender/tool/env",[],function(){function f(y){var o=this.os={};var z=this.browser={};var h=y.match(/Web[kK]it[\/]{0,1}([\d.]+)/);var A=y.match(/(Android);?[\s\/]+([\d.]+)?/);
var s=y.match(/(iPad).*OS\s([\d_]+)/);var m=y.match(/(iPod)(.*OS\s([\d_]+))?/);var k=!s&&y.match(/(iPhone\sOS)\s([\d_]+)/);var g=y.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
var u=g&&y.match(/TouchPad/);var l=y.match(/Kindle\/([\d.]+)/);var x=y.match(/Silk\/([\d._]+)/);var t=y.match(/(BlackBerry).*Version\/([\d.]+)/);var q=y.match(/(BB10).*Version\/([\d.]+)/);
var i=y.match(/(RIM\sTablet\sOS)\s([\d.]+)/);var r=y.match(/PlayBook/);var w=y.match(/Chrome\/([\d.]+)/)||y.match(/CriOS\/([\d.]+)/);var n=y.match(/Firefox\/([\d.]+)/);
var v=y.match(/MSIE ([\d.]+)/);var p=h&&y.match(/Mobile\//)&&!w;var j=y.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)&&!w;var v=y.match(/MSIE\s([\d.]+)/);
if(z.webkit=!!h){z.version=h[1]}if(A){o.android=true,o.version=A[2]}if(k&&!m){o.ios=o.iphone=true,o.version=k[2].replace(/_/g,".")}if(s){o.ios=o.ipad=true,o.version=s[2].replace(/_/g,".")
}if(m){o.ios=o.ipod=true,o.version=m[3]?m[3].replace(/_/g,"."):null}if(g){o.webos=true,o.version=g[2]}if(u){o.touchpad=true}if(t){o.blackberry=true,o.version=t[2]
}if(q){o.bb10=true,o.version=q[2]}if(i){o.rimtabletos=true,o.version=i[2]}if(r){z.playbook=true}if(l){o.kindle=true,o.version=l[1]}if(x){z.silk=true,z.version=x[1]
}if(!x&&o.android&&y.match(/Kindle Fire/)){z.silk=true}if(w){z.chrome=true,z.version=w[1]}if(n){z.firefox=true,z.version=n[1]}if(v){z.ie=true,z.version=v[1]
}if(p&&(y.match(/Safari/)||!!o.ios)){z.safari=true}if(j){z.webview=true}if(v){z.ie=true,z.version=v[1]}o.tablet=!!(s||r||(A&&!y.match(/Mobile/))||(n&&y.match(/Tablet/))||(v&&!y.match(/Phone/)&&y.match(/Touch/)));
o.phone=!!(!o.tablet&&!o.ipod&&(A||k||g||t||q||(w&&y.match(/Android/))||(w&&y.match(/CriOS\/([\d.]+)/))||(n&&y.match(/Mobile/))||(v&&y.match(/Touch/))));
return{browser:z,os:o,canvasSupported:document.createElement("canvas").getContext?true:false}}return f(navigator.userAgent)});d("echarts/component/title",["require","./base","zrender/shape/Text","zrender/shape/Rectangle","../config","zrender/tool/util","zrender/tool/area","zrender/tool/color","../component"],function(g){var j=g("./base");
var h=g("zrender/shape/Text");var m=g("zrender/shape/Rectangle");var l=g("../config");l.title={zlevel:0,z:6,show:true,text:"",subtext:"",x:"left",y:"top",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:5,textStyle:{fontSize:18,fontWeight:"bolder",color:"#333"},subtextStyle:{color:"#aaa"}};
var i=g("zrender/tool/util");var n=g("zrender/tool/area");var f=g("zrender/tool/color");function k(r,o,s,q,p){j.call(this,r,o,s,q,p);this.refresh(q)}k.prototype={type:l.COMPONENT_TYPE_TITLE,_buildShape:function(){if(!this.titleOption.show){return
}this._itemGroupLocation=this._getItemGroupLocation();this._buildBackground();this._buildItem();for(var p=0,o=this.shapeList.length;p<o;p++){this.zr.addShape(this.shapeList[p])
}},_buildItem:function(){var D=this.titleOption.text;var z=this.titleOption.link;var u=this.titleOption.target;var B=this.titleOption.subtext;var v=this.titleOption.sublink;
var t=this.titleOption.subtarget;var r=this.getFont(this.titleOption.textStyle);var o=this.getFont(this.titleOption.subtextStyle);var A=this._itemGroupLocation.x;
var w=this._itemGroupLocation.y;var q=this._itemGroupLocation.width;var C=this._itemGroupLocation.height;var p={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{y:w,color:this.titleOption.textStyle.color,text:D,textFont:r,textBaseline:"top"},highlightStyle:{color:f.lift(this.titleOption.textStyle.color,1),brushType:"fill"},hoverable:false};
if(z){p.hoverable=true;p.clickable=true;p.onclick=function(){if(!u||u!="self"){window.open(z)}else{window.location=z}}}var s={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{y:w+C,color:this.titleOption.subtextStyle.color,text:B,textFont:o,textBaseline:"bottom"},highlightStyle:{color:f.lift(this.titleOption.subtextStyle.color,1),brushType:"fill"},hoverable:false};
if(v){s.hoverable=true;s.clickable=true;s.onclick=function(){if(!t||t!="self"){window.open(v)}else{window.location=v}}}switch(this.titleOption.x){case"center":p.style.x=s.style.x=A+q/2;
p.style.textAlign=s.style.textAlign="center";break;case"left":p.style.x=s.style.x=A;p.style.textAlign=s.style.textAlign="left";break;case"right":p.style.x=s.style.x=A+q;
p.style.textAlign=s.style.textAlign="right";break;default:A=this.titleOption.x-0;A=isNaN(A)?0:A;p.style.x=s.style.x=A;break}if(this.titleOption.textAlign){p.style.textAlign=s.style.textAlign=this.titleOption.textAlign
}this.shapeList.push(new h(p));B!==""&&this.shapeList.push(new h(s))},_buildBackground:function(){var o=this.reformCssArray(this.titleOption.padding);this.shapeList.push(new m({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:this._itemGroupLocation.x-o[3],y:this._itemGroupLocation.y-o[0],width:this._itemGroupLocation.width+o[3]+o[1],height:this._itemGroupLocation.height+o[0]+o[2],brushType:this.titleOption.borderWidth===0?"fill":"both",color:this.titleOption.backgroundColor,strokeColor:this.titleOption.borderColor,lineWidth:this.titleOption.borderWidth}}))
},_getItemGroupLocation:function(){var u=this.reformCssArray(this.titleOption.padding);var z=this.titleOption.text;var v=this.titleOption.subtext;var q=this.getFont(this.titleOption.textStyle);
var p=this.getFont(this.titleOption.subtextStyle);var r=Math.max(n.getTextWidth(z,q),n.getTextWidth(v,p));var s=n.getTextHeight(z,q)+(v===""?0:(this.titleOption.itemGap+n.getTextHeight(v,p)));
var w;var A=this.zr.getWidth();switch(this.titleOption.x){case"center":w=Math.floor((A-r)/2);break;case"left":w=u[3]+this.titleOption.borderWidth;break;
case"right":w=A-r-u[1]-this.titleOption.borderWidth;break;default:w=this.titleOption.x-0;w=isNaN(w)?0:w;break}var t;var o=this.zr.getHeight();switch(this.titleOption.y){case"top":t=u[0]+this.titleOption.borderWidth;
break;case"bottom":t=o-s-u[2]-this.titleOption.borderWidth;break;case"center":t=Math.floor((o-s)/2);break;default:t=this.titleOption.y-0;t=isNaN(t)?0:t;
break}return{x:w,y:t,width:r,height:s}},refresh:function(o){if(o){this.option=o;this.option.title=this.reformOption(this.option.title);this.titleOption=this.option.title;
this.titleOption.textStyle=this.getTextStyle(this.titleOption.textStyle);this.titleOption.subtextStyle=this.getTextStyle(this.titleOption.subtextStyle)
}this.clear();this._buildShape()}};i.inherits(k,j);g("../component").define("title",k);return k});d("echarts/component",[],function(){var f={};var g={};
f.define=function(i,h){g[i]=h;return f};f.get=function(h){return g[h]};return f});d("echarts/component/timeline",["require","./base","zrender/shape/Rectangle","../util/shape/Icon","../util/shape/Chain","../config","zrender/tool/util","zrender/tool/area","zrender/tool/event","../component"],function(i){var k=i("./base");
var o=i("zrender/shape/Rectangle");var h=i("../util/shape/Icon");var f=i("../util/shape/Chain");var m=i("../config");m.timeline={zlevel:0,z:4,show:true,type:"time",notMerge:false,realtime:true,x:80,x2:80,y2:0,height:50,backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,controlPosition:"left",autoPlay:false,loop:true,playInterval:2000,lineStyle:{width:1,color:"#666",type:"dashed"},label:{show:true,interval:"auto",rotate:0,textStyle:{color:"#333"}},checkpointStyle:{symbol:"auto",symbolSize:"auto",color:"auto",borderColor:"auto",borderWidth:"auto",label:{show:false,textStyle:{color:"auto"}}},controlStyle:{itemSize:15,itemGap:5,normal:{color:"#333"},emphasis:{color:"#1e90ff"}},symbol:"emptyDiamond",symbolSize:4,currentIndex:0};
var j=i("zrender/tool/util");var p=i("zrender/tool/area");var n=i("zrender/tool/event");function l(u,q,v,t,s){k.call(this,u,q,v,t,s);var r=this;r._onclick=function(w){return r.__onclick(w)
};r._ondrift=function(x,w){return r.__ondrift(this,x,w)};r._ondragend=function(){return r.__ondragend()};r._setCurrentOption=function(){var x=r.timelineOption;
r.currentIndex%=x.data.length;var w=r.options[r.currentIndex]||{};r.myChart.setOption(w,x.notMerge);r.messageCenter.dispatch(m.EVENT.TIMELINE_CHANGED,null,{currentIndex:r.currentIndex,data:x.data[r.currentIndex].name!=null?x.data[r.currentIndex].name:x.data[r.currentIndex]},r.myChart)
};r._onFrame=function(){r._setCurrentOption();r._syncHandleShape();if(r.timelineOption.autoPlay){r.playTicket=setTimeout(function(){r.currentIndex+=1;if(!r.timelineOption.loop&&r.currentIndex>=r.timelineOption.data.length){r.currentIndex=r.timelineOption.data.length-1;
r.stop();return}r._onFrame()},r.timelineOption.playInterval)}};this.setTheme(false);this.options=this.option.options;this.currentIndex=this.timelineOption.currentIndex%this.timelineOption.data.length;
if(!this.timelineOption.notMerge&&this.currentIndex!==0){this.options[this.currentIndex]=j.merge(this.options[this.currentIndex],this.options[0])}if(this.timelineOption.show){this._buildShape();
this._syncHandleShape()}this._setCurrentOption();if(this.timelineOption.autoPlay){var r=this;this.playTicket=setTimeout(function(){r.play()},this.ecTheme.animationDuration!=null?this.ecTheme.animationDuration:m.animationDuration)
}}l.prototype={type:m.COMPONENT_TYPE_TIMELINE,_buildShape:function(){this._location=this._getLocation();this._buildBackground();this._buildControl();this._chainPoint=this._getChainPoint();
if(this.timelineOption.label.show){var s=this._getInterval();for(var t=0,q=this._chainPoint.length;t<q;t+=s){this._chainPoint[t].showLabel=true}}this._buildChain();
this._buildHandle();for(var t=0,r=this.shapeList.length;t<r;t++){this.zr.addShape(this.shapeList[t])}},_getLocation:function(){var v=this.timelineOption;
var w=this.reformCssArray(this.timelineOption.padding);var B=this.zr.getWidth();var z=this.parsePercent(v.x,B);var q=this.parsePercent(v.x2,B);var s;if(v.width==null){s=B-z-q;
q=B-q}else{s=this.parsePercent(v.width,B);q=z+s}var r=this.zr.getHeight();var A=this.parsePercent(v.height,r);var u;var t;if(v.y!=null){u=this.parsePercent(v.y,r);
t=u+A}else{t=r-this.parsePercent(v.y2,r);u=t-A}return{x:z+w[3],y:u+w[0],x2:q-w[1],y2:t-w[2],width:s-w[1]-w[3],height:A-w[0]-w[2]}},_getReformedLabel:function(q){var t=this.timelineOption;
var s=t.data[q].name!=null?t.data[q].name:t.data[q];var r=t.data[q].formatter||t.label.formatter;if(r){if(typeof r==="function"){s=r.call(this.myChart,s)
}else{if(typeof r==="string"){s=r.replace("{value}",s)}}}return s},_getInterval:function(){var z=this._chainPoint;var A=this.timelineOption;var r=A.label.interval;
if(r==="auto"){var C=A.label.textStyle.fontSize;var v=A.data;var q=A.data.length;if(q>3){var s=false;var x;var t;r=0;while(!s&&r<q){r++;s=true;for(var u=r;
u<q;u+=r){x=z[u].x-z[u-r].x;if(A.label.rotate!==0){t=C}else{if(v[u].textStyle){t=p.getTextWidth(z[u].name,z[u].textFont)}else{var B=z[u].name+"";var w=(B.match(/\w/g)||"").length;
var y=B.length-w;t=w*C*2/3+y*C}}if(x<t){s=false;break}}}}else{r=1}}else{r=r-0+1}return r},_getChainPoint:function(){var C=this.timelineOption;var H=C.symbol.toLowerCase();
var M=C.symbolSize;var J=C.label.rotate;var t=C.label.textStyle;var B=this.getFont(t);var s;var N=C.data;var z=this._location.x;var v=this._location.y+this._location.height/4*3;
var E=this._location.x2-this._location.x;var K=N.length;function w(x){return(N[x].name!=null?N[x].name:N[x]+"")}var q=[];if(K>1){var F=E/K;F=F>50?50:(F<20?5:F);
E-=F*2;if(C.type==="number"){for(var I=0;I<K;I++){q.push(z+F+E/(K-1)*I)}}else{q[0]=new Date(w(0).replace(/-/g,"/"));q[K-1]=new Date(w(K-1).replace(/-/g,"/"))-q[0];
for(var I=1;I<K;I++){q[I]=z+F+E*(new Date(w(I).replace(/-/g,"/"))-q[0])/q[K-1]}q[0]=z+F}}else{q.push(z+E/2)}var L=[];var u;var D;var A;var r;var G;for(var I=0;
I<K;I++){z=q[I];u=(N[I].symbol&&N[I].symbol.toLowerCase())||H;if(u.match("empty")){u=u.replace("empty","");A=true}else{A=false}if(u.match("star")){D=(u.replace("star","")-0)||5;
u="star"}s=N[I].textStyle?j.merge(N[I].textStyle||{},t):t;r=s.align||"center";if(J){r=J>0?"right":"left";G=[J*Math.PI/180,z,v-5]}else{G=false}L.push({x:z,n:D,isEmpty:A,symbol:u,symbolSize:N[I].symbolSize||M,color:N[I].color,borderColor:N[I].borderColor,borderWidth:N[I].borderWidth,name:this._getReformedLabel(I),textColor:s.color,textAlign:r,textBaseline:s.baseline||"middle",textX:z,textY:v-(J?5:0),textFont:N[I].textStyle?this.getFont(s):B,rotation:G,showLabel:false})
}return L},_buildBackground:function(){var s=this.timelineOption;var t=this.reformCssArray(this.timelineOption.padding);var r=this._location.width;var q=this._location.height;
if(s.borderWidth!==0||s.backgroundColor.replace(/\s/g,"")!="rgba(0,0,0,0)"){this.shapeList.push(new o({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:this._location.x-t[3],y:this._location.y-t[0],width:r+t[1]+t[3],height:q+t[0]+t[2],brushType:s.borderWidth===0?"fill":"both",color:s.backgroundColor,strokeColor:s.borderColor,lineWidth:s.borderWidth}}))
}},_buildControl:function(){var A=this;var u=this.timelineOption;var q=u.lineStyle;var w=u.controlStyle;if(u.controlPosition==="none"){return}var s=w.itemSize;
var v=w.itemGap;var z;if(u.controlPosition==="left"){z=this._location.x;this._location.x+=(s+v)*3}else{z=this._location.x2-((s+v)*3-v);this._location.x2-=(s+v)*3
}var t=this._location.y;var r={zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{iconType:"timelineControl",symbol:"last",x:z,y:t,width:s,height:s,brushType:"stroke",color:w.normal.color,strokeColor:w.normal.color,lineWidth:q.width},highlightStyle:{color:w.emphasis.color,strokeColor:w.emphasis.color,lineWidth:q.width+1},clickable:true};
this._ctrLastShape=new h(r);this._ctrLastShape.onclick=function(){A.last()};this.shapeList.push(this._ctrLastShape);z+=s+v;this._ctrPlayShape=new h(j.clone(r));
this._ctrPlayShape.style.brushType="fill";this._ctrPlayShape.style.symbol="play";this._ctrPlayShape.style.status=this.timelineOption.autoPlay?"playing":"stop";
this._ctrPlayShape.style.x=z;this._ctrPlayShape.onclick=function(){if(A._ctrPlayShape.style.status==="stop"){A.play()}else{A.stop()}};this.shapeList.push(this._ctrPlayShape);
z+=s+v;this._ctrNextShape=new h(j.clone(r));this._ctrNextShape.style.symbol="next";this._ctrNextShape.style.x=z;this._ctrNextShape.onclick=function(){A.next()
};this.shapeList.push(this._ctrNextShape)},_buildChain:function(){var r=this.timelineOption;var q=r.lineStyle;this._timelineShae={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:this._location.x,y:this.subPixelOptimize(this._location.y,q.width),width:this._location.x2-this._location.x,height:this._location.height,chainPoint:this._chainPoint,brushType:"both",strokeColor:q.color,lineWidth:q.width,lineType:q.type},hoverable:false,clickable:true,onclick:this._onclick};
this._timelineShae=new f(this._timelineShae);this.shapeList.push(this._timelineShae)},_buildHandle:function(){var q=this._chainPoint[this.currentIndex];
var r=q.symbolSize+1;r=r<5?5:r;this._handleShape={zlevel:this.getZlevelBase(),z:this.getZBase()+1,hoverable:false,draggable:true,style:{iconType:"diamond",n:q.n,x:q.x-r,y:this._location.y+this._location.height/4-r,width:r*2,height:r*2,brushType:"both",textPosition:"specific",textX:q.x,textY:this._location.y-this._location.height/4,textAlign:"center",textBaseline:"middle"},highlightStyle:{},ondrift:this._ondrift,ondragend:this._ondragend};
this._handleShape=new h(this._handleShape);this.shapeList.push(this._handleShape)},_syncHandleShape:function(){if(!this.timelineOption.show){return}var t=this.timelineOption;
var r=t.checkpointStyle;var q=this._chainPoint[this.currentIndex];this._handleShape.style.text=r.label.show?q.name:"";this._handleShape.style.textFont=q.textFont;
this._handleShape.style.n=q.n;if(r.symbol==="auto"){this._handleShape.style.iconType=q.symbol!="none"?q.symbol:"diamond"}else{this._handleShape.style.iconType=r.symbol;
if(r.symbol.match("star")){this._handleShape.style.n=(r.symbol.replace("star","")-0)||5;this._handleShape.style.iconType="star"}}var s;if(r.symbolSize==="auto"){s=q.symbolSize+2;
s=s<5?5:s}else{s=r.symbolSize-0}this._handleShape.style.color=r.color==="auto"?(q.color?q.color:t.controlStyle.emphasis.color):r.color;this._handleShape.style.textColor=r.label.textStyle.color==="auto"?this._handleShape.style.color:r.label.textStyle.color;
this._handleShape.highlightStyle.strokeColor=this._handleShape.style.strokeColor=r.borderColor==="auto"?(q.borderColor?q.borderColor:"#fff"):r.borderColor;
this._handleShape.style.lineWidth=r.borderWidth==="auto"?(q.borderWidth?q.borderWidth:0):(r.borderWidth-0);this._handleShape.highlightStyle.lineWidth=this._handleShape.style.lineWidth+1;
this.zr.animate(this._handleShape.id,"style").when(500,{x:q.x-s,textX:q.x,y:this._location.y+this._location.height/4-s,width:s*2,height:s*2}).start("ExponentialOut")
},_findChainIndex:function(r){var t=this._chainPoint;var q=t.length;if(r<=t[0].x){return 0}else{if(r>=t[q-1].x){return q-1}}for(var s=0;s<q-1;s++){if(r>=t[s].x&&r<=t[s+1].x){return(Math.abs(r-t[s].x)<Math.abs(r-t[s+1].x))?s:(s+1)
}}},__onclick:function(s){var q=n.getX(s.event);var r=this._findChainIndex(q);if(r===this.currentIndex){return true}this.currentIndex=r;this.timelineOption.autoPlay&&this.stop();
clearTimeout(this.playTicket);this._onFrame()},__ondrift:function(u,t){this.timelineOption.autoPlay&&this.stop();var w=this._chainPoint;var q=w.length;
var v;if(u.style.x+t<=w[0].x-w[0].symbolSize){u.style.x=w[0].x-w[0].symbolSize;v=0}else{if(u.style.x+t>=w[q-1].x-w[q-1].symbolSize){u.style.x=w[q-1].x-w[q-1].symbolSize;
v=q-1}else{u.style.x+=t;v=this._findChainIndex(u.style.x)}}var r=w[v];var x=r.symbolSize+2;u.style.iconType=r.symbol;u.style.n=r.n;u.style.textX=u.style.x+x/2;
u.style.y=this._location.y+this._location.height/4-x;u.style.width=x*2;u.style.height=x*2;u.style.text=r.name;if(v===this.currentIndex){return true}this.currentIndex=v;
if(this.timelineOption.realtime){clearTimeout(this.playTicket);var s=this;this.playTicket=setTimeout(function(){s._setCurrentOption()},200)}return true
},__ondragend:function(){this.isDragend=true},ondragend:function(r,q){if(!this.isDragend||!r.target){return}!this.timelineOption.realtime&&this._setCurrentOption();
q.dragOut=true;q.dragIn=true;q.needRefresh=false;this.isDragend=false;this._syncHandleShape();return},last:function(){this.timelineOption.autoPlay&&this.stop();
this.currentIndex-=1;if(this.currentIndex<0){this.currentIndex=this.timelineOption.data.length-1}this._onFrame();return this.currentIndex},next:function(){this.timelineOption.autoPlay&&this.stop();
this.currentIndex+=1;if(this.currentIndex>=this.timelineOption.data.length){this.currentIndex=0}this._onFrame();return this.currentIndex},play:function(q,r){if(this._ctrPlayShape&&this._ctrPlayShape.style.status!="playing"){this._ctrPlayShape.style.status="playing";
this.zr.modShape(this._ctrPlayShape.id);this.zr.refreshNextFrame()}this.timelineOption.autoPlay=r!=null?r:true;if(!this.timelineOption.autoPlay){clearTimeout(this.playTicket)
}this.currentIndex=q!=null?q:(this.currentIndex+1);if(this.currentIndex>=this.timelineOption.data.length){this.currentIndex=0}this._onFrame();return this.currentIndex
},stop:function(){if(this._ctrPlayShape&&this._ctrPlayShape.style.status!="stop"){this._ctrPlayShape.style.status="stop";this.zr.modShape(this._ctrPlayShape.id);
this.zr.refreshNextFrame()}this.timelineOption.autoPlay=false;clearTimeout(this.playTicket);return this.currentIndex},resize:function(){if(this.timelineOption.show){this.clear();
this._buildShape();this._syncHandleShape()}},setTheme:function(q){this.timelineOption=this.reformOption(j.clone(this.option.timeline));this.timelineOption.label.textStyle=this.getTextStyle(this.timelineOption.label.textStyle);
this.timelineOption.checkpointStyle.label.textStyle=this.getTextStyle(this.timelineOption.checkpointStyle.label.textStyle);if(!this.myChart.canvasSupported){this.timelineOption.realtime=false
}if(this.timelineOption.show&&q){this.clear();this._buildShape();this._syncHandleShape()}},onbeforDispose:function(){clearTimeout(this.playTicket)}};function g(B,q){var u=2;
var w=q.x+u;var v=q.y+u+2;var r=q.width-u;var A=q.height-u;var t=q.symbol;if(t==="last"){B.moveTo(w+r-2,v+A/3);B.lineTo(w+r-2,v);B.lineTo(w+2,v+A/2);B.lineTo(w+r-2,v+A);
B.lineTo(w+r-2,v+A/3*2);B.moveTo(w,v);B.lineTo(w,v)}else{if(t==="next"){B.moveTo(w+2,v+A/3);B.lineTo(w+2,v);B.lineTo(w+r-2,v+A/2);B.lineTo(w+2,v+A);B.lineTo(w+2,v+A/3*2);
B.moveTo(w,v);B.lineTo(w,v)}else{if(t==="play"){if(q.status==="stop"){B.moveTo(w+2,v);B.lineTo(w+r-2,v+A/2);B.lineTo(w+2,v+A);B.lineTo(w+2,v)}else{var z=q.brushType==="both"?2:3;
B.rect(w+2,v,z,A);B.rect(w+r-z-2,v,z,A)}}else{if(t.match("image")){var s="";s=t.replace(new RegExp("^image:\\/\\/"),"");t=h.prototype.iconLibrary.image;
t(B,{x:w,y:v,width:r,height:A,image:s})}}}}}h.prototype.iconLibrary.timelineControl=g;j.inherits(l,k);i("../component").define("timeline",l);return l});
d("echarts/component/legend",["require","./base","zrender/shape/Text","zrender/shape/Rectangle","zrender/shape/Sector","../util/shape/Icon","../util/shape/Candle","../config","zrender/tool/util","zrender/tool/area","../component"],function(h){var o=h("./base");
var j=h("zrender/shape/Text");var r=h("zrender/shape/Rectangle");var m=h("zrender/shape/Sector");var g=h("../util/shape/Icon");var q=h("../util/shape/Candle");
var p=h("../config");p.legend={zlevel:0,z:4,show:true,orient:"horizontal",x:"center",y:"top",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,itemWidth:20,itemHeight:14,textStyle:{color:"#333"},selectedMode:true};
var i=h("zrender/tool/util");var s=h("zrender/tool/area");function f(w,k,x,v,u){if(!this.query(v,"legend.data")){console.error("option.legend.data has not been defined.");
return}o.call(this,w,k,x,v,u);var t=this;t._legendSelected=function(y){t.__legendSelected(y)};t._dispatchHoverLink=function(y){return t.__dispatchHoverLink(y)
};this._colorIndex=0;this._colorMap={};this._selectedMap={};this._hasDataMap={};this.refresh(v)}f.prototype={type:p.COMPONENT_TYPE_LEGEND,_buildShape:function(){if(!this.legendOption.show){return
}this._itemGroupLocation=this._getItemGroupLocation();this._buildBackground();this._buildItem();for(var t=0,k=this.shapeList.length;t<k;t++){this.zr.addShape(this.shapeList[t])
}},_buildItem:function(){var K=this.legendOption.data;var A=K.length;var H;var J;var D;var C;var x=this.legendOption.textStyle;var w;var u;var I;var k=this.zr.getWidth();
var t=this.zr.getHeight();var z=this._itemGroupLocation.x;var y=this._itemGroupLocation.y;var v=this.legendOption.itemWidth;var E=this.legendOption.itemHeight;
var B=this.legendOption.itemGap;var F;if(this.legendOption.orient==="vertical"&&this.legendOption.x==="right"){z=this._itemGroupLocation.x+this._itemGroupLocation.width-v
}for(var G=0;G<A;G++){w=i.merge(K[G].textStyle||{},x);u=this.getFont(w);H=this._getName(K[G]);I=this._getFormatterName(H);if(H===""){if(this.legendOption.orient==="horizontal"){z=this._itemGroupLocation.x;
y+=E+B}else{this.legendOption.x==="right"?z-=this._itemGroupLocation.maxWidth+B:z+=this._itemGroupLocation.maxWidth+B;y=this._itemGroupLocation.y}continue
}J=K[G].icon||this._getSomethingByName(H).type;F=this.getColor(H);if(this.legendOption.orient==="horizontal"){if(k-z<200&&(v+5+s.getTextWidth(I,u)+(G===A-1||K[G+1]===""?0:B))>=k-z){z=this._itemGroupLocation.x;
y+=E+B}}else{if(t-y<200&&(E+(G===A-1||K[G+1]===""?0:B))>=t-y){this.legendOption.x==="right"?z-=this._itemGroupLocation.maxWidth+B:z+=this._itemGroupLocation.maxWidth+B;
y=this._itemGroupLocation.y}}D=this._getItemShapeByType(z,y,v,E,(this._selectedMap[H]&&this._hasDataMap[H]?F:"#ccc"),J,F);D._name=H;D=new g(D);C={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:z+v+5,y:y+E/2,color:this._selectedMap[H]?(w.color==="auto"?F:w.color):"#ccc",text:I,textFont:u,textBaseline:"middle"},highlightStyle:{color:F,brushType:"fill"},hoverable:!!this.legendOption.selectedMode,clickable:!!this.legendOption.selectedMode};
if(this.legendOption.orient==="vertical"&&this.legendOption.x==="right"){C.style.x-=(v+10);C.style.textAlign="right"}C._name=H;C=new j(C);if(this.legendOption.selectedMode){D.onclick=C.onclick=this._legendSelected;
D.onmouseover=C.onmouseover=this._dispatchHoverLink;D.hoverConnect=C.id;C.hoverConnect=D.id}this.shapeList.push(D);this.shapeList.push(C);if(this.legendOption.orient==="horizontal"){z+=v+5+s.getTextWidth(I,u)+B
}else{y+=E+B}}if(this.legendOption.orient==="horizontal"&&this.legendOption.x==="center"&&y!=this._itemGroupLocation.y){this._mLineOptimize()}},_getName:function(k){return typeof k.name!="undefined"?k.name:k
},_getFormatterName:function(t){var k=this.legendOption.formatter;var u;if(typeof k==="function"){u=k.call(this.myChart,t)}else{if(typeof k==="string"){u=k.replace("{name}",t)
}else{u=t}}return u},_getFormatterNameFromData:function(t){var k=this._getName(t);return this._getFormatterName(k)},_mLineOptimize:function(){var u=[];
var w=this._itemGroupLocation.x;for(var t=2,k=this.shapeList.length;t<k;t++){if(this.shapeList[t].style.x===w){u.push((this._itemGroupLocation.width-(this.shapeList[t-1].style.x+s.getTextWidth(this.shapeList[t-1].style.text,this.shapeList[t-1].style.textFont)-w))/2)
}else{if(t===k-1){u.push((this._itemGroupLocation.width-(this.shapeList[t].style.x+s.getTextWidth(this.shapeList[t].style.text,this.shapeList[t].style.textFont)-w))/2)
}}}var v=-1;for(var t=1,k=this.shapeList.length;t<k;t++){if(this.shapeList[t].style.x===w){v++}if(u[v]===0){continue}else{this.shapeList[t].style.x+=u[v]
}}},_buildBackground:function(){var k=this.reformCssArray(this.legendOption.padding);this.shapeList.push(new r({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:this._itemGroupLocation.x-k[3],y:this._itemGroupLocation.y-k[0],width:this._itemGroupLocation.width+k[3]+k[1],height:this._itemGroupLocation.height+k[0]+k[2],brushType:this.legendOption.borderWidth===0?"fill":"both",color:this.legendOption.backgroundColor,strokeColor:this.legendOption.borderColor,lineWidth:this.legendOption.borderWidth}}))
},_getItemGroupLocation:function(){var L=this.legendOption.data;var z=L.length;var D=this.legendOption.itemGap;var v=this.legendOption.itemWidth+5;var G=this.legendOption.itemHeight;
var w=this.legendOption.textStyle;var F=this.getFont(w);var u=0;var K=0;var E=this.reformCssArray(this.legendOption.padding);var k=this.zr.getWidth()-E[1]-E[3];
var t=this.zr.getHeight()-E[0]-E[2];var J=0;var I=0;if(this.legendOption.orient==="horizontal"){K=G;for(var H=0;H<z;H++){if(this._getName(L[H])===""){J-=D;
u=Math.max(u,J);K+=G+D;J=0;continue}var C=s.getTextWidth(this._getFormatterNameFromData(L[H]),L[H].textStyle?this.getFont(i.merge(L[H].textStyle||{},w)):F);
if(J+v+C+D>k){J-=D;u=Math.max(u,J);K+=G+D;J=0}else{J+=v+C+D;u=Math.max(u,J-D)}}}else{for(var H=0;H<z;H++){I=Math.max(I,s.getTextWidth(this._getFormatterNameFromData(L[H]),L[H].textStyle?this.getFont(i.merge(L[H].textStyle||{},w)):F))
}I+=v;u=I;for(var H=0;H<z;H++){if(this._getName(L[H])===""){u+=I+D;J-=D;K=Math.max(K,J);J=0;continue}if(J+G+D>t){u+=I+D;J-=D;K=Math.max(K,J);J=0}else{J+=G+D;
K=Math.max(K,J-D)}}}k=this.zr.getWidth();t=this.zr.getHeight();var B;switch(this.legendOption.x){case"center":B=Math.floor((k-u)/2);break;case"left":B=E[3]+this.legendOption.borderWidth;
break;case"right":B=k-u-E[1]-E[3]-this.legendOption.borderWidth*2;break;default:B=this.parsePercent(this.legendOption.x,k);break}var A;switch(this.legendOption.y){case"top":A=E[0]+this.legendOption.borderWidth;
break;case"bottom":A=t-K-E[0]-E[2]-this.legendOption.borderWidth*2;break;case"center":A=Math.floor((t-K)/2);break;default:A=this.parsePercent(this.legendOption.y,t);
break}return{x:B,y:A,width:u,height:K,maxWidth:I}},_getSomethingByName:function(w){var y=this.option.series;var z;for(var x=0,t=y.length;x<t;x++){if(y[x].name===w){return{type:y[x].type,series:y[x],seriesIndex:x,data:null,dataIndex:-1}
}if(y[x].type===p.CHART_TYPE_PIE||y[x].type===p.CHART_TYPE_RADAR||y[x].type===p.CHART_TYPE_CHORD||y[x].type===p.CHART_TYPE_FORCE||y[x].type===p.CHART_TYPE_FUNNEL||y[x].type===p.CHART_TYPE_TREEMAP){z=y[x].categories||y[x].data||y[x].nodes;
for(var v=0,u=z.length;v<u;v++){if(z[v].name===w){return{type:y[x].type,series:y[x],seriesIndex:x,data:z[v],dataIndex:v}}}}}return{type:"bar",series:null,seriesIndex:-1,data:null,dataIndex:-1}
},_getItemShapeByType:function(B,A,t,C,w,z,u){var D=w==="#ccc"?u:w;var k={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{iconType:"legendicon"+z,x:B,y:A,width:t,height:C,color:w,strokeColor:w,lineWidth:2},highlightStyle:{color:D,strokeColor:D,lineWidth:1},hoverable:this.legendOption.selectedMode,clickable:this.legendOption.selectedMode};
var v;if(z.match("image")){var v=z.replace(new RegExp("^image:\\/\\/"),"");z="image"}switch(z){case"line":k.style.brushType="stroke";k.highlightStyle.lineWidth=3;
break;case"radar":case"venn":case"treemap":case"scatter":k.highlightStyle.lineWidth=3;break;case"k":k.style.brushType="both";k.highlightStyle.lineWidth=3;
k.highlightStyle.color=k.style.color=this.deepQuery([this.ecTheme,p],"k.itemStyle.normal.color")||"#fff";k.style.strokeColor=w!="#ccc"?(this.deepQuery([this.ecTheme,p],"k.itemStyle.normal.lineStyle.color")||"#ff3200"):w;
break;case"image":k.style.iconType="image";k.style.image=v;if(w==="#ccc"){k.style.opacity=0.5}break}return k},__legendSelected:function(v){var u=v.target._name;
if(this.legendOption.selectedMode==="single"){for(var t in this._selectedMap){this._selectedMap[t]=false}}this._selectedMap[u]=!this._selectedMap[u];this.messageCenter.dispatch(p.EVENT.LEGEND_SELECTED,v.event,{selected:this._selectedMap,target:u},this.myChart)
},__dispatchHoverLink:function(k){this.messageCenter.dispatch(p.EVENT.LEGEND_HOVERLINK,k.event,{target:k.target._name},this.myChart);return},refresh:function(z){if(z){this.option=z||this.option;
this.option.legend=this.reformOption(this.option.legend);this.legendOption=this.option.legend;var x=this.legendOption.data||[];var B;var A;var v;var u;
if(this.legendOption.selected){for(var w in this.legendOption.selected){this._selectedMap[w]=typeof this._selectedMap[w]!="undefined"?this._selectedMap[w]:this.legendOption.selected[w]
}}for(var y=0,t=x.length;y<t;y++){B=this._getName(x[y]);if(B===""){continue}A=this._getSomethingByName(B);if(!A.series){this._hasDataMap[B]=false}else{this._hasDataMap[B]=true;
if(A.data&&(A.type===p.CHART_TYPE_PIE||A.type===p.CHART_TYPE_FORCE||A.type===p.CHART_TYPE_FUNNEL)){u=[A.data,A.series]}else{u=[A.series]}v=this.getItemStyleColor(this.deepQuery(u,"itemStyle.normal.color"),A.seriesIndex,A.dataIndex,A.data);
if(v&&A.type!=p.CHART_TYPE_K){this.setColor(B,v)}this._selectedMap[B]=this._selectedMap[B]!=null?this._selectedMap[B]:true}}}this.clear();this._buildShape()
},getRelatedAmount:function(w){var z=0;var y=this.option.series;var A;for(var x=0,t=y.length;x<t;x++){if(y[x].name===w){z++}if(y[x].type===p.CHART_TYPE_PIE||y[x].type===p.CHART_TYPE_RADAR||y[x].type===p.CHART_TYPE_CHORD||y[x].type===p.CHART_TYPE_FORCE||y[x].type===p.CHART_TYPE_FUNNEL){A=y[x].type!=p.CHART_TYPE_FORCE?y[x].data:y[x].categories;
for(var v=0,u=A.length;v<u;v++){if(A[v].name===w&&A[v].value!="-"){z++}}}}return z},setColor:function(t,k){this._colorMap[t]=k},getColor:function(k){if(!this._colorMap[k]){this._colorMap[k]=this.zr.getColor(this._colorIndex++)
}return this._colorMap[k]},hasColor:function(k){return this._colorMap[k]?this._colorMap[k]:false},add:function(t,k){var v=this.legendOption.data;for(var u=0,w=v.length;
u<w;u++){if(this._getName(v[u])===t){return}}this.legendOption.data.push(t);this.setColor(t,k);this._selectedMap[t]=true;this._hasDataMap[t]=true},del:function(k){var u=this.legendOption.data;
for(var t=0,v=u.length;t<v;t++){if(this._getName(u[t])===k){return this.legendOption.data.splice(t,1)}}},getItemShape:function(u){if(u==null){return}var t;
for(var v=0,k=this.shapeList.length;v<k;v++){t=this.shapeList[v];if(t._name===u&&t.type!="text"){return t}}},setItemShape:function(u,w){var t;for(var v=0,k=this.shapeList.length;
v<k;v++){t=this.shapeList[v];if(t._name===u&&t.type!="text"){if(!this._selectedMap[u]){w.style.color="#ccc";w.style.strokeColor="#ccc"}this.zr.modShape(t.id,w)
}}},isSelected:function(k){if(typeof this._selectedMap[k]!="undefined"){return this._selectedMap[k]}else{return true}},getSelectedMap:function(){return this._selectedMap
},setSelected:function(v,u){if(this.legendOption.selectedMode==="single"){for(var t in this._selectedMap){this._selectedMap[t]=false}}this._selectedMap[v]=u;
this.messageCenter.dispatch(p.EVENT.LEGEND_SELECTED,null,{selected:this._selectedMap,target:v},this.myChart)},onlegendSelected:function(v,k){var u=v.selected;
for(var t in u){if(this._selectedMap[t]!=u[t]){k.needRefresh=true}this._selectedMap[t]=u[t]}return}};var n={line:function(t,u){var k=u.height/2;t.moveTo(u.x,u.y+k);
t.lineTo(u.x+u.width,u.y+k)},pie:function(u,w){var t=w.x;var z=w.y;var v=w.width;var k=w.height;m.prototype.buildPath(u,{x:t+v/2,y:z+k+2,r:k,r0:6,startAngle:45,endAngle:135})
},eventRiver:function(u,w){var t=w.x;var z=w.y;var v=w.width;var k=w.height;u.moveTo(t,z+k);u.bezierCurveTo(t+v,z+k,t,z+4,t+v,z+4);u.lineTo(t+v,z);u.bezierCurveTo(t,z,t+v,z+k-4,t,z+k-4);
u.lineTo(t,z+k)},k:function(u,w){var t=w.x;var z=w.y;var v=w.width;var k=w.height;q.prototype.buildPath(u,{x:t+v/2,y:[z+1,z+1,z+k-6,z+k],width:v-6})},bar:function(u,w){var t=w.x;
var A=w.y+1;var v=w.width;var k=w.height-2;var z=3;u.moveTo(t+z,A);u.lineTo(t+v-z,A);u.quadraticCurveTo(t+v,A,t+v,A+z);u.lineTo(t+v,A+k-z);u.quadraticCurveTo(t+v,A+k,t+v-z,A+k);
u.lineTo(t+z,A+k);u.quadraticCurveTo(t,A+k,t,A+k-z);u.lineTo(t,A+z);u.quadraticCurveTo(t,A,t+z,A)},force:function(k,t){g.prototype.iconLibrary.circle(k,t)
},radar:function(E,t){var v=6;var C=t.x+t.width/2;var B=t.y+t.height/2;var k=t.height/2;var D=2*Math.PI/v;var u=-Math.PI/2;var A=C+k*Math.cos(u);var F=B+k*Math.sin(u);
E.moveTo(A,F);u+=D;for(var z=0,w=v-1;z<w;z++){E.lineTo(C+k*Math.cos(u),B+k*Math.sin(u));u+=D}E.lineTo(A,F)}};n.chord=n.pie;n.map=n.bar;for(var l in n){g.prototype.iconLibrary["legendicon"+l]=n[l]
}i.inherits(f,o);h("../component").define("legend",f);return f});d("echarts/component/tooltip",["require","./base","../util/shape/Cross","zrender/shape/Line","zrender/shape/Rectangle","../config","../util/ecData","zrender/config","zrender/tool/event","zrender/tool/area","zrender/tool/color","zrender/tool/util","zrender/shape/Base","../component"],function(j){var m=j("./base");
var f=j("../util/shape/Cross");var h=j("zrender/shape/Line");var s=j("zrender/shape/Rectangle");var n=new s({});var q=j("../config");q.tooltip={zlevel:1,z:8,show:true,showContent:true,trigger:"item",islandFormatter:"{a} <br/>{b} : {c}",showDelay:20,hideDelay:100,transitionDuration:0.4,enterable:false,backgroundColor:"rgba(0,0,0,0.7)",borderColor:"#333",borderRadius:4,borderWidth:0,padding:5,axisPointer:{type:"line",lineStyle:{color:"#48b",width:2,type:"solid"},crossStyle:{color:"#1e90ff",width:1,type:"dashed"},shadowStyle:{color:"rgba(150,150,150,0.3)",width:"auto",type:"default"}},textStyle:{color:"#fff"}};
var i=j("../util/ecData");var l=j("zrender/config");var r=j("zrender/tool/event");var t=j("zrender/tool/area");var g=j("zrender/tool/color");var k=j("zrender/tool/util");
var p=j("zrender/shape/Base");function o(y,u,z,x,w){m.call(this,y,u,z,x,w);this.dom=w.dom;var v=this;v._onmousemove=function(A){return v.__onmousemove(A)
};v._onglobalout=function(A){return v.__onglobalout(A)};this.zr.on(l.EVENT.MOUSEMOVE,v._onmousemove);this.zr.on(l.EVENT.GLOBALOUT,v._onglobalout);v._hide=function(A){return v.__hide(A)
};v._tryShow=function(A){return v.__tryShow(A)};v._refixed=function(A){return v.__refixed(A)};v._setContent=function(B,A){return v.__setContent(B,A)};this._tDom=this._tDom||document.createElement("div");
this._tDom.onselectstart=function(){return false};this._tDom.onmouseover=function(){v._mousein=true};this._tDom.onmouseout=function(){v._mousein=false};
this._tDom.className="echarts-tooltip";this._tDom.style.position="absolute";this.hasAppend=false;this._axisLineShape&&this.zr.delShape(this._axisLineShape.id);
this._axisLineShape=new h({zlevel:this.getZlevelBase(),z:this.getZBase(),invisible:true,hoverable:false});this.shapeList.push(this._axisLineShape);this.zr.addShape(this._axisLineShape);
this._axisShadowShape&&this.zr.delShape(this._axisShadowShape.id);this._axisShadowShape=new h({zlevel:this.getZlevelBase(),z:1,invisible:true,hoverable:false});
this.shapeList.push(this._axisShadowShape);this.zr.addShape(this._axisShadowShape);this._axisCrossShape&&this.zr.delShape(this._axisCrossShape.id);this._axisCrossShape=new f({zlevel:this.getZlevelBase(),z:this.getZBase(),invisible:true,hoverable:false});
this.shapeList.push(this._axisCrossShape);this.zr.addShape(this._axisCrossShape);this.showing=false;this.refresh(x)}o.prototype={type:q.COMPONENT_TYPE_TOOLTIP,_gCssText:"position:absolute;display:block;border-style:solid;white-space:nowrap;",_style:function(v){if(!v){return""
}var w=[];if(v.transitionDuration){var u="left "+v.transitionDuration+"s,top "+v.transitionDuration+"s";w.push("transition:"+u);w.push("-moz-transition:"+u);
w.push("-webkit-transition:"+u);w.push("-o-transition:"+u)}if(v.backgroundColor){w.push("background-Color:"+g.toHex(v.backgroundColor));w.push("filter:alpha(opacity=70)");
w.push("background-Color:"+v.backgroundColor)}if(v.borderWidth!=null){w.push("border-width:"+v.borderWidth+"px")}if(v.borderColor!=null){w.push("border-color:"+v.borderColor)
}if(v.borderRadius!=null){w.push("border-radius:"+v.borderRadius+"px");w.push("-moz-border-radius:"+v.borderRadius+"px");w.push("-webkit-border-radius:"+v.borderRadius+"px");
w.push("-o-border-radius:"+v.borderRadius+"px")}var y=v.textStyle;if(y){y.color&&w.push("color:"+y.color);y.decoration&&w.push("text-decoration:"+y.decoration);
y.align&&w.push("text-align:"+y.align);y.fontFamily&&w.push("font-family:"+y.fontFamily);y.fontSize&&w.push("font-size:"+y.fontSize+"px");y.fontSize&&w.push("line-height:"+Math.round(y.fontSize*3/2)+"px");
y.fontStyle&&w.push("font-style:"+y.fontStyle);y.fontWeight&&w.push("font-weight:"+y.fontWeight)}var x=v.padding;if(x!=null){x=this.reformCssArray(x);w.push("padding:"+x[0]+"px "+x[1]+"px "+x[2]+"px "+x[3]+"px")
}w=w.join(";")+";";return w},__hide:function(){this._lastDataIndex=-1;this._lastSeriesIndex=-1;this._lastItemTriggerId=-1;if(this._tDom){this._tDom.style.display="none"
}var u=false;if(!this._axisLineShape.invisible){this._axisLineShape.invisible=true;this.zr.modShape(this._axisLineShape.id);u=true}if(!this._axisShadowShape.invisible){this._axisShadowShape.invisible=true;
this.zr.modShape(this._axisShadowShape.id);u=true}if(!this._axisCrossShape.invisible){this._axisCrossShape.invisible=true;this.zr.modShape(this._axisCrossShape.id);
u=true}if(this._lastTipShape&&this._lastTipShape.tipShape.length>0){this.zr.delShape(this._lastTipShape.tipShape);this._lastTipShape=false;this.shapeList.length=2
}u&&this.zr.refreshNextFrame();this.showing=false},_show:function(v,u,B,z){var A=this._tDom.offsetHeight;var w=this._tDom.offsetWidth;if(v){if(typeof v==="function"){v=v([u,B])
}if(v instanceof Array){u=v[0];B=v[1]}}if(u+w>this._zrWidth){u-=(w+40)}if(B+A>this._zrHeight){B-=(A-20)}if(B<20){B=0}this._tDom.style.cssText=this._gCssText+this._defaultCssText+(z?z:"")+"left:"+u+"px;top:"+B+"px;";
if(A<10||w<10){setTimeout(this._refixed,20)}this.showing=true},__refixed:function(){if(this._tDom){var v="";var w=this._tDom.offsetHeight;var u=this._tDom.offsetWidth;
if(this._tDom.offsetLeft+u>this._zrWidth){v+="left:"+(this._zrWidth-u-20)+"px;"}if(this._tDom.offsetTop+w>this._zrHeight){v+="top:"+(this._zrHeight-w-10)+"px;"
}if(v!==""){this._tDom.style.cssText+=v}}},__tryShow:function(){var w;var u;if(!this._curTarget){this._findPolarTrigger()||this._findAxisTrigger()}else{if(this._curTarget._type==="island"&&this.option.tooltip.show){this._showItemTrigger();
return}var v=i.get(this._curTarget,"series");var x=i.get(this._curTarget,"data");w=this.deepQuery([x,v,this.option],"tooltip.show");if(v==null||x==null||!w){clearTimeout(this._hidingTicket);
clearTimeout(this._showingTicket);this._hidingTicket=setTimeout(this._hide,this._hideDelay)}else{u=this.deepQuery([x,v,this.option],"tooltip.trigger");
u==="axis"?this._showAxisTrigger(v.xAxisIndex,v.yAxisIndex,i.get(this._curTarget,"dataIndex")):this._showItemTrigger()}}},_findAxisTrigger:function(){if(!this.component.xAxis||!this.component.yAxis){this._hidingTicket=setTimeout(this._hide,this._hideDelay);
return}var y=this.option.series;var v;var x;for(var w=0,u=y.length;w<u;w++){if(this.deepQuery([y[w],this.option],"tooltip.trigger")==="axis"){v=y[w].xAxisIndex||0;
x=y[w].yAxisIndex||0;if(this.component.xAxis.getAxis(v)&&this.component.xAxis.getAxis(v).type===q.COMPONENT_TYPE_AXIS_CATEGORY){this._showAxisTrigger(v,x,this._getNearestDataIndex("x",this.component.xAxis.getAxis(v)));
return}else{if(this.component.yAxis.getAxis(x)&&this.component.yAxis.getAxis(x).type===q.COMPONENT_TYPE_AXIS_CATEGORY){this._showAxisTrigger(v,x,this._getNearestDataIndex("y",this.component.yAxis.getAxis(x)));
return}else{this._showAxisTrigger(v,x,-1);return}}}}if(this.option.tooltip.axisPointer.type==="cross"){this._showAxisTrigger(-1,-1,-1)}},_findPolarTrigger:function(){if(!this.component.polar){return false
}var u=r.getX(this._event);var z=r.getY(this._event);var v=this.component.polar.getNearestIndex([u,z]);var w;if(v){w=v.valueIndex;v=v.polarIndex}else{v=-1
}if(v!=-1){return this._showPolarTrigger(v,w)}return false},_getNearestDataIndex:function(D,A){var E=-1;var F=r.getX(this._event);var C=r.getY(this._event);
if(D==="x"){var z;var G;var w=this.component.grid.getXend();var v=A.getCoordByIndex(E);while(v<w){G=v;if(v<=F){z=v}else{break}v=A.getCoordByIndex(++E)}if(E<=0){E=0
}else{if(F-z<=G-F){E-=1}else{if(A.getNameByIndex(E)==null){E-=1}}}return E}else{var B;var u;var H=this.component.grid.getY();var v=A.getCoordByIndex(E);
while(v>H){B=v;if(v>=C){u=v}else{break}v=A.getCoordByIndex(++E)}if(E<=0){E=0}else{if(C-B>=u-C){E-=1}else{if(A.getNameByIndex(E)==null){E-=1}}}return E}return -1
},_showAxisTrigger:function(w,E,P){!this._event.connectTrigger&&this.messageCenter.dispatch(q.EVENT.TOOLTIP_IN_GRID,this._event,null,this.myChart);if(this.component.xAxis==null||this.component.yAxis==null||w==null||E==null){clearTimeout(this._hidingTicket);
clearTimeout(this._showingTicket);this._hidingTicket=setTimeout(this._hide,this._hideDelay);return}var B=this.option.series;var M=[];var L=[];var D;var J;
var Q;var G;var v="";if(this.option.tooltip.trigger==="axis"){if(!this.option.tooltip.show){return}J=this.option.tooltip.formatter;Q=this.option.tooltip.position
}var I=w!=-1&&this.component.xAxis.getAxis(w).type===q.COMPONENT_TYPE_AXIS_CATEGORY?"xAxis":E!=-1&&this.component.yAxis.getAxis(E).type===q.COMPONENT_TYPE_AXIS_CATEGORY?"yAxis":false;
var A;var z;if(I){var C=I=="xAxis"?w:E;D=this.component[I].getAxis(C);for(var K=0,H=B.length;K<H;K++){if(!this._isSelected(B[K].name)){continue}if(B[K][I+"Index"]===C&&this.deepQuery([B[K],this.option],"tooltip.trigger")==="axis"){G=this.query(B[K],"tooltip.showContent")||G;
J=this.query(B[K],"tooltip.formatter")||J;Q=this.query(B[K],"tooltip.position")||Q;v+=this._style(this.query(B[K],"tooltip"));if(B[K].stack!=null&&I=="xAxis"){M.unshift(B[K]);
L.unshift(K)}else{M.push(B[K]);L.push(K)}}}this.messageCenter.dispatch(q.EVENT.TOOLTIP_HOVER,this._event,{seriesIndex:L,dataIndex:P},this.myChart);var u;
if(I=="xAxis"){A=this.subPixelOptimize(D.getCoordByIndex(P),this._axisLineWidth);z=r.getY(this._event);u=[A,this.component.grid.getY(),A,this.component.grid.getYend()]
}else{A=r.getX(this._event);z=this.subPixelOptimize(D.getCoordByIndex(P),this._axisLineWidth);u=[this.component.grid.getX(),z,this.component.grid.getXend(),z]
}this._styleAxisPointer(M,u[0],u[1],u[2],u[3],D.getGap(),A,z)}else{A=r.getX(this._event);z=r.getY(this._event);this._styleAxisPointer(B,this.component.grid.getX(),z,this.component.grid.getXend(),z,0,A,z);
if(P>=0){this._showItemTrigger(true)}else{clearTimeout(this._hidingTicket);clearTimeout(this._showingTicket);this._tDom.style.display="none"}}if(M.length>0){this._lastItemTriggerId=-1;
if(this._lastDataIndex!=P||this._lastSeriesIndex!=L[0]){this._lastDataIndex=P;this._lastSeriesIndex=L[0];var O;var F;if(typeof J==="function"){var N=[];
for(var K=0,H=M.length;K<H;K++){O=M[K].data[P];F=this.getDataFromOption(O,"-");N.push({seriesIndex:L[K],seriesName:M[K].name||"",series:M[K],dataIndex:P,data:O,name:D.getNameByIndex(P),value:F,0:M[K].name||"",1:D.getNameByIndex(P),2:F,3:O})
}this._curTicket="axis:"+P;this._tDom.innerHTML=J.call(this.myChart,N,this._curTicket,this._setContent)}else{if(typeof J==="string"){this._curTicket=NaN;
J=J.replace("{a}","{a0}").replace("{b}","{b0}").replace("{c}","{c0}");for(var K=0,H=M.length;K<H;K++){J=J.replace("{a"+K+"}",this._encodeHTML(M[K].name||""));
J=J.replace("{b"+K+"}",this._encodeHTML(D.getNameByIndex(P)));O=M[K].data[P];O=this.getDataFromOption(O,"-");J=J.replace("{c"+K+"}",O instanceof Array?O:this.numAddCommas(O))
}this._tDom.innerHTML=J}else{this._curTicket=NaN;J=this._encodeHTML(D.getNameByIndex(P));for(var K=0,H=M.length;K<H;K++){J+="<br/>"+this._encodeHTML(M[K].name||"")+" : ";
O=M[K].data[P];O=this.getDataFromOption(O,"-");J+=O instanceof Array?O:this.numAddCommas(O)}this._tDom.innerHTML=J}}}if(G===false||!this.option.tooltip.showContent){return
}if(!this.hasAppend){this._tDom.style.left=this._zrWidth/2+"px";this._tDom.style.top=this._zrHeight/2+"px";this.dom.firstChild.appendChild(this._tDom);
this.hasAppend=true}this._show(Q,A+10,z+10,v)}},_showPolarTrigger:function(I,J){if(this.component.polar==null||I==null||J==null||J<0){return false}var x=this.option.series;
var G=[];var F=[];var D;var K;var z;var v="";if(this.option.tooltip.trigger==="axis"){if(!this.option.tooltip.show){return false}D=this.option.tooltip.formatter;
K=this.option.tooltip.position}var u=this.option.polar[I].indicator[J].text;for(var E=0,A=x.length;E<A;E++){if(!this._isSelected(x[E].name)){continue}if(x[E].polarIndex===I&&this.deepQuery([x[E],this.option],"tooltip.trigger")==="axis"){z=this.query(x[E],"tooltip.showContent")||z;
D=this.query(x[E],"tooltip.formatter")||D;K=this.query(x[E],"tooltip.position")||K;v+=this._style(this.query(x[E],"tooltip"));G.push(x[E]);F.push(E)}}if(G.length>0){var w;
var L;var y;var H=[];for(var E=0,A=G.length;E<A;E++){w=G[E].data;for(var C=0,B=w.length;C<B;C++){L=w[C];if(!this._isSelected(L.name)){continue}L=L!=null?L:{name:"",value:{dataIndex:"-"}};
y=this.getDataFromOption(L.value[J]);H.push({seriesIndex:F[E],seriesName:G[E].name||"",series:G[E],dataIndex:J,data:L,name:L.name,indicator:u,value:y,0:G[E].name||"",1:L.name,2:y,3:u})
}}if(H.length<=0){return}this._lastItemTriggerId=-1;if(this._lastDataIndex!=J||this._lastSeriesIndex!=F[0]){this._lastDataIndex=J;this._lastSeriesIndex=F[0];
if(typeof D==="function"){this._curTicket="axis:"+J;this._tDom.innerHTML=D.call(this.myChart,H,this._curTicket,this._setContent)}else{if(typeof D==="string"){D=D.replace("{a}","{a0}").replace("{b}","{b0}").replace("{c}","{c0}").replace("{d}","{d0}");
for(var E=0,A=H.length;E<A;E++){D=D.replace("{a"+E+"}",this._encodeHTML(H[E].seriesName));D=D.replace("{b"+E+"}",this._encodeHTML(H[E].name));D=D.replace("{c"+E+"}",this.numAddCommas(H[E].value));
D=D.replace("{d"+E+"}",this._encodeHTML(H[E].indicator))}this._tDom.innerHTML=D}else{D=this._encodeHTML(H[0].name)+"<br/>"+this._encodeHTML(H[0].indicator)+" : "+this.numAddCommas(H[0].value);
for(var E=1,A=H.length;E<A;E++){D+="<br/>"+this._encodeHTML(H[E].name)+"<br/>";D+=this._encodeHTML(H[E].indicator)+" : "+this.numAddCommas(H[E].value)}this._tDom.innerHTML=D
}}}if(z===false||!this.option.tooltip.showContent){return}if(!this.hasAppend){this._tDom.style.left=this._zrWidth/2+"px";this._tDom.style.top=this._zrHeight/2+"px";
this.dom.firstChild.appendChild(this._tDom);this.hasAppend=true}this._show(K,r.getX(this._event),r.getY(this._event),v);return true}},_showItemTrigger:function(G){if(!this._curTarget){return
}var D=i.get(this._curTarget,"series");var z=i.get(this._curTarget,"seriesIndex");var A=i.get(this._curTarget,"data");var K=i.get(this._curTarget,"dataIndex");
var u=i.get(this._curTarget,"name");var M=i.get(this._curTarget,"value");var H=i.get(this._curTarget,"special");var E=i.get(this._curTarget,"special2");
var v=[A,D,this.option];var L;var C;var B;var F="";if(this._curTarget._type!="island"){var w=G?"axis":"item";if(this.option.tooltip.trigger===w){L=this.option.tooltip.formatter;
C=this.option.tooltip.position}if(this.query(D,"tooltip.trigger")===w){B=this.query(D,"tooltip.showContent")||B;L=this.query(D,"tooltip.formatter")||L;
C=this.query(D,"tooltip.position")||C;F+=this._style(this.query(D,"tooltip"))}B=this.query(A,"tooltip.showContent")||B;L=this.query(A,"tooltip.formatter")||L;
C=this.query(A,"tooltip.position")||C;F+=this._style(this.query(A,"tooltip"))}else{this._lastItemTriggerId=NaN;B=this.deepQuery(v,"tooltip.showContent");
L=this.deepQuery(v,"tooltip.islandFormatter");C=this.deepQuery(v,"tooltip.islandPosition")}this._lastDataIndex=-1;this._lastSeriesIndex=-1;if(this._lastItemTriggerId!==this._curTarget.id){this._lastItemTriggerId=this._curTarget.id;
if(typeof L==="function"){this._curTicket=(D.name||"")+":"+K;this._tDom.innerHTML=L.call(this.myChart,{seriesIndex:z,seriesName:D.name||"",series:D,dataIndex:K,data:A,name:u,value:M,percent:H,indicator:H,value2:E,indicator2:E,0:D.name||"",1:u,2:M,3:H,4:E,5:A,6:z,7:K},this._curTicket,this._setContent)
}else{if(typeof L==="string"){this._curTicket=NaN;L=L.replace("{a}","{a0}").replace("{b}","{b0}").replace("{c}","{c0}");L=L.replace("{a0}",this._encodeHTML(D.name||"")).replace("{b0}",this._encodeHTML(u)).replace("{c0}",M instanceof Array?M:this.numAddCommas(M));
L=L.replace("{d}","{d0}").replace("{d0}",H||"");L=L.replace("{e}","{e0}").replace("{e0}",i.get(this._curTarget,"special2")||"");this._tDom.innerHTML=L}else{this._curTicket=NaN;
if(D.type===q.CHART_TYPE_RADAR&&H){this._tDom.innerHTML=this._itemFormatter.radar.call(this,D,u,M,H)}else{if(D.type===q.CHART_TYPE_EVENTRIVER){this._tDom.innerHTML=this._itemFormatter.eventRiver.call(this,D,u,M,A)
}else{this._tDom.innerHTML=""+(D.name!=null?(this._encodeHTML(D.name)+"<br/>"):"")+(u===""?"":(this._encodeHTML(u)+" : "))+(M instanceof Array?M:this.numAddCommas(M))
}}}}}var J=r.getX(this._event);var I=r.getY(this._event);if(this.deepQuery(v,"tooltip.axisPointer.show")&&this.component.grid){this._styleAxisPointer([D],this.component.grid.getX(),I,this.component.grid.getXend(),I,0,J,I)
}else{this._hide()}if(B===false||!this.option.tooltip.showContent){return}if(!this.hasAppend){this._tDom.style.left=this._zrWidth/2+"px";this._tDom.style.top=this._zrHeight/2+"px";
this.dom.firstChild.appendChild(this._tDom);this.hasAppend=true}this._show(C,J+20,I-20,F)},_itemFormatter:{radar:function(y,v,z,u){var x="";x+=this._encodeHTML(v===""?(y.name||""):v);
x+=x===""?"":"<br />";for(var w=0;w<u.length;w++){x+=this._encodeHTML(u[w].text)+" : "+this.numAddCommas(z[w])+"<br />"}return x},chord:function(x,w,z,v,u){if(u==null){return this._encodeHTML(w)+" ("+this.numAddCommas(z)+")"
}else{var A=this._encodeHTML(w);var y=this._encodeHTML(v);return""+(x.name!=null?(this._encodeHTML(x.name)+"<br/>"):"")+A+" -> "+y+" ("+this.numAddCommas(z)+")<br />"+y+" -> "+A+" ("+this.numAddCommas(u)+")"
}},eventRiver:function(y,v,A,z){var x="";x+=this._encodeHTML(y.name===""?"":(y.name+" : "));x+=this._encodeHTML(v);x+=x===""?"":"<br />";z=z.evolution;
for(var w=0,u=z.length;w<u;w++){x+='<div style="padding-top:5px;">';if(!z[w].detail){continue}if(z[w].detail.img){x+='<img src="'+z[w].detail.img+'" style="float:left;width:40px;height:40px;">'
}x+='<div style="margin-left:45px;">'+z[w].time+"<br/>";x+='<a href="'+z[w].detail.link+'" target="_blank">';x+=z[w].detail.text+"</a></div>";x+="</div>"
}return x}},_styleAxisPointer:function(M,A,D,C,H,J,G,F){if(M.length>0){var w;var z;var O=this.option.tooltip.axisPointer;var v=O.type;var N={line:{},cross:{},shadow:{}};
for(var I in N){N[I].color=O[I+"Style"].color;N[I].width=O[I+"Style"].width;N[I].type=O[I+"Style"].type}for(var L=0,K=M.length;L<K;L++){w=M[L];z=this.query(w,"tooltip.axisPointer.type");
v=z||v;if(z){N[z].color=this.query(w,"tooltip.axisPointer."+z+"Style.color")||N[z].color;N[z].width=this.query(w,"tooltip.axisPointer."+z+"Style.width")||N[z].width;
N[z].type=this.query(w,"tooltip.axisPointer."+z+"Style.type")||N[z].type}}if(v==="line"){var u=N.line.width;var E=A==C;this._axisLineShape.style={xStart:E?this.subPixelOptimize(A,u):A,yStart:E?D:this.subPixelOptimize(D,u),xEnd:E?this.subPixelOptimize(C,u):C,yEnd:E?H:this.subPixelOptimize(H,u),strokeColor:N.line.color,lineWidth:u,lineType:N.line.type};
this._axisLineShape.invisible=false;this.zr.modShape(this._axisLineShape.id)}else{if(v==="cross"){var B=N.cross.width;this._axisCrossShape.style={brushType:"stroke",rect:this.component.grid.getArea(),x:this.subPixelOptimize(G,B),y:this.subPixelOptimize(F,B),text:("( "+this.component.xAxis.getAxis(0).getValueFromCoord(G)+" , "+this.component.yAxis.getAxis(0).getValueFromCoord(F)+" )").replace("  , "," ").replace(" ,  "," "),textPosition:"specific",strokeColor:N.cross.color,lineWidth:B,lineType:N.cross.type};
if(this.component.grid.getXend()-G>100){this._axisCrossShape.style.textAlign="left";this._axisCrossShape.style.textX=G+10}else{this._axisCrossShape.style.textAlign="right";
this._axisCrossShape.style.textX=G-10}if(F-this.component.grid.getY()>50){this._axisCrossShape.style.textBaseline="bottom";this._axisCrossShape.style.textY=F-10
}else{this._axisCrossShape.style.textBaseline="top";this._axisCrossShape.style.textY=F+10}this._axisCrossShape.invisible=false;this.zr.modShape(this._axisCrossShape.id)
}else{if(v==="shadow"){if(N.shadow.width==null||N.shadow.width==="auto"||isNaN(N.shadow.width)){N.shadow.width=J}if(A===C){if(Math.abs(this.component.grid.getX()-A)<2){N.shadow.width/=2;
A=C=C+N.shadow.width/2}else{if(Math.abs(this.component.grid.getXend()-A)<2){N.shadow.width/=2;A=C=C-N.shadow.width/2}}}else{if(D===H){if(Math.abs(this.component.grid.getY()-D)<2){N.shadow.width/=2;
D=H=H+N.shadow.width/2}else{if(Math.abs(this.component.grid.getYend()-D)<2){N.shadow.width/=2;D=H=H-N.shadow.width/2}}}}this._axisShadowShape.style={xStart:A,yStart:D,xEnd:C,yEnd:H,strokeColor:N.shadow.color,lineWidth:N.shadow.width};
this._axisShadowShape.invisible=false;this.zr.modShape(this._axisShadowShape.id)}}}this.zr.refreshNextFrame()}},__onmousemove:function(B){clearTimeout(this._hidingTicket);
clearTimeout(this._showingTicket);if(this._mousein&&this._enterable){return}var z=B.target;var A=r.getX(B.event);var y=r.getY(B.event);if(!z){this._curTarget=false;
this._event=B.event;this._event.zrenderX=A;this._event.zrenderY=y;if(this._needAxisTrigger&&this.component.grid&&t.isInside(n,this.component.grid.getArea(),A,y)){this._showingTicket=setTimeout(this._tryShow,this._showDelay)
}else{if(this._needAxisTrigger&&this.component.polar&&this.component.polar.isInside([A,y])!=-1){this._showingTicket=setTimeout(this._tryShow,this._showDelay)
}else{!this._event.connectTrigger&&this.messageCenter.dispatch(q.EVENT.TOOLTIP_OUT_GRID,this._event,null,this.myChart);this._hidingTicket=setTimeout(this._hide,this._hideDelay)
}}}else{this._curTarget=z;this._event=B.event;this._event.zrenderX=A;this._event.zrenderY=y;var v;if(this._needAxisTrigger&&this.component.polar&&(v=this.component.polar.isInside([A,y]))!=-1){var x=this.option.series;
for(var w=0,u=x.length;w<u;w++){if(x[w].polarIndex===v&&this.deepQuery([x[w],this.option],"tooltip.trigger")==="axis"){this._curTarget=null;break}}}this._showingTicket=setTimeout(this._tryShow,this._showDelay)
}},__onglobalout:function(){clearTimeout(this._hidingTicket);clearTimeout(this._showingTicket);this._hidingTicket=setTimeout(this._hide,this._hideDelay)
},__setContent:function(v,u){if(!this._tDom){return}if(v===this._curTicket){this._tDom.innerHTML=u}setTimeout(this._refixed,20)},ontooltipHover:function(x,w){if(!this._lastTipShape||(this._lastTipShape&&this._lastTipShape.dataIndex!=x.dataIndex)){if(this._lastTipShape&&this._lastTipShape.tipShape.length>0){this.zr.delShape(this._lastTipShape.tipShape);
this.shapeList.length=2}for(var v=0,u=w.length;v<u;v++){w[v].zlevel=this.getZlevelBase();w[v].z=this.getZBase();w[v].style=p.prototype.getHighlightStyle(w[v].style,w[v].highlightStyle);
w[v].draggable=false;w[v].hoverable=false;w[v].clickable=false;w[v].ondragend=null;w[v].ondragover=null;w[v].ondrop=null;this.shapeList.push(w[v]);this.zr.addShape(w[v])
}this._lastTipShape={dataIndex:x.dataIndex,tipShape:w}}},ondragend:function(){this._hide()},onlegendSelected:function(u){this._selectedMap=u.selected},_setSelectedMap:function(){if(this.component.legend){this._selectedMap=k.clone(this.component.legend.getSelectedMap())
}else{this._selectedMap={}}},_isSelected:function(u){if(this._selectedMap[u]!=null){return this._selectedMap[u]}else{return true}},showTip:function(N){if(!N){return
}var J;var C=this.option.series;if(N.seriesIndex!=null){J=N.seriesIndex}else{var M=N.seriesName;for(var I=0,H=C.length;I<H;I++){if(C[I].name===M){J=I;break
}}}var G=C[J];if(G==null){return}var D=this.myChart.chart[G.type];var w=this.deepQuery([G,this.option],"tooltip.trigger")==="axis";if(!D){return}if(w){var P=N.dataIndex;
switch(D.type){case q.CHART_TYPE_LINE:case q.CHART_TYPE_BAR:case q.CHART_TYPE_K:case q.CHART_TYPE_TREEMAP:if(this.component.xAxis==null||this.component.yAxis==null||G.data.length<=P){return
}var v=G.xAxisIndex||0;var E=G.yAxisIndex||0;if(this.component.xAxis.getAxis(v).type===q.COMPONENT_TYPE_AXIS_CATEGORY){this._event={zrenderX:this.component.xAxis.getAxis(v).getCoordByIndex(P),zrenderY:this.component.grid.getY()+(this.component.grid.getYend()-this.component.grid.getY())/4}
}else{this._event={zrenderX:this.component.grid.getX()+(this.component.grid.getXend()-this.component.grid.getX())/4,zrenderY:this.component.yAxis.getAxis(E).getCoordByIndex(P)}
}this._showAxisTrigger(v,E,P);break;case q.CHART_TYPE_RADAR:if(this.component.polar==null||G.data[0].value.length<=P){return}var O=G.polarIndex||0;var u=this.component.polar.getVector(O,P,"max");
this._event={zrenderX:u[0],zrenderY:u[1]};this._showPolarTrigger(O,P);break}}else{var F=D.shapeList;var B;var z;switch(D.type){case q.CHART_TYPE_LINE:case q.CHART_TYPE_BAR:case q.CHART_TYPE_K:case q.CHART_TYPE_TREEMAP:case q.CHART_TYPE_SCATTER:var P=N.dataIndex;
for(var I=0,H=F.length;I<H;I++){if(F[I]._mark==null&&i.get(F[I],"seriesIndex")==J&&i.get(F[I],"dataIndex")==P){this._curTarget=F[I];B=F[I].style.x;z=D.type!=q.CHART_TYPE_K?F[I].style.y:F[I].style.y[0];
break}}break;case q.CHART_TYPE_RADAR:var P=N.dataIndex;for(var I=0,H=F.length;I<H;I++){if(F[I].type==="polygon"&&i.get(F[I],"seriesIndex")==J&&i.get(F[I],"dataIndex")==P){this._curTarget=F[I];
var u=this.component.polar.getCenter(G.polarIndex||0);B=u[0];z=u[1];break}}break;case q.CHART_TYPE_PIE:var Q=N.name;for(var I=0,H=F.length;I<H;I++){if(F[I].type==="sector"&&i.get(F[I],"seriesIndex")==J&&i.get(F[I],"name")==Q){this._curTarget=F[I];
var K=this._curTarget.style;var A=(K.startAngle+K.endAngle)/2*Math.PI/180;B=this._curTarget.style.x+Math.cos(A)*K.r/1.5;z=this._curTarget.style.y-Math.sin(A)*K.r/1.5;
break}}break;case q.CHART_TYPE_MAP:var Q=N.name;var L=G.mapType;for(var I=0,H=F.length;I<H;I++){if(F[I].type==="text"&&F[I]._mapType===L&&F[I].style._name===Q){this._curTarget=F[I];
B=this._curTarget.style.x+this._curTarget.position[0];z=this._curTarget.style.y+this._curTarget.position[1];break}}break;case q.CHART_TYPE_CHORD:var Q=N.name;
for(var I=0,H=F.length;I<H;I++){if(F[I].type==="sector"&&i.get(F[I],"name")==Q){this._curTarget=F[I];var K=this._curTarget.style;var A=(K.startAngle+K.endAngle)/2*Math.PI/180;
B=this._curTarget.style.x+Math.cos(A)*(K.r-2);z=this._curTarget.style.y-Math.sin(A)*(K.r-2);this.zr.trigger(l.EVENT.MOUSEMOVE,{zrenderX:B,zrenderY:z});
return}}break;case q.CHART_TYPE_FORCE:var Q=N.name;for(var I=0,H=F.length;I<H;I++){if(F[I].type==="circle"&&i.get(F[I],"name")==Q){this._curTarget=F[I];
B=this._curTarget.position[0];z=this._curTarget.position[1];break}}break}if(B!=null&&z!=null){this._event={zrenderX:B,zrenderY:z};this.zr.addHoverShape(this._curTarget);
this.zr.refreshHover();this._showItemTrigger()}}},hideTip:function(){this._hide()},refresh:function(y){this._zrHeight=this.zr.getHeight();this._zrWidth=this.zr.getWidth();
if(this._lastTipShape&&this._lastTipShape.tipShape.length>0){this.zr.delShape(this._lastTipShape.tipShape)}this._lastTipShape=false;this.shapeList.length=2;
this._lastDataIndex=-1;this._lastSeriesIndex=-1;this._lastItemTriggerId=-1;if(y){this.option=y;this.option.tooltip=this.reformOption(this.option.tooltip);
this.option.tooltip.textStyle=k.merge(this.option.tooltip.textStyle,this.ecTheme.textStyle);this._needAxisTrigger=false;if(this.option.tooltip.trigger==="axis"){this._needAxisTrigger=true
}var x=this.option.series;for(var w=0,u=x.length;w<u;w++){if(this.query(x[w],"tooltip.trigger")==="axis"){this._needAxisTrigger=true;break}}this._showDelay=this.option.tooltip.showDelay;
this._hideDelay=this.option.tooltip.hideDelay;this._defaultCssText=this._style(this.option.tooltip);this._setSelectedMap();this._axisLineWidth=this.option.tooltip.axisPointer.lineStyle.width;
this._enterable=this.option.tooltip.enterable}if(this.showing){var v=this;setTimeout(function(){v.zr.trigger(l.EVENT.MOUSEMOVE,v.zr.handler._event)},50)
}},onbeforDispose:function(){if(this._lastTipShape&&this._lastTipShape.tipShape.length>0){this.zr.delShape(this._lastTipShape.tipShape)}clearTimeout(this._hidingTicket);
clearTimeout(this._showingTicket);this.zr.un(l.EVENT.MOUSEMOVE,this._onmousemove);this.zr.un(l.EVENT.GLOBALOUT,this._onglobalout);if(this.hasAppend&&!!this.dom.firstChild){this.dom.firstChild.removeChild(this._tDom)
}this._tDom=null},_encodeHTML:function(u){return String(u).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")
}};k.inherits(o,m);j("../component").define("tooltip",o);return o});d("echarts/component/toolbox",["require","./base","zrender/shape/Line","zrender/shape/Image","zrender/shape/Rectangle","../util/shape/Icon","../config","zrender/tool/util","zrender/config","zrender/tool/event","./dataView","../component"],function(i){var m=i("./base");
var g=i("zrender/shape/Line");var f=i("zrender/shape/Image");var r=i("zrender/shape/Rectangle");var h=i("../util/shape/Icon");var o=i("../config");o.toolbox={zlevel:0,z:6,show:false,orient:"horizontal",x:"right",y:"top",color:["#1e90ff","#22bb22","#4b0082","#d2691e"],disableColor:"#ddd",effectiveColor:"red",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,itemSize:16,showTitle:true,feature:{mark:{show:false,title:{mark:"辅助线开关",markUndo:"删除辅助线",markClear:"清空辅助线"},lineStyle:{width:1,color:"#1e90ff",type:"dashed"}},dataZoom:{show:false,title:{dataZoom:"区域缩放",dataZoomReset:"区域缩放后退"}},dataView:{show:false,title:"数据视图",readOnly:false,lang:["数据视图","关闭","刷新"]},magicType:{show:false,title:{line:"折线图切换",bar:"柱形图切换",stack:"堆积",tiled:"平铺",force:"力导向布局图切换",chord:"和弦图切换",pie:"饼图切换",funnel:"漏斗图切换"},type:[]},restore:{show:false,title:"还原"},saveAsImage:{show:false,title:"保存为图片",type:"png",lang:["点击保存"]}}};
var j=i("zrender/tool/util");var l=i("zrender/config");var q=i("zrender/tool/event");var p="stack";var n="tiled";function k(w,s,x,v,u){m.call(this,w,s,x,v,u);
this.dom=u.dom;this._magicType={};this._magicMap={};this._isSilence=false;this._iconList;this._iconShapeMap={};this._featureTitle={};this._featureIcon={};
this._featureColor={};this._featureOption={};this._enableColor="red";this._disableColor="#ccc";this._markShapeList=[];var t=this;t._onMark=function(y){t.__onMark(y)
};t._onMarkUndo=function(y){t.__onMarkUndo(y)};t._onMarkClear=function(y){t.__onMarkClear(y)};t._onDataZoom=function(y){t.__onDataZoom(y)};t._onDataZoomReset=function(y){t.__onDataZoomReset(y)
};t._onDataView=function(y){t.__onDataView(y)};t._onRestore=function(y){t.__onRestore(y)};t._onSaveAsImage=function(y){t.__onSaveAsImage(y)};t._onMagicType=function(y){t.__onMagicType(y)
};t._onCustomHandler=function(y){t.__onCustomHandler(y)};t._onmousemove=function(y){return t.__onmousemove(y)};t._onmousedown=function(y){return t.__onmousedown(y)
};t._onmouseup=function(y){return t.__onmouseup(y)};t._onclick=function(y){return t.__onclick(y)}}k.prototype={type:o.COMPONENT_TYPE_TOOLBOX,_buildShape:function(){this._iconList=[];
var x=this.option.toolbox;this._enableColor=x.effectiveColor;this._disableColor=x.disableColor;var w=x.feature;var y=[];for(var v in w){if(w[v].show){switch(v){case"mark":y.push({key:v,name:"mark"});
y.push({key:v,name:"markUndo"});y.push({key:v,name:"markClear"});break;case"magicType":for(var u=0,s=w[v].type.length;u<s;u++){w[v].title[w[v].type[u]+"Chart"]=w[v].title[w[v].type[u]];
if(w[v].option){w[v].option[w[v].type[u]+"Chart"]=w[v].option[w[v].type[u]]}y.push({key:v,name:w[v].type[u]+"Chart"})}break;case"dataZoom":y.push({key:v,name:"dataZoom"});
y.push({key:v,name:"dataZoomReset"});break;case"saveAsImage":if(this.canvasSupported){y.push({key:v,name:"saveAsImage"})}break;default:y.push({key:v,name:v});
break}}}if(y.length>0){var t;var v;for(var u=0,s=y.length;u<s;u++){t=y[u].name;v=y[u].key;this._iconList.push(t);this._featureTitle[t]=w[v].title[t]||w[v].title;
if(w[v].icon){this._featureIcon[t]=w[v].icon[t]||w[v].icon}if(w[v].color){this._featureColor[t]=w[v].color[t]||w[v].color}if(w[v].option){this._featureOption[t]=w[v].option[t]||w[v].option
}}this._itemGroupLocation=this._getItemGroupLocation();this._buildBackground();this._buildItem();for(var u=0,s=this.shapeList.length;u<s;u++){this.zr.addShape(this.shapeList[u])
}if(this._iconShapeMap.mark){this._iconDisable(this._iconShapeMap.markUndo);this._iconDisable(this._iconShapeMap.markClear)}if(this._iconShapeMap.dataZoomReset&&this._zoomQueue.length===0){this._iconDisable(this._iconShapeMap.dataZoomReset)
}}},_buildItem:function(){var y=this.option.toolbox;var G=this._iconList.length;var x=this._itemGroupLocation.x;var t=this._itemGroupLocation.y;var D=y.itemSize;
var s=y.itemGap;var u;var A=y.color instanceof Array?y.color:[y.color];var z=this.getFont(y.textStyle);var F;var w;var v;if(y.orient==="horizontal"){F=this._itemGroupLocation.y/this.zr.getHeight()<0.5?"bottom":"top";
w=this._itemGroupLocation.x/this.zr.getWidth()<0.5?"left":"right";v=this._itemGroupLocation.y/this.zr.getHeight()<0.5?"top":"bottom"}else{F=this._itemGroupLocation.x/this.zr.getWidth()<0.5?"right":"left"
}this._iconShapeMap={};var E=this;for(var B=0;B<G;B++){u={type:"icon",zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:x,y:t,width:D,height:D,iconType:this._iconList[B],lineWidth:1,strokeColor:this._featureColor[this._iconList[B]]||A[B%A.length],brushType:"stroke"},highlightStyle:{lineWidth:1,text:y.showTitle?this._featureTitle[this._iconList[B]]:undefined,textFont:z,textPosition:F,strokeColor:this._featureColor[this._iconList[B]]||A[B%A.length]},hoverable:true,clickable:true};
if(this._featureIcon[this._iconList[B]]){u.style.image=this._featureIcon[this._iconList[B]].replace(new RegExp("^image:\\/\\/"),"");u.style.opacity=0.8;
u.highlightStyle.opacity=1;u.type="image"}if(y.orient==="horizontal"){if(B===0&&w==="left"){u.highlightStyle.textPosition="specific";u.highlightStyle.textAlign=w;
u.highlightStyle.textBaseline=v;u.highlightStyle.textX=x;u.highlightStyle.textY=v==="top"?t+D+10:t-10}if(B===G-1&&w==="right"){u.highlightStyle.textPosition="specific";
u.highlightStyle.textAlign=w;u.highlightStyle.textBaseline=v;u.highlightStyle.textX=x+D;u.highlightStyle.textY=v==="top"?t+D+10:t-10}}switch(this._iconList[B]){case"mark":u.onclick=E._onMark;
break;case"markUndo":u.onclick=E._onMarkUndo;break;case"markClear":u.onclick=E._onMarkClear;break;case"dataZoom":u.onclick=E._onDataZoom;break;case"dataZoomReset":u.onclick=E._onDataZoomReset;
break;case"dataView":if(!this._dataView){var C=i("./dataView");this._dataView=new C(this.ecTheme,this.messageCenter,this.zr,this.option,this.myChart)}u.onclick=E._onDataView;
break;case"restore":u.onclick=E._onRestore;break;case"saveAsImage":u.onclick=E._onSaveAsImage;break;default:if(this._iconList[B].match("Chart")){u._name=this._iconList[B].replace("Chart","");
u.onclick=E._onMagicType}else{u.onclick=E._onCustomHandler}break}if(u.type==="icon"){u=new h(u)}else{if(u.type==="image"){u=new f(u)}}this.shapeList.push(u);
this._iconShapeMap[this._iconList[B]]=u;if(y.orient==="horizontal"){x+=D+s}else{t+=D+s}}},_buildBackground:function(){var s=this.option.toolbox;var t=this.reformCssArray(this.option.toolbox.padding);
this.shapeList.push(new r({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:this._itemGroupLocation.x-t[3],y:this._itemGroupLocation.y-t[0],width:this._itemGroupLocation.width+t[3]+t[1],height:this._itemGroupLocation.height+t[0]+t[2],brushType:s.borderWidth===0?"fill":"both",color:s.backgroundColor,strokeColor:s.borderColor,lineWidth:s.borderWidth}}))
},_getItemGroupLocation:function(){var u=this.option.toolbox;var A=this.reformCssArray(this.option.toolbox.padding);var E=this._iconList.length;var s=u.itemGap;
var C=u.itemSize;var v=0;var w=0;if(u.orient==="horizontal"){v=(C+s)*E-s;w=C}else{w=(C+s)*E-s;v=C}var B;var D=this.zr.getWidth();switch(u.x){case"center":B=Math.floor((D-v)/2);
break;case"left":B=A[3]+u.borderWidth;break;case"right":B=D-v-A[1]-u.borderWidth;break;default:B=u.x-0;B=isNaN(B)?0:B;break}var z;var t=this.zr.getHeight();
switch(u.y){case"top":z=A[0]+u.borderWidth;break;case"bottom":z=t-w-A[2]-u.borderWidth;break;case"center":z=Math.floor((t-w)/2);break;default:z=u.y-0;z=isNaN(z)?0:z;
break}return{x:B,y:z,width:v,height:w}},__onmousemove:function(s){if(this._marking){this._markShape.style.xEnd=q.getX(s.event);this._markShape.style.yEnd=q.getY(s.event);
this.zr.addHoverShape(this._markShape)}if(this._zooming){this._zoomShape.style.width=q.getX(s.event)-this._zoomShape.style.x;this._zoomShape.style.height=q.getY(s.event)-this._zoomShape.style.y;
this.zr.addHoverShape(this._zoomShape);this.dom.style.cursor="crosshair";q.stop(s.event)}if(this._zoomStart&&(this.dom.style.cursor!="pointer"&&this.dom.style.cursor!="move")){this.dom.style.cursor="crosshair"
}},__onmousedown:function(u){if(u.target){return}this._zooming=true;var s=q.getX(u.event);var v=q.getY(u.event);var t=this.option.dataZoom||{};this._zoomShape=new r({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:s,y:v,width:1,height:1,brushType:"both"},highlightStyle:{lineWidth:2,color:t.fillerColor||o.dataZoom.fillerColor,strokeColor:t.handleColor||o.dataZoom.handleColor,brushType:"both"}});
this.zr.addHoverShape(this._zoomShape);return true},__onmouseup:function(){if(!this._zoomShape||Math.abs(this._zoomShape.style.width)<10||Math.abs(this._zoomShape.style.height)<10){this._zooming=false;
return true}if(this._zooming&&this.component.dataZoom){this._zooming=false;var s=this.component.dataZoom.rectZoom(this._zoomShape.style);if(s){this._zoomQueue.push({start:s.start,end:s.end,start2:s.start2,end2:s.end2});
this._iconEnable(this._iconShapeMap.dataZoomReset);this.zr.refreshNextFrame()}}return true},__onclick:function(t){if(t.target){return}if(this._marking){this._marking=false;
this._markShapeList.push(this._markShape);this._iconEnable(this._iconShapeMap.markUndo);this._iconEnable(this._iconShapeMap.markClear);this.zr.addShape(this._markShape);
this.zr.refreshNextFrame()}else{if(this._markStart){this._marking=true;var s=q.getX(t.event);var u=q.getY(t.event);this._markShape=new g({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{xStart:s,yStart:u,xEnd:s,yEnd:u,lineWidth:this.query(this.option,"toolbox.feature.mark.lineStyle.width"),strokeColor:this.query(this.option,"toolbox.feature.mark.lineStyle.color"),lineType:this.query(this.option,"toolbox.feature.mark.lineStyle.type")}});
this.zr.addHoverShape(this._markShape)}}},__onMark:function(u){var t=u.target;if(this._marking||this._markStart){this._resetMark();this.zr.refreshNextFrame()
}else{this._resetZoom();this.zr.modShape(t.id,{style:{strokeColor:this._enableColor}});this.zr.refreshNextFrame();this._markStart=true;var s=this;setTimeout(function(){s.zr&&s.zr.on(l.EVENT.CLICK,s._onclick)&&s.zr.on(l.EVENT.MOUSEMOVE,s._onmousemove)
},10)}return true},__onMarkUndo:function(){if(this._marking){this._marking=false}else{var s=this._markShapeList.length;if(s>=1){var t=this._markShapeList[s-1];
this.zr.delShape(t.id);this.zr.refreshNextFrame();this._markShapeList.pop();if(s===1){this._iconDisable(this._iconShapeMap.markUndo);this._iconDisable(this._iconShapeMap.markClear)
}}}return true},__onMarkClear:function(){if(this._marking){this._marking=false}var s=this._markShapeList.length;if(s>0){while(s--){this.zr.delShape(this._markShapeList.pop().id)
}this._iconDisable(this._iconShapeMap.markUndo);this._iconDisable(this._iconShapeMap.markClear);this.zr.refreshNextFrame()}return true},__onDataZoom:function(u){var t=u.target;
if(this._zooming||this._zoomStart){this._resetZoom();this.zr.refreshNextFrame();this.dom.style.cursor="default"}else{this._resetMark();this.zr.modShape(t.id,{style:{strokeColor:this._enableColor}});
this.zr.refreshNextFrame();this._zoomStart=true;var s=this;setTimeout(function(){s.zr&&s.zr.on(l.EVENT.MOUSEDOWN,s._onmousedown)&&s.zr.on(l.EVENT.MOUSEUP,s._onmouseup)&&s.zr.on(l.EVENT.MOUSEMOVE,s._onmousemove)
},10);this.dom.style.cursor="crosshair"}return true},__onDataZoomReset:function(){if(this._zooming){this._zooming=false}this._zoomQueue.pop();if(this._zoomQueue.length>0){this.component.dataZoom.absoluteZoom(this._zoomQueue[this._zoomQueue.length-1])
}else{this.component.dataZoom.rectZoom();this._iconDisable(this._iconShapeMap.dataZoomReset);this.zr.refreshNextFrame()}return true},_resetMark:function(){this._marking=false;
if(this._markStart){this._markStart=false;if(this._iconShapeMap.mark){this.zr.modShape(this._iconShapeMap.mark.id,{style:{strokeColor:this._iconShapeMap.mark.highlightStyle.strokeColor}})
}this.zr.un(l.EVENT.CLICK,this._onclick);this.zr.un(l.EVENT.MOUSEMOVE,this._onmousemove)}},_resetZoom:function(){this._zooming=false;if(this._zoomStart){this._zoomStart=false;
if(this._iconShapeMap.dataZoom){this.zr.modShape(this._iconShapeMap.dataZoom.id,{style:{strokeColor:this._iconShapeMap.dataZoom.highlightStyle.strokeColor}})
}this.zr.un(l.EVENT.MOUSEDOWN,this._onmousedown);this.zr.un(l.EVENT.MOUSEUP,this._onmouseup);this.zr.un(l.EVENT.MOUSEMOVE,this._onmousemove)}},_iconDisable:function(s){if(s.type!="image"){this.zr.modShape(s.id,{hoverable:false,clickable:false,style:{strokeColor:this._disableColor}})
}else{this.zr.modShape(s.id,{hoverable:false,clickable:false,style:{opacity:0.3}})}},_iconEnable:function(s){if(s.type!="image"){this.zr.modShape(s.id,{hoverable:true,clickable:true,style:{strokeColor:s.highlightStyle.strokeColor}})
}else{this.zr.modShape(s.id,{hoverable:true,clickable:true,style:{opacity:0.8}})}},__onDataView:function(){this._dataView.show(this.option);return true
},__onRestore:function(){this._resetMark();this._resetZoom();this.messageCenter.dispatch(o.EVENT.RESTORE,null,null,this.myChart);return true},__onSaveAsImage:function(){var w=this.option.toolbox.feature.saveAsImage;
var u=w.type||"png";if(u!="png"&&u!="jpeg"){u="png"}var v;if(!this.myChart.isConnected()){v=this.zr.toDataURL("image/"+u,this.option.backgroundColor&&this.option.backgroundColor.replace(" ","")==="rgba(0,0,0,0)"?"#fff":this.option.backgroundColor)
}else{v=this.myChart.getConnectedDataURL(u)}var t=document.createElement("div");t.id="__echarts_download_wrap__";t.style.cssText="position:fixed;z-index:99999;display:block;top:0;left:0;background-color:rgba(33,33,33,0.5);text-align:center;width:100%;height:100%;line-height:"+document.documentElement.clientHeight+"px;";
var s=document.createElement("a");s.href=v;s.setAttribute("download",(w.name?w.name:(this.option.title&&(this.option.title.text||this.option.title.subtext))?(this.option.title.text||this.option.title.subtext):"ECharts")+"."+u);
s.innerHTML='<img style="vertical-align:middle" src="'+v+'" title="'+((!!window.ActiveXObject||"ActiveXObject" in window)?"右键->图片另存为":(w.lang?w.lang[0]:"点击保存"))+'"/>';
t.appendChild(s);document.body.appendChild(t);s=null;t=null;setTimeout(function(){var x=document.getElementById("__echarts_download_wrap__");if(x){x.onclick=function(){var y=document.getElementById("__echarts_download_wrap__");
y.onclick=null;y.innerHTML="";document.body.removeChild(y);y=null};x=null}},500);return},__onMagicType:function(t){this._resetMark();var s=t.target._name;
if(!this._magicType[s]){this._magicType[s]=true;if(s===o.CHART_TYPE_LINE){this._magicType[o.CHART_TYPE_BAR]=false}else{if(s===o.CHART_TYPE_BAR){this._magicType[o.CHART_TYPE_LINE]=false
}}if(s===o.CHART_TYPE_PIE){this._magicType[o.CHART_TYPE_FUNNEL]=false}else{if(s===o.CHART_TYPE_FUNNEL){this._magicType[o.CHART_TYPE_PIE]=false}}if(s===o.CHART_TYPE_FORCE){this._magicType[o.CHART_TYPE_CHORD]=false
}else{if(s===o.CHART_TYPE_CHORD){this._magicType[o.CHART_TYPE_FORCE]=false}}if(s===p){this._magicType[n]=false}else{if(s===n){this._magicType[p]=false}}this.messageCenter.dispatch(o.EVENT.MAGIC_TYPE_CHANGED,t.event,{magicType:this._magicType},this.myChart)
}return true},setMagicType:function(s){this._resetMark();this._magicType=s;!this._isSilence&&this.messageCenter.dispatch(o.EVENT.MAGIC_TYPE_CHANGED,null,{magicType:this._magicType},this.myChart)
},__onCustomHandler:function(u){var t=u.target.style.iconType;var s=this.option.toolbox.feature[t].onclick;if(typeof s==="function"){s.call(this,this.option)
}},reset:function(z,t){t&&this.clear();if(this.query(z,"toolbox.show")&&this.query(z,"toolbox.feature.magicType.show")){var v=z.toolbox.feature.magicType.type;
var y=v.length;this._magicMap={};while(y--){this._magicMap[v[y]]=true}y=z.series.length;var u;var w;while(y--){u=z.series[y].type;if(this._magicMap[u]){w=z.xAxis instanceof Array?z.xAxis[z.series[y].xAxisIndex||0]:z.xAxis;
if(w&&(w.type||"category")==="category"){w.__boundaryGap=w.boundaryGap!=null?w.boundaryGap:true}w=z.yAxis instanceof Array?z.yAxis[z.series[y].yAxisIndex||0]:z.yAxis;
if(w&&w.type==="category"){w.__boundaryGap=w.boundaryGap!=null?w.boundaryGap:true}z.series[y].__type=u;z.series[y].__itemStyle=j.clone(z.series[y].itemStyle||{})
}if(this._magicMap[p]||this._magicMap[n]){z.series[y].__stack=z.series[y].stack}}}this._magicType=t?{}:(this._magicType||{});for(var B in this._magicType){if(this._magicType[B]){this.option=z;
this.getMagicOption();break}}var A=z.dataZoom;if(A&&A.show){var s=A.start!=null&&A.start>=0&&A.start<=100?A.start:0;var x=A.end!=null&&A.end>=0&&A.end<=100?A.end:100;
if(s>x){s=s+x;x=s-x;s=s-x}this._zoomQueue=[{start:s,end:x,start2:0,end2:100}]}else{this._zoomQueue=[]}},getMagicOption:function(){var v;var u;if(this._magicType[o.CHART_TYPE_LINE]||this._magicType[o.CHART_TYPE_BAR]){var w=this._magicType[o.CHART_TYPE_LINE]?false:true;
for(var t=0,s=this.option.series.length;t<s;t++){u=this.option.series[t].type;if(u==o.CHART_TYPE_LINE||u==o.CHART_TYPE_BAR){v=this.option.xAxis instanceof Array?this.option.xAxis[this.option.series[t].xAxisIndex||0]:this.option.xAxis;
if(v&&(v.type||"category")==="category"){v.boundaryGap=w?true:v.__boundaryGap}v=this.option.yAxis instanceof Array?this.option.yAxis[this.option.series[t].yAxisIndex||0]:this.option.yAxis;
if(v&&v.type==="category"){v.boundaryGap=w?true:v.__boundaryGap}}}this._defaultMagic(o.CHART_TYPE_LINE,o.CHART_TYPE_BAR)}this._defaultMagic(o.CHART_TYPE_CHORD,o.CHART_TYPE_FORCE);
this._defaultMagic(o.CHART_TYPE_PIE,o.CHART_TYPE_FUNNEL);if(this._magicType[p]||this._magicType[n]){for(var t=0,s=this.option.series.length;t<s;t++){if(this._magicType[p]){this.option.series[t].stack="_ECHARTS_STACK_KENER_2014_";
u=p}else{if(this._magicType[n]){this.option.series[t].stack=null;u=n}}if(this._featureOption[u+"Chart"]){j.merge(this.option.series[t],this._featureOption[u+"Chart"]||{},true)
}}}return this.option},_defaultMagic:function(u,s){if(this._magicType[u]||this._magicType[s]){for(var v=0,t=this.option.series.length;v<t;v++){var w=this.option.series[v].type;
if(w==u||w==s){this.option.series[v].type=this._magicType[u]?u:s;this.option.series[v].itemStyle=j.clone(this.option.series[v].__itemStyle);w=this.option.series[v].type;
if(this._featureOption[w+"Chart"]){j.merge(this.option.series[v],this._featureOption[w+"Chart"]||{},true)}}}}},silence:function(t){this._isSilence=t},resize:function(){this._resetMark();
this.clear();if(this.option&&this.option.toolbox&&this.option.toolbox.show){this._buildShape()}if(this._dataView){this._dataView.resize()}},hideDataView:function(){if(this._dataView){this._dataView.hide()
}},clear:function(s){if(this.zr){this.zr.delShape(this.shapeList);this.shapeList=[];if(!s){this.zr.delShape(this._markShapeList);this._markShapeList=[]
}}},onbeforDispose:function(){if(this._dataView){this._dataView.dispose();this._dataView=null}this._markShapeList=null},refresh:function(s){if(s){this._resetMark();
this._resetZoom();s.toolbox=this.reformOption(s.toolbox);this.option=s;this.clear(true);if(s.toolbox.show){this._buildShape()}this.hideDataView()}}};j.inherits(k,m);
i("../component").define("toolbox",k);return k});d("zrender/shape/Image",["require","./Base","../tool/util"],function(g){var h=g("./Base");var f=function(i){h.call(this,i)
};f.prototype={type:"image",brush:function(w,n,o){var j=this.style||{};if(n){j=this.getHighlightStyle(j,this.highlightStyle||{})}var m=j.image;var v=this;
if(!this._imageCache){this._imageCache={}}if(typeof(m)==="string"){var i=m;if(this._imageCache[i]){m=this._imageCache[i]}else{m=new Image();m.onload=function(){m.onload=null;
v.modSelf();o()};m.src=i;this._imageCache[i]=m}}if(m){if(m.nodeName.toUpperCase()=="IMG"){if(window.ActiveXObject){if(m.readyState!="complete"){return}}else{if(!m.complete){return
}}}var k=j.width||m.width;var u=j.height||m.height;var t=j.x;var r=j.y;if(!m.width||!m.height){return}w.save();this.doClip(w);this.setContext(w,j);this.setTransform(w);
if(j.sWidth&&j.sHeight){var s=j.sx||0;var q=j.sy||0;w.drawImage(m,s,q,j.sWidth,j.sHeight,t,r,k,u)}else{if(j.sx&&j.sy){var s=j.sx;var q=j.sy;var l=k-s;var p=u-q;
w.drawImage(m,s,q,l,p,t,r,k,u)}else{w.drawImage(m,t,r,k,u)}}if(!j.width){j.width=k}if(!j.height){j.height=u}if(!this.style.width){this.style.width=k}if(!this.style.height){this.style.height=u
}this.drawText(w,j,this.style);w.restore()}},getRect:function(i){return{x:i.x,y:i.y,width:i.width,height:i.height}},clearCache:function(){this._imageCache={}
}};g("../tool/util").inherits(f,h);return f});d("zrender/loadingEffect/Bar",["require","./Base","../tool/util","../tool/color","../shape/Rectangle"],function(h){var i=h("./Base");
var f=h("../tool/util");var k=h("../tool/color");var j=h("../shape/Rectangle");function g(l){i.call(this,l)}f.inherits(g,i);g.prototype._start=function(q,r){var m=f.merge(this.options,{textStyle:{color:"#888"},backgroundColor:"rgba(250, 250, 250, 0.8)",effectOption:{x:0,y:this.canvasHeight/2-30,width:this.canvasWidth,height:5,brushType:"fill",timeInterval:100}});
var o=this.createTextShape(m.textStyle);var n=this.createBackgroundShape(m.backgroundColor);var p=m.effectOption;var l=new j({highlightStyle:f.clone(p)});
l.highlightStyle.color=p.color||k.getLinearGradient(p.x,p.y,p.x+p.width,p.y+p.height,[[0,"#ff6400"],[0.5,"#ffe100"],[1,"#b1ff00"]]);if(m.progress!=null){q(n);
l.highlightStyle.width=this.adjust(m.progress,[0,1])*m.effectOption.width;q(l);q(o);r();return}else{l.highlightStyle.width=0;return setInterval(function(){q(n);
if(l.highlightStyle.width<p.width){l.highlightStyle.width+=8}else{l.highlightStyle.width=0}q(l);q(o);r()},p.timeInterval)}};return g});d("zrender/loadingEffect/Bubble",["require","./Base","../tool/util","../tool/color","../shape/Circle"],function(h){var i=h("./Base");
var g=h("../tool/util");var k=h("../tool/color");var f=h("../shape/Circle");function j(l){i.call(this,l)}g.inherits(j,i);j.prototype._start=function(m,t){var z=g.merge(this.options,{textStyle:{color:"#888"},backgroundColor:"rgba(250, 250, 250, 0.8)",effect:{n:50,lineWidth:2,brushType:"stroke",color:"random",timeInterval:100}});
var p=this.createTextShape(z.textStyle);var o=this.createBackgroundShape(z.backgroundColor);var l=z.effect;var q=l.n;var y=l.brushType;var x=l.lineWidth;
var s=[];var r=this.canvasWidth;var w=this.canvasHeight;for(var v=0;v<q;v++){var u=l.color=="random"?k.alpha(k.random(),0.3):l.color;s[v]=new f({highlightStyle:{x:Math.ceil(Math.random()*r),y:Math.ceil(Math.random()*w),r:Math.ceil(Math.random()*40),brushType:y,color:u,strokeColor:u,lineWidth:x},animationY:Math.ceil(Math.random()*20)})
}return setInterval(function(){m(o);for(var n=0;n<q;n++){var A=s[n].highlightStyle;if(A.y-s[n].animationY+A.r<=0){s[n].highlightStyle.y=w+A.r;s[n].highlightStyle.x=Math.ceil(Math.random()*r)
}s[n].highlightStyle.y-=s[n].animationY;m(s[n])}m(p);t()},l.timeInterval)};return j});d("zrender/loadingEffect/DynamicLine",["require","./Base","../tool/util","../tool/color","../shape/Line"],function(g){var h=g("./Base");
var f=g("../tool/util");var k=g("../tool/color");var i=g("../shape/Line");function j(l){h.call(this,l)}f.inherits(j,h);j.prototype._start=function(m,t){var B=f.merge(this.options,{textStyle:{color:"#fff"},backgroundColor:"rgba(0, 0, 0, 0.8)",effectOption:{n:30,lineWidth:1,color:"random",timeInterval:100}});
var p=this.createTextShape(B.textStyle);var o=this.createBackgroundShape(B.backgroundColor);var l=B.effectOption;var q=l.n;var x=l.lineWidth;var s=[];var r=this.canvasWidth;
var w=this.canvasHeight;for(var v=0;v<q;v++){var z=-Math.ceil(Math.random()*1000);var y=Math.ceil(Math.random()*400);var A=Math.ceil(Math.random()*w);var u=l.color=="random"?k.random():l.color;
s[v]=new i({highlightStyle:{xStart:z,yStart:A,xEnd:z+y,yEnd:A,strokeColor:u,lineWidth:x},animationX:Math.ceil(Math.random()*100),len:y})}return setInterval(function(){m(o);
for(var n=0;n<q;n++){var C=s[n].highlightStyle;if(C.xStart>=r){s[n].len=Math.ceil(Math.random()*400);C.xStart=-400;C.xEnd=-400+s[n].len;C.yStart=Math.ceil(Math.random()*w);
C.yEnd=C.yStart}C.xStart+=s[n].animationX;C.xEnd+=s[n].animationX;m(s[n])}m(p);t()},l.timeInterval)};return j});d("zrender/loadingEffect/Spin",["require","./Base","../tool/util","../tool/color","../tool/area","../shape/Sector"],function(g){var h=g("./Base");
var f=g("../tool/util");var l=g("../tool/color");var j=g("../tool/area");var i=g("../shape/Sector");function k(m){h.call(this,m)}f.inherits(k,h);k.prototype._start=function(t,A){var s=f.merge(this.options,{textStyle:{color:"#fff",textAlign:"start"},backgroundColor:"rgba(0, 0, 0, 0.8)"});
var B=this.createTextShape(s.textStyle);var p=10;var q=j.getTextWidth(B.highlightStyle.text,B.highlightStyle.textFont);var m=j.getTextHeight(B.highlightStyle.text,B.highlightStyle.textFont);
var u=f.merge(this.options.effect||{},{r0:9,r:15,n:18,color:"#fff",timeInterval:100});var o=this.getLocation(this.options.textStyle,q+p+u.r*2,Math.max(u.r*2,m));
u.x=o.x+u.r;u.y=B.highlightStyle.y=o.y+o.height/2;B.highlightStyle.x=u.x+u.r+p;var I=this.createBackgroundShape(s.backgroundColor);var E=u.n;var z=u.x;
var w=u.y;var H=u.r0;var C=u.r;var F=u.color;var D=[];var J=Math.round(180/E);for(var G=0;G<E;G++){D[G]=new i({highlightStyle:{x:z,y:w,r0:H,r:C,startAngle:J*G*2,endAngle:J*G*2+J,color:l.alpha(F,(G+1)/E),brushType:"fill"}})
}var v=[0,z,w];return setInterval(function(){t(I);v[0]-=0.3;for(var n=0;n<E;n++){D[n].rotation=v;t(D[n])}t(B);A()},u.timeInterval)};return k});d("zrender/loadingEffect/Whirling",["require","./Base","../tool/util","../tool/area","../shape/Ring","../shape/Droplet","../shape/Circle"],function(i){var j=i("./Base");
var g=i("../tool/util");var l=i("../tool/area");var h=i("../shape/Ring");var m=i("../shape/Droplet");var f=i("../shape/Circle");function k(n){j.call(this,n)
}g.inherits(k,j);k.prototype._start=function(p,t){var A=g.merge(this.options,{textStyle:{color:"#888",textAlign:"start"},backgroundColor:"rgba(250, 250, 250, 0.8)"});
var r=this.createTextShape(A.textStyle);var q=10;var v=l.getTextWidth(r.highlightStyle.text,r.highlightStyle.textFont);var x=l.getTextHeight(r.highlightStyle.text,r.highlightStyle.textFont);
var n=g.merge(this.options.effect||{},{r:18,colorIn:"#fff",colorOut:"#555",colorWhirl:"#6cf",timeInterval:50});var y=this.getLocation(this.options.textStyle,v+q+n.r*2,Math.max(n.r*2,x));
n.x=y.x+n.r;n.y=r.highlightStyle.y=y.y+y.height/2;r.highlightStyle.x=n.x+n.r+q;var o=this.createBackgroundShape(A.backgroundColor);var u=new m({highlightStyle:{a:Math.round(n.r/2),b:Math.round(n.r-n.r/6),brushType:"fill",color:n.colorWhirl}});
var s=new f({highlightStyle:{r:Math.round(n.r/6),brushType:"fill",color:n.colorIn}});var z=new h({highlightStyle:{r0:Math.round(n.r-n.r/3),r:n.r,brushType:"fill",color:n.colorOut}});
var w=[0,n.x,n.y];u.highlightStyle.x=s.highlightStyle.x=z.highlightStyle.x=w[1];u.highlightStyle.y=s.highlightStyle.y=z.highlightStyle.y=w[2];return setInterval(function(){p(o);
p(z);w[0]-=0.3;u.rotation=w;p(u);p(s);p(r);t()},n.timeInterval)};return k});d("echarts/theme/infographic",[],function(){var f={color:["#C1232B","#B5C334","#FCCE10","#E87C25","#27727B","#FE8463","#9BCA63","#FAD860","#F3A43B","#60C0DD","#D7504B","#C6E579","#F4E001","#F0805A","#26C0C0"],title:{textStyle:{fontWeight:"normal",color:"#27727B"}},dataRange:{x:"right",y:"center",itemWidth:5,itemHeight:25,color:["#C1232B","#FCCE10"]},toolbox:{color:["#C1232B","#B5C334","#FCCE10","#E87C25","#27727B","#FE8463","#9BCA63","#FAD860","#F3A43B","#60C0DD"],effectiveColor:"#ff4500"},tooltip:{backgroundColor:"rgba(50,50,50,0.5)",axisPointer:{type:"line",lineStyle:{color:"#27727B",type:"dashed"},crossStyle:{color:"#27727B"},shadowStyle:{color:"rgba(200,200,200,0.3)"}}},dataZoom:{dataBackgroundColor:"rgba(181,195,52,0.3)",fillerColor:"rgba(181,195,52,0.2)",handleColor:"#27727B"},grid:{borderWidth:0},categoryAxis:{axisLine:{lineStyle:{color:"#27727B"}},splitLine:{show:false}},valueAxis:{axisLine:{show:false},splitArea:{show:false},splitLine:{lineStyle:{color:["#ccc"],type:"dashed"}}},polar:{axisLine:{lineStyle:{color:"#ddd"}},splitArea:{show:true,areaStyle:{color:["rgba(250,250,250,0.2)","rgba(200,200,200,0.2)"]}},splitLine:{lineStyle:{color:"#ddd"}}},timeline:{lineStyle:{color:"#27727B"},controlStyle:{normal:{color:"#27727B"},emphasis:{color:"#27727B"}},symbol:"emptyCircle",symbolSize:3},line:{itemStyle:{normal:{borderWidth:2,borderColor:"#fff",lineStyle:{width:3}},emphasis:{borderWidth:0}},symbol:"circle",symbolSize:3.5},k:{itemStyle:{normal:{color:"#C1232B",color0:"#B5C334",lineStyle:{width:1,color:"#C1232B",color0:"#B5C334"}}}},scatter:{itemStyle:{normal:{borderWidth:1,borderColor:"rgba(200,200,200,0.5)"},emphasis:{borderWidth:0}},symbol:"star4",symbolSize:4},radar:{symbol:"emptyCircle",symbolSize:3},map:{itemStyle:{normal:{areaStyle:{color:"#ddd"},label:{textStyle:{color:"#C1232B"}}},emphasis:{areaStyle:{color:"#fe994e"},label:{textStyle:{color:"rgb(100,0,0)"}}}}},force:{itemStyle:{normal:{linkStyle:{color:"#27727B"}}}},chord:{itemStyle:{normal:{borderWidth:1,borderColor:"rgba(128, 128, 128, 0.5)",chordStyle:{lineStyle:{color:"rgba(128, 128, 128, 0.5)"}}},emphasis:{borderWidth:1,borderColor:"rgba(128, 128, 128, 0.5)",chordStyle:{lineStyle:{color:"rgba(128, 128, 128, 0.5)"}}}}},gauge:{center:["50%","80%"],radius:"100%",startAngle:180,endAngle:0,axisLine:{show:true,lineStyle:{color:[[0.2,"#B5C334"],[0.8,"#27727B"],[1,"#C1232B"]],width:"40%"}},axisTick:{splitNumber:2,length:5,lineStyle:{color:"#fff"}},axisLabel:{textStyle:{color:"#fff",fontWeight:"bolder"}},splitLine:{length:"5%",lineStyle:{color:"#fff"}},pointer:{width:"40%",length:"80%",color:"#fff"},title:{offsetCenter:[0,-20],textStyle:{color:"auto",fontSize:20}},detail:{offsetCenter:[0,0],textStyle:{color:"auto",fontSize:40}}},textStyle:{fontFamily:"微软雅黑, Arial, Verdana, sans-serif"}};
return f});d("echarts/util/shape/MarkLine",["require","zrender/shape/Base","./Icon","zrender/shape/Line","zrender/shape/BezierCurve","zrender/tool/area","zrender/shape/util/dashedLineTo","zrender/tool/util","zrender/tool/curve"],function(l){var n=l("zrender/shape/Base");
var j=l("./Icon");var i=l("zrender/shape/Line");var o=new i({});var h=l("zrender/shape/BezierCurve");var k=new h({});var g=l("zrender/tool/area");var q=l("zrender/shape/util/dashedLineTo");
var m=l("zrender/tool/util");var f=l("zrender/tool/curve");function p(r){n.call(this,r);if(this.style.curveness>0){this.updatePoints(this.style)}if(this.highlightStyle.curveness>0){this.updatePoints(this.highlightStyle)
}}p.prototype={type:"mark-line",brush:function(r,t){var s=this.style;if(t){s=this.getHighlightStyle(s,this.highlightStyle||{})}r.save();this.setContext(r,s);
this.setTransform(r);r.save();r.beginPath();this.buildPath(r,s);r.stroke();r.restore();this.brushSymbol(r,s,0);this.brushSymbol(r,s,1);this.drawText(r,s,this.style);
r.restore()},buildPath:function(s,t){var v=t.lineType||"solid";s.moveTo(t.xStart,t.yStart);if(t.curveness>0){var r=null;switch(v){case"dashed":r=[5,5];
break;case"dotted":r=[1,1];break}if(r&&s.setLineDash){s.setLineDash(r)}s.quadraticCurveTo(t.cpX1,t.cpY1,t.xEnd,t.yEnd)}else{if(v=="solid"){s.lineTo(t.xEnd,t.yEnd)
}else{var u=(t.lineWidth||1)*(t.lineType=="dashed"?5:1);q(s,t.xStart,t.yStart,t.xEnd,t.yEnd,u)}}},updatePoints:function(r){var v=r.curveness||0;var w=1;
var u=r.xStart;var z=r.yStart;var s=r.xEnd;var x=r.yEnd;var t=(u+s)/2-w*(z-x)*v;var y=(z+x)/2-w*(s-u)*v;r.cpX1=t;r.cpY1=y},brushSymbol:function(B,F,A){if(F.symbol[A]=="none"){return
}B.save();B.beginPath();B.lineWidth=F.symbolBorder;B.strokeStyle=F.symbolBorderColor;var C=F.symbol[A].replace("empty","").toLowerCase();if(F.symbol[A].match("empty")){B.fillStyle="#fff"
}var H=F.xStart;var t=F.yStart;var E=F.xEnd;var r=F.yEnd;var v=A===0?H:E;var u=A===0?t:r;var L=F.curveness||0;var D=F.symbolRotate[A]!=null?(F.symbolRotate[A]-0):0;
D=D/180*Math.PI;if(C=="arrow"&&D===0){if(L===0){var K=A===0?-1:1;D=Math.PI/2+Math.atan2(K*(r-t),K*(E-H))}else{var G=F.cpX1;var s=F.cpY1;var I=f.quadraticDerivativeAt;
var z=I(H,G,E,A);var w=I(t,s,r,A);D=Math.PI/2+Math.atan2(w,z)}}B.translate(v,u);if(D!==0){B.rotate(D)}var J=F.symbolSize[A];j.prototype.buildPath(B,{x:-J,y:-J,width:J*2,height:J*2,iconType:C});
B.closePath();B.fill();B.stroke();B.restore()},getRect:function(r){r.curveness>0?k.getRect(r):o.getRect(r);return r.__rect},isCover:function(r,t){var s=this.transformCoordToLocal(r,t);
r=s[0];t=s[1];if(this.isCoverRect(r,t)){return this.style.curveness>0?g.isInside(k,this.style,r,t):g.isInside(o,this.style,r,t)}return false}};m.inherits(p,n);
return p});d("echarts/theme/macarons",[],function(){var f={color:["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3","#e5cf0d","#97b552","#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"],title:{textStyle:{fontWeight:"normal",color:"#008acd"}},dataRange:{itemWidth:15,color:["#5ab1ef","#e0ffff"]},toolbox:{color:["#1e90ff","#1e90ff","#1e90ff","#1e90ff"],effectiveColor:"#ff4500"},tooltip:{backgroundColor:"rgba(50,50,50,0.5)",axisPointer:{type:"line",lineStyle:{color:"#008acd"},crossStyle:{color:"#008acd"},shadowStyle:{color:"rgba(200,200,200,0.2)"}}},dataZoom:{dataBackgroundColor:"#efefff",fillerColor:"rgba(182,162,222,0.2)",handleColor:"#008acd"},grid:{borderColor:"#eee"},categoryAxis:{axisLine:{lineStyle:{color:"#008acd"}},splitLine:{lineStyle:{color:["#eee"]}}},valueAxis:{axisLine:{lineStyle:{color:"#008acd"}},splitArea:{show:true,areaStyle:{color:["rgba(250,250,250,0.1)","rgba(200,200,200,0.1)"]}},splitLine:{lineStyle:{color:["#eee"]}}},polar:{axisLine:{lineStyle:{color:"#ddd"}},splitArea:{show:true,areaStyle:{color:["rgba(250,250,250,0.2)","rgba(200,200,200,0.2)"]}},splitLine:{lineStyle:{color:"#ddd"}}},timeline:{lineStyle:{color:"#008acd"},controlStyle:{normal:{color:"#008acd"},emphasis:{color:"#008acd"}},symbol:"emptyCircle",symbolSize:3},bar:{itemStyle:{normal:{barBorderRadius:5},emphasis:{barBorderRadius:5}}},line:{smooth:true,symbol:"emptyCircle",symbolSize:3},k:{itemStyle:{normal:{color:"#d87a80",color0:"#2ec7c9",lineStyle:{color:"#d87a80",color0:"#2ec7c9"}}}},scatter:{symbol:"circle",symbolSize:4},radar:{symbol:"emptyCircle",symbolSize:3},map:{itemStyle:{normal:{areaStyle:{color:"#ddd"},label:{textStyle:{color:"#d87a80"}}},emphasis:{areaStyle:{color:"#fe994e"}}}},force:{itemStyle:{normal:{linkStyle:{color:"#1e90ff"}}}},chord:{itemStyle:{normal:{borderWidth:1,borderColor:"rgba(128, 128, 128, 0.5)",chordStyle:{lineStyle:{color:"rgba(128, 128, 128, 0.5)"}}},emphasis:{borderWidth:1,borderColor:"rgba(128, 128, 128, 0.5)",chordStyle:{lineStyle:{color:"rgba(128, 128, 128, 0.5)"}}}}},gauge:{axisLine:{lineStyle:{color:[[0.2,"#2ec7c9"],[0.8,"#5ab1ef"],[1,"#d87a80"]],width:10}},axisTick:{splitNumber:10,length:15,lineStyle:{color:"auto"}},splitLine:{length:22,lineStyle:{color:"auto"}},pointer:{width:5}},textStyle:{fontFamily:"微软雅黑, Arial, Verdana, sans-serif"}};
return f});d("echarts/util/shape/Symbol",["require","zrender/shape/Base","zrender/shape/Polygon","zrender/tool/util","./normalIsCover"],function(h){var i=h("zrender/shape/Base");
var f=h("zrender/shape/Polygon");var k=new f({});var g=h("zrender/tool/util");function j(l){i.call(this,l)}j.prototype={type:"symbol",buildPath:function(w,D){var v=D.pointList;
var C=v.length;if(C===0){return}var o=10000;var n=Math.ceil(C/o);var p;var E;var s=v[0] instanceof Array;var t=D.size?D.size:2;var u=t;var z=t/2;var l=Math.PI*2;
var m;var r;var q;for(var A=0;A<n;A++){w.beginPath();p=A*o;E=p+o;E=E>C?C:E;for(var B=p;B<E;B++){if(D.random){m=D["randomMap"+(B%20)]/100;u=t*m*m;z=u/2}if(s){r=v[B][0];
q=v[B][1]}else{r=v[B].x;q=v[B].y}if(u<3){w.rect(r-z,q-z,u,u)}else{switch(D.iconType){case"circle":w.moveTo(r,q);w.arc(r,q,z,0,l,true);break;case"diamond":w.moveTo(r,q-z);
w.lineTo(r+z/3,q-z/3);w.lineTo(r+z,q);w.lineTo(r+z/3,q+z/3);w.lineTo(r,q+z);w.lineTo(r-z/3,q+z/3);w.lineTo(r-z,q);w.lineTo(r-z/3,q-z/3);w.lineTo(r,q-z);
break;default:w.rect(r-z,q-z,u,u)}}}w.closePath();if(A<(n-1)){switch(D.brushType){case"both":w.fill();D.lineWidth>0&&w.stroke();break;case"stroke":D.lineWidth>0&&w.stroke();
break;default:w.fill()}}}},getRect:function(l){return l.__rect||k.getRect(l)},isCover:h("./normalIsCover")};g.inherits(j,i);return j});d("zrender/loadingEffect/Ring",["require","./Base","../tool/util","../tool/color","../shape/Ring","../shape/Sector"],function(i){var j=i("./Base");
var g=i("../tool/util");var l=i("../tool/color");var h=i("../shape/Ring");var k=i("../shape/Sector");function f(m){j.call(this,m)}g.inherits(f,j);f.prototype._start=function(p,v){var o=g.merge(this.options,{textStyle:{color:"#07a"},backgroundColor:"rgba(250, 250, 250, 0.8)",effect:{x:this.canvasWidth/2,y:this.canvasHeight/2,r0:60,r:100,color:"#bbdcff",brushType:"fill",textPosition:"inside",textFont:"normal 30px verdana",textColor:"rgba(30, 144, 255, 0.6)",timeInterval:100}});
var q=o.effect;var s=o.textStyle;if(s.x==null){s.x=q.x}if(s.y==null){s.y=(q.y+(q.r0+q.r)/2-5)}var z=this.createTextShape(o.textStyle);var I=this.createBackgroundShape(o.backgroundColor);
var u=q.x;var t=q.y;var H=q.r0+6;var A=q.r-6;var E=q.color;var F=l.lift(E,0.1);var m=new h({highlightStyle:g.clone(q)});var B=[];var w=l.getGradientColors(["#ff6400","#ffe100","#97ff00"],25);
var J=15;var D=240;for(var G=0;G<16;G++){B.push(new k({highlightStyle:{x:u,y:t,r0:H,r:A,startAngle:D-J,endAngle:D,brushType:"fill",color:F},_color:l.getLinearGradient(u+H*Math.cos(D,true),t-H*Math.sin(D,true),u+H*Math.cos(D-J,true),t-H*Math.sin(D-J,true),[[0,w[G*2]],[1,w[G*2+1]]])}));
D-=J}D=360;for(var G=0;G<4;G++){B.push(new k({highlightStyle:{x:u,y:t,r0:H,r:A,startAngle:D-J,endAngle:D,brushType:"fill",color:F},_color:l.getLinearGradient(u+H*Math.cos(D,true),t-H*Math.sin(D,true),u+H*Math.cos(D-J,true),t-H*Math.sin(D-J,true),[[0,w[G*2+32]],[1,w[G*2+33]]])}));
D-=J}var C=0;if(o.progress!=null){p(I);C=this.adjust(o.progress,[0,1]).toFixed(2)*100/5;m.highlightStyle.text=C*5+"%";p(m);for(var G=0;G<20;G++){B[G].highlightStyle.color=G<C?B[G]._color:F;
p(B[G])}p(z);v();return}return setInterval(function(){p(I);C+=C>=20?-20:1;p(m);for(var n=0;n<20;n++){B[n].highlightStyle.color=n<C?B[n]._color:F;p(B[n])
}p(z);v()},q.timeInterval)};return f});d("zrender/shape/ShapeBundle",["require","./Base","../tool/util"],function(f){var g=f("./Base");var h=function(i){g.call(this,i)
};h.prototype={constructor:h,type:"shape-bundle",brush:function(j,n){var m=this.beforeBrush(j,n);j.beginPath();for(var l=0;l<m.shapeList.length;l++){var k=m.shapeList[l];
var o=k.style;if(n){o=k.getHighlightStyle(o,k.highlightStyle||{},k.brushTypeOnly)}k.buildPath(j,o)}switch(m.brushType){case"both":j.fill();case"stroke":m.lineWidth>0&&j.stroke();
break;default:j.fill()}this.drawText(j,m,this.style);this.afterBrush(j)},getRect:function(m){if(m.__rect){return m.__rect}var j=Infinity;var o=-Infinity;
var q=Infinity;var n=-Infinity;for(var l=0;l<m.shapeList.length;l++){var k=m.shapeList[l];var p=k.getRect(k.style);var j=Math.min(p.x,j);var q=Math.min(p.y,q);
var o=Math.max(p.x+p.width,o);var n=Math.max(p.y+p.height,n)}m.__rect={x:j,y:q,width:o-j,height:n-q};return m.__rect},isCover:function(j,n){var m=this.transformCoordToLocal(j,n);
j=m[0];n=m[1];if(this.isCoverRect(j,n)){for(var l=0;l<this.style.shapeList.length;l++){var k=this.style.shapeList[l];if(k.isCover(j,n)){return true}}}return false
}};f("../tool/util").inherits(h,g);return h});d("echarts/util/ecEffect",["require","../util/ecData","zrender/shape/Circle","zrender/shape/Image","zrender/tool/curve","../util/shape/Icon","../util/shape/Symbol","zrender/shape/ShapeBundle","zrender/shape/Polyline","zrender/tool/vector","zrender/tool/env"],function(m){var i=m("../util/ecData");
var h=m("zrender/shape/Circle");var g=m("zrender/shape/Image");var f=m("zrender/tool/curve");var k=m("../util/shape/Icon");var l=m("../util/shape/Symbol");
var r=m("zrender/shape/ShapeBundle");var o=m("zrender/shape/Polyline");var q=m("zrender/tool/vector");var p=m("zrender/tool/env").canvasSupported;function s(F,w,G,D){var I=G.effect;
var z=I.color||G.style.strokeColor||G.style.color;var E=I.shadowColor||z;var J=I.scaleSize;var v=I.bounceDistance;var C=typeof I.shadowBlur!="undefined"?I.shadowBlur:J;
var u;if(G.type!=="image"){u=new k({zlevel:D,style:{brushType:"stroke",iconType:G.style.iconType!="droplet"?G.style.iconType:"circle",x:C+1,y:C+1,n:G.style.n,width:G.style._width*J,height:G.style._height*J,lineWidth:1,strokeColor:z,shadowColor:E,shadowBlur:C},draggable:false,hoverable:false});
if(G.style.iconType=="pin"){u.style.y+=u.style.height/2*1.5}if(p){u.style.image=F.shapeToImage(u,u.style.width+C*2+2,u.style.height+C*2+2).style.image;
u=new g({zlevel:u.zlevel,style:u.style,draggable:false,hoverable:false})}}else{u=new g({zlevel:D,style:G.style,draggable:false,hoverable:false})}i.clone(G,u);
u.position=G.position;w.push(u);F.addShape(u);var H=G.type!=="image"?(window.devicePixelRatio||1):1;var B=(u.style.width/H-G.style._width)/2;u.style.x=G.style._x-B;
u.style.y=G.style._y-B;if(G.style.iconType=="pin"){u.style.y-=G.style.height/2*1.5}var y=(I.period+Math.random()*10)*100;F.modShape(G.id,{invisible:true});
var A=u.style.x+(u.style.width)/2/H;var x=u.style.y+(u.style.height)/2/H;if(I.type==="scale"){F.modShape(u.id,{scale:[0.1,0.1,A,x]});F.animate(u.id,"",I.loop).when(y,{scale:[1,1,A,x]}).done(function(){G.effect.show=false;
F.delShape(u.id)}).start()}else{F.animate(u.id,"style",I.loop).when(y,{y:u.style.y-v}).when(y*2,{y:u.style.y}).done(function(){G.effect.show=false;F.delShape(u.id)
}).start()}}function j(C,v,D,A){var H=D.effect;var x=H.color||D.style.strokeColor||D.style.color;var I=H.scaleSize;var B=H.shadowColor||x;var y=typeof H.shadowBlur!="undefined"?H.shadowBlur:(I*2);
var E=window.devicePixelRatio||1;var u=new l({zlevel:A,position:D.position,scale:D.scale,style:{pointList:D.style.pointList,iconType:D.style.iconType,color:x,strokeColor:x,shadowColor:B,shadowBlur:y*E,random:true,brushType:"fill",lineWidth:1,size:D.style.size},draggable:false,hoverable:false});
v.push(u);C.addShape(u);C.modShape(D.id,{invisible:true});var w=Math.round(H.period*100);var G={};var F={};for(var z=0;z<20;z++){u.style["randomMap"+z]=0;
G={};G["randomMap"+z]=100;F={};F["randomMap"+z]=0;u.style["randomMap"+z]=Math.random()*100;C.animate(u.id,"style",true).when(w,G).when(w*2,F).when(w*3,G).when(w*4,G).delay(Math.random()*w*z).start()
}}function t(y,w,x,v,D){var H=x.effect;var N=x.style;var P=H.color||N.strokeColor||N.color;var L=H.shadowColor||N.strokeColor||P;var K=N.lineWidth*H.scaleSize;
var I=typeof H.shadowBlur!="undefined"?H.shadowBlur:K;var F=new h({zlevel:v,style:{x:I,y:I,r:K,color:P,shadowColor:L,shadowBlur:I},hoverable:false});var E=0;
if(p&&!D){var v=F.zlevel;F=y.shapeToImage(F,(K+I)*2,(K+I)*2);F.zlevel=v;F.hoverable=false;E=I}if(!D){i.clone(x,F);F.position=x.position;w.push(F);y.addShape(F)
}var U=function(){if(!D){x.effect.show=false;y.delShape(F.id)}F.effectAnimator=null};if(x instanceof o){var J=[0];var M=0;var O=N.pointList;var T=N.controlPointList;
for(var Q=1;Q<O.length;Q++){if(T){var X=T[(Q-1)*2];var W=T[(Q-1)*2+1];M+=q.dist(O[Q-1],X)+q.dist(X,W)+q.dist(W,O[Q])}else{M+=q.dist(O[Q-1],O[Q])}J.push(M)
}var G={p:0};var Y=y.animation.animate(G,{loop:H.loop});for(var Q=0;Q<J.length;Q++){Y.when(J[Q]*H.period,{p:Q})}Y.during(function(){var ab=Math.floor(G.p);
var Z,ag;if(ab==O.length-1){Z=O[ab][0];ag=O[ab][1]}else{var aa=G.p-ab;var af=O[ab];var ae=O[ab+1];if(T){var ad=T[ab*2];var ac=T[ab*2+1];Z=f.cubicAt(af[0],ad[0],ac[0],ae[0],aa);
ag=f.cubicAt(af[1],ad[1],ac[1],ae[1],aa)}else{Z=(ae[0]-af[0])*aa+af[0];ag=(ae[1]-af[1])*aa+af[1]}}F.style.x=Z;F.style.y=ag;if(!D){y.modShape(F)}}).done(U).start();
Y.duration=M*H.period;F.effectAnimator=Y}else{var V=N.xStart-E;var B=N.yStart-E;var R=N.xEnd-E;var z=N.yEnd-E;F.style.x=V;F.style.y=B;var C=(R-V)*(R-V)+(z-B)*(z-B);
var u=Math.round(Math.sqrt(Math.round(C*H.period*H.period)));if(x.style.curveness>0){var S=N.cpX1-E;var A=N.cpY1-E;F.effectAnimator=y.animation.animate(F,{loop:H.loop}).when(u,{p:1}).during(function(aa,Z){F.style.x=f.quadraticAt(V,S,R,Z);
F.style.y=f.quadraticAt(B,A,z,Z);if(!D){y.modShape(F)}}).done(U).start()}else{F.effectAnimator=y.animation.animate(F.style,{loop:H.loop}).when(u,{x:R,y:z}).during(function(){if(!D){y.modShape(F)
}}).done(U).start()}F.effectAnimator.duration=u}return F}function n(E,x,F,C){var w=new r({style:{shapeList:[]},zlevel:C,hoverable:false});var z=F.style.shapeList;
var I=F.effect;w.position=F.position;var A=0;var H=[];for(var B=0;B<z.length;B++){z[B].effect=I;var u=t(E,null,z[B],C,true);var D=u.effectAnimator;w.style.shapeList.push(u);
if(D.duration>A){A=D.duration}if(B===0){w.style.color=u.style.color;w.style.shadowBlur=u.style.shadowBlur;w.style.shadowColor=u.style.shadowColor}H.push(D)
}x.push(w);E.addShape(w);var v=function(){for(var J=0;J<H.length;J++){H[J].stop()}};if(A){w.__dummy=0;var y=E.animate(w.id,"",I.loop).when(A,{__dummy:1}).during(function(){E.modShape(w)
}).done(function(){F.effect.show=false;E.delShape(w.id)}).start();var G=y.stop;y.stop=function(){v();G.call(this)}}}return{point:s,largePoint:j,line:t,largeLine:n}
});d("echarts/util/accMath",[],function(){function i(n,k){var o=n.toString();var l=k.toString();var j=0;try{j=l.split(".")[1].length}catch(p){}try{j-=o.split(".")[1].length
}catch(p){}return(o.replace(".","")-0)/(l.replace(".","")-0)*Math.pow(10,j)}function h(n,k){var o=n.toString();var l=k.toString();var j=0;try{j+=o.split(".")[1].length
}catch(p){}try{j+=l.split(".")[1].length}catch(p){}return(o.replace(".","")-0)*(l.replace(".","")-0)/Math.pow(10,j)}function g(o,n){var l=0;var k=0;try{l=o.toString().split(".")[1].length
}catch(p){}try{k=n.toString().split(".")[1].length}catch(p){}var j=Math.pow(10,Math.max(l,k));return(Math.round(o*j)+Math.round(n*j))/j}function f(k,j){return g(k,-j)
}return{accDiv:i,accMul:h,accAdd:g,accSub:f}});d("echarts/component/base",["require","../config","../util/ecData","../util/ecQuery","../util/number","zrender/tool/util","zrender/tool/env"],function(h){var f=h("../config");
var k=h("../util/ecData");var j=h("../util/ecQuery");var l=h("../util/number");var g=h("zrender/tool/util");function i(q,m,r,p,o){this.ecTheme=q;this.messageCenter=m;
this.zr=r;this.option=p;this.series=p.series;this.myChart=o;this.component=o.component;this.shapeList=[];this.effectList=[];var n=this;n._onlegendhoverlink=function(v){if(n.legendHoverLink){var u=v.target;
var s;for(var t=n.shapeList.length-1;t>=0;t--){s=n.type==f.CHART_TYPE_PIE||n.type==f.CHART_TYPE_FUNNEL?k.get(n.shapeList[t],"name"):(k.get(n.shapeList[t],"series")||{}).name;
if(s==u&&!n.shapeList[t].invisible&&!n.shapeList[t].__animating){n.zr.addHoverShape(n.shapeList[t])}}}};m&&m.bind(f.EVENT.LEGEND_HOVERLINK,this._onlegendhoverlink)
}i.prototype={canvasSupported:h("zrender/tool/env").canvasSupported,_getZ:function(m){if(this[m]!=null){return this[m]}var n=this.ecTheme[this.type];if(n&&n[m]!=null){return n[m]
}n=f[this.type];if(n&&n[m]!=null){return n[m]}return 0},getZlevelBase:function(){return this._getZ("zlevel")},getZBase:function(){return this._getZ("z")
},reformOption:function(m){m=g.merge(g.merge(m||{},g.clone(this.ecTheme[this.type]||{})),g.clone(f[this.type]||{}));this.z=m.z;this.zlevel=m.zlevel;return m
},reformCssArray:function(m){if(m instanceof Array){switch(m.length+""){case"4":return m;case"3":return[m[0],m[1],m[2],m[1]];case"2":return[m[0],m[1],m[0],m[1]];
case"1":return[m[0],m[0],m[0],m[0]];case"0":return[0,0,0,0]}}else{return[m,m,m,m]}},getShapeById:function(o){for(var n=0,m=this.shapeList.length;n<m;n++){if(this.shapeList[n].id===o){return this.shapeList[n]
}}return null},getFont:function(n){var m=this.getTextStyle(g.clone(n));return m.fontStyle+" "+m.fontWeight+" "+m.fontSize+"px "+m.fontFamily},getTextStyle:function(m){return g.merge(g.merge(m||{},this.ecTheme.textStyle),f.textStyle)
},getItemStyleColor:function(o,m,n,p){return typeof o==="function"?o.call(this.myChart,{seriesIndex:m,series:this.series[m],dataIndex:n,data:p}):o},getDataFromOption:function(n,m){return n!=null?(n.value!=null?n.value:n):m
},subPixelOptimize:function(n,m){if(m%2===1){n=Math.floor(n)+0.5}else{n=Math.round(n)}return n},resize:function(){this.refresh&&this.refresh();this.clearEffectShape&&this.clearEffectShape(true);
var m=this;setTimeout(function(){m.animationEffect&&m.animationEffect()},200)},clear:function(){this.clearEffectShape&&this.clearEffectShape();this.zr&&this.zr.delShape(this.shapeList);
this.shapeList=[]},dispose:function(){this.onbeforDispose&&this.onbeforDispose();this.clear();this.shapeList=null;this.effectList=null;this.messageCenter&&this.messageCenter.unbind(f.EVENT.LEGEND_HOVERLINK,this._onlegendhoverlink);
this.onafterDispose&&this.onafterDispose()},query:j.query,deepQuery:j.deepQuery,deepMerge:j.deepMerge,parsePercent:l.parsePercent,parseCenter:l.parseCenter,parseRadius:l.parseRadius,numAddCommas:l.addCommas};
return i});d("echarts/util/ecAnimation",["require","zrender/tool/util","zrender/tool/curve","zrender/shape/Polygon"],function(k){var m=k("zrender/tool/util");
var f=k("zrender/tool/curve");function h(C,G,H,A,D){var I=H.style.pointList;var v=I.length;var z;if(!G){z=[];if(H._orient!="vertical"){var E=I[0][1];for(var B=0;
B<v;B++){z[B]=[I[B][0],E]}}else{var F=I[0][0];for(var B=0;B<v;B++){z[B]=[F,I[B][1]]}}if(H.type=="half-smooth-polygon"){z[v-1]=m.clone(I[v-1]);z[v-2]=m.clone(I[v-2])
}G={style:{pointList:z}}}z=G.style.pointList;var w=z.length;if(w==v){H.style.pointList=z}else{if(w<v){H.style.pointList=z.concat(I.slice(w))}else{H.style.pointList=z.slice(0,v)
}}C.addShape(H);H.__animating=true;C.animate(H.id,"style").when(A,{pointList:I}).during(function(){if(H.updateControlPoints){H.updateControlPoints(H.style)
}}).done(function(){H.__animating=false}).start(D)}function s(y,x){var v=arguments.length;for(var w=2;w<v;w++){var z=arguments[w];y.style[z]=x.style[z]
}}function q(B,D,E,z,C){var x=E.style;if(!D){D={position:E.position,style:{x:x.x,y:E._orient=="vertical"?x.y+x.height:x.y,width:E._orient=="vertical"?x.width:0,height:E._orient!="vertical"?x.height:0}}
}var w=x.x;var F=x.y;var A=x.width;var v=x.height;var y=[E.position[0],E.position[1]];s(E,D,"x","y","width","height");E.position=D.position;B.addShape(E);
if(y[0]!=D.position[0]||y[1]!=D.position[1]){B.animate(E.id,"").when(z,{position:y}).start(C)}E.__animating=true;B.animate(E.id,"style").when(z,{x:w,y:F,width:A,height:v}).done(function(){E.__animating=false
}).start(C)}function g(z,A,v,x,C){if(!A){var B=v.style.y;A={style:{y:[B[0],B[0],B[0],B[0]]}}}var w=v.style.y;v.style.y=A.style.y;z.addShape(v);v.__animating=true;
z.animate(v.id,"style").when(x,{y:w}).done(function(){v.__animating=false}).start(C)}function n(A,E,F,z,B){var D=F.style.x;var C=F.style.y;var w=F.style.r0;
var v=F.style.r;F.__animating=true;if(F._animationAdd!="r"){F.style.r0=0;F.style.r=0;F.rotation=[Math.PI*2,D,C];A.addShape(F);A.animate(F.id,"style").when(z,{r0:w,r:v}).done(function(){F.__animating=false
}).start(B);A.animate(F.id,"").when(z,{rotation:[0,D,C]}).start(B)}else{F.style.r0=F.style.r;A.addShape(F);A.animate(F.id,"style").when(z,{r0:w}).done(function(){F.__animating=false
}).start(B)}}function l(z,A,w,y,B){if(!A){if(w._animationAdd!="r"){A={style:{startAngle:w.style.startAngle,endAngle:w.style.startAngle}}}else{A={style:{r0:w.style.r}}
}}var x=w.style.startAngle;var v=w.style.endAngle;s(w,A,"startAngle","endAngle");z.addShape(w);w.__animating=true;z.animate(w.id,"style").when(y,{startAngle:x,endAngle:v}).done(function(){w.__animating=false
}).start(B)}function t(A,B,w,z,D){if(!B){B={style:{x:w.style.textAlign=="left"?w.style.x+100:w.style.x-100,y:w.style.y}}}var v=w.style.x;var C=w.style.y;
s(w,B,"x","y");A.addShape(w);w.__animating=true;A.animate(w.id,"style").when(z,{x:v,y:C}).done(function(){w.__animating=false}).start(D)}function p(B,C,w,A,E){var z=k("zrender/shape/Polygon").prototype.getRect(w.style);
var v=z.x+z.width/2;var D=z.y+z.height/2;w.scale=[0.1,0.1,v,D];B.addShape(w);w.__animating=true;B.animate(w.id,"").when(A,{scale:[1,1,v,D]}).done(function(){w.__animating=false
}).start(E)}function j(y,A,B,v,z){if(!A){A={style:{source0:0,source1:B.style.source1>0?360:-360,target0:0,target1:B.style.target1>0?360:-360}}}var D=B.style.source0;
var C=B.style.source1;var x=B.style.target0;var w=B.style.target1;if(A.style){s(B,A,"source0","source1","target0","target1")}y.addShape(B);B.__animating=true;
y.animate(B.id,"style").when(v,{source0:D,source1:C,target0:x,target1:w}).done(function(){B.__animating=false}).start(z)}function i(x,z,v,w,A){if(!z){z={style:{angle:v.style.startAngle}}
}var y=v.style.angle;v.style.angle=z.style.angle;x.addShape(v);v.__animating=true;x.animate(v.id,"style").when(w,{angle:y}).done(function(){v.__animating=false
}).start(A)}function o(B,C,z,A,E,w){z.style._x=z.style.x;z.style._y=z.style.y;z.style._width=z.style.width;z.style._height=z.style.height;if(!C){var v=z._x||0;
var D=z._y||0;z.scale=[0.01,0.01,v,D];B.addShape(z);z.__animating=true;B.animate(z.id,"").delay(w).when(A,{scale:[1,1,v,D]}).done(function(){z.__animating=false
}).start(E||"QuinticOut")}else{q(B,C,z,A,E)}}function u(x,B,C,w,y){if(!B){B={style:{xStart:C.style.xStart,yStart:C.style.yStart,xEnd:C.style.xStart,yEnd:C.style.yStart}}
}var z=C.style.xStart;var v=C.style.xEnd;var D=C.style.yStart;var A=C.style.yEnd;s(C,B,"xStart","xEnd","yStart","yEnd");x.addShape(C);C.__animating=true;
x.animate(C.id,"style").when(w,{xStart:z,xEnd:v,yStart:D,yEnd:A}).done(function(){C.__animating=false}).start(y)}function r(D,J,L,z,E){E=E||"QuinticOut";
L.__animating=true;D.addShape(L);var y=L.style;var K=function(){L.__animating=false};var x=y.xStart;var I=y.yStart;var v=y.xEnd;var F=y.yEnd;if(y.curveness>0){L.updatePoints(y);
var B={p:0};var w=y.cpX1;var H=y.cpY1;var G=[];var C=[];var A=f.quadraticSubdivide;D.animation.animate(B).when(z,{p:1}).during(function(){A(x,w,v,B.p,G);
A(I,H,F,B.p,C);y.cpX1=G[1];y.cpY1=C[1];y.xEnd=G[2];y.yEnd=C[2];D.modShape(L)}).done(K).start(E)}else{D.animate(L.id,"style").when(0,{xEnd:x,yEnd:I}).when(z,{xEnd:v,yEnd:F}).done(K).start(E)
}}return{pointList:h,rectangle:q,candle:g,ring:n,sector:l,text:t,polygon:p,ribbon:j,gaugePointer:i,icon:o,line:u,markline:r}});d("zrender/tool/area",["require","./util","./curve"],function(o){var h=o("./util");
var C=o("./curve");var K;var f={};var r={};var A=0;var u=0;var q=5000;var g=Math.PI*2;function l(O){O%=g;if(O<0){O+=g}return O}function j(P,Q,O,U){if(!Q||!P){return false
}var T=P.type;K=K||h.getContext();var S=N(P,Q,O,U);if(typeof S!="undefined"){return S}if(P.buildPath&&K.isPointInPath){return z(P,K,Q,O,U)}switch(T){case"ellipse":return true;
case"trochoid":var R=Q.location=="out"?Q.r1+Q.r2+Q.d:Q.r1-Q.r2+Q.d;return x(Q,O,U,R);case"rose":return x(Q,O,U,Q.maxr);default:return false}}function N(Q,T,O,V){var U=Q.type;
switch(U){case"bezier-curve":if(typeof(T.cpX2)==="undefined"){return F(T.xStart,T.yStart,T.cpX1,T.cpY1,T.xEnd,T.yEnd,T.lineWidth,O,V)}return J(T.xStart,T.yStart,T.cpX1,T.cpY1,T.cpX2,T.cpY2,T.xEnd,T.yEnd,T.lineWidth,O,V);
case"line":return H(T.xStart,T.yStart,T.xEnd,T.yEnd,T.lineWidth,O,V);case"polyline":return v(T.pointList,T.lineWidth,O,V);case"ring":return B(T.x,T.y,T.r0,T.r,O,V);
case"circle":return x(T.x,T.y,T.r,O,V);case"sector":var R=T.startAngle*Math.PI/180;var P=T.endAngle*Math.PI/180;if(!T.clockWise){R=-R;P=-P}return t(T.x,T.y,T.r0,T.r,R,P,!T.clockWise,O,V);
case"path":return T.pathArray&&M(T.pathArray,Math.max(T.lineWidth,5),T.brushType,O,V);case"polygon":case"star":case"isogon":return G(T.pointList,O,V);case"text":var S=T.__rect||Q.getRect(T);
return m(S.x,S.y,S.width,S.height,O,V);case"rectangle":case"image":return m(T.x,T.y,T.width,T.height,O,V)}}function z(P,Q,R,O,S){Q.beginPath();P.buildPath(Q,R);
Q.closePath();return Q.isPointInPath(O,S)}function L(P,Q,O,R){return !j(P,Q,O,R)}function H(P,Y,O,W,S,X,V){if(S===0){return false}var Q=Math.max(S,5);var U=0;
var T=P;if((V>Y+Q&&V>W+Q)||(V<Y-Q&&V<W-Q)||(X>P+Q&&X>O+Q)||(X<P-Q&&X<O-Q)){return false}if(P!==O){U=(Y-W)/(P-O);T=(P*W-O*Y)/(P-O)}else{return Math.abs(X-P)<=Q/2
}var R=U*X-V+T;var Z=R*R/(U*U+1);return Z<=Q/2*Q/2}function J(R,aa,Q,Z,P,X,O,V,T,Y,W){if(T===0){return false}var S=Math.max(T,5);if((W>aa+S&&W>Z+S&&W>X+S&&W>V+S)||(W<aa-S&&W<Z-S&&W<X-S&&W<V-S)||(Y>R+S&&Y>Q+S&&Y>P+S&&Y>O+S)||(Y<R-S&&Y<Q-S&&Y<P-S&&Y<O-S)){return false
}var U=C.cubicProjectPoint(R,aa,Q,Z,P,X,O,V,Y,W,null);return U<=S/2}function F(Q,Y,P,W,O,V,S,X,U){if(S===0){return false}var R=Math.max(S,5);if((U>Y+R&&U>W+R&&U>V+R)||(U<Y-R&&U<W-R&&U<V-R)||(X>Q+R&&X>P+R&&X>O+R)||(X<Q-R&&X<P-R&&X<O-R)){return false
}var T=C.quadraticProjectPoint(Q,Y,P,W,O,V,X,U,null);return T<=R/2}function y(U,T,O,X,P,R,W,aa,Z){if(W===0){return false}var Q=Math.max(W,5);aa-=U;Z-=T;
var Y=Math.sqrt(aa*aa+Z*Z);if((Y-Q>O)||(Y+Q<O)){return false}if(Math.abs(X-P)>=g){return true}if(R){var V=X;X=l(P);P=l(V)}else{X=l(X);P=l(P)}if(X>P){P+=g
}var S=Math.atan2(Z,aa);if(S<0){S+=g}return(S>=X&&S<=P)||(S+g>=X&&S+g<=P)}function v(X,S,V,T){var S=Math.max(S,10);for(var R=0,Q=X.length-1;R<Q;R++){var P=X[R][0];
var W=X[R][1];var O=X[R+1][0];var U=X[R+1][1];if(H(P,W,O,U,S,V,T)){return true}}return false}function B(P,U,Q,R,O,T){var S=(O-P)*(O-P)+(T-U)*(T-U);return(S<R*R)&&(S>Q*Q)
}function m(Q,S,R,P,O,T){return O>=Q&&O<=(Q+R)&&T>=S&&T<=(S+P)}function x(P,R,Q,O,S){return(O-P)*(O-P)+(S-R)*(S-R)<Q*Q}function t(T,S,R,O,U,P,Q,W,V){return y(T,S,(R+O)/2,U,P,Q,O-R,W,V)
}function G(Y,V,T){var S=Y.length;var X=0;for(var R=0,Q=S-1;R<S;R++){var P=Y[Q][0];var W=Y[Q][1];var O=Y[R][0];var U=Y[R][1];X+=s(P,W,O,U,V,T);Q=R}return X!==0
}function s(Q,V,P,T,U,S){if((S>V&&S>T)||(S<V&&S<T)){return 0}if(T==V){return 0}var R=T<V?1:-1;var W=(S-V)/(T-V);var O=W*(P-Q)+Q;return O>U?R:0}var k=[-1,-1,-1];
var E=[-1,-1];function w(){var O=E[0];E[0]=E[1];E[1]=O}function D(af,S,ad,R,ac,Q,ab,P,V,U){if((U>S&&U>R&&U>Q&&U>P)||(U<S&&U<R&&U<Q&&U<P)){return 0}var O=C.cubicRootAt(S,R,Q,P,U,k);
if(O===0){return 0}else{var W=0;var Z=-1;var T,Y;for(var aa=0;aa<O;aa++){var X=k[aa];var ae=C.cubicAt(af,ad,ac,ab,X);if(ae<V){continue}if(Z<0){Z=C.cubicExtrema(S,R,Q,P,E);
if(E[1]<E[0]&&Z>1){w()}T=C.cubicAt(S,R,Q,P,E[0]);if(Z>1){Y=C.cubicAt(S,R,Q,P,E[1])}}if(Z==2){if(X<E[0]){W+=T<S?1:-1}else{if(X<E[1]){W+=Y<T?1:-1}else{W+=P<Y?1:-1
}}}else{if(X<E[0]){W+=T<S?1:-1}else{W+=P<T?1:-1}}}return W}}function I(R,aa,Q,X,O,V,Y,U){if((U>aa&&U>X&&U>V)||(U<aa&&U<X&&U<V)){return 0}var T=C.quadraticRootAt(aa,X,V,U,k);
if(T===0){return 0}else{var ab=C.quadraticExtremum(aa,X,V);if(ab>=0&&ab<=1){var Z=0;var W=C.quadraticAt(aa,X,V,ab);for(var S=0;S<T;S++){var P=C.quadraticAt(R,Q,O,k[S]);
if(P<Y){continue}if(k[S]<ab){Z+=W<aa?1:-1}else{Z+=V<W?1:-1}}return Z}else{var P=C.quadraticAt(R,Q,O,k[0]);if(P<Y){return 0}return V<aa?1:-1}}}function p(V,U,O,Y,Q,S,aa,Z){Z-=U;
if(Z>O||Z<-O){return 0}var X=Math.sqrt(O*O-Z*Z);k[0]=-X;k[1]=X;if(Math.abs(Y-Q)>=g){Y=0;Q=g;var R=S?1:-1;if(aa>=k[0]+V&&aa<=k[1]+V){return R}else{return 0
}}if(S){var X=Y;Y=l(Q);Q=l(X)}else{Y=l(Y);Q=l(Q)}if(Y>Q){Q+=g}var ab=0;for(var W=0;W<2;W++){var P=k[W];if(P+V>aa){var T=Math.atan2(Z,P);var R=S?1:-1;if(T<0){T=g+T
}if((T>=Y&&T<=Q)||(T+g>=Y&&T+g<=Q)){if(T>Math.PI/2&&T<Math.PI*1.5){R=-R}ab+=R}}}return ab}function M(af,P,W,Z,Y){var ab=0;var ad=0;var an=0;var al=0;var T=0;
var O=true;var aa=true;W=W||"fill";var am=W==="stroke"||W==="both";var ac=W==="fill"||W==="both";for(var ag=0;ag<af.length;ag++){var aj=af[ag];var ae=aj.points;
if(O||aj.command==="M"){if(ag>0){if(ac){ab+=s(ad,an,al,T,Z,Y)}if(ab!==0){return true}}al=ae[ae.length-2];T=ae[ae.length-1];O=false;if(aa&&aj.command!=="A"){aa=false;
ad=al;an=T}}switch(aj.command){case"M":ad=ae[0];an=ae[1];break;case"L":if(am){if(H(ad,an,ae[0],ae[1],P,Z,Y)){return true}}if(ac){ab+=s(ad,an,ae[0],ae[1],Z,Y)
}ad=ae[0];an=ae[1];break;case"C":if(am){if(J(ad,an,ae[0],ae[1],ae[2],ae[3],ae[4],ae[5],P,Z,Y)){return true}}if(ac){ab+=D(ad,an,ae[0],ae[1],ae[2],ae[3],ae[4],ae[5],Z,Y)
}ad=ae[4];an=ae[5];break;case"Q":if(am){if(F(ad,an,ae[0],ae[1],ae[2],ae[3],P,Z,Y)){return true}}if(ac){ab+=I(ad,an,ae[0],ae[1],ae[2],ae[3],Z,Y)}ad=ae[2];
an=ae[3];break;case"A":var S=ae[0];var Q=ae[1];var V=ae[2];var U=ae[3];var X=ae[4];var ak=ae[5];var ai=Math.cos(X)*V+S;var R=Math.sin(X)*U+Q;if(!aa){ab+=s(ad,an,ai,R)
}else{aa=false;al=ai;T=R}var ah=(Z-S)*U/V+S;if(am){if(y(S,Q,U,X,X+ak,1-ae[7],P,ah,Y)){return true}}if(ac){ab+=p(S,Q,U,X,X+ak,1-ae[7],ah,Y)}ad=Math.cos(X+ak)*V+S;
an=Math.sin(X+ak)*U+Q;break;case"z":if(am){if(H(ad,an,al,T,P,Z,Y)){return true}}O=true;break}}if(ac){ab+=s(ad,an,al,T,Z,Y)}return ab!==0}function n(T,S){var Q=T+":"+S;
if(f[Q]){return f[Q]}K=K||h.getContext();K.save();if(S){K.font=S}T=(T+"").split("\n");var R=0;for(var P=0,O=T.length;P<O;P++){R=Math.max(K.measureText(T[P]).width,R)
}K.restore();f[Q]=R;if(++A>q){A=0;f={}}return R}function i(R,Q){var P=R+":"+Q;if(r[P]){return r[P]}K=K||h.getContext();K.save();if(Q){K.font=Q}R=(R+"").split("\n");
var O=(K.measureText("国").width+2)*R.length;K.restore();r[P]=O;if(++u>q){u=0;r={}}return O}return{isInside:j,isOutside:L,getTextWidth:n,getTextHeight:i,isInsidePath:M,isInsidePolygon:G,isInsideSector:t,isInsideCircle:x,isInsideLine:H,isInsideRect:m,isInsidePolyline:v,isInsideCubicStroke:J,isInsideQuadraticStroke:F}
});d("zrender/dep/excanvas",["require"],function(f){if(!document.createElement("canvas").getContext){(function(){var ah=Math;var u=ah.round;var t=ah.sin;
var G=ah.cos;var N=ah.abs;var T=ah.sqrt;var l=10;var o=l/2;var F=+navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];function E(){return this.context_||(this.context_=new J(this))
}var z=Array.prototype.slice;function q(j,m,p){var i=z.call(arguments,2);return function(){return j.apply(m,i.concat(z.call(arguments)))}}function al(i){return String(i).replace(/&/g,"&amp;").replace(/"/g,"&quot;")
}function af(m,j,i){if(!m.namespaces[j]){m.namespaces.add(j,i,"#default#VML")}}function X(j){af(j,"g_vml_","urn:schemas-microsoft-com:vml");af(j,"g_o_","urn:schemas-microsoft-com:office:office");
if(!j.styleSheets.ex_canvas_){var i=j.createStyleSheet();i.owningElement.id="ex_canvas_";i.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
}}X(document);var n={init:function(i){var j=i||document;j.createElement("canvas");j.attachEvent("onreadystatechange",q(this.init_,this,j))},init_:function(p){var m=p.getElementsByTagName("canvas");
for(var j=0;j<m.length;j++){this.initElement(m[j])}},initElement:function(j){if(!j.getContext){j.getContext=E;X(j.ownerDocument);j.innerHTML="";j.attachEvent("onpropertychange",D);
j.attachEvent("onresize",ad);var i=j.attributes;if(i.width&&i.width.specified){j.style.width=i.width.nodeValue+"px"}else{j.width=j.clientWidth}if(i.height&&i.height.specified){j.style.height=i.height.nodeValue+"px"
}else{j.height=j.clientHeight}}return j}};function D(j){var i=j.srcElement;switch(j.propertyName){case"width":i.getContext().clearRect();i.style.width=i.attributes.width.nodeValue+"px";
i.firstChild.style.width=i.clientWidth+"px";break;case"height":i.getContext().clearRect();i.style.height=i.attributes.height.nodeValue+"px";i.firstChild.style.height=i.clientHeight+"px";
break}}function ad(j){var i=j.srcElement;if(i.firstChild){i.firstChild.style.width=i.clientWidth+"px";i.firstChild.style.height=i.clientHeight+"px"}}n.init();
var s=[];for(var ak=0;ak<16;ak++){for(var aj=0;aj<16;aj++){s[ak*16+aj]=ak.toString(16)+aj.toString(16)}}function H(){return[[1,0,0],[0,1,0],[0,0,1]]}function P(p,m){var j=H();
for(var i=0;i<3;i++){for(var an=0;an<3;an++){var Z=0;for(var am=0;am<3;am++){Z+=p[i][am]*m[am][an]}j[i][an]=Z}}return j}function B(j,i){i.fillStyle=j.fillStyle;
i.lineCap=j.lineCap;i.lineJoin=j.lineJoin;i.lineWidth=j.lineWidth;i.miterLimit=j.miterLimit;i.shadowBlur=j.shadowBlur;i.shadowColor=j.shadowColor;i.shadowOffsetX=j.shadowOffsetX;
i.shadowOffsetY=j.shadowOffsetY;i.strokeStyle=j.strokeStyle;i.globalAlpha=j.globalAlpha;i.font=j.font;i.textAlign=j.textAlign;i.textBaseline=j.textBaseline;
i.scaleX_=j.scaleX_;i.scaleY_=j.scaleY_;i.lineScale_=j.lineScale_}var h={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",grey:"#808080",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",oldlace:"#FDF5E6",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",whitesmoke:"#F5F5F5",yellowgreen:"#9ACD32"};
function S(j){var p=j.indexOf("(",3);var i=j.indexOf(")",p+1);var m=j.substring(p+1,i).split(",");if(m.length!=4||j.charAt(3)!="a"){m[3]=1}return m}function k(i){return parseFloat(i)/100
}function x(j,m,i){return Math.min(i,Math.max(m,j))}function O(am){var i,ao,ap,an,aq,Z;an=parseFloat(am[0])/360%360;if(an<0){an++}aq=x(k(am[1]),0,1);Z=x(k(am[2]),0,1);
if(aq==0){i=ao=ap=Z}else{var j=Z<0.5?Z*(1+aq):Z+aq-Z*aq;var m=2*Z-j;i=g(m,j,an+1/3);ao=g(m,j,an);ap=g(m,j,an-1/3)}return"#"+s[Math.floor(i*255)]+s[Math.floor(ao*255)]+s[Math.floor(ap*255)]
}function g(j,i,m){if(m<0){m++}if(m>1){m--}if(6*m<1){return j+(i-j)*6*m}else{if(2*m<1){return i}else{if(3*m<2){return j+(i-j)*(2/3-m)*6}else{return j}}}}var I={};
function L(j){if(j in I){return I[j]}var am,Z=1;j=String(j);if(j.charAt(0)=="#"){am=j}else{if(/^rgb/.test(j)){var p=S(j);var am="#",an;for(var m=0;m<3;
m++){if(p[m].indexOf("%")!=-1){an=Math.floor(k(p[m])*255)}else{an=+p[m]}am+=s[x(an,0,255)]}Z=+p[3]}else{if(/^hsl/.test(j)){var p=S(j);am=O(p);Z=p[3]}else{am=h[j]||j
}}}return I[j]={color:am,alpha:Z}}var v={style:"normal",variant:"normal",weight:"normal",size:12,family:"微软雅黑"};var R={};function K(j){if(R[j]){return R[j]
}var Z=document.createElement("div");var p=Z.style;var i;try{p.font=j;i=p.fontFamily.split(",")[0]}catch(m){}return R[j]={style:p.fontStyle||v.style,variant:p.fontVariant||v.variant,weight:p.fontWeight||v.weight,size:p.fontSize||v.size,family:i||v.family}
}function A(m,j){var i={};for(var an in m){i[an]=m[an]}var am=parseFloat(j.currentStyle.fontSize),Z=parseFloat(m.size);if(typeof m.size=="number"){i.size=m.size
}else{if(m.size.indexOf("px")!=-1){i.size=Z}else{if(m.size.indexOf("em")!=-1){i.size=am*Z}else{if(m.size.indexOf("%")!=-1){i.size=(am/100)*Z}else{if(m.size.indexOf("pt")!=-1){i.size=Z/0.75
}else{i.size=am}}}}}return i}function ai(i){return i.style+" "+i.variant+" "+i.weight+" "+i.size+"px '"+i.family+"'"}var y={butt:"flat",round:"round"};
function Y(i){return y[i]||"square"}function J(i){this.m_=H();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.strokeStyle="#000";this.fillStyle="#000";
this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=l*1;this.globalAlpha=1;this.font="12px 微软雅黑";this.textAlign="left";this.textBaseline="alphabetic";
this.canvas=i;var m="width:"+i.clientWidth+"px;height:"+i.clientHeight+"px;overflow:hidden;position:absolute";var j=i.ownerDocument.createElement("div");
j.style.cssText=m;i.appendChild(j);var p=j.cloneNode(false);p.style.backgroundColor="#fff";p.style.filter="alpha(opacity=0)";i.appendChild(p);this.element_=j;
this.scaleX_=1;this.scaleY_=1;this.lineScale_=1}var w=J.prototype;w.clearRect=function(){if(this.textMeasureEl_){this.textMeasureEl_.removeNode(true);this.textMeasureEl_=null
}this.element_.innerHTML=""};w.beginPath=function(){this.currentPath_=[]};w.moveTo=function(j,i){var m=ac(this,j,i);this.currentPath_.push({type:"moveTo",x:m.x,y:m.y});
this.currentX_=m.x;this.currentY_=m.y};w.lineTo=function(j,i){var m=ac(this,j,i);this.currentPath_.push({type:"lineTo",x:m.x,y:m.y});this.currentX_=m.x;
this.currentY_=m.y};w.bezierCurveTo=function(m,j,aq,ap,ao,am){var i=ac(this,ao,am);var an=ac(this,m,j);var Z=ac(this,aq,ap);Q(this,an,Z,i)};function Q(i,Z,m,j){i.currentPath_.push({type:"bezierCurveTo",cp1x:Z.x,cp1y:Z.y,cp2x:m.x,cp2y:m.y,x:j.x,y:j.y});
i.currentX_=j.x;i.currentY_=j.y}w.quadraticCurveTo=function(ao,m,j,i){var an=ac(this,ao,m);var am=ac(this,j,i);var ap={x:this.currentX_+2/3*(an.x-this.currentX_),y:this.currentY_+2/3*(an.y-this.currentY_)};
var Z={x:ap.x+(am.x-this.currentX_)/3,y:ap.y+(am.y-this.currentY_)/3};Q(this,ap,Z,am)};w.arc=function(ar,ap,aq,am,j,m){aq*=l;var aw=m?"at":"wa";var at=ar+G(am)*aq-o;
var av=ap+t(am)*aq-o;var i=ar+G(j)*aq-o;var au=ap+t(j)*aq-o;if(at==i&&!m){at+=0.125}var Z=ac(this,ar,ap);var ao=ac(this,at,av);var an=ac(this,i,au);this.currentPath_.push({type:aw,x:Z.x,y:Z.y,radius:aq,xStart:ao.x,yStart:ao.y,xEnd:an.x,yEnd:an.y})
};w.rect=function(m,j,i,p){this.moveTo(m,j);this.lineTo(m+i,j);this.lineTo(m+i,j+p);this.lineTo(m,j+p);this.closePath()};w.strokeRect=function(m,j,i,p){var Z=this.currentPath_;
this.beginPath();this.moveTo(m,j);this.lineTo(m+i,j);this.lineTo(m+i,j+p);this.lineTo(m,j+p);this.closePath();this.stroke();this.currentPath_=Z};w.fillRect=function(m,j,i,p){var Z=this.currentPath_;
this.beginPath();this.moveTo(m,j);this.lineTo(m+i,j);this.lineTo(m+i,j+p);this.lineTo(m,j+p);this.closePath();this.fill();this.currentPath_=Z};w.createLinearGradient=function(j,p,i,m){var Z=new ab("gradient");
Z.x0_=j;Z.y0_=p;Z.x1_=i;Z.y1_=m;return Z};w.createRadialGradient=function(p,am,m,j,Z,i){var an=new ab("gradientradial");an.x0_=p;an.y0_=am;an.r0_=m;an.x1_=j;
an.y1_=Z;an.r1_=i;return an};w.drawImage=function(ax,m){var ap,an,ar,aE,av,at,az,aI;var aq=ax.runtimeStyle.width;var aw=ax.runtimeStyle.height;ax.runtimeStyle.width="auto";
ax.runtimeStyle.height="auto";var ao=ax.width;var aC=ax.height;ax.runtimeStyle.width=aq;ax.runtimeStyle.height=aw;if(arguments.length==3){ap=arguments[1];
an=arguments[2];av=at=0;az=ar=ao;aI=aE=aC}else{if(arguments.length==5){ap=arguments[1];an=arguments[2];ar=arguments[3];aE=arguments[4];av=at=0;az=ao;aI=aC
}else{if(arguments.length==9){av=arguments[1];at=arguments[2];az=arguments[3];aI=arguments[4];ap=arguments[5];an=arguments[6];ar=arguments[7];aE=arguments[8]
}else{throw Error("Invalid number of arguments")}}}var aF=ac(this,ap,an);var p=az/2;var j=aI/2;var aD=[];var i=10;var am=10;var aH=aG=1;aD.push(" <g_vml_:group",' coordsize="',l*i,",",l*am,'"',' coordorigin="0,0"',' style="width:',i,"px;height:",am,"px;position:absolute;");
if(this.m_[0][0]!=1||this.m_[0][1]||this.m_[1][1]!=1||this.m_[1][0]){var Z=[];var aH=this.scaleX_;var aG=this.scaleY_;Z.push("M11=",this.m_[0][0]/aH,",","M12=",this.m_[1][0]/aG,",","M21=",this.m_[0][1]/aH,",","M22=",this.m_[1][1]/aG,",","Dx=",u(aF.x/l),",","Dy=",u(aF.y/l),"");
var aB=aF;var aA=ac(this,ap+ar,an);var ay=ac(this,ap,an+aE);var au=ac(this,ap+ar,an+aE);aB.x=ah.max(aB.x,aA.x,ay.x,au.x);aB.y=ah.max(aB.y,aA.y,ay.y,au.y);
aD.push("padding:0 ",u(aB.x/l),"px ",u(aB.y/l),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",Z.join(""),", SizingMethod='clip');")}else{aD.push("top:",u(aF.y/l),"px;left:",u(aF.x/l),"px;")
}aD.push(' ">');if(av||at){aD.push('<div style="overflow: hidden; width:',Math.ceil((ar+av*ar/az)*aH),"px;"," height:",Math.ceil((aE+at*aE/aI)*aG),"px;"," filter:progid:DxImageTransform.Microsoft.Matrix(Dx=",-av*ar/az*aH,",Dy=",-at*aE/aI*aG,');">')
}aD.push('<div style="width:',Math.round(aH*ao*ar/az),"px;"," height:",Math.round(aG*aC*aE/aI),"px;"," filter:");if(this.globalAlpha<1){aD.push(" progid:DXImageTransform.Microsoft.Alpha(opacity="+(this.globalAlpha*100)+")")
}aD.push(" progid:DXImageTransform.Microsoft.AlphaImageLoader(src=",ax.src,',sizingMethod=scale)">');if(av||at){aD.push("</div>")}aD.push("</div></div>");
this.element_.insertAdjacentHTML("BeforeEnd",aD.join(""))};w.stroke=function(ar){var ap=[];var Z=false;var m=10;var at=10;ap.push("<g_vml_:shape",' filled="',!!ar,'"',' style="position:absolute;width:',m,"px;height:",at,'px;"',' coordorigin="0,0"',' coordsize="',l*m,",",l*at,'"',' stroked="',!ar,'"',' path="');
var au=false;var am={x:null,y:null};var aq={x:null,y:null};for(var an=0;an<this.currentPath_.length;an++){var j=this.currentPath_[an];var ao;switch(j.type){case"moveTo":ao=j;
ap.push(" m ",u(j.x),",",u(j.y));break;case"lineTo":ap.push(" l ",u(j.x),",",u(j.y));break;case"close":ap.push(" x ");j=null;break;case"bezierCurveTo":ap.push(" c ",u(j.cp1x),",",u(j.cp1y),",",u(j.cp2x),",",u(j.cp2y),",",u(j.x),",",u(j.y));
break;case"at":case"wa":ap.push(" ",j.type," ",u(j.x-this.scaleX_*j.radius),",",u(j.y-this.scaleY_*j.radius)," ",u(j.x+this.scaleX_*j.radius),",",u(j.y+this.scaleY_*j.radius)," ",u(j.xStart),",",u(j.yStart)," ",u(j.xEnd),",",u(j.yEnd));
break}if(j){if(am.x==null||j.x<am.x){am.x=j.x}if(aq.x==null||j.x>aq.x){aq.x=j.x}if(am.y==null||j.y<am.y){am.y=j.y}if(aq.y==null||j.y>aq.y){aq.y=j.y}}}ap.push(' ">');
if(!ar){C(this,ap)}else{M(this,ap,am,aq)}ap.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",ap.join(""))};function C(m,am){var j=L(m.strokeStyle);
var p=j.color;var Z=j.alpha*m.globalAlpha;var i=m.lineScale_*m.lineWidth;if(i<1){Z*=i}am.push("<g_vml_:stroke",' opacity="',Z,'"',' joinstyle="',m.lineJoin,'"',' miterlimit="',m.miterLimit,'"',' endcap="',Y(m.lineCap),'"',' weight="',i,'px"',' color="',p,'" />')
}function M(ax,ao,aQ,ay){var ap=ax.fillStyle;var aH=ax.scaleX_;var aG=ax.scaleY_;var j=ay.x-aQ.x;var p=ay.y-aQ.y;if(ap instanceof ab){var au=0;var aL={x:0,y:0};
var aD=0;var at=1;if(ap.type_=="gradient"){var ar=ap.x0_/aH;var m=ap.y0_/aG;var aq=ap.x1_/aH;var aS=ap.y1_/aG;var aP=ac(ax,ar,m);var aO=ac(ax,aq,aS);var am=aO.x-aP.x;
var Z=aO.y-aP.y;au=Math.atan2(am,Z)*180/Math.PI;if(au<0){au+=360}if(au<0.000001){au=0}}else{var aP=ac(ax,ap.x0_,ap.y0_);aL={x:(aP.x-aQ.x)/j,y:(aP.y-aQ.y)/p};
j/=aH*l;p/=aG*l;var aJ=ah.max(j,p);aD=2*ap.r0_/aJ;at=2*ap.r1_/aJ-aD}var aB=ap.colors_;aB.sort(function(aT,i){return aT.offset-i.offset});var aw=aB.length;
var aA=aB[0].color;var az=aB[aw-1].color;var aF=aB[0].alpha*ax.globalAlpha;var aE=aB[aw-1].alpha*ax.globalAlpha;var aK=[];for(var aN=0;aN<aw;aN++){var av=aB[aN];
aK.push(av.offset*at+aD+" "+av.color)}ao.push('<g_vml_:fill type="',ap.type_,'"',' method="none" focus="100%"',' color="',aA,'"',' color2="',az,'"',' colors="',aK.join(","),'"',' opacity="',aE,'"',' g_o_:opacity2="',aF,'"',' angle="',au,'"',' focusposition="',aL.x,",",aL.y,'" />')
}else{if(ap instanceof aa){if(j&&p){var an=-aQ.x;var aI=-aQ.y;ao.push("<g_vml_:fill",' position="',an/j*aH*aH,",",aI/p*aG*aG,'"',' type="tile"',' src="',ap.src_,'" />')
}}else{var aR=L(ax.fillStyle);var aC=aR.color;var aM=aR.alpha*ax.globalAlpha;ao.push('<g_vml_:fill color="',aC,'" opacity="',aM,'" />')}}}w.fill=function(){this.stroke(true)
};w.closePath=function(){this.currentPath_.push({type:"close"})};function ac(j,Z,p){var i=j.m_;return{x:l*(Z*i[0][0]+p*i[1][0]+i[2][0])-o,y:l*(Z*i[0][1]+p*i[1][1]+i[2][1])-o}
}w.save=function(){var i={};B(this,i);this.aStack_.push(i);this.mStack_.push(this.m_);this.m_=P(H(),this.m_)};w.restore=function(){if(this.aStack_.length){B(this.aStack_.pop(),this);
this.m_=this.mStack_.pop()}};function r(i){return isFinite(i[0][0])&&isFinite(i[0][1])&&isFinite(i[1][0])&&isFinite(i[1][1])&&isFinite(i[2][0])&&isFinite(i[2][1])
}function ag(j,i,p){if(!r(i)){return}j.m_=i;j.scaleX_=Math.sqrt(i[0][0]*i[0][0]+i[0][1]*i[0][1]);j.scaleY_=Math.sqrt(i[1][0]*i[1][0]+i[1][1]*i[1][1]);if(p){var Z=i[0][0]*i[1][1]-i[0][1]*i[1][0];
j.lineScale_=T(N(Z))}}w.translate=function(m,j){var i=[[1,0,0],[0,1,0],[m,j,1]];ag(this,P(i,this.m_),false)};w.rotate=function(j){var p=G(j);var m=t(j);
var i=[[p,m,0],[-m,p,0],[0,0,1]];ag(this,P(i,this.m_),false)};w.scale=function(m,j){var i=[[m,0,0],[0,j,0],[0,0,1]];ag(this,P(i,this.m_),true)};w.transform=function(Z,p,an,am,j,i){var m=[[Z,p,0],[an,am,0],[j,i,1]];
ag(this,P(m,this.m_),true)};w.setTransform=function(am,Z,ao,an,p,j){var i=[[am,Z,0],[ao,an,0],[p,j,1]];ag(this,i,true)};w.drawText_=function(at,aq,ap,aw,ao){var av=this.m_,az=1000,j=0,ay=az,an={x:0,y:0},am=[];
var i=A(K(this.font),this.element_);var p=ai(i);var aA=this.element_.currentStyle;var Z=this.textAlign.toLowerCase();switch(Z){case"left":case"center":case"right":break;
case"end":Z=aA.direction=="ltr"?"right":"left";break;case"start":Z=aA.direction=="rtl"?"right":"left";break;default:Z="left"}switch(this.textBaseline){case"hanging":case"top":an.y=i.size/1.75;
break;case"middle":break;default:case null:case"alphabetic":case"ideographic":case"bottom":an.y=-i.size/2.25;break}switch(Z){case"right":j=az;ay=0.05;break;
case"center":j=ay=az/2;break}var ax=ac(this,aq+an.x,ap+an.y);am.push('<g_vml_:line from="',-j,' 0" to="',ay,' 0.05" ',' coordsize="100 100" coordorigin="0 0"',' filled="',!ao,'" stroked="',!!ao,'" style="position:absolute;width:1px;height:1px;">');
if(ao){C(this,am)}else{M(this,am,{x:-j,y:0},{x:ay,y:i.size})}var au=av[0][0].toFixed(3)+","+av[1][0].toFixed(3)+","+av[0][1].toFixed(3)+","+av[1][1].toFixed(3)+",0,0";
var ar=u(ax.x/l)+","+u(ax.y/l);am.push('<g_vml_:skew on="t" matrix="',au,'" ',' offset="',ar,'" origin="',j,' 0" />','<g_vml_:path textpathok="true" />','<g_vml_:textpath on="true" string="',al(at),'" style="v-text-align:',Z,";font:",al(p),'" /></g_vml_:line>');
this.element_.insertAdjacentHTML("beforeEnd",am.join(""))};w.fillText=function(m,i,p,j){this.drawText_(m,i,p,j,false)};w.strokeText=function(m,i,p,j){this.drawText_(m,i,p,j,true)
};w.measureText=function(p){if(!this.textMeasureEl_){var j='<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
this.element_.insertAdjacentHTML("beforeEnd",j);this.textMeasureEl_=this.element_.lastChild}var m=this.element_.ownerDocument;this.textMeasureEl_.innerHTML="";
try{this.textMeasureEl_.style.font=this.font}catch(i){}this.textMeasureEl_.appendChild(m.createTextNode(p));return{width:this.textMeasureEl_.offsetWidth}
};w.clip=function(){};w.arcTo=function(){};w.createPattern=function(j,i){return new aa(j,i)};function ab(i){this.type_=i;this.x0_=0;this.y0_=0;this.r0_=0;
this.x1_=0;this.y1_=0;this.r1_=0;this.colors_=[]}ab.prototype.addColorStop=function(j,i){i=L(i);this.colors_.push({offset:j,color:i.color,alpha:i.alpha})
};function aa(j,i){W(j);switch(i){case"repeat":case null:case"":this.repetition_="repeat";break;case"repeat-x":case"repeat-y":case"no-repeat":this.repetition_=i;
break;default:U("SYNTAX_ERR")}this.src_=j.src;this.width_=j.width;this.height_=j.height}function U(i){throw new V(i)}function W(i){if(!i||i.nodeType!=1||i.tagName!="IMG"){U("TYPE_MISMATCH_ERR")
}if(i.readyState!="complete"){U("INVALID_STATE_ERR")}}function V(i){this.code=this[i];this.message=i+": DOM Exception "+this.code}var ae=V.prototype=new Error;
ae.INDEX_SIZE_ERR=1;ae.DOMSTRING_SIZE_ERR=2;ae.HIERARCHY_REQUEST_ERR=3;ae.WRONG_DOCUMENT_ERR=4;ae.INVALID_CHARACTER_ERR=5;ae.NO_DATA_ALLOWED_ERR=6;ae.NO_MODIFICATION_ALLOWED_ERR=7;
ae.NOT_FOUND_ERR=8;ae.NOT_SUPPORTED_ERR=9;ae.INUSE_ATTRIBUTE_ERR=10;ae.INVALID_STATE_ERR=11;ae.SYNTAX_ERR=12;ae.INVALID_MODIFICATION_ERR=13;ae.NAMESPACE_ERR=14;
ae.INVALID_ACCESS_ERR=15;ae.VALIDATION_ERR=16;ae.TYPE_MISMATCH_ERR=17;G_vmlCanvasManager=n;CanvasRenderingContext2D=J;CanvasGradient=ab;CanvasPattern=aa;
DOMException=V})()}else{G_vmlCanvasManager=false}return G_vmlCanvasManager});d("zrender/shape/Base",["require","../tool/matrix","../tool/guid","../tool/util","../tool/log","../mixin/Transformable","../mixin/Eventful","../tool/area","../tool/color"],function(i){var j=window.G_vmlCanvasManager;
var r=i("../tool/matrix");var q=i("../tool/guid");var n=i("../tool/util");var k=i("../tool/log");var f=i("../mixin/Transformable");var o=i("../mixin/Eventful");
function p(E,D,B,z,u,t,s){if(u){E.font=u}E.textAlign=t;E.textBaseline=s;var A=l(D,B,z,u,t,s);D=(D+"").split("\n");var C=i("../tool/area").getTextHeight("国",u);
switch(s){case"top":z=A.y;break;case"bottom":z=A.y+C;break;default:z=A.y+C/2}for(var w=0,v=D.length;w<v;w++){E.fillText(D[w],B,z);z+=C}}function l(C,A,z,w,v,u){var s=i("../tool/area");
var t=s.getTextWidth(C,w);var B=s.getTextHeight("国",w);C=(C+"").split("\n");switch(v){case"end":case"right":A-=t;break;case"center":A-=(t/2);break}switch(u){case"top":break;
case"bottom":z-=B*C.length;break;default:z-=B*C.length/2}return{x:A,y:z,width:t,height:B*C.length}}var m=function(s){s=s||{};this.id=s.id||q();for(var t in s){this[t]=s[t]
}this.style=this.style||{};this.highlightStyle=this.highlightStyle||null;this.parent=null;this.__dirty=true;this.__clipShapes=[];f.call(this);o.call(this)
};m.prototype.invisible=false;m.prototype.ignore=false;m.prototype.zlevel=0;m.prototype.draggable=false;m.prototype.clickable=false;m.prototype.hoverable=true;
m.prototype.z=0;m.prototype.brush=function(s,u){var t=this.beforeBrush(s,u);s.beginPath();this.buildPath(s,t);switch(t.brushType){case"both":s.fill();case"stroke":t.lineWidth>0&&s.stroke();
break;default:s.fill()}this.drawText(s,t,this.style);this.afterBrush(s)};m.prototype.beforeBrush=function(s,u){var t=this.style;if(this.brushTypeOnly){t.brushType=this.brushTypeOnly
}if(u){t=this.getHighlightStyle(t,this.highlightStyle||{},this.brushTypeOnly)}if(this.brushTypeOnly=="stroke"){t.strokeColor=t.strokeColor||t.color}s.save();
this.doClip(s);this.setContext(s,t);this.setTransform(s);return t};m.prototype.afterBrush=function(s){s.restore()};var h=[["color","fillStyle"],["strokeColor","strokeStyle"],["opacity","globalAlpha"],["lineCap","lineCap"],["lineJoin","lineJoin"],["miterLimit","miterLimit"],["lineWidth","lineWidth"],["shadowBlur","shadowBlur"],["shadowColor","shadowColor"],["shadowOffsetX","shadowOffsetX"],["shadowOffsetY","shadowOffsetY"]];
m.prototype.setContext=function(u,y){for(var x=0,t=h.length;x<t;x++){var s=h[x][0];var w=y[s];var v=h[x][1];if(typeof w!="undefined"){u[v]=w}}};var g=r.create();
m.prototype.doClip=function(t){if(this.__clipShapes&&!j){for(var u=0;u<this.__clipShapes.length;u++){var v=this.__clipShapes[u];if(v.needTransform){var s=v.transform;
r.invert(g,s);t.transform(s[0],s[1],s[2],s[3],s[4],s[5])}t.beginPath();v.buildPath(t,v.style);t.clip();if(v.needTransform){var s=g;t.transform(s[0],s[1],s[2],s[3],s[4],s[5])
}}}};m.prototype.getHighlightStyle=function(w,u,v){var x={};for(var t in w){x[t]=w[t]}var s=i("../tool/color");var y=s.getHighlightColor();if(w.brushType!="stroke"){x.strokeColor=y;
x.lineWidth=(w.lineWidth||1)+this.getHighlightZoom();x.brushType="both"}else{if(v!="stroke"){x.strokeColor=y;x.lineWidth=(w.lineWidth||1)+this.getHighlightZoom()
}else{x.strokeColor=u.strokeColor||s.mix(w.strokeColor,s.toRGB(y))}}for(var t in u){if(typeof u[t]!="undefined"){x[t]=u[t]}}return x};m.prototype.getHighlightZoom=function(){return this.type!="text"?6:2
};m.prototype.drift=function(t,s){this.position[0]+=t;this.position[1]+=s};m.prototype.buildPath=function(s,t){k("buildPath not implemented in "+this.type)
};m.prototype.getRect=function(s){k("getRect not implemented in "+this.type)};m.prototype.isCover=function(s,u){var t=this.transformCoordToLocal(s,u);s=t[0];
u=t[1];if(this.isCoverRect(s,u)){return i("../tool/area").isInside(this,this.style,s,u)}return false};m.prototype.isCoverRect=function(s,u){var t=this.style.__rect;
if(!t){t=this.style.__rect=this.getRect(this.style)}return s>=t.x&&s<=(t.x+t.width)&&u>=t.y&&u<=(t.y+t.height)};m.prototype.drawText=function(D,F,y){if(typeof(F.text)=="undefined"||F.text===false){return
}var w=F.textColor||F.color||F.strokeColor;D.fillStyle=w;var H=10;var E;var s;var J;var I;var v=F.textPosition||this.textPosition||"top";switch(v){case"inside":case"top":case"bottom":case"left":case"right":if(this.getRect){var t=(y||F).__rect||this.getRect(y||F);
switch(v){case"inside":J=t.x+t.width/2;I=t.y+t.height/2;E="center";s="middle";if(F.brushType!="stroke"&&w==F.color){D.fillStyle="#fff"}break;case"left":J=t.x-H;
I=t.y+t.height/2;E="end";s="middle";break;case"right":J=t.x+t.width+H;I=t.y+t.height/2;E="start";s="middle";break;case"top":J=t.x+t.width/2;I=t.y-H;E="center";
s="bottom";break;case"bottom":J=t.x+t.width/2;I=t.y+t.height+H;E="center";s="top";break}}break;case"start":case"end":var C=F.pointList||[[F.xStart||0,F.yStart||0],[F.xEnd||0,F.yEnd||0]];
var u=C.length;if(u<2){return}var x;var z;var A;var B;switch(v){case"start":x=C[1][0];z=C[0][0];A=C[1][1];B=C[0][1];break;case"end":x=C[u-2][0];z=C[u-1][0];
A=C[u-2][1];B=C[u-1][1];break}J=z;I=B;var G=Math.atan((A-B)/(z-x))/Math.PI*180;if((z-x)<0){G+=180}else{if((A-B)<0){G+=360}}H=5;if(G>=30&&G<=150){E="center";
s="bottom";I-=H}else{if(G>150&&G<210){E="right";s="middle";J-=H}else{if(G>=210&&G<=330){E="center";s="top";I+=H}else{E="left";s="middle";J+=H}}}break;case"specific":J=F.textX||0;
I=F.textY||0;E="start";s="middle";break}if(J!=null&&I!=null){p(D,F.text,J,I,F.textFont,F.textAlign||E,F.textBaseline||s)}};m.prototype.modSelf=function(){this.__dirty=true;
if(this.style){this.style.__rect=null}if(this.highlightStyle){this.highlightStyle.__rect=null}};m.prototype.isSilent=function(){return !(this.hoverable||this.draggable||this.clickable||this.onmousemove||this.onmouseover||this.onmouseout||this.onmousedown||this.onmouseup||this.onclick||this.ondragenter||this.ondragover||this.ondragleave||this.ondrop)
};n.merge(m.prototype,f.prototype,true);n.merge(m.prototype,o.prototype,true);return m});d("echarts/layout/EdgeBundling",["require","../data/KDTree","zrender/tool/vector"],function(g){var m=g("../data/KDTree");
var n=g("zrender/tool/vector");var o=n.create;var h=n.distSquare;var q=n.dist;var f=n.copy;var p=n.clone;function r(v,t){v=v.array;t=t.array;var s=t[0]-v[0];
var B=t[1]-v[1];var A=t[2]-v[2];var u=t[3]-v[3];return s*s+B*B+A*A+u*u}function i(s){this.points=[s.mp0,s.mp1];this.group=s}function l(t){var s=t.points;
if(s[0][1]<s[1][1]||t instanceof i){this.array=[s[0][0],s[0][1],s[1][0],s[1][1]];this._startPoint=s[0];this._endPoint=s[1]}else{this.array=[s[1][0],s[1][1],s[0][0],s[0][1]];
this._startPoint=s[1];this._endPoint=s[0]}this.ink=q(s[0],s[1]);this.edge=t;this.group=null}l.prototype.getStartPoint=function(){return this._startPoint
};l.prototype.getEndPoint=function(){return this._endPoint};function j(){this.edgeList=[];this.mp0=o();this.mp1=o();this.ink=0}j.prototype.addEdge=function(s){s.group=this;
this.edgeList.push(s)};j.prototype.removeEdge=function(s){s.group=null;this.edgeList.splice(this.edgeList.indexOf(s),1)};function k(){this.maxNearestEdge=6;
this.maxTurningAngle=Math.PI/4;this.maxIteration=20}k.prototype={constructor:k,run:function(B){var y=this._iterate(B);var u=0;while(u++<this.maxIteration){var t=[];
for(var v=0;v<y.groups.length;v++){t.push(new i(y.groups[v]))}var x=this._iterate(t);if(x.savedInk<=0){break}else{y=x}}var z=[];function A(D,C){return h(D,C)<1e-10
}function s(C,F){var E=[];var G=0;for(var D=0;D<C.length;D++){if(!(G>0&&A(C[D],E[G-1]))){E[G++]=p(C[D])}}if(F[0]&&!A(E[0],F[0])){E=E.reverse()}return E
}var w=function(C,G){var J;for(var F=0;F<C.length;F++){var I=C[F];if(I.edgeList[0]&&(I.edgeList[0].edge instanceof i)){var D=[];for(var E=0;E<I.edgeList.length;
E++){D.push(I.edgeList[E].edge.group)}if(!G){J=[]}else{J=G.slice()}J.unshift(I.mp0);J.push(I.mp1);w(D,J)}else{for(var E=0;E<I.edgeList.length;E++){var H=I.edgeList[E];
if(!G){J=[]}else{J=G.slice()}J.unshift(I.mp0);J.push(I.mp1);J.unshift(H.getStartPoint());J.push(H.getEndPoint());z.push({points:s(J,H.edge.points),rawEdge:H.edge})
}}}};w(y.groups);return z},_iterate:function(v){var s=[];var J=[];var K=0;for(var G=0;G<v.length;G++){var x=new l(v[G]);s.push(x)}var E=new m(s,4);var H=[];
var D=o();var C=o();var u=0;var B=o();var A=o();var y=0;for(var G=0;G<s.length;G++){var x=s[G];if(x.group){continue}E.nearestN(x,this.maxNearestEdge,r,H);
var I=0;var w=null;var M=null;for(var F=0;F<H.length;F++){var t=H[F];var L=0;if(t.group){if(t.group!==M){M=t.group;u=this._calculateGroupEdgeInk(t.group,x,D,C);
L=t.group.ink+x.ink-u}}else{u=this._calculateEdgeEdgeInk(x,t,D,C);L=t.ink+x.ink-u}if(L>I){I=L;w=t;f(A,C);f(B,D);y=u}}if(w){K+=I;var z;if(!w.group){z=new j();
J.push(z);z.addEdge(w)}z=w.group;f(z.mp0,B);f(z.mp1,A);z.ink=y;w.group.addEdge(x)}else{var z=new j();J.push(z);f(z.mp0,x.getStartPoint());f(z.mp1,x.getEndPoint());
z.ink=x.ink;z.addEdge(x)}}return{groups:J,edges:s,savedInk:K}},_calculateEdgeEdgeInk:(function(){var s=[];var t=[];return function(y,x,w,v){s[0]=y.getStartPoint();
s[1]=x.getStartPoint();t[0]=y.getEndPoint();t[1]=x.getEndPoint();this._calculateMeetPoints(s,t,w,v);var u=q(s[0],w)+q(w,v)+q(v,t[0])+q(s[1],w)+q(v,t[1]);
return u}})(),_calculateGroupEdgeInk:function(z,v,y,x){var u=[];var s=[];for(var w=0;w<z.edgeList.length;w++){var t=z.edgeList[w];u.push(t.getStartPoint());
s.push(t.getEndPoint())}u.push(v.getStartPoint());s.push(v.getEndPoint());this._calculateMeetPoints(u,s,y,x);var A=q(y,x);for(var w=0;w<u.length;w++){A+=q(u[w],y)+q(s[w],x)
}return A},_calculateMeetPoints:(function(){var t=o();var s=o();return function(y,z,w,v){n.set(t,0,0);n.set(s,0,0);var u=y.length;for(var x=0;x<u;x++){n.add(t,t,y[x])
}n.scale(t,t,1/u);u=z.length;for(var x=0;x<u;x++){n.add(s,s,z[x])}n.scale(s,s,1/u);this._limitTurningAngle(y,t,s,w);this._limitTurningAngle(z,s,t,v)}})(),_limitTurningAngle:(function(){var t=o();
var v=o();var u=o();var s=o();return function(C,J,I,A){var H=Math.cos(this.maxTurningAngle);var F=Math.tan(this.maxTurningAngle);n.sub(t,J,I);n.normalize(t,t);
n.copy(A,J);var z=0;for(var B=0;B<C.length;B++){var x=C[B];n.sub(v,x,J);var D=n.len(v);n.scale(v,v,1/D);var E=n.dot(v,t);if(E<H){n.scaleAndAdd(u,J,t,D*E);
var w=q(u,x);var G=w/F;n.scaleAndAdd(s,u,t,-G);var y=h(s,J);if(y>z){z=y;n.copy(A,s)}}}}})()};return k});d("zrender/mixin/Eventful",["require"],function(f){var g=function(){this._handlers={}
};g.prototype.one=function(j,i,h){var k=this._handlers;if(!i||!j){return this}if(!k[j]){k[j]=[]}k[j].push({h:i,one:true,ctx:h||this});return this};g.prototype.bind=function(j,i,h){var k=this._handlers;
if(!i||!j){return this}if(!k[j]){k[j]=[]}k[j].push({h:i,one:false,ctx:h||this});return this};g.prototype.unbind=function(n,m){var o=this._handlers;if(!n){this._handlers={};
return this}if(m){if(o[n]){var k=[];for(var j=0,h=o[n].length;j<h;j++){if(o[n][j]["h"]!=m){k.push(o[n][j])}}o[n]=k}if(o[n]&&o[n].length===0){delete o[n]
}}else{delete o[n]}return this};g.prototype.dispatch=function(m){if(this._handlers[m]){var k=arguments;var j=k.length;if(j>3){k=Array.prototype.slice.call(k,1)
}var n=this._handlers[m];var h=n.length;for(var l=0;l<h;){switch(j){case 1:n[l]["h"].call(n[l]["ctx"]);break;case 2:n[l]["h"].call(n[l]["ctx"],k[1]);break;
case 3:n[l]["h"].call(n[l]["ctx"],k[1],k[2]);break;default:n[l]["h"].apply(n[l]["ctx"],k);break}if(n[l]["one"]){n.splice(l,1);h--}else{l++}}}return this
};g.prototype.dispatchWithContext=function(n){if(this._handlers[n]){var l=arguments;var k=l.length;if(k>4){l=Array.prototype.slice.call(l,1,l.length-1)
}var j=l[l.length-1];var o=this._handlers[n];var h=o.length;for(var m=0;m<h;){switch(k){case 1:o[m]["h"].call(j);break;case 2:o[m]["h"].call(j,l[1]);break;
case 3:o[m]["h"].call(j,l[1],l[2]);break;default:o[m]["h"].apply(j,l);break}if(o[m]["one"]){o.splice(m,1);h--}else{m++}}}return this};return g});d("zrender/tool/log",["require","../config"],function(g){var f=g("../config");
return function(){if(f.debugMode===0){return}else{if(f.debugMode==1){for(var h in arguments){throw new Error(arguments[h])}}else{if(f.debugMode>1){for(var h in arguments){console.log(arguments[h])
}}}}}});d("zrender/tool/guid",[],function(){var f=2311;return function(){return"zrender__"+(f++)}});d("zrender/mixin/Transformable",["require","../tool/matrix","../tool/vector"],function(i){var m=i("../tool/matrix");
var h=i("../tool/vector");var n=[0,0];var g=m.translate;var j=0.00005;function l(o){return o>-j&&o<j}function k(o){return o>j||o<-j}var f=function(){if(!this.position){this.position=[0,0]
}if(typeof(this.rotation)=="undefined"){this.rotation=[0,0,0]}if(!this.scale){this.scale=[1,1,0,0]}this.needLocalTransform=false;this.needTransform=false
};f.prototype={constructor:f,updateNeedTransform:function(){this.needLocalTransform=k(this.rotation[0])||k(this.position[0])||k(this.position[1])||k(this.scale[0]-1)||k(this.scale[1]-1)
},updateTransform:function(){this.updateNeedTransform();var q=this.parent&&this.parent.needTransform;this.needTransform=this.needLocalTransform||q;if(!this.needTransform){return
}var o=this.transform||m.create();m.identity(o);if(this.needLocalTransform){var r=this.scale;if(k(r[0])||k(r[1])){n[0]=-r[2]||0;n[1]=-r[3]||0;var p=k(n[0])||k(n[1]);
if(p){g(o,o,n)}m.scale(o,o,r);if(p){n[0]=-n[0];n[1]=-n[1];g(o,o,n)}}if(this.rotation instanceof Array){if(this.rotation[0]!==0){n[0]=-this.rotation[1]||0;
n[1]=-this.rotation[2]||0;var p=k(n[0])||k(n[1]);if(p){g(o,o,n)}m.rotate(o,o,this.rotation[0]);if(p){n[0]=-n[0];n[1]=-n[1];g(o,o,n)}}}else{if(this.rotation!==0){m.rotate(o,o,this.rotation)
}}if(k(this.position[0])||k(this.position[1])){g(o,o,this.position)}}if(q){if(this.needLocalTransform){m.mul(o,this.parent.transform,o)}else{m.copy(o,this.parent.transform)
}}this.transform=o;this.invTransform=this.invTransform||m.create();m.invert(this.invTransform,o)},setTransform:function(p){if(this.needTransform){var o=this.transform;
p.transform(o[0],o[1],o[2],o[3],o[4],o[5])}},lookAt:(function(){var o=h.create();return function(q){if(!this.transform){this.transform=m.create()}var p=this.transform;
h.sub(o,q,this.position);if(l(o[0])&&l(o[1])){return}h.normalize(o,o);var r=this.scale;p[2]=o[0]*r[1];p[3]=o[1]*r[1];p[0]=o[1]*r[0];p[1]=-o[0]*r[0];p[4]=this.position[0];
p[5]=this.position[1];this.decomposeTransform()}})(),decomposeTransform:function(){if(!this.transform){return}var p=this.transform;var t=p[0]*p[0]+p[1]*p[1];
var o=this.position;var s=this.scale;var q=this.rotation;if(k(t-1)){t=Math.sqrt(t)}var r=p[2]*p[2]+p[3]*p[3];if(k(r-1)){r=Math.sqrt(r)}o[0]=p[4];o[1]=p[5];
s[0]=t;s[1]=r;s[2]=s[3]=0;q[0]=Math.atan2(-p[1]/r,p[0]/t);q[1]=q[2]=0},transformCoordToLocal:function(o,q){var p=[o,q];if(this.needTransform&&this.invTransform){m.mulVector(p,this.invTransform,p)
}return p}};return f});d("zrender/tool/matrix",[],function(){var f=typeof Float32Array==="undefined"?Array:Float32Array;var g={create:function(){var h=new f(6);
g.identity(h);return h},identity:function(h){h[0]=1;h[1]=0;h[2]=0;h[3]=1;h[4]=0;h[5]=0;return h},copy:function(i,h){i[0]=h[0];i[1]=h[1];i[2]=h[2];i[3]=h[3];
i[4]=h[4];i[5]=h[5];return i},mul:function(j,i,h){j[0]=i[0]*h[0]+i[2]*h[1];j[1]=i[1]*h[0]+i[3]*h[1];j[2]=i[0]*h[2]+i[2]*h[3];j[3]=i[1]*h[2]+i[3]*h[3];j[4]=i[0]*h[4]+i[2]*h[5]+i[4];
j[5]=i[1]*h[4]+i[3]*h[5]+i[5];return j},translate:function(j,h,i){j[0]=h[0];j[1]=h[1];j[2]=h[2];j[3]=h[3];j[4]=h[4]+i[0];j[5]=h[5]+i[1];return j},rotate:function(i,n,m){var h=n[0];
var q=n[2];var l=n[4];var r=n[1];var o=n[3];var j=n[5];var p=Math.sin(m);var k=Math.cos(m);i[0]=h*k+r*p;i[1]=-h*p+r*k;i[2]=q*k+o*p;i[3]=-q*p+k*o;i[4]=k*l+p*j;
i[5]=k*j-p*l;return i},scale:function(j,h,i){var l=i[0];var k=i[1];j[0]=h[0]*l;j[1]=h[1]*k;j[2]=h[2]*l;j[3]=h[3]*k;j[4]=h[4]*l;j[5]=h[5]*k;return j},invert:function(i,m){var h=m[0];
var o=m[2];var k=m[4];var p=m[1];var n=m[3];var j=m[5];var l=h*n-p*o;if(!l){return null}l=1/l;i[0]=n*l;i[1]=-p*l;i[2]=-o*l;i[3]=h*l;i[4]=(o*j-n*k)*l;i[5]=(p*k-h*j)*l;
return i},mulVector:function(i,l,m){var h=l[0];var o=l[2];var k=l[4];var p=l[1];var n=l[3];var j=l[5];i[0]=m[0]*h+m[1]*o+k;i[1]=m[0]*p+m[1]*n+j;return i
}};return g});d("zrender/Handler",["require","./config","./tool/env","./tool/event","./tool/util","./tool/vector","./tool/matrix","./mixin/Eventful"],function(j){var h=j("./config");
var m=j("./tool/env");var v=j("./tool/event");var l=j("./tool/util");var n=j("./tool/vector");var r=j("./tool/matrix");var t=h.EVENT;var q=j("./mixin/Eventful");
var s=["resize","click","dblclick","mousewheel","mousemove","mouseout","mouseup","mousedown","touchstart","touchend","touchmove"];var k={resize:function(w){w=w||window.event;
this._lastHover=null;this._isMouseDown=0;this.dispatch(t.RESIZE,w)},click:function(x){x=this._zrenderEventFixed(x);var w=this._lastHover;if((w&&w.clickable)||!w){if(this._clickThreshold<5){this._dispatchAgency(w,t.CLICK,x)
}}this._mousemoveHandler(x)},dblclick:function(x){x=x||window.event;x=this._zrenderEventFixed(x);var w=this._lastHover;if((w&&w.clickable)||!w){if(this._clickThreshold<5){this._dispatchAgency(w,t.DBLCLICK,x)
}}this._mousemoveHandler(x)},mousewheel:function(z){z=this._zrenderEventFixed(z);var B=z.wheelDelta||-z.detail;var A=B>0?1.1:1/1.1;var y=false;var x=this._mouseX;
var w=this._mouseY;this.painter.eachBuildinLayer(function(D){var E=D.position;if(D.zoomable){D.__zoom=D.__zoom||1;var C=D.__zoom;C*=A;C=Math.max(Math.min(D.maxZoom,C),D.minZoom);
A=C/D.__zoom;D.__zoom=C;E[0]-=(x-E[0])*(A-1);E[1]-=(w-E[1])*(A-1);D.scale[0]*=A;D.scale[1]*=A;D.dirty=true;y=true;v.stop(z)}});if(y){this.painter.refresh()
}this._dispatchAgency(this._lastHover,t.MOUSEWHEEL,z);this._mousemoveHandler(z)},mousemove:function(z){if(this.painter.isLoading()){return}z=this._zrenderEventFixed(z);
this._lastX=this._mouseX;this._lastY=this._mouseY;this._mouseX=v.getX(z);this._mouseY=v.getY(z);var x=this._mouseX-this._lastX;var w=this._mouseY-this._lastY;
this._processDragStart(z);this._hasfound=0;this._event=z;this._iterateAndFindHover();if(!this._hasfound){if(!this._draggingTarget||(this._lastHover&&this._lastHover!=this._draggingTarget)){this._processOutShape(z);
this._processDragLeave(z)}this._lastHover=null;this.storage.delHover();this.painter.clearHover()}var A="default";if(this._draggingTarget){this.storage.drift(this._draggingTarget.id,x,w);
this._draggingTarget.modSelf();this.storage.addHover(this._draggingTarget);this._clickThreshold++}else{if(this._isMouseDown){var y=false;this.painter.eachBuildinLayer(function(B){if(B.panable){A="move";
B.position[0]+=x;B.position[1]+=w;y=true;B.dirty=true}});if(y){this.painter.refresh()}}}if(this._draggingTarget||(this._hasfound&&this._lastHover.draggable)){A="move"
}else{if(this._hasfound&&this._lastHover.clickable){A="pointer"}}this.root.style.cursor=A;this._dispatchAgency(this._lastHover,t.MOUSEMOVE,z);if(this._draggingTarget||this._hasfound||this.storage.hasHoverShape()){this.painter.refreshHover()
}},mouseout:function(x){x=this._zrenderEventFixed(x);var w=x.toElement||x.relatedTarget;if(w!=this.root){while(w&&w.nodeType!=9){if(w==this.root){this._mousemoveHandler(x);
return}w=w.parentNode}}x.zrenderX=this._lastX;x.zrenderY=this._lastY;this.root.style.cursor="default";this._isMouseDown=0;this._processOutShape(x);this._processDrop(x);
this._processDragEnd(x);if(!this.painter.isLoading()){this.painter.refreshHover()}this.dispatch(t.GLOBALOUT,x)},mousedown:function(w){this._clickThreshold=0;
if(this._lastDownButton==2){this._lastDownButton=w.button;this._mouseDownTarget=null;return}this._lastMouseDownMoment=new Date();w=this._zrenderEventFixed(w);
this._isMouseDown=1;this._mouseDownTarget=this._lastHover;this._dispatchAgency(this._lastHover,t.MOUSEDOWN,w);this._lastDownButton=w.button},mouseup:function(w){w=this._zrenderEventFixed(w);
this.root.style.cursor="default";this._isMouseDown=0;this._mouseDownTarget=null;this._dispatchAgency(this._lastHover,t.MOUSEUP,w);this._processDrop(w);
this._processDragEnd(w)},touchstart:function(w){w=this._zrenderEventFixed(w,true);this._lastTouchMoment=new Date();this._mobileFindFixed(w);this._mousedownHandler(w)
},touchmove:function(w){w=this._zrenderEventFixed(w,true);this._mousemoveHandler(w);if(this._isDragging){v.stop(w)}},touchend:function(x){x=this._zrenderEventFixed(x,true);
this._mouseupHandler(x);var w=new Date();if(w-this._lastTouchMoment<t.touchClickDelay){this._mobileFindFixed(x);this._clickHandler(x);if(w-this._lastClickMoment<t.touchClickDelay/2){this._dblclickHandler(x);
if(this._lastHover&&this._lastHover.clickable){v.stop(x)}}this._lastClickMoment=w}this.painter.clearHover()}};function p(x,w){return function(y){return x.call(w,y)
}}function g(x,w){return function(A,z,y){return x.call(w,A,z,y)}}function u(x){var w=s.length;while(w--){var y=s[w];x["_"+y+"Handler"]=p(k[y],x)}}var o=function(x,y,w){q.call(this);
this.root=x;this.storage=y;this.painter=w;this._lastX=this._lastY=this._mouseX=this._mouseY=0;this._findHover=g(f,this);this._domHover=w.getDomHover();
u(this);if(window.addEventListener){window.addEventListener("resize",this._resizeHandler);if(m.os.tablet||m.os.phone){x.addEventListener("touchstart",this._touchstartHandler);
x.addEventListener("touchmove",this._touchmoveHandler);x.addEventListener("touchend",this._touchendHandler)}else{x.addEventListener("click",this._clickHandler);
x.addEventListener("dblclick",this._dblclickHandler);x.addEventListener("mousewheel",this._mousewheelHandler);x.addEventListener("mousemove",this._mousemoveHandler);
x.addEventListener("mousedown",this._mousedownHandler);x.addEventListener("mouseup",this._mouseupHandler)}x.addEventListener("DOMMouseScroll",this._mousewheelHandler);
x.addEventListener("mouseout",this._mouseoutHandler)}else{window.attachEvent("onresize",this._resizeHandler);x.attachEvent("onclick",this._clickHandler);
x.ondblclick=this._dblclickHandler;x.attachEvent("onmousewheel",this._mousewheelHandler);x.attachEvent("onmousemove",this._mousemoveHandler);x.attachEvent("onmouseout",this._mouseoutHandler);
x.attachEvent("onmousedown",this._mousedownHandler);x.attachEvent("onmouseup",this._mouseupHandler)}};o.prototype.on=function(w,y,x){this.bind(w,y,x);return this
};o.prototype.un=function(w,x){this.unbind(w,x);return this};o.prototype.trigger=function(x,w){switch(x){case t.RESIZE:case t.CLICK:case t.DBLCLICK:case t.MOUSEWHEEL:case t.MOUSEMOVE:case t.MOUSEDOWN:case t.MOUSEUP:case t.MOUSEOUT:this["_"+x+"Handler"](w);
break}};o.prototype.dispose=function(){var w=this.root;if(window.removeEventListener){window.removeEventListener("resize",this._resizeHandler);if(m.os.tablet||m.os.phone){w.removeEventListener("touchstart",this._touchstartHandler);
w.removeEventListener("touchmove",this._touchmoveHandler);w.removeEventListener("touchend",this._touchendHandler)}else{w.removeEventListener("click",this._clickHandler);
w.removeEventListener("dblclick",this._dblclickHandler);w.removeEventListener("mousewheel",this._mousewheelHandler);w.removeEventListener("mousemove",this._mousemoveHandler);
w.removeEventListener("mousedown",this._mousedownHandler);w.removeEventListener("mouseup",this._mouseupHandler)}w.removeEventListener("DOMMouseScroll",this._mousewheelHandler);
w.removeEventListener("mouseout",this._mouseoutHandler)}else{window.detachEvent("onresize",this._resizeHandler);w.detachEvent("onclick",this._clickHandler);
w.detachEvent("dblclick",this._dblclickHandler);w.detachEvent("onmousewheel",this._mousewheelHandler);w.detachEvent("onmousemove",this._mousemoveHandler);
w.detachEvent("onmouseout",this._mouseoutHandler);w.detachEvent("onmousedown",this._mousedownHandler);w.detachEvent("onmouseup",this._mouseupHandler)}this.root=this._domHover=this.storage=this.painter=null;
this.un()};o.prototype._processDragStart=function(y){var x=this._lastHover;if(this._isMouseDown&&x&&x.draggable&&!this._draggingTarget&&this._mouseDownTarget==x){if(x.dragEnableTime&&new Date()-this._lastMouseDownMoment<x.dragEnableTime){return
}var w=x;this._draggingTarget=w;this._isDragging=1;w.invisible=true;this.storage.mod(w.id);this._dispatchAgency(w,t.DRAGSTART,y);this.painter.refresh()
}};o.prototype._processDragEnter=function(w){if(this._draggingTarget){this._dispatchAgency(this._lastHover,t.DRAGENTER,w,this._draggingTarget)}};o.prototype._processDragOver=function(w){if(this._draggingTarget){this._dispatchAgency(this._lastHover,t.DRAGOVER,w,this._draggingTarget)
}};o.prototype._processDragLeave=function(w){if(this._draggingTarget){this._dispatchAgency(this._lastHover,t.DRAGLEAVE,w,this._draggingTarget)}};o.prototype._processDrop=function(w){if(this._draggingTarget){this._draggingTarget.invisible=false;
this.storage.mod(this._draggingTarget.id);this.painter.refresh();this._dispatchAgency(this._lastHover,t.DROP,w,this._draggingTarget)}};o.prototype._processDragEnd=function(w){if(this._draggingTarget){this._dispatchAgency(this._draggingTarget,t.DRAGEND,w);
this._lastHover=null}this._isDragging=0;this._draggingTarget=null};o.prototype._processOverShape=function(w){this._dispatchAgency(this._lastHover,t.MOUSEOVER,w)
};o.prototype._processOutShape=function(w){this._dispatchAgency(this._lastHover,t.MOUSEOUT,w)};o.prototype._dispatchAgency=function(w,y,B,D){var z="on"+y;
var C={type:y,event:B,target:w,cancelBubble:false};var A=w;if(D){C.dragged=D}while(A){A[z]&&(C.cancelBubble=A[z](C));A.dispatch(y,C);A=A.parent;if(C.cancelBubble){break
}}if(w){if(!C.cancelBubble){this.dispatch(y,C)}}else{if(!D){var x={type:y,event:B};this.dispatch(y,x);this.painter.eachOtherLayer(function(E){if(typeof(E[z])=="function"){E[z](x)
}if(E.dispatch){E.dispatch(y,x)}})}}};o.prototype._iterateAndFindHover=(function(){var w=r.create();return function(){var C=this.storage.getShapeList();
var B;var y;var A=[0,0];for(var z=C.length-1;z>=0;z--){var x=C[z];if(B!==x.zlevel){y=this.painter.getLayer(x.zlevel,y);A[0]=this._mouseX;A[1]=this._mouseY;
if(y.needTransform){r.invert(w,y.transform);n.applyTransform(A,A,w)}}if(this._findHover(x,A[0],A[1])){break}}}})();var i=[{x:10},{x:-20},{x:10,y:10},{y:-20}];
o.prototype._mobileFindFixed=function(x){this._lastHover=null;this._mouseX=x.zrenderX;this._mouseY=x.zrenderY;this._event=x;this._iterateAndFindHover();
for(var w=0;!this._lastHover&&w<i.length;w++){var y=i[w];y.x&&(this._mouseX+=y.x);y.y&&(this._mouseY+=y.y);this._iterateAndFindHover()}if(this._lastHover){x.zrenderX=this._mouseX;
x.zrenderY=this._mouseY}};function f(z,w,C){if((this._draggingTarget&&this._draggingTarget.id==z.id)||z.isSilent()){return false}var A=this._event;if(z.isCover(w,C)){if(z.hoverable){this.storage.addHover(z)
}var B=z.parent;while(B){if(B.clipShape&&!B.clipShape.isCover(this._mouseX,this._mouseY)){return false}B=B.parent}if(this._lastHover!=z){this._processOutShape(A);
this._processDragLeave(A);this._lastHover=z;this._processDragEnter(A)}this._processOverShape(A);this._processDragOver(A);this._hasfound=1;return true}return false
}o.prototype._zrenderEventFixed=function(x,w){if(x.zrenderFixed){return x}if(!w){x=x||window.event;var y=x.toElement||x.relatedTarget||x.srcElement||x.target;
if(y&&y!=this._domHover){x.zrenderX=(typeof x.offsetX!="undefined"?x.offsetX:x.layerX)+y.offsetLeft;x.zrenderY=(typeof x.offsetY!="undefined"?x.offsetY:x.layerY)+y.offsetTop
}}else{var A=x.type!="touchend"?x.targetTouches[0]:x.changedTouches[0];if(A){var z=this.painter._domRoot.getBoundingClientRect();x.zrenderX=A.clientX-z.left;
x.zrenderY=A.clientY-z.top}}x.zrenderFixed=1;return x};l.merge(o.prototype,q.prototype,true);return o});d("zrender/tool/vector",[],function(){var f=typeof Float32Array==="undefined"?Array:Float32Array;
var g={create:function(h,j){var i=new f(2);i[0]=h||0;i[1]=j||0;return i},copy:function(i,h){i[0]=h[0];i[1]=h[1];return i},clone:function(h){var i=new f(2);
i[0]=h[0];i[1]=h[1];return i},set:function(j,i,h){j[0]=i;j[1]=h;return j},add:function(h,j,i){h[0]=j[0]+i[0];h[1]=j[1]+i[1];return h},scaleAndAdd:function(i,k,j,h){i[0]=k[0]+j[0]*h;
i[1]=k[1]+j[1]*h;return i},sub:function(h,j,i){h[0]=j[0]-i[0];h[1]=j[1]-i[1];return h},len:function(h){return Math.sqrt(this.lenSquare(h))},lenSquare:function(h){return h[0]*h[0]+h[1]*h[1]
},mul:function(h,j,i){h[0]=j[0]*i[0];h[1]=j[1]*i[1];return h},div:function(h,j,i){h[0]=j[0]/i[0];h[1]=j[1]/i[1];return h},dot:function(i,h){return i[0]*h[0]+i[1]*h[1]
},scale:function(i,h,j){i[0]=h[0]*j;i[1]=h[1]*j;return i},normalize:function(i,h){var j=g.len(h);if(j===0){i[0]=0;i[1]=0}else{i[0]=h[0]/j;i[1]=h[1]/j}return i
},distance:function(i,h){return Math.sqrt((i[0]-h[0])*(i[0]-h[0])+(i[1]-h[1])*(i[1]-h[1]))},distanceSquare:function(i,h){return(i[0]-h[0])*(i[0]-h[0])+(i[1]-h[1])*(i[1]-h[1])
},negate:function(i,h){i[0]=-h[0];i[1]=-h[1];return i},lerp:function(h,k,j,i){h[0]=k[0]+i*(j[0]-k[0]);h[1]=k[1]+i*(j[1]-k[1]);return h},applyTransform:function(k,j,i){var h=j[0];
var l=j[1];k[0]=i[0]*h+i[2]*l+i[4];k[1]=i[1]*h+i[3]*l+i[5];return k},min:function(h,j,i){h[0]=Math.min(j[0],i[0]);h[1]=Math.min(j[1],i[1]);return h},max:function(h,j,i){h[0]=Math.max(j[0],i[0]);
h[1]=Math.max(j[1],i[1]);return h}};g.length=g.len;g.lengthSquare=g.lenSquare;g.dist=g.distance;g.distSquare=g.distanceSquare;return g});d("zrender/Painter",["require","./config","./tool/util","./tool/log","./loadingEffect/Base","./Layer","./shape/Image"],function(h){var g=h("./config");
var l=h("./tool/util");var j=h("./tool/log");var n=h("./loadingEffect/Base");var i=h("./Layer");function f(){return false}function m(){}function o(p){if(!p){return false
}if(p.isBuildin){return true}if(typeof(p.resize)!=="function"||typeof(p.refresh)!=="function"){return false}return true}var k=function(q,s){this.root=q;
q.style["-webkit-tap-highlight-color"]="transparent";q.style["-webkit-user-select"]="none";q.style["user-select"]="none";q.style["-webkit-touch-callout"]="none";
this.storage=s;q.innerHTML="";this._width=this._getWidth();this._height=this._getHeight();var p=document.createElement("div");this._domRoot=p;p.style.position="relative";
p.style.overflow="hidden";p.style.width=this._width+"px";p.style.height=this._height+"px";q.appendChild(p);this._layers={};this._zlevelList=[];this._layerConfig={};
this._loadingEffect=new n({});this.shapeToImage=this._createShapeToImageProcessor();this._bgDom=document.createElement("div");this._bgDom.style.cssText=["position:absolute;left:0px;top:0px;width:",this._width,"px;height:",this._height+"px;","-webkit-user-select:none;user-select;none;","-webkit-touch-callout:none;"].join("");
this._bgDom.setAttribute("data-zr-dom-id","bg");p.appendChild(this._bgDom);this._bgDom.onselectstart=f;var r=new i("_zrender_hover_",this);this._layers.hover=r;
p.appendChild(r.dom);r.initContext();r.dom.onselectstart=f;r.dom.style["-webkit-user-select"]="none";r.dom.style["user-select"]="none";r.dom.style["-webkit-touch-callout"]="none";
this.refreshNextFrame=null};k.prototype.render=function(p){if(this.isLoading()){this.hideLoading()}this.refresh(p,true);return this};k.prototype.refresh=function(u,p){var s=this.storage.getShapeList(true);
this._paintList(s,p);for(var r=0;r<this._zlevelList.length;r++){var t=this._zlevelList[r];var q=this._layers[t];if(!q.isBuildin&&q.refresh){q.refresh()
}}if(typeof u=="function"){u()}return this};k.prototype._preProcessLayer=function(p){p.unusedCount++;p.updateTransform()};k.prototype._postProcessLayer=function(p){p.dirty=false;
if(p.unusedCount==1){p.clear()}};k.prototype._paintList=function(s,v){if(typeof(v)=="undefined"){v=false}this._updateLayerStatus(s);var r;var w;var x;this.eachBuildinLayer(this._preProcessLayer);
for(var q=0,p=s.length;q<p;q++){var t=s[q];if(w!==t.zlevel){if(r){if(r.needTransform){x.restore()}x.flush&&x.flush()}w=t.zlevel;r=this.getLayer(w);if(!r.isBuildin){j("ZLevel "+w+" has been used by unkown layer "+r.id)
}x=r.ctx;r.unusedCount=0;if(r.dirty||v){r.clear()}if(r.needTransform){x.save();r.setTransform(x)}}if((r.dirty||v)&&!t.invisible){if(!t.onbrush||(t.onbrush&&!t.onbrush(x,false))){if(g.catchBrushException){try{t.brush(x,false,this.refreshNextFrame)
}catch(u){j(u,"brush error of "+t.type,t)}}else{t.brush(x,false,this.refreshNextFrame)}}}t.__dirty=false}if(r){if(r.needTransform){x.restore()}x.flush&&x.flush()
}this.eachBuildinLayer(this._postProcessLayer)};k.prototype.getLayer=function(p){var q=this._layers[p];if(!q){q=new i(p,this);q.isBuildin=true;if(this._layerConfig[p]){l.merge(q,this._layerConfig[p],true)
}q.updateTransform();this.insertLayer(p,q);q.initContext()}return q};k.prototype.insertLayer=function(q,s){if(this._layers[q]){j("ZLevel "+q+" has been used already");
return}if(!o(s)){j("Layer of zlevel "+q+" is not valid");return}var p=this._zlevelList.length;var t=null;var r=-1;if(p>0&&q>this._zlevelList[0]){for(r=0;
r<p-1;r++){if(this._zlevelList[r]<q&&this._zlevelList[r+1]>q){break}}t=this._layers[this._zlevelList[r]]}this._zlevelList.splice(r+1,0,q);var u=t?t.dom:this._bgDom;
if(u.nextSibling){u.parentNode.insertBefore(s.dom,u.nextSibling)}else{u.parentNode.appendChild(s.dom)}this._layers[q]=s};k.prototype.eachLayer=function(p,r){for(var q=0;
q<this._zlevelList.length;q++){var s=this._zlevelList[q];p.call(r,this._layers[s],s)}};k.prototype.eachBuildinLayer=function(p,s){for(var r=0;r<this._zlevelList.length;
r++){var t=this._zlevelList[r];var q=this._layers[t];if(q.isBuildin){p.call(s,q,t)}}};k.prototype.eachOtherLayer=function(p,s){for(var r=0;r<this._zlevelList.length;
r++){var t=this._zlevelList[r];var q=this._layers[t];if(!q.isBuildin){p.call(s,q,t)}}};k.prototype.getLayers=function(){return this._layers};k.prototype._updateLayerStatus=function(v){var w=this._layers;
var u={};this.eachBuildinLayer(function(x,y){u[y]=x.elCount;x.elCount=0});for(var t=0,q=v.length;t<q;t++){var r=v[t];var p=r.zlevel;var s=w[p];if(s){s.elCount++;
if(s.dirty){continue}s.dirty=r.__dirty}}this.eachBuildinLayer(function(x,y){if(u[y]!==x.elCount){x.dirty=true}})};k.prototype.refreshShapes=function(s,t){for(var r=0,p=s.length;
r<p;r++){var q=s[r];q.modSelf()}this.refresh(t);return this};k.prototype.setLoadingEffect=function(p){this._loadingEffect=p;return this};k.prototype.clear=function(){this.eachBuildinLayer(this._clearLayer);
return this};k.prototype._clearLayer=function(p){p.clear()};k.prototype.modLayer=function(p,q){if(q){if(!this._layerConfig[p]){this._layerConfig[p]=q}else{l.merge(this._layerConfig[p],q,true)
}var r=this._layers[p];if(r){l.merge(r,this._layerConfig[p],true)}}};k.prototype.delLayer=function(p){var q=this._layers[p];if(!q){return}this.modLayer(p,{position:q.position,rotation:q.rotation,scale:q.scale});
q.dom.parentNode.removeChild(q.dom);delete this._layers[p];this._zlevelList.splice(l.indexOf(this._zlevelList,p),1)};k.prototype.refreshHover=function(){this.clearHover();
var s=this.storage.getHoverShapes(true);for(var r=0,q=s.length;r<q;r++){this._brushHover(s[r])}var p=this._layers.hover.ctx;p.flush&&p.flush();this.storage.delHover();
return this};k.prototype.clearHover=function(){var p=this._layers.hover;p&&p.clear();return this};k.prototype.showLoading=function(p){this._loadingEffect&&this._loadingEffect.stop();
p&&this.setLoadingEffect(p);this._loadingEffect.start(this);this.loading=true;return this};k.prototype.hideLoading=function(){this._loadingEffect.stop();
this.clearHover();this.loading=false;return this};k.prototype.isLoading=function(){return this.loading};k.prototype.resize=function(){var q=this._domRoot;
q.style.display="none";var r=this._getWidth();var p=this._getHeight();q.style.display="";if(this._width!=r||p!=this._height){this._width=r;this._height=p;
q.style.width=r+"px";q.style.height=p+"px";for(var s in this._layers){this._layers[s].resize(r,p)}this.refresh(null,true)}return this};k.prototype.clearLayer=function(q){var p=this._layers[q];
if(p){p.clear()}};k.prototype.dispose=function(){if(this.isLoading()){this.hideLoading()}this.root.innerHTML="";this.root=this.storage=this._domRoot=this._layers=null
};k.prototype.getDomHover=function(){return this._layers.hover.dom};k.prototype.toDataURL=function(u,s,t){if(window.G_vmlCanvasManager){return null}var q=new i("image",this);
this._bgDom.appendChild(q.dom);q.initContext();var p=q.ctx;q.clearColor=s||"#fff";q.clear();var r=this;this.storage.iterShape(function(w){if(!w.invisible){if(!w.onbrush||(w.onbrush&&!w.onbrush(p,false))){if(g.catchBrushException){try{w.brush(p,false,r.refreshNextFrame)
}catch(x){j(x,"brush error of "+w.type,w)}}else{w.brush(p,false,r.refreshNextFrame)}}}},{normal:"up",update:true});var v=q.dom.toDataURL(u,t);p=null;this._bgDom.removeChild(q.dom);
return v};k.prototype.getWidth=function(){return this._width};k.prototype.getHeight=function(){return this._height};k.prototype._getWidth=function(){var p=this.root;
var q=p.currentStyle||document.defaultView.getComputedStyle(p);return((p.clientWidth||parseInt(q.width,10))-parseInt(q.paddingLeft,10)-parseInt(q.paddingRight,10)).toFixed(0)-0
};k.prototype._getHeight=function(){var p=this.root;var q=p.currentStyle||document.defaultView.getComputedStyle(p);return((p.clientHeight||parseInt(q.height,10))-parseInt(q.paddingTop,10)-parseInt(q.paddingBottom,10)).toFixed(0)-0
};k.prototype._brushHover=function(q){var p=this._layers.hover.ctx;if(!q.onbrush||(q.onbrush&&!q.onbrush(p,true))){var s=this.getLayer(q.zlevel);if(s.needTransform){p.save();
s.setTransform(p)}if(g.catchBrushException){try{q.brush(p,true,this.refreshNextFrame)}catch(r){j(r,"hoverBrush error of "+q.type,q)}}else{q.brush(p,true,this.refreshNextFrame)
}if(s.needTransform){p.restore()}}};k.prototype._shapeToImage=function(q,v,r,x,w){var s=document.createElement("canvas");var y=s.getContext("2d");s.style.width=r+"px";
s.style.height=x+"px";s.setAttribute("width",r*w);s.setAttribute("height",x*w);y.clearRect(0,0,r*w,x*w);var u={position:v.position,rotation:v.rotation,scale:v.scale};
v.position=[0,0,0];v.rotation=0;v.scale=[1,1];if(v){v.brush(y,false)}var p=h("./shape/Image");var t=new p({id:q,style:{x:0,y:0,image:s}});if(u.position!=null){t.position=v.position=u.position
}if(u.rotation!=null){t.rotation=v.rotation=u.rotation}if(u.scale!=null){t.scale=v.scale=u.scale}return t};k.prototype._createShapeToImageProcessor=function(){if(window.G_vmlCanvasManager){return m
}var p=this;return function(t,s,r,q){return p._shapeToImage(t,s,r,q,g.devicePixelRatio)}};return k});d("zrender/Storage",["require","./tool/util","./Group"],function(i){var f=i("./tool/util");
var h=i("./Group");var g={hover:false,normal:"down",update:false};function k(m,l){if(m.zlevel==l.zlevel){if(m.z==l.z){return m.__renderidx-l.__renderidx
}return m.z-l.z}return m.zlevel-l.zlevel}var j=function(){this._elements={};this._hoverElements=[];this._roots=[];this._shapeList=[];this._shapeListOffset=0
};j.prototype.iterShape=function(n,q){if(!q){q=g}if(q.hover){for(var o=0,m=this._hoverElements.length;o<m;o++){var p=this._hoverElements[o];p.updateTransform();
if(n(p)){return this}}}if(q.update){this.updateShapeList()}switch(q.normal){case"down":var m=this._shapeList.length;while(m--){if(n(this._shapeList[m])){return this
}}break;default:for(var o=0,m=this._shapeList.length;o<m;o++){if(n(this._shapeList[o])){return this}}break}return this};j.prototype.getHoverShapes=function(t){var n=[];
for(var r=0,m=this._hoverElements.length;r<m;r++){n.push(this._hoverElements[r]);var s=this._hoverElements[r].hoverConnect;if(s){var p;s=s instanceof Array?s:[s];
for(var q=0,o=s.length;q<o;q++){p=s[q].id?s[q]:this.get(s[q]);if(p){n.push(p)}}}}n.sort(k);if(t){for(var r=0,m=n.length;r<m;r++){n[r].updateTransform()
}}return n};j.prototype.getShapeList=function(l){if(l){this.updateShapeList()}return this._shapeList};j.prototype.updateShapeList=function(){this._shapeListOffset=0;
for(var n=0,l=this._roots.length;n<l;n++){var m=this._roots[n];this._updateAndAddShape(m)}this._shapeList.length=this._shapeListOffset;for(var n=0,l=this._shapeList.length;
n<l;n++){this._shapeList[n].__renderidx=n}this._shapeList.sort(k)};j.prototype._updateAndAddShape=function(m,n){if(m.ignore){return}m.updateTransform();
if(m.type=="group"){if(m.clipShape){m.clipShape.parent=m;m.clipShape.updateTransform();if(n){n=n.slice();n.push(m.clipShape)}else{n=[m.clipShape]}}for(var l=0;
l<m._children.length;l++){var o=m._children[l];o.__dirty=m.__dirty||o.__dirty;this._updateAndAddShape(o,n)}m.__dirty=false}else{m.__clipShapes=n;this._shapeList[this._shapeListOffset++]=m
}};j.prototype.mod=function(m,o){if(typeof(m)==="string"){m=this._elements[m]}if(m){m.modSelf();if(o){if(o.parent||o._storage||o.__clipShapes){var n={};
for(var l in o){if(l==="parent"||l==="_storage"||l==="__clipShapes"){continue}if(o.hasOwnProperty(l)){n[l]=o[l]}}f.merge(m,n,true)}else{f.merge(m,o,true)
}}}return this};j.prototype.drift=function(o,n,l){var m=this._elements[o];if(m){m.needTransform=true;if(m.draggable==="horizontal"){l=0}else{if(m.draggable==="vertical"){n=0
}}if(!m.ondrift||(m.ondrift&&!m.ondrift(n,l))){m.drift(n,l)}}return this};j.prototype.addHover=function(l){l.updateNeedTransform();this._hoverElements.push(l);
return this};j.prototype.delHover=function(){this._hoverElements=[];return this};j.prototype.hasHoverShape=function(){return this._hoverElements.length>0
};j.prototype.addRoot=function(l){if(this._elements[l.id]){return}if(l instanceof h){l.addChildrenToStorage(this)}this.addToMap(l);this._roots.push(l)};
j.prototype.delRoot=function(p){if(typeof(p)=="undefined"){for(var q=0;q<this._roots.length;q++){var o=this._roots[q];if(o instanceof h){o.delChildrenFromStorage(this)
}}this._elements={};this._hoverElements=[];this._roots=[];this._shapeList=[];this._shapeListOffset=0;return}if(p instanceof Array){for(var q=0,n=p.length;
q<n;q++){this.delRoot(p[q])}return}var r;if(typeof(p)=="string"){r=this._elements[p]}else{r=p}var m=f.indexOf(this._roots,r);if(m>=0){this.delFromMap(r.id);
this._roots.splice(m,1);if(r instanceof h){r.delChildrenFromStorage(this)}}};j.prototype.addToMap=function(l){if(l instanceof h){l._storage=this}l.modSelf();
this._elements[l.id]=l;return this};j.prototype.get=function(l){return this._elements[l]};j.prototype.delFromMap=function(l){var m=this._elements[l];if(m){delete this._elements[l];
if(m instanceof h){m._storage=null}}return this};j.prototype.dispose=function(){this._elements=this._renderList=this._roots=this._hoverElements=null};return j
});d("zrender/animation/Animation",["require","./Clip","../tool/color","../tool/util","../tool/event"],function(m){var g=m("./Clip");var r=m("../tool/color");
var f=m("../tool/util");var q=m("../tool/event").Dispatcher;var k=window.requestAnimationFrame||window.msRequestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(x){setTimeout(x,16)
};var w=Array.prototype.slice;var u=function(x){x=x||{};this.stage=x.stage||{};this.onframe=x.onframe||function(){};this._clips=[];this._running=false;
this._time=0;q.call(this)};u.prototype={add:function(x){this._clips.push(x)},remove:function(y){var x=f.indexOf(this._clips,y);if(x>=0){this._clips.splice(x,1)
}},_update:function(){var z=new Date().getTime();var F=z-this._time;var x=this._clips;var C=x.length;var y=[];var E=[];for(var B=0;B<C;B++){var A=x[B];
var D=A.step(z);if(D){y.push(D);E.push(A)}}for(var B=0;B<C;){if(x[B]._needsRemove){x[B]=x[C-1];x.pop();C--}else{B++}}C=y.length;for(var B=0;B<C;B++){E[B].fire(y[B])
}this._time=z;this.onframe(F);this.dispatch("frame",F);if(this.stage.update){this.stage.update()}},start:function(){var x=this;this._running=true;function y(){if(x._running){k(y);
x._update()}}this._time=new Date().getTime();k(y)},stop:function(){this._running=false},clear:function(){this._clips=[]},animate:function(z,y){y=y||{};
var x=new v(z,y.loop,y.getter,y.setter);x.animation=this;return x},constructor:u};f.merge(u.prototype,q.prototype,true);function j(y,x){return y[x]}function h(z,x,y){z[x]=y
}function p(z,y,x){return(y-z)*x+z}function t(F,E,C,z,D){var B=F.length;if(D==1){for(var A=0;A<B;A++){z[A]=p(F[A],E[A],C)}}else{var x=F[0].length;for(var A=0;
A<B;A++){for(var y=0;y<x;y++){z[A][y]=p(F[A][y],E[A][y],C)}}}}function i(x){switch(typeof x){case"undefined":case"string":return false}return typeof x.length!=="undefined"
}function n(I,H,G,F,J,C,B,z,E){var D=I.length;if(E==1){for(var A=0;A<D;A++){z[A]=l(I[A],H[A],G[A],F[A],J,C,B)}}else{var x=I[0].length;for(var A=0;A<D;A++){for(var y=0;
y<x;y++){z[A][y]=l(I[A][y],H[A][y],G[A][y],F[A][y],J,C,B)}}}}function l(E,D,B,A,F,y,x){var C=(B-E)*0.5;var z=(A-D)*0.5;return(2*(D-B)+C+z)*x+(-3*(D-B)-2*C-z)*y+C*F+D
}function o(A){if(i(A)){var x=A.length;if(i(A[0])){var y=[];for(var z=0;z<x;z++){y.push(w.call(A[z]))}return y}else{return w.call(A)}}else{return A}}function s(x){x[0]=Math.floor(x[0]);
x[1]=Math.floor(x[1]);x[2]=Math.floor(x[2]);return"rgba("+x.join(",")+")"}var v=function(z,y,x,A){this._tracks={};this._target=z;this._loop=y||false;this._getter=x||j;
this._setter=A||h;this._clipCount=0;this._delay=0;this._doneList=[];this._onframeList=[];this._clipList=[]};v.prototype={when:function(z,x){for(var y in x){if(!this._tracks[y]){this._tracks[y]=[];
if(z!==0){this._tracks[y].push({time:0,value:o(this._getter(this._target,y))})}}this._tracks[y].push({time:parseInt(z,10),value:x[y]})}return this},during:function(x){this._onframeList.push(x);
return this},start:function(E){var z=this;var D=this._setter;var y=this._getter;var A=E==="spline";var C=function(){z._clipCount--;if(z._clipCount===0){z._tracks={};
var F=z._doneList.length;for(var G=0;G<F;G++){z._doneList[G].call(z)}}};var x=function(S,R){var F=S.length;if(!F){return}var U=S[0].value;var V=i(U);var K=false;
var L=(V&&i(U[0]))?2:1;S.sort(function(ad,ac){return ad.time-ac.time});var P;if(F){P=S[F-1].time}else{return}var X=[];var ab=[];for(var W=0;W<F;W++){X.push(S[W].time/P);
var T=S[W].value;if(typeof(T)=="string"){T=r.toArray(T);if(T.length===0){T[0]=T[1]=T[2]=0;T[3]=1}K=true}ab.push(T)}var O=0;var aa=0;var M;var W;var Q;var J;
var I;var H;var G;if(K){var N=[0,0,0,0]}var Z=function(af,ad){if(ad<aa){M=Math.min(O+1,F-1);for(W=M;W>=0;W--){if(X[W]<=ad){break}}W=Math.min(W,F-2)}else{for(W=O;
W<F;W++){if(X[W]>ad){break}}W=Math.min(W-1,F-2)}O=W;aa=ad;var ac=(X[W+1]-X[W]);if(ac===0){return}else{Q=(ad-X[W])/ac}if(A){I=ab[W];J=ab[W===0?W:W-1];H=ab[W>F-2?F-1:W+1];
G=ab[W>F-3?F-1:W+2];if(V){n(J,I,H,G,Q,Q*Q,Q*Q*Q,y(af,R),L)}else{var ae;if(K){ae=n(J,I,H,G,Q,Q*Q,Q*Q*Q,N,1);ae=s(N)}else{ae=l(J,I,H,G,Q,Q*Q,Q*Q*Q)}D(af,R,ae)
}}else{if(V){t(ab[W],ab[W+1],Q,y(af,R),L)}else{var ae;if(K){t(ab[W],ab[W+1],Q,N,1);ae=s(N)}else{ae=p(ab[W],ab[W+1],Q)}D(af,R,ae)}}for(W=0;W<z._onframeList.length;
W++){z._onframeList[W](af,ad)}};var Y=new g({target:z._target,life:P,loop:z._loop,delay:z._delay,onframe:Z,ondestroy:C});if(E&&E!=="spline"){Y.easing=E
}z._clipList.push(Y);z._clipCount++;z.animation.add(Y)};for(var B in this._tracks){x(this._tracks[B],B)}return this},stop:function(){for(var x=0;x<this._clipList.length;
x++){var y=this._clipList[x];this.animation.remove(y)}this._clipList=[]},delay:function(x){this._delay=x;return this},done:function(x){if(x){this._doneList.push(x)
}return this}};return u});d("zrender/tool/curve",["require","./vector"],function(l){var i=l("./vector");"use strict";var p=0.0001;var u=Math.sqrt(3);var o=1/3;
var v=i.create();var t=i.create();var r=i.create();function k(B){return B>-p&&B<p}function s(B){return B>p||B<-p}function f(G,F,E,D,B){var C=1-B;return C*C*(C*G+3*B*F)+B*B*(B*D+3*C*E)
}function g(G,F,E,D,B){var C=1-B;return 3*(((F-G)*C+2*(E-F)*B)*C+(D-E)*B*B)}function A(I,H,G,E,ae,O){var ad=E+3*(H-G)-I;var ac=3*(G-H*2+I);var ab=3*(H-I);
var Z=I-ae;var X=ac*ac-3*ad*ab;var W=ac*ab-9*ad*Z;var V=ab*ab-3*ac*Z;var Y=0;if(k(X)&&k(W)){if(k(ac)){O[0]=0}else{var U=-ab/ac;if(U>=0&&U<=1){O[Y++]=U}}}else{var D=W*W-4*X*V;
if(k(D)){var R=W/X;var U=-ac/ad+R;var S=-R/2;if(U>=0&&U<=1){O[Y++]=U}if(S>=0&&S<=1){O[Y++]=S}}else{if(D>0){var F=Math.sqrt(D);var M=X*ac+1.5*ad*(-W+F);
var L=X*ac+1.5*ad*(-W-F);if(M<0){M=-Math.pow(-M,o)}else{M=Math.pow(M,o)}if(L<0){L=-Math.pow(-L,o)}else{L=Math.pow(L,o)}var U=(-ac-(M+L))/(3*ad);if(U>=0&&U<=1){O[Y++]=U
}}else{var J=(2*X*ac-3*ad*W)/(2*Math.sqrt(X*X*X));var P=Math.acos(J)/3;var N=Math.sqrt(X);var aa=Math.cos(P);var U=(-ac-2*N*aa)/(3*ad);var S=(-ac+N*(aa+u*Math.sin(P)))/(3*ad);
var Q=(-ac+N*(aa-u*Math.sin(P)))/(3*ad);if(U>=0&&U<=1){O[Y++]=U}if(S>=0&&S<=1){O[Y++]=S}if(Q>=0&&Q<=1){O[Y++]=Q}}}}return Y}function j(M,L,K,J,F){var H=6*K-12*L+6*M;
var I=9*L+3*J-3*M-9*K;var G=3*L-3*M;var B=0;if(k(I)){if(s(H)){var E=-G/H;if(E>=0&&E<=1){F[B++]=E}}}else{var C=H*H-4*I*G;if(k(C)){F[0]=-H/(2*I)}else{if(C>0){var N=Math.sqrt(C);
var E=(-H+N)/(2*I);var D=(-H-N)/(2*I);if(E>=0&&E<=1){F[B++]=E}if(D>=0&&D<=1){F[B++]=D}}}}return B}function h(K,J,I,H,L,C){var D=(J-K)*L+K;var B=(I-J)*L+J;
var E=(H-I)*L+I;var M=(B-D)*L+D;var G=(E-B)*L+B;var F=(G-M)*L+M;C[0]=K;C[1]=D;C[2]=M;C[3]=F;C[4]=F;C[5]=G;C[6]=E;C[7]=H}function q(P,E,O,D,N,C,M,B,G,F,L){var H;
var S=0.005;var R=Infinity;v[0]=G;v[1]=F;for(var Q=0;Q<1;Q+=0.05){t[0]=f(P,O,N,M,Q);t[1]=f(E,D,C,B,Q);var U=i.distSquare(v,t);if(U<R){H=Q;R=U}}R=Infinity;
for(var K=0;K<32;K++){if(S<p){break}var I=H-S;var J=H+S;t[0]=f(P,O,N,M,I);t[1]=f(E,D,C,B,I);var U=i.distSquare(t,v);if(I>=0&&U<R){H=I;R=U}else{r[0]=f(P,O,N,M,J);
r[1]=f(E,D,C,B,J);var T=i.distSquare(r,v);if(J<=1&&T<R){H=J;R=T}else{S*=0.5}}}if(L){L[0]=f(P,O,N,M,H);L[1]=f(E,D,C,B,H)}return Math.sqrt(R)}function w(F,E,D,B){var C=1-B;
return C*(C*F+2*B*E)+B*B*D}function z(E,D,C,B){return 2*((1-B)*(D-E)+B*(C-D))}function m(M,K,J,C,L){var I=M-2*K+J;var H=2*(K-M);var G=M-C;var B=0;if(k(I)){if(s(H)){var F=-G/H;
if(F>=0&&F<=1){L[B++]=F}}}else{var D=H*H-4*I*G;if(k(D)){var F=-H/(2*I);if(F>=0&&F<=1){L[B++]=F}}else{if(D>0){var N=Math.sqrt(D);var F=(-H+N)/(2*I);var E=(-H-N)/(2*I);
if(F>=0&&F<=1){L[B++]=F}if(E>=0&&E<=1){L[B++]=E}}}}return B}function x(E,D,C){var B=E+C-2*D;if(B===0){return 0.5}else{return(E-D)/B}}function y(I,H,G,D,C){var E=(H-I)*D+I;
var F=(G-H)*D+H;var B=(F-E)*D+E;C[0]=I;C[1]=E;C[2]=B;C[3]=B;C[4]=F;C[5]=G}function n(N,D,M,C,L,B,F,E,K){var G;var Q=0.005;var P=Infinity;v[0]=F;v[1]=E;
for(var O=0;O<1;O+=0.05){t[0]=w(N,M,L,O);t[1]=w(D,C,B,O);var S=i.distSquare(v,t);if(S<P){G=O;P=S}}P=Infinity;for(var J=0;J<32;J++){if(Q<p){break}var H=G-Q;
var I=G+Q;t[0]=w(N,M,L,H);t[1]=w(D,C,B,H);var S=i.distSquare(t,v);if(H>=0&&S<P){G=H;P=S}else{r[0]=w(N,M,L,I);r[1]=w(D,C,B,I);var R=i.distSquare(r,v);if(I<=1&&R<P){G=I;
P=R}else{Q*=0.5}}}if(K){K[0]=w(N,M,L,G);K[1]=w(D,C,B,G)}return Math.sqrt(P)}return{cubicAt:f,cubicDerivativeAt:g,cubicRootAt:A,cubicExtrema:j,cubicSubdivide:h,cubicProjectPoint:q,quadraticAt:w,quadraticDerivativeAt:z,quadraticRootAt:m,quadraticExtremum:x,quadraticSubdivide:y,quadraticProjectPoint:n}
});d("zrender/loadingEffect/Base",["require","../tool/util","../shape/Text","../shape/Rectangle"],function(h){var f=h("../tool/util");var j=h("../shape/Text");
var l=h("../shape/Rectangle");var k="Loading...";var g="normal 16px Arial";function i(m){this.setOptions(m)}i.prototype.createTextShape=function(m){return new j({highlightStyle:f.merge({x:this.canvasWidth/2,y:this.canvasHeight/2,text:k,textAlign:"center",textBaseline:"middle",textFont:g,color:"#333",brushType:"fill"},m,true)})
};i.prototype.createBackgroundShape=function(m){return new l({highlightStyle:{x:0,y:0,width:this.canvasWidth,height:this.canvasHeight,brushType:"fill",color:m}})
};i.prototype.start=function(m){this.canvasWidth=m._width;this.canvasHeight=m._height;function n(p){m.storage.addHover(p)}function o(){m.refreshHover()
}this.loadingTimer=this._start(n,o)};i.prototype._start=function(){return setInterval(function(){},10000)};i.prototype.stop=function(){clearInterval(this.loadingTimer)
};i.prototype.setOptions=function(m){this.options=m||{}};i.prototype.adjust=function(m,n){if(m<=n[0]){m=n[0]}else{if(m>=n[1]){m=n[1]}}return m};i.prototype.getLocation=function(p,n,o){var m=p.x!=null?p.x:"center";
switch(m){case"center":m=Math.floor((this.canvasWidth-n)/2);break;case"left":m=0;break;case"right":m=this.canvasWidth-n;break}var q=p.y!=null?p.y:"center";
switch(q){case"center":q=Math.floor((this.canvasHeight-o)/2);break;case"top":q=0;break;case"bottom":q=this.canvasHeight-o;break}return{x:m,y:q,width:n,height:o}
};return i});d("zrender/Layer",["require","./mixin/Transformable","./tool/util","./config"],function(i){var f=i("./mixin/Transformable");var g=i("./tool/util");
var k=window.G_vmlCanvasManager;var h=i("./config");function j(){return false}function l(s,r,o){var p=document.createElement(r);var q=o.getWidth();var n=o.getHeight();
p.style.position="absolute";p.style.left=0;p.style.top=0;p.style.width=q+"px";p.style.height=n+"px";p.width=q*h.devicePixelRatio;p.height=n*h.devicePixelRatio;
p.setAttribute("data-zr-dom-id",s);return p}var m=function(o,n){this.id=o;this.dom=l(o,"canvas",n);this.dom.onselectstart=j;this.dom.style["-webkit-user-select"]="none";
this.dom.style["user-select"]="none";this.dom.style["-webkit-touch-callout"]="none";this.dom.style["-webkit-tap-highlight-color"]="rgba(0,0,0,0)";k&&k.initElement(this.dom);
this.domBack=null;this.ctxBack=null;this.painter=n;this.unusedCount=0;this.config=null;this.dirty=true;this.elCount=0;this.clearColor=0;this.motionBlur=false;
this.lastFrameAlpha=0.7;this.zoomable=false;this.panable=false;this.maxZoom=Infinity;this.minZoom=0;f.call(this)};m.prototype.initContext=function(){this.ctx=this.dom.getContext("2d");
var n=h.devicePixelRatio;if(n!=1){this.ctx.scale(n,n)}};m.prototype.createBackBuffer=function(){if(k){return}this.domBack=l("back-"+this.id,"canvas",this.painter);
this.ctxBack=this.domBack.getContext("2d");var n=h.devicePixelRatio;if(n!=1){this.ctxBack.scale(n,n)}};m.prototype.resize=function(o,n){var p=h.devicePixelRatio;
this.dom.style.width=o+"px";this.dom.style.height=n+"px";this.dom.setAttribute("width",o*p);this.dom.setAttribute("height",n*p);if(p!=1){this.ctx.scale(p,p)
}if(this.domBack){this.domBack.setAttribute("width",o*p);this.domBack.setAttribute("height",n*p);if(p!=1){this.ctxBack.scale(p,p)}}};m.prototype.clear=function(){var p=this.dom;
var v=this.ctx;var o=p.width;var u=p.height;var r=this.clearColor&&!k;var t=this.motionBlur&&!k;var n=this.lastFrameAlpha;var s=h.devicePixelRatio;if(t){if(!this.domBack){this.createBackBuffer()
}this.ctxBack.globalCompositeOperation="copy";this.ctxBack.drawImage(p,0,0,o/s,u/s)}v.clearRect(0,0,o/s,u/s);if(r){v.save();v.fillStyle=this.clearColor;
v.fillRect(0,0,o/s,u/s);v.restore()}if(t){var q=this.domBack;v.save();v.globalAlpha=n;v.drawImage(q,0,0,o/s,u/s);v.restore()}};g.merge(m.prototype,f.prototype);
return m});d("zrender/shape/Heart",["require","./Base","./util/PathProxy","../tool/area","../tool/util"],function(g){var h=g("./Base");var f=g("./util/PathProxy");
var j=g("../tool/area");var i=function(k){h.call(this,k);this._pathProxy=new f()};i.prototype={type:"heart",buildPath:function(k,l){var m=this._pathProxy||new f();
m.begin(k);m.moveTo(l.x,l.y);m.bezierCurveTo(l.x+l.a/2,l.y-l.b*2/3,l.x+l.a*2,l.y+l.b/3,l.x,l.y+l.b);m.bezierCurveTo(l.x-l.a*2,l.y+l.b/3,l.x-l.a/2,l.y-l.b*2/3,l.x,l.y);
m.closePath();return},getRect:function(k){if(k.__rect){return k.__rect}if(!this._pathProxy.isEmpty()){this.buildPath(null,k)}return this._pathProxy.fastBoundingRect()
},isCover:function(k,m){var l=this.transformCoordToLocal(k,m);k=l[0];m=l[1];if(this.isCoverRect(k,m)){return j.isInsidePath(this._pathProxy.pathCommands,this.style.lineWidth,this.style.brushType,k,m)
}}};g("../tool/util").inherits(i,h);return i});d("zrender/shape/Star",["require","../tool/math","./Base","../tool/util"],function(g){var j=g("../tool/math");
var f=j.sin;var k=j.cos;var l=Math.PI;var i=g("./Base");var h=function(m){i.call(this,m)};h.prototype={type:"star",buildPath:function(D,p){var s=p.n;if(!s||s<2){return
}var B=p.x;var z=p.y;var o=p.r;var t=p.r0;if(t==null){t=s>4?o*k(2*l/s)/k(l/s):o/3}var C=l/s;var q=-l/2;var w=B+o*k(q);var E=z+o*f(q);q+=C;var m=p.pointList=[];
m.push([w,E]);for(var v=0,u=s*2-1,A;v<u;v++){A=v%2===0?t:o;m.push([B+A*k(q),z+A*f(q)]);q+=C}m.push([w,E]);D.moveTo(m[0][0],m[0][1]);for(var v=0;v<m.length;
v++){D.lineTo(m[v][0],m[v][1])}D.closePath();return},getRect:function(n){if(n.__rect){return n.__rect}var m;if(n.brushType=="stroke"||n.brushType=="fill"){m=n.lineWidth||1
}else{m=0}n.__rect={x:Math.round(n.x-n.r-m/2),y:Math.round(n.y-n.r-m/2),width:n.r*2+m,height:n.r*2+m};return n.__rect}};g("../tool/util").inherits(h,i);
return h});d("zrender/shape/Droplet",["require","./Base","./util/PathProxy","../tool/area","../tool/util"],function(g){var h=g("./Base");var f=g("./util/PathProxy");
var i=g("../tool/area");var j=function(k){h.call(this,k);this._pathProxy=new f()};j.prototype={type:"droplet",buildPath:function(k,l){var m=this._pathProxy||new f();
m.begin(k);m.moveTo(l.x,l.y+l.a);m.bezierCurveTo(l.x+l.a,l.y+l.a,l.x+l.a*3/2,l.y-l.a/3,l.x,l.y-l.b);m.bezierCurveTo(l.x-l.a*3/2,l.y-l.a/3,l.x-l.a,l.y+l.a,l.x,l.y+l.a);
m.closePath()},getRect:function(k){if(k.__rect){return k.__rect}if(!this._pathProxy.isEmpty()){this.buildPath(null,k)}return this._pathProxy.fastBoundingRect()
},isCover:function(k,m){var l=this.transformCoordToLocal(k,m);k=l[0];m=l[1];if(this.isCoverRect(k,m)){return i.isInsidePath(this._pathProxy.pathCommands,this.style.lineWidth,this.style.brushType,k,m)
}}};g("../tool/util").inherits(j,h);return j});d("zrender/shape/Text",["require","../tool/area","./Base","../tool/util"],function(f){var i=f("../tool/area");
var g=f("./Base");var h=function(j){g.call(this,j)};h.prototype={type:"text",brush:function(t,m){var j=this.style;if(m){j=this.getHighlightStyle(j,this.highlightStyle||{})
}if(typeof(j.text)=="undefined"||j.text===false){return}t.save();this.doClip(t);this.setContext(t,j);this.setTransform(t);if(j.textFont){t.font=j.textFont
}t.textAlign=j.textAlign||"start";t.textBaseline=j.textBaseline||"middle";var s=(j.text+"").split("\n");var r=i.getTextHeight("国",j.textFont);var p=this.getRect(j);
var q=j.x;var o;if(j.textBaseline=="top"){o=p.y}else{if(j.textBaseline=="bottom"){o=p.y+r}else{o=p.y+r/2}}for(var n=0,k=s.length;n<k;n++){if(j.maxWidth){switch(j.brushType){case"fill":t.fillText(s[n],q,o,j.maxWidth);
break;case"stroke":t.strokeText(s[n],q,o,j.maxWidth);break;case"both":t.fillText(s[n],q,o,j.maxWidth);t.strokeText(s[n],q,o,j.maxWidth);break;default:t.fillText(s[n],q,o,j.maxWidth)
}}else{switch(j.brushType){case"fill":t.fillText(s[n],q,o);break;case"stroke":t.strokeText(s[n],q,o);break;case"both":t.fillText(s[n],q,o);t.strokeText(s[n],q,o);
break;default:t.fillText(s[n],q,o)}}o+=r}t.restore();return},getRect:function(n){if(n.__rect){return n.__rect}var m=i.getTextWidth(n.text,n.textFont);var k=i.getTextHeight(n.text,n.textFont);
var l=n.x;if(n.textAlign=="end"||n.textAlign=="right"){l-=m}else{if(n.textAlign=="center"){l-=(m/2)}}var j;if(n.textBaseline=="top"){j=n.y}else{if(n.textBaseline=="bottom"){j=n.y-k
}else{j=n.y-k/2}}n.__rect={x:l,y:j,width:m,height:k};return n.__rect}};f("../tool/util").inherits(h,g);return h});d("zrender/tool/math",[],function(){var i=Math.PI/180;
function h(l,k){return Math.sin(k?l*i:l)}function j(l,k){return Math.cos(k?l*i:l)}function f(k){return k*i}function g(k){return k/i}return{sin:h,cos:j,degreeToRadian:f,radianToDegree:g}
});d("zrender/Group",["require","./tool/guid","./tool/util","./mixin/Transformable","./mixin/Eventful"],function(j){var i=j("./tool/guid");var g=j("./tool/util");
var f=j("./mixin/Transformable");var k=j("./mixin/Eventful");var h=function(l){l=l||{};this.id=l.id||i();for(var m in l){this[m]=l[m]}this.type="group";
this.clipShape=null;this._children=[];this._storage=null;this.__dirty=true;f.call(this);k.call(this)};h.prototype.ignore=false;h.prototype.children=function(){return this._children.slice()
};h.prototype.childAt=function(l){return this._children[l]};h.prototype.addChild=function(l){if(l==this){return}if(l.parent==this){return}if(l.parent){l.parent.removeChild(l)
}this._children.push(l);l.parent=this;if(this._storage&&this._storage!==l._storage){this._storage.addToMap(l);if(l instanceof h){l.addChildrenToStorage(this._storage)
}}};h.prototype.removeChild=function(m){var l=g.indexOf(this._children,m);if(l>=0){this._children.splice(l,1)}m.parent=null;if(this._storage){this._storage.delFromMap(m.id);
if(m instanceof h){m.delChildrenFromStorage(this._storage)}}};h.prototype.clearChildren=function(){for(var l=0;l<this._children.length;l++){var m=this._children[l];
if(this._storage){this._storage.delFromMap(m.id);if(m instanceof h){m.delChildrenFromStorage(this._storage)}}}this._children.length=0};h.prototype.eachChild=function(l,n){var p=!!n;
for(var m=0;m<this._children.length;m++){var o=this._children[m];if(p){l.call(n,o)}else{l(o)}}};h.prototype.traverse=function(l,n){var p=!!n;for(var m=0;
m<this._children.length;m++){var o=this._children[m];if(p){l.call(n,o)}else{l(o)}if(o.type==="group"){o.traverse(l,n)}}};h.prototype.addChildrenToStorage=function(n){for(var l=0;
l<this._children.length;l++){var m=this._children[l];n.addToMap(m);if(m instanceof h){m.addChildrenToStorage(n)}}};h.prototype.delChildrenFromStorage=function(n){for(var l=0;
l<this._children.length;l++){var m=this._children[l];n.delFromMap(m.id);if(m instanceof h){m.delChildrenFromStorage(n)}}};h.prototype.modSelf=function(){this.__dirty=true
};g.merge(h.prototype,f.prototype,true);g.merge(h.prototype,k.prototype,true);return h});d("zrender/shape/util/PathProxy",["require","../../tool/vector"],function(i){var h=i("../../tool/vector");
var f=function(k,j){this.command=k;this.points=j||null};var g=function(){this.pathCommands=[];this._ctx=null;this._min=[];this._max=[]};g.prototype.fastBoundingRect=function(){var q=this._min;
var u=this._max;q[0]=q[1]=Infinity;u[0]=u[1]=-Infinity;for(var t=0;t<this.pathCommands.length;t++){var s=this.pathCommands[t];var m=s.points;switch(s.command){case"M":h.min(q,q,m);
h.max(u,u,m);break;case"L":h.min(q,q,m);h.max(u,u,m);break;case"C":for(var r=0;r<6;r+=2){q[0]=Math.min(q[0],q[0],m[r]);q[1]=Math.min(q[1],q[1],m[r+1]);
u[0]=Math.max(u[0],u[0],m[r]);u[1]=Math.max(u[1],u[1],m[r+1])}break;case"Q":for(var r=0;r<4;r+=2){q[0]=Math.min(q[0],q[0],m[r]);q[1]=Math.min(q[1],q[1],m[r+1]);
u[0]=Math.max(u[0],u[0],m[r]);u[1]=Math.max(u[1],u[1],m[r+1])}break;case"A":var o=m[0];var n=m[1];var l=m[2];var k=m[3];q[0]=Math.min(q[0],q[0],o-l);q[1]=Math.min(q[1],q[1],n-k);
u[0]=Math.max(u[0],u[0],o+l);u[1]=Math.max(u[1],u[1],n+k);break}}return{x:q[0],y:q[1],width:u[0]-q[0],height:u[1]-q[1]}};g.prototype.begin=function(j){this._ctx=j||null;
this.pathCommands.length=0;return this};g.prototype.moveTo=function(j,k){this.pathCommands.push(new f("M",[j,k]));if(this._ctx){this._ctx.moveTo(j,k)}return this
};g.prototype.lineTo=function(j,k){this.pathCommands.push(new f("L",[j,k]));if(this._ctx){this._ctx.lineTo(j,k)}return this};g.prototype.bezierCurveTo=function(m,o,k,n,j,l){this.pathCommands.push(new f("C",[m,o,k,n,j,l]));
if(this._ctx){this._ctx.bezierCurveTo(m,o,k,n,j,l)}return this};g.prototype.quadraticCurveTo=function(k,m,j,l){this.pathCommands.push(new f("Q",[k,m,j,l]));
if(this._ctx){this._ctx.quadraticCurveTo(k,m,j,l)}return this};g.prototype.arc=function(j,o,m,l,k,n){this.pathCommands.push(new f("A",[j,o,m,m,l,k-l,0,n?0:1]));
if(this._ctx){this._ctx.arc(j,o,m,l,k,n)}return this};g.prototype.arcTo=function(l,n,k,m,j){if(this._ctx){this._ctx.arcTo(l,n,k,m,j)}return this};g.prototype.rect=function(j,m,k,l){if(this._ctx){this._ctx.rect(j,m,k,l)
}return this};g.prototype.closePath=function(){this.pathCommands.push(new f("z"));if(this._ctx){this._ctx.closePath()}return this};g.prototype.isEmpty=function(){return this.pathCommands.length===0
};g.PathSegment=f;return g});d("zrender/animation/Clip",["require","./easing"],function(g){var h=g("./easing");function f(i){this._targetPool=i.target||{};
if(!(this._targetPool instanceof Array)){this._targetPool=[this._targetPool]}this._life=i.life||1000;this._delay=i.delay||0;this._startTime=new Date().getTime()+this._delay;
this._endTime=this._startTime+this._life*1000;this.loop=typeof i.loop=="undefined"?false:i.loop;this.gap=i.gap||0;this.easing=i.easing||"Linear";this.onframe=i.onframe;
this.ondestroy=i.ondestroy;this.onrestart=i.onrestart}f.prototype={step:function(k){var j=(k-this._startTime)/this._life;if(j<0){return}j=Math.min(j,1);
var i=typeof this.easing=="string"?h[this.easing]:this.easing;var l=typeof i==="function"?i(j):j;this.fire("frame",l);if(j==1){if(this.loop){this.restart();
return"restart"}this._needsRemove=true;return"destroy"}return null},restart:function(){var j=new Date().getTime();var i=(j-this._startTime)%this._life;
this._startTime=new Date().getTime()-i+this.gap;this._needsRemove=false},fire:function(m,k){for(var l=0,j=this._targetPool.length;l<j;l++){if(this["on"+m]){this["on"+m](this._targetPool[l],k)
}}},constructor:f};return f});d("zrender/shape/Line",["require","./Base","./util/dashedLineTo","../tool/util"],function(g){var h=g("./Base");var f=g("./util/dashedLineTo");
var i=function(j){this.brushTypeOnly="stroke";this.textPosition="end";h.call(this,j)};i.prototype={type:"line",buildPath:function(j,k){if(!k.lineType||k.lineType=="solid"){j.moveTo(k.xStart,k.yStart);
j.lineTo(k.xEnd,k.yEnd)}else{if(k.lineType=="dashed"||k.lineType=="dotted"){var l=(k.lineWidth||1)*(k.lineType=="dashed"?5:1);f(j,k.xStart,k.yStart,k.xEnd,k.yEnd,l)
}}},getRect:function(k){if(k.__rect){return k.__rect}var j=k.lineWidth||1;k.__rect={x:Math.min(k.xStart,k.xEnd)-j,y:Math.min(k.yStart,k.yEnd)-j,width:Math.abs(k.xStart-k.xEnd)+j,height:Math.abs(k.yStart-k.yEnd)+j};
return k.__rect}};g("../tool/util").inherits(i,h);return i});d("zrender/shape/util/dashedLineTo",[],function(){var f=[5,5];return function(p,j,o,g,n,h){if(p.setLineDash){f[0]=f[1]=h;
p.setLineDash(f);p.moveTo(j,o);p.lineTo(g,n);return}h=typeof h!="number"?5:h;var r=g-j;var q=n-o;var l=Math.floor(Math.sqrt(r*r+q*q)/h);r=r/l;q=q/l;var m=true;
for(var k=0;k<l;++k){if(m){p.moveTo(j,o)}else{p.lineTo(j,o)}m=!m;j+=r;o+=q}p.lineTo(g,n)}});d("zrender/animation/easing",[],function(){var f={Linear:function(g){return g
},QuadraticIn:function(g){return g*g},QuadraticOut:function(g){return g*(2-g)},QuadraticInOut:function(g){if((g*=2)<1){return 0.5*g*g}return -0.5*(--g*(g-2)-1)
},CubicIn:function(g){return g*g*g},CubicOut:function(g){return --g*g*g+1},CubicInOut:function(g){if((g*=2)<1){return 0.5*g*g*g}return 0.5*((g-=2)*g*g+2)
},QuarticIn:function(g){return g*g*g*g},QuarticOut:function(g){return 1-(--g*g*g*g)},QuarticInOut:function(g){if((g*=2)<1){return 0.5*g*g*g*g}return -0.5*((g-=2)*g*g*g-2)
},QuinticIn:function(g){return g*g*g*g*g},QuinticOut:function(g){return --g*g*g*g*g+1},QuinticInOut:function(g){if((g*=2)<1){return 0.5*g*g*g*g*g}return 0.5*((g-=2)*g*g*g*g+2)
},SinusoidalIn:function(g){return 1-Math.cos(g*Math.PI/2)},SinusoidalOut:function(g){return Math.sin(g*Math.PI/2)},SinusoidalInOut:function(g){return 0.5*(1-Math.cos(Math.PI*g))
},ExponentialIn:function(g){return g===0?0:Math.pow(1024,g-1)},ExponentialOut:function(g){return g===1?1:1-Math.pow(2,-10*g)},ExponentialInOut:function(g){if(g===0){return 0
}if(g===1){return 1}if((g*=2)<1){return 0.5*Math.pow(1024,g-1)}return 0.5*(-Math.pow(2,-10*(g-1))+2)},CircularIn:function(g){return 1-Math.sqrt(1-g*g)},CircularOut:function(g){return Math.sqrt(1-(--g*g))
},CircularInOut:function(g){if((g*=2)<1){return -0.5*(Math.sqrt(1-g*g)-1)}return 0.5*(Math.sqrt(1-(g-=2)*g)+1)},ElasticIn:function(h){var i;var g=0.1;var j=0.4;
if(h===0){return 0}if(h===1){return 1}if(!g||g<1){g=1;i=j/4}else{i=j*Math.asin(1/g)/(2*Math.PI)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h-i)*(2*Math.PI)/j))
},ElasticOut:function(h){var i;var g=0.1;var j=0.4;if(h===0){return 0}if(h===1){return 1}if(!g||g<1){g=1;i=j/4}else{i=j*Math.asin(1/g)/(2*Math.PI)}return(g*Math.pow(2,-10*h)*Math.sin((h-i)*(2*Math.PI)/j)+1)
},ElasticInOut:function(h){var i;var g=0.1;var j=0.4;if(h===0){return 0}if(h===1){return 1}if(!g||g<1){g=1;i=j/4}else{i=j*Math.asin(1/g)/(2*Math.PI)}if((h*=2)<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h-i)*(2*Math.PI)/j))
}return g*Math.pow(2,-10*(h-=1))*Math.sin((h-i)*(2*Math.PI)/j)*0.5+1},BackIn:function(g){var h=1.70158;return g*g*((h+1)*g-h)},BackOut:function(g){var h=1.70158;
return --g*g*((h+1)*g+h)+1},BackInOut:function(g){var h=1.70158*1.525;if((g*=2)<1){return 0.5*(g*g*((h+1)*g-h))}return 0.5*((g-=2)*g*((h+1)*g+h)+2)},BounceIn:function(g){return 1-f.BounceOut(1-g)
},BounceOut:function(g){if(g<(1/2.75)){return 7.5625*g*g}else{if(g<(2/2.75)){return 7.5625*(g-=(1.5/2.75))*g+0.75}else{if(g<(2.5/2.75)){return 7.5625*(g-=(2.25/2.75))*g+0.9375
}else{return 7.5625*(g-=(2.625/2.75))*g+0.984375}}}},BounceInOut:function(g){if(g<0.5){return f.BounceIn(g*2)*0.5}return f.BounceOut(g*2-1)*0.5+0.5}};return f
});d("zrender/shape/BezierCurve",["require","./Base","../tool/util"],function(f){var g=f("./Base");var h=function(i){this.brushTypeOnly="stroke";this.textPosition="end";
g.call(this,i)};h.prototype={type:"bezier-curve",buildPath:function(i,j){i.moveTo(j.xStart,j.yStart);if(typeof j.cpX2!="undefined"&&typeof j.cpY2!="undefined"){i.bezierCurveTo(j.cpX1,j.cpY1,j.cpX2,j.cpY2,j.xEnd,j.yEnd)
}else{i.quadraticCurveTo(j.cpX1,j.cpY1,j.xEnd,j.yEnd)}},getRect:function(k){if(k.__rect){return k.__rect}var p=Math.min(k.xStart,k.xEnd,k.cpX1);var n=Math.min(k.yStart,k.yEnd,k.cpY1);
var l=Math.max(k.xStart,k.xEnd,k.cpX1);var j=Math.max(k.yStart,k.yEnd,k.cpY1);var m=k.cpX2;var o=k.cpY2;if(typeof m!="undefined"&&typeof o!="undefined"){p=Math.min(p,m);
n=Math.min(n,o);l=Math.max(l,m);j=Math.max(j,o)}var i=k.lineWidth||1;k.__rect={x:p-i,y:n-i,width:l-p+i,height:j-n+i};return k.__rect}};f("../tool/util").inherits(h,g);
return h});d("zrender/shape/Circle",["require","./Base","../tool/util"],function(f){var g=f("./Base");var h=function(i){g.call(this,i)};h.prototype={type:"circle",buildPath:function(i,j){i.moveTo(j.x+j.r,j.y);
i.arc(j.x,j.y,j.r,0,Math.PI*2,true);return},getRect:function(j){if(j.__rect){return j.__rect}var i;if(j.brushType=="stroke"||j.brushType=="fill"){i=j.lineWidth||1
}else{i=0}j.__rect={x:Math.round(j.x-j.r-i/2),y:Math.round(j.y-j.r-i/2),width:j.r*2+i,height:j.r*2+i};return j.__rect}};f("../tool/util").inherits(h,g);
return h});d("echarts/util/shape/normalIsCover",[],function(){return function(f,h){var g=this.transformCoordToLocal(f,h);f=g[0];h=g[1];return this.isCoverRect(f,h)
}});d("zrender/shape/Polygon",["require","./Base","./util/smoothSpline","./util/smoothBezier","./util/dashedLineTo","../tool/util"],function(h){var i=h("./Base");
var k=h("./util/smoothSpline");var j=h("./util/smoothBezier");var f=h("./util/dashedLineTo");var g=function(l){i.call(this,l)};g.prototype={type:"polygon",buildPath:function(w,n){var m=n.pointList;
if(m.length<2){return}if(n.smooth&&n.smooth!=="spline"){var x=j(m,n.smooth,true,n.smoothConstraint);w.moveTo(m[0][0],m[0][1]);var u;var s;var q;var v=m.length;
for(var t=0;t<v;t++){u=x[t*2];s=x[t*2+1];q=m[(t+1)%v];w.bezierCurveTo(u[0],u[1],s[0],s[1],q[0],q[1])}}else{if(n.smooth==="spline"){m=k(m,true)}if(!n.lineType||n.lineType=="solid"){w.moveTo(m[0][0],m[0][1]);
for(var t=1,r=m.length;t<r;t++){w.lineTo(m[t][0],m[t][1])}w.lineTo(m[0][0],m[0][1])}else{if(n.lineType=="dashed"||n.lineType=="dotted"){var o=n._dashLength||(n.lineWidth||1)*(n.lineType=="dashed"?5:1);
n._dashLength=o;w.moveTo(m[0][0],m[0][1]);for(var t=1,r=m.length;t<r;t++){f(w,m[t-1][0],m[t-1][1],m[t][0],m[t][1],o)}f(w,m[m.length-1][0],m[m.length-1][1],m[0][0],m[0][1],o)
}}}w.closePath();return},getRect:function(p){if(p.__rect){return p.__rect}var s=Number.MAX_VALUE;var o=Number.MIN_VALUE;var q=Number.MAX_VALUE;var m=Number.MIN_VALUE;
var n=p.pointList;for(var t=0,r=n.length;t<r;t++){if(n[t][0]<s){s=n[t][0]}if(n[t][0]>o){o=n[t][0]}if(n[t][1]<q){q=n[t][1]}if(n[t][1]>m){m=n[t][1]}}var u;
if(p.brushType=="stroke"||p.brushType=="fill"){u=p.lineWidth||1}else{u=0}p.__rect={x:Math.round(s-u/2),y:Math.round(q-u/2),width:o-s+u,height:m-q+u};return p.__rect
}};h("../tool/util").inherits(g,i);return g});d("zrender/shape/util/smoothBezier",["require","../../tool/vector"],function(g){var f=g("../../tool/vector");
return function(u,q,C,h){var n=[];var o=[];var m=[];var k=[];var t;var z;var p=!!h;var s,w;if(p){s=[Infinity,Infinity];w=[-Infinity,-Infinity];for(var x=0,y=u.length;
x<y;x++){f.min(s,s,u[x]);f.max(w,w,u[x])}f.min(s,s,h[0]);f.max(w,w,h[1])}for(var x=0,y=u.length;x<y;x++){var r=u[x];var t;var z;if(C){t=u[x?x-1:y-1];z=u[(x+1)%y]
}else{if(x===0||x===y-1){n.push(f.clone(u[x]));continue}else{t=u[x-1];z=u[x+1]}}f.sub(o,z,t);f.scale(o,o,q);var j=f.distance(r,t);var D=f.distance(r,z);
var l=j+D;if(l!==0){j/=l;D/=l}f.scale(m,o,-j);f.scale(k,o,D);var B=f.add([],r,m);var A=f.add([],r,k);if(p){f.max(B,B,s);f.min(B,B,w);f.max(A,A,s);f.min(A,A,w)
}n.push(B);n.push(A)}if(C){n.push(f.clone(n.shift()))}return n}});d("zrender/shape/util/smoothSpline",["require","../../tool/vector"],function(h){var f=h("../../tool/vector");
function g(p,o,m,l,q,j,i){var n=(m-p)*0.5;var k=(l-o)*0.5;return(2*(o-m)+n+k)*i+(-3*(o-m)-2*n-k)*j+n*q+o}return function(y,j,l){var q=y.length;var r=[];
var k=0;for(var p=1;p<q;p++){k+=f.distance(y[p-1],y[p])}var m=k/5;m=m<q?q:m;for(var p=0;p<m;p++){var s=p/(m-1)*(j?q:q-1);var v=Math.floor(s);var u=s-v;
var A;var z=y[v%q];var x;var t;if(!j){A=y[v===0?v:v-1];x=y[v>q-2?q-1:v+1];t=y[v>q-3?q-1:v+2]}else{A=y[(v-1+q)%q];x=y[(v+1)%q];t=y[(v+2)%q]}var o=u*u;var n=u*o;
r.push([g(A[0],z[0],x[0],t[0],u,o,n),g(A[1],z[1],x[1],t[1],u,o,n)])}return r}});d("echarts/util/number",[],function(){function j(k){return k.replace(/^\s+/,"").replace(/\s+$/,"")
}function g(k,l){if(typeof k==="string"){if(j(k).match(/%$/)){return parseFloat(k)/100*l}return parseFloat(k)}return k}function i(l,k){return[g(k[0],l.getWidth()),g(k[1],l.getHeight())]
}function h(m,k){if(!(k instanceof Array)){k=[0,k]}var l=Math.min(m.getWidth(),m.getHeight())/2;return[g(k[0],l),g(k[1],l)]}function f(k){if(isNaN(k)){return"-"
}k=(k+"").split(".");return k[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,")+(k.length>1?("."+k[1]):"")}return{parsePercent:g,parseCenter:i,parseRadius:h,addCommas:f}
});d("echarts/util/ecQuery",["require","zrender/tool/util"],function(g){var f=g("zrender/tool/util");function i(n,m){if(typeof n=="undefined"){return}if(!m){return n
}m=m.split(".");var l=m.length;var k=0;while(k<l){n=n[m[k]];if(typeof n=="undefined"){return}k++}return n}function h(p,o){var n;for(var m=0,k=p.length;
m<k;m++){n=i(p[m],o);if(typeof n!="undefined"){return n}}}function j(n,m){var l;var k=n.length;while(k--){var o=i(n[k],m);if(typeof o!="undefined"){if(typeof l=="undefined"){l=f.clone(o)
}else{f.merge(l,o,true)}}}return l}return{query:i,deepQuery:h,deepMerge:j}});d("echarts/data/KDTree",["require","./quickSelect"],function(h){var i=h("./quickSelect");
function g(j,k){this.left=null;this.right=null;this.axis=j;this.data=k}var f=function(j,k){if(!j.length){return}if(!k){k=j[0].array.length}this.dimension=k;
this.root=this._buildTree(j,0,j.length-1,0);this._stack=[];this._nearstNList=[]};f.prototype._buildTree=function(m,p,j,l){if(j<p){return null}var o=Math.floor((p+j)/2);
o=i(m,p,j,o,function(r,q){return r.array[l]-q.array[l]});var k=m[o];var n=new g(l,k);l=(l+1)%this.dimension;if(j>p){n.left=this._buildTree(m,p,o-1,l);n.right=this._buildTree(m,o+1,j,l)
}return n};f.prototype.nearest=function(k,r){var s=this.root;var m=this._stack;var p=0;var o=Infinity;var l=null;if(s.data!==k){o=r(s.data,k);l=s}if(k.array[s.axis]<s.data.array[s.axis]){s.right&&(m[p++]=s.right);
s.left&&(m[p++]=s.left)}else{s.left&&(m[p++]=s.left);s.right&&(m[p++]=s.right)}while(p--){s=m[p];var q=k.array[s.axis]-s.data.array[s.axis];var n=q<0;var j=false;
q=q*q;if(q<o){q=r(s.data,k);if(q<o&&s.data!==k){o=q;l=s}j=true}if(n){if(j){s.right&&(m[p++]=s.right)}s.left&&(m[p++]=s.left)}else{if(j){s.left&&(m[p++]=s.left)
}s.right&&(m[p++]=s.right)}}return l.data};f.prototype._addNearest=function(m,n,l){var k=this._nearstNList;for(var j=m-1;j>0;j--){if(n>=k[j-1].dist){break
}else{k[j].dist=k[j-1].dist;k[j].node=k[j-1].node}}k[j].dist=n;k[j].node=l};f.prototype.nearestN=function(o,n,t,k){if(n<=0){k.length=0;return k}var v=this.root;
var p=this._stack;var r=0;var j=this._nearstNList;for(var m=0;m<n;m++){if(!j[m]){j[m]={}}j[m].dist=0;j[m].node=null}var s=t(v.data,o);var u=0;if(v.data!==o){u++;
this._addNearest(u,s,v)}if(o.array[v.axis]<v.data.array[v.axis]){v.right&&(p[r++]=v.right);v.left&&(p[r++]=v.left)}else{v.left&&(p[r++]=v.left);v.right&&(p[r++]=v.right)
}while(r--){v=p[r];var s=o.array[v.axis]-v.data.array[v.axis];var q=s<0;var l=false;s=s*s;if(u<n||s<j[u-1].dist){s=t(v.data,o);if((u<n||s<j[u-1].dist)&&v.data!==o){if(u<n){u++
}this._addNearest(u,s,v)}l=true}if(q){if(l){v.right&&(p[r++]=v.right)}v.left&&(p[r++]=v.left)}else{if(l){v.left&&(p[r++]=v.left)}v.right&&(p[r++]=v.right)
}}for(var m=0;m<u;m++){k[m]=j[m].node.data}k.length=u;return k};return f});d("echarts/data/quickSelect",["require"],function(g){function j(l,k){return l-k
}function i(n,m,k){var l=n[m];n[m]=n[k];n[k]=l}function f(q,r,n,o,p){var l=r;while(n>r){var l=Math.round((n+r)/2);var k=q[l];i(q,l,n);l=r;for(var m=r;m<=n-1;
m++){if(p(k,q[m])>=0){i(q,m,l);l++}}i(q,n,l);if(l===o){return l}else{if(l<o){r=l+1}else{n=l-1}}}return r}function h(n,o,k,l,m){if(arguments.length<=3){l=o;
if(arguments.length==2){m=j}else{m=k}o=0;k=n.length-1}return f(n,o,k,l,m)}return h});d("echarts/component/valueAxis",["require","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Rectangle","../config","../util/date","zrender/tool/util","../util/smartSteps","../util/accMath","../util/smartLogSteps","../component"],function(h){var k=h("./base");
var i=h("zrender/shape/Text");var g=h("zrender/shape/Line");var m=h("zrender/shape/Rectangle");var l=h("../config");l.valueAxis={zlevel:0,z:0,show:true,position:"left",name:"",nameLocation:"end",nameTextStyle:{},boundaryGap:[0,0],axisLine:{show:true,onZero:true,lineStyle:{color:"#48b",width:2,type:"solid"}},axisTick:{show:false,inside:false,length:5,lineStyle:{color:"#333",width:1}},axisLabel:{show:true,rotate:0,margin:8,textStyle:{color:"#333"}},splitLine:{show:true,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:false,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}};
var n=h("../util/date");var j=h("zrender/tool/util");function f(t,o,u,s,q,p,r){if(!r||r.length===0){console.err("option.series.length == 0.");return}k.call(this,t,o,u,s,q);
this.series=r;this.grid=this.component.grid;for(var v in p){this[v]=p[v]}this.refresh(s,r)}f.prototype={type:l.COMPONENT_TYPE_AXIS_VALUE,_buildShape:function(){this._hasData=false;
this._calculateValue();if(!this._hasData||!this.option.show){return}this.option.splitArea.show&&this._buildSplitArea();this.option.splitLine.show&&this._buildSplitLine();
this.option.axisLine.show&&this._buildAxisLine();this.option.axisTick.show&&this._buildAxisTick();this.option.axisLabel.show&&this._buildAxisLabel();for(var p=0,o=this.shapeList.length;
p<o;p++){this.zr.addShape(this.shapeList[p])}},_buildAxisTick:function(){var A;var t=this._valueList;var p=this._valueList.length;var B=this.option.axisTick;
var q=B.length;var r=B.lineStyle.color;var v=B.lineStyle.width;if(this.isHorizontal()){var u=this.option.position==="bottom"?(B.inside?(this.grid.getYend()-q-1):(this.grid.getYend())+1):(B.inside?(this.grid.getY()+1):(this.grid.getY()-q-1));
var z;for(var s=0;s<p;s++){z=this.subPixelOptimize(this.getCoord(t[s]),v);A={_axisShape:"axisTick",zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{xStart:z,yStart:u,xEnd:z,yEnd:u+q,strokeColor:r,lineWidth:v}};
this.shapeList.push(new g(A))}}else{var o=this.option.position==="left"?(B.inside?(this.grid.getX()+1):(this.grid.getX()-q-1)):(B.inside?(this.grid.getXend()-q-1):(this.grid.getXend()+1));
var w;for(var s=0;s<p;s++){w=this.subPixelOptimize(this.getCoord(t[s]),v);A={_axisShape:"axisTick",zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{xStart:o,yStart:w,xEnd:o+q,yEnd:w,strokeColor:r,lineWidth:v}};
this.shapeList.push(new g(A))}}},_buildAxisLabel:function(){var y;var t=this._valueList;var p=this._valueList.length;var r=this.option.axisLabel.rotate;
var q=this.option.axisLabel.margin;var x=this.option.axisLabel.clickable;var w=this.option.axisLabel.textStyle;if(this.isHorizontal()){var u;var z;if(this.option.position==="bottom"){u=this.grid.getYend()+q;
z="top"}else{u=this.grid.getY()-q;z="bottom"}for(var s=0;s<p;s++){y={zlevel:this.getZlevelBase(),z:this.getZBase()+3,hoverable:false,style:{x:this.getCoord(t[s]),y:u,color:typeof w.color==="function"?w.color(t[s]):w.color,text:this._valueLabel[s],textFont:this.getFont(w),textAlign:w.align||"center",textBaseline:w.baseline||z}};
if(r){y.style.textAlign=r>0?(this.option.position==="bottom"?"right":"left"):(this.option.position==="bottom"?"left":"right");y.rotation=[r*Math.PI/180,y.style.x,y.style.y]
}this.shapeList.push(new i(this._axisLabelClickable(x,y)))}}else{var o;var v;if(this.option.position==="left"){o=this.grid.getX()-q;v="right"}else{o=this.grid.getXend()+q;
v="left"}for(var s=0;s<p;s++){y={zlevel:this.getZlevelBase(),z:this.getZBase()+3,hoverable:false,style:{x:o,y:this.getCoord(t[s]),color:typeof w.color==="function"?w.color(t[s]):w.color,text:this._valueLabel[s],textFont:this.getFont(w),textAlign:w.align||v,textBaseline:w.baseline||((s===0&&this.option.name!=="")?"bottom":(s===p-1&&this.option.name!=="")?"top":"middle")}};
if(r){y.rotation=[r*Math.PI/180,y.style.x,y.style.y]}this.shapeList.push(new i(this._axisLabelClickable(x,y)))}}},_buildSplitLine:function(){var E;var s=this._valueList;
var o=this._valueList.length;var p=this.option.splitLine;var u=p.lineStyle.type;var t=p.lineStyle.width;var q=p.lineStyle.color;q=q instanceof Array?q:[q];
var z=q.length;if(this.isHorizontal()){var B=this.grid.getY();var v=this.grid.getYend();var D;for(var r=0;r<o;r++){D=this.subPixelOptimize(this.getCoord(s[r]),t);
E={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{xStart:D,yStart:B,xEnd:D,yEnd:v,strokeColor:q[r%z],lineType:u,lineWidth:t}};this.shapeList.push(new g(E))
}}else{var C=this.grid.getX();var w=this.grid.getXend();var A;for(var r=0;r<o;r++){A=this.subPixelOptimize(this.getCoord(s[r]),t);E={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{xStart:C,yStart:A,xEnd:w,yEnd:A,strokeColor:q[r%z],lineType:u,lineWidth:t}};
this.shapeList.push(new g(E))}}},_buildSplitArea:function(){var C;var t=this.option.splitArea.areaStyle.color;if(!(t instanceof Array)){C={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:this.grid.getX(),y:this.grid.getY(),width:this.grid.getWidth(),height:this.grid.getHeight(),color:t}};
this.shapeList.push(new m(C))}else{var z=t.length;var v=this._valueList;var s=this._valueList.length;if(this.isHorizontal()){var A=this.grid.getY();var D=this.grid.getHeight();
var r=this.grid.getX();var q;for(var u=0;u<=s;u++){q=u<s?this.getCoord(v[u]):this.grid.getXend();C={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:r,y:A,width:q-r,height:D,color:t[u%z]}};
this.shapeList.push(new m(C));r=q}}else{var B=this.grid.getX();var p=this.grid.getWidth();var w=this.grid.getYend();var o;for(var u=0;u<=s;u++){o=u<s?this.getCoord(v[u]):this.grid.getY();
C={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:B,y:o,width:p,height:w-o,color:t[u%z]}};this.shapeList.push(new m(C));w=o}}}},_calculateValue:function(){if(isNaN(this.option.min-0)||isNaN(this.option.max-0)){var t={};
var v;var p;var x=this.component.legend;for(var u=0,q=this.series.length;u<q;u++){if(this.series[u].type!=l.CHART_TYPE_LINE&&this.series[u].type!=l.CHART_TYPE_BAR&&this.series[u].type!=l.CHART_TYPE_SCATTER&&this.series[u].type!=l.CHART_TYPE_K&&this.series[u].type!=l.CHART_TYPE_EVENTRIVER){continue
}if(x&&!x.isSelected(this.series[u].name)){continue}v=this.series[u].xAxisIndex||0;p=this.series[u].yAxisIndex||0;if((this.option.xAxisIndex!=v)&&(this.option.yAxisIndex!=p)){continue
}this._calculSum(t,u)}var y;for(var u in t){y=t[u];for(var s=0,r=y.length;s<r;s++){if(!isNaN(y[s])){this._hasData=true;this._min=y[s];this._max=y[s];break
}}if(this._hasData){break}}for(var u in t){y=t[u];for(var s=0,r=y.length;s<r;s++){if(!isNaN(y[s])){this._min=Math.min(this._min,y[s]);this._max=Math.max(this._max,y[s])
}}}var o=this.option.type!=="log"?this.option.boundaryGap:[0,0];var w=Math.abs(this._max-this._min);this._min=isNaN(this.option.min-0)?(this._min-Math.abs(w*o[0])):(this.option.min-0);
this._max=isNaN(this.option.max-0)?(this._max+Math.abs(w*o[1])):(this.option.max-0);if(this._min===this._max){if(this._max===0){this._max=1}else{if(this._max>0){this._min=this._max/this.option.splitNumber!=null?this.option.splitNumber:5
}else{this._max=this._max/this.option.splitNumber!=null?this.option.splitNumber:5}}}if(this.option.type==="time"){this._reformTimeValue()}else{if(this.option.type==="log"){this._reformLogValue()
}else{this._reformValue(this.option.scale)}}}else{this._hasData=true;this._min=this.option.min-0;this._max=this.option.max-0;if(this.option.type==="time"){this._reformTimeValue()
}else{if(this.option.type==="log"){this._reformLogValue()}else{this._customerValue()}}}},_calculSum:function(s,t){var x=this.series[t].name||"kener";var w;
var y;if(!this.series[t].stack){s[x]=s[x]||[];if(this.series[t].type!=l.CHART_TYPE_EVENTRIVER){y=this.series[t].data;for(var r=0,q=y.length;r<q;r++){w=this.getDataFromOption(y[r]);
if(this.series[t].type===l.CHART_TYPE_K){s[x].push(w[0]);s[x].push(w[1]);s[x].push(w[2]);s[x].push(w[3])}else{if(w instanceof Array){if(this.option.xAxisIndex!=-1){s[x].push(this.option.type!="time"?w[0]:n.getNewDate(w[0]))
}if(this.option.yAxisIndex!=-1){s[x].push(this.option.type!="time"?w[1]:n.getNewDate(w[1]))}}else{s[x].push(w)}}}}else{y=this.series[t].data;for(var r=0,q=y.length;
r<q;r++){var z=y[r].evolution;for(var p=0,o=z.length;p<o;p++){s[x].push(n.getNewDate(z[p].time))}}}}else{var u="__Magic_Key_Positive__"+this.series[t].stack;
var v="__Magic_Key_Negative__"+this.series[t].stack;s[u]=s[u]||[];s[v]=s[v]||[];s[x]=s[x]||[];y=this.series[t].data;for(var r=0,q=y.length;r<q;r++){w=this.getDataFromOption(y[r]);
if(w==="-"){continue}w=w-0;if(w>=0){if(s[u][r]!=null){s[u][r]+=w}else{s[u][r]=w}}else{if(s[v][r]!=null){s[v][r]+=w}else{s[v][r]=w}}if(this.option.scale){s[x].push(w)
}}}},_reformValue:function(q){var o=h("../util/smartSteps");var r=this.option.splitNumber;if(!q&&this._min>=0&&this._max>=0){this._min=0}if(!q&&this._min<=0&&this._max<=0){this._max=0
}var p=o(this._min,this._max,r);r=r!=null?r:p.secs;this._min=p.min;this._max=p.max;this._valueList=p.pnts;this._reformLabelData()},_reformTimeValue:function(){var s=this.option.splitNumber!=null?this.option.splitNumber:5;
var r=n.getAutoFormatter(this._min,this._max,s);var p=r.formatter;var q=r.gapValue;this._valueList=[n.getNewDate(this._min)];var o;switch(p){case"week":o=n.nextMonday(this._min);
break;case"month":o=n.nextNthOnMonth(this._min,1);break;case"quarter":o=n.nextNthOnQuarterYear(this._min,1);break;case"half-year":o=n.nextNthOnHalfYear(this._min,1);
break;case"year":o=n.nextNthOnYear(this._min,1);break;default:if(q<=3600000*2){o=(Math.floor(this._min/q)+1)*q}else{o=n.getNewDate(this._min-(-q));o.setHours(Math.round(o.getHours()/6)*6);
o.setMinutes(0);o.setSeconds(0)}break}if(o-this._min<q/2){o-=-q}r=n.getNewDate(o);s*=1.5;while(s-->=0){if(p=="month"||p=="quarter"||p=="half-year"||p=="year"){r.setDate(1)
}if(this._max-r<q/2){break}this._valueList.push(r);r=n.getNewDate(r-(-q))}this._valueList.push(n.getNewDate(this._max));this._reformLabelData((function(t){return function(u){return n.format(t,u)
}})(p))},_customerValue:function(){var p=h("../util/accMath");var r=this.option.splitNumber!=null?this.option.splitNumber:5;var q=(this._max-this._min)/r;
this._valueList=[];for(var o=0;o<=r;o++){this._valueList.push(p.accAdd(this._min,p.accMul(q,o)))}this._reformLabelData()},_reformLogValue:function(){var p=this.option;
var o=h("../util/smartLogSteps")({dataMin:this._min,dataMax:this._max,logPositive:p.logPositive,logLabelBase:p.logLabelBase,splitNumber:p.splitNumber});
this._min=o.dataMin;this._max=o.dataMax;this._valueList=o.tickList;this._dataMappingMethods=o.dataMappingMethods;this._reformLabelData(o.labelFormatter)
},_reformLabelData:function(r){this._valueLabel=[];var q=this.option.axisLabel.formatter;if(q){for(var p=0,o=this._valueList.length;p<o;p++){if(typeof q==="function"){this._valueLabel.push(r?q.call(this.myChart,this._valueList[p],r):q.call(this.myChart,this._valueList[p]))
}else{if(typeof q==="string"){this._valueLabel.push(r?n.format(q,this._valueList[p]):q.replace("{value}",this._valueList[p]))}}}}else{for(var p=0,o=this._valueList.length;
p<o;p++){this._valueLabel.push(r?r(this._valueList[p]):this.numAddCommas(this._valueList[p]))}}},getExtremum:function(){this._calculateValue();var o=this._dataMappingMethods;
return{min:this._min,max:this._max,dataMappingMethods:o?j.merge({},o):null}},refresh:function(p,o){if(p){this.option=this.reformOption(p);this.option.axisLabel.textStyle=j.merge(this.option.axisLabel.textStyle||{},this.ecTheme.textStyle);
this.series=o}if(this.zr){this.clear();this._buildShape()}},getCoord:function(p){if(this._dataMappingMethods){p=this._dataMappingMethods.value2Coord(p)
}p=p<this._min?this._min:p;p=p>this._max?this._max:p;var o;if(!this.isHorizontal()){o=this.grid.getYend()-(p-this._min)/(this._max-this._min)*this.grid.getHeight()
}else{o=this.grid.getX()+(p-this._min)/(this._max-this._min)*this.grid.getWidth()}return o},getCoordSize:function(o){if(!this.isHorizontal()){return Math.abs(o/(this._max-this._min)*this.grid.getHeight())
}else{return Math.abs(o/(this._max-this._min)*this.grid.getWidth())}},getValueFromCoord:function(p){var o;if(!this.isHorizontal()){p=p<this.grid.getY()?this.grid.getY():p;
p=p>this.grid.getYend()?this.grid.getYend():p;o=this._max-(p-this.grid.getY())/this.grid.getHeight()*(this._max-this._min)}else{p=p<this.grid.getX()?this.grid.getX():p;
p=p>this.grid.getXend()?this.grid.getXend():p;o=this._min+(p-this.grid.getX())/this.grid.getWidth()*(this._max-this._min)}if(this._dataMappingMethods){o=this._dataMappingMethods.coord2Value(o)
}return o.toFixed(2)-0},isMaindAxis:function(q){for(var p=0,o=this._valueList.length;p<o;p++){if(this._valueList[p]===q){return true}}return false}};j.inherits(f,k);
h("../component").define("valueAxis",f);return f});d("echarts/component/dataView",["require","./base","../config","zrender/tool/util","../component"],function(h){var i=h("./base");
var f=h("../config");var g=h("zrender/tool/util");function j(n,k,o,m,l){i.call(this,n,k,o,m,l);this.dom=l.dom;this._tDom=document.createElement("div");
this._textArea=document.createElement("textArea");this._buttonRefresh=document.createElement("button");this._buttonClose=document.createElement("button");
this._hasShow=false;this._zrHeight=o.getHeight();this._zrWidth=o.getWidth();this._tDom.className="echarts-dataview";this.hide();this.dom.firstChild.appendChild(this._tDom);
if(window.addEventListener){this._tDom.addEventListener("click",this._stop);this._tDom.addEventListener("mousewheel",this._stop);this._tDom.addEventListener("mousemove",this._stop);
this._tDom.addEventListener("mousedown",this._stop);this._tDom.addEventListener("mouseup",this._stop);this._tDom.addEventListener("touchstart",this._stop);
this._tDom.addEventListener("touchmove",this._stop);this._tDom.addEventListener("touchend",this._stop)}else{this._tDom.attachEvent("onclick",this._stop);
this._tDom.attachEvent("onmousewheel",this._stop);this._tDom.attachEvent("onmousemove",this._stop);this._tDom.attachEvent("onmousedown",this._stop);this._tDom.attachEvent("onmouseup",this._stop)
}}j.prototype={type:f.COMPONENT_TYPE_DATAVIEW,_lang:["Data View","close","refresh"],_gCssText:"position:absolute;display:block;overflow:hidden;transition:height 0.8s,background-color 1s;-moz-transition:height 0.8s,background-color 1s;-webkit-transition:height 0.8s,background-color 1s;-o-transition:height 0.8s,background-color 1s;z-index:1;left:0;top:0;",hide:function(){this._sizeCssText="width:"+this._zrWidth+"px;height:"+0+"px;background-color:#f0ffff;";
this._tDom.style.cssText=this._gCssText+this._sizeCssText},show:function(m){this._hasShow=true;var n=this.query(this.option,"toolbox.feature.dataView.lang")||this._lang;
this.option=m;this._tDom.innerHTML='<p style="padding:8px 0;margin:0 0 10px 0;border-bottom:1px solid #eee">'+(n[0]||this._lang[0])+"</p>";var l=this.query(this.option,"toolbox.feature.dataView.optionToContent");
if(typeof l!="function"){this._textArea.value=this._optionToContent()}else{this._textArea=document.createElement("div");this._textArea.innerHTML=l(this.option)
}this._textArea.style.cssText="display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:100%;height:"+(this._zrHeight-100)+"px;";this._tDom.appendChild(this._textArea);
this._buttonClose.style.cssText="float:right;padding:1px 6px;";this._buttonClose.innerHTML=n[1]||this._lang[1];var k=this;this._buttonClose.onclick=function(){k.hide()
};this._tDom.appendChild(this._buttonClose);if(this.query(this.option,"toolbox.feature.dataView.readOnly")===false){this._buttonRefresh.style.cssText="float:right;margin-right:10px;padding:1px 6px;";
this._buttonRefresh.innerHTML=n[2]||this._lang[2];this._buttonRefresh.onclick=function(){k._save()};this._textArea.readOnly=false;this._textArea.style.cursor="default"
}else{this._buttonRefresh.style.cssText="display:none";this._textArea.readOnly=true;this._textArea.style.cursor="text"}this._tDom.appendChild(this._buttonRefresh);
this._sizeCssText="width:"+this._zrWidth+"px;height:"+this._zrHeight+"px;background-color:#fff;";this._tDom.style.cssText=this._gCssText+this._sizeCssText
},_optionToContent:function(){var q;var n;var m;var r;var p;var l;var t=[];var s="";if(this.option.xAxis){if(this.option.xAxis instanceof Array){t=this.option.xAxis
}else{t=[this.option.xAxis]}for(q=0,r=t.length;q<r;q++){if((t[q].type||"category")=="category"){l=[];for(n=0,m=t[q].data.length;n<m;n++){l.push(this.getDataFromOption(t[q].data[n]))
}s+=l.join(", ")+"\n\n"}}}if(this.option.yAxis){if(this.option.yAxis instanceof Array){t=this.option.yAxis}else{t=[this.option.yAxis]}for(q=0,r=t.length;
q<r;q++){if(t[q].type=="category"){l=[];for(n=0,m=t[q].data.length;n<m;n++){l.push(this.getDataFromOption(t[q].data[n]))}s+=l.join(", ")+"\n\n"}}}var o=this.option.series;
var u;for(q=0,r=o.length;q<r;q++){l=[];for(n=0,m=o[q].data.length;n<m;n++){p=o[q].data[n];if(o[q].type==f.CHART_TYPE_PIE||o[q].type==f.CHART_TYPE_MAP){u=(p.name||"-")+":"
}else{u=""}if(o[q].type==f.CHART_TYPE_SCATTER){p=this.getDataFromOption(p).join(", ")}l.push(u+this.getDataFromOption(p))}s+=(o[q].name||"-")+" : \n";s+=l.join(o[q].type==f.CHART_TYPE_SCATTER?"\n":", ");
s+="\n\n"}return s},_save:function(){var o=this.query(this.option,"toolbox.feature.dataView.contentToOption");if(typeof o!="function"){var q=this._textArea.value.split("\n");
var p=[];for(var n=0,k=q.length;n<k;n++){q[n]=this._trim(q[n]);if(q[n]!==""){p.push(q[n])}}this._contentToOption(p)}else{o(this._textArea,this.option)}this.hide();
var m=this;setTimeout(function(){m.messageCenter&&m.messageCenter.dispatch(f.EVENT.DATA_VIEW_CHANGED,null,{option:m.option},m.myChart)},m.canvasSupported?800:100)
},_contentToOption:function(r){var p;var m;var l;var q;var o;var t=[];var v=0;var s;var u;if(this.option.xAxis){if(this.option.xAxis instanceof Array){t=this.option.xAxis
}else{t=[this.option.xAxis]}for(p=0,q=t.length;p<q;p++){if((t[p].type||"category")=="category"){s=r[v].split(",");for(m=0,l=t[p].data.length;m<l;m++){u=this._trim(s[m]||"");
o=t[p].data[m];if(typeof t[p].data[m].value!="undefined"){t[p].data[m].value=u}else{t[p].data[m]=u}}v++}}}if(this.option.yAxis){if(this.option.yAxis instanceof Array){t=this.option.yAxis
}else{t=[this.option.yAxis]}for(p=0,q=t.length;p<q;p++){if(t[p].type=="category"){s=r[v].split(",");for(m=0,l=t[p].data.length;m<l;m++){u=this._trim(s[m]||"");
o=t[p].data[m];if(typeof t[p].data[m].value!="undefined"){t[p].data[m].value=u}else{t[p].data[m]=u}}v++}}}var n=this.option.series;for(p=0,q=n.length;p<q;
p++){v++;if(n[p].type==f.CHART_TYPE_SCATTER){for(var m=0,l=n[p].data.length;m<l;m++){s=r[v];u=s.replace(" ","").split(",");if(typeof n[p].data[m].value!="undefined"){n[p].data[m].value=u
}else{n[p].data[m]=u}v++}}else{s=r[v].split(",");for(var m=0,l=n[p].data.length;m<l;m++){u=(s[m]||"").replace(/.*:/,"");u=this._trim(u);u=(u!="-"&&u!=="")?(u-0):"-";
if(typeof n[p].data[m].value!="undefined"){n[p].data[m].value=u}else{n[p].data[m]=u}}v++}}},_trim:function(l){var k=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");
return l.replace(k,"")},_stop:function(k){k=k||window.event;if(k.stopPropagation){k.stopPropagation()}else{k.cancelBubble=true}},resize:function(){this._zrHeight=this.zr.getHeight();
this._zrWidth=this.zr.getWidth();if(this._tDom.offsetHeight>10){this._sizeCssText="width:"+this._zrWidth+"px;height:"+this._zrHeight+"px;background-color:#fff;";
this._tDom.style.cssText=this._gCssText+this._sizeCssText;this._textArea.style.cssText="display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:100%;height:"+(this._zrHeight-100)+"px;"
}},dispose:function(){if(window.removeEventListener){this._tDom.removeEventListener("click",this._stop);this._tDom.removeEventListener("mousewheel",this._stop);
this._tDom.removeEventListener("mousemove",this._stop);this._tDom.removeEventListener("mousedown",this._stop);this._tDom.removeEventListener("mouseup",this._stop);
this._tDom.removeEventListener("touchstart",this._stop);this._tDom.removeEventListener("touchmove",this._stop);this._tDom.removeEventListener("touchend",this._stop)
}else{this._tDom.detachEvent("onclick",this._stop);this._tDom.detachEvent("onmousewheel",this._stop);this._tDom.detachEvent("onmousemove",this._stop);this._tDom.detachEvent("onmousedown",this._stop);
this._tDom.detachEvent("onmouseup",this._stop)}this._buttonRefresh.onclick=null;this._buttonClose.onclick=null;if(this._hasShow){this._tDom.removeChild(this._textArea);
this._tDom.removeChild(this._buttonRefresh);this._tDom.removeChild(this._buttonClose)}this._textArea=null;this._buttonRefresh=null;this._buttonClose=null;
this.dom.firstChild.removeChild(this._tDom);this._tDom=null}};g.inherits(j,i);h("../component").define("dataView",j);return j});d("echarts/component/categoryAxis",["require","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Rectangle","../config","zrender/tool/util","zrender/tool/area","../component"],function(h){var k=h("./base");
var i=h("zrender/shape/Text");var g=h("zrender/shape/Line");var m=h("zrender/shape/Rectangle");var l=h("../config");l.categoryAxis={zlevel:0,z:0,show:true,position:"bottom",name:"",nameLocation:"end",nameTextStyle:{},boundaryGap:true,axisLine:{show:true,onZero:true,lineStyle:{color:"#48b",width:2,type:"solid"}},axisTick:{show:true,interval:"auto",inside:false,length:5,lineStyle:{color:"#333",width:1}},axisLabel:{show:true,interval:"auto",rotate:0,margin:8,textStyle:{color:"#333"}},splitLine:{show:true,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:false,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}};
var j=h("zrender/tool/util");var n=h("zrender/tool/area");function f(s,o,t,r,q,p){if(r.data.length<1){console.error("option.data.length < 1.");return}k.call(this,s,o,t,r,q);
this.grid=this.component.grid;for(var u in p){this[u]=p[u]}this.refresh(r)}f.prototype={type:l.COMPONENT_TYPE_AXIS_CATEGORY,_getReformedLabel:function(o){var q=this.getDataFromOption(this.option.data[o]);
var p=this.option.data[o].formatter||this.option.axisLabel.formatter;if(p){if(typeof p=="function"){q=p.call(this.myChart,q)}else{if(typeof p=="string"){q=p.replace("{value}",q)
}}}return q},_getInterval:function(){var p=this.option.axisLabel.interval;if(p=="auto"){var A=this.option.axisLabel.textStyle.fontSize;var u=this.option.data;
var o=this.option.data.length;if(this.isHorizontal()){if(o>3){var z=this.getGap();var q=false;var w;var s;var r=Math.floor(0.5/z);r=r<1?1:r;p=Math.floor(15/z);
while(!q&&p<o){p+=r;q=true;w=Math.floor(z*p);for(var t=Math.floor((o-1)/p)*p;t>=0;t-=p){if(this.option.axisLabel.rotate!==0){s=A}else{if(u[t].textStyle){s=n.getTextWidth(this._getReformedLabel(t),this.getFont(j.merge(u[t].textStyle,this.option.axisLabel.textStyle)))
}else{var y=this._getReformedLabel(t)+"";var v=(y.match(/\w/g)||"").length;var x=y.length-v;s=v*A*2/3+x*A}}if(w<s){q=false;break}}}}else{p=1}}else{if(o>3){var z=this.getGap();
p=Math.floor(11/z);while((z*p-6)<A&&p<o){p++}}else{p=1}}}else{p=typeof p=="function"?1:(p-0+1)}return p},_buildShape:function(){this._interval=this._getInterval();
if(!this.option.show){return}this.option.splitArea.show&&this._buildSplitArea();this.option.splitLine.show&&this._buildSplitLine();this.option.axisLine.show&&this._buildAxisLine();
this.option.axisTick.show&&this._buildAxisTick();this.option.axisLabel.show&&this._buildAxisLabel();for(var p=0,o=this.shapeList.length;p<o;p++){this.zr.addShape(this.shapeList[p])
}},_buildAxisTick:function(){var D;var u=this.option.data;var q=this.option.data.length;var G=this.option.axisTick;var r=G.length;var s=G.lineStyle.color;
var z=G.lineStyle.width;var B=typeof G.interval=="function"?G.interval:G.interval=="auto"?typeof this.option.axisLabel.interval=="function"?this.option.axisLabel.interval:false:false;
var p=B?1:G.interval=="auto"?this._interval:(G.interval-0+1);var v=G.onGap;var F=v?(this.getGap()/2):typeof v=="undefined"?(this.option.boundaryGap?(this.getGap()/2):0):0;
var E=F>0?-p:0;if(this.isHorizontal()){var w=this.option.position=="bottom"?(G.inside?(this.grid.getYend()-r-1):(this.grid.getYend()+1)):(G.inside?(this.grid.getY()+1):(this.grid.getY()-r-1));
var C;for(var t=E;t<q;t+=p){if(B&&!B(t,u[t])){continue}C=this.subPixelOptimize(this.getCoordByIndex(t)+(t>=0?F:0),z);D={_axisShape:"axisTick",zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{xStart:C,yStart:w,xEnd:C,yEnd:w+r,strokeColor:s,lineWidth:z}};
this.shapeList.push(new g(D))}}else{var o=this.option.position=="left"?(G.inside?(this.grid.getX()+1):(this.grid.getX()-r-1)):(G.inside?(this.grid.getXend()-r-1):(this.grid.getXend()+1));
var A;for(var t=E;t<q;t+=p){if(B&&!B(t,u[t])){continue}A=this.subPixelOptimize(this.getCoordByIndex(t)-(t>=0?F:0),z);D={_axisShape:"axisTick",zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{xStart:o,yStart:A,xEnd:o+r,yEnd:A,strokeColor:s,lineWidth:z}};
this.shapeList.push(new g(D))}}},_buildAxisLabel:function(){var A;var u=this.option.data;var p=this.option.data.length;var C=this.option.axisLabel;var s=C.rotate;
var r=C.margin;var y=C.clickable;var x=C.textStyle;var z=typeof C.interval=="function"?C.interval:false;var q;if(this.isHorizontal()){var v;var B;if(this.option.position=="bottom"){v=this.grid.getYend()+r;
B="top"}else{v=this.grid.getY()-r;B="bottom"}for(var t=0;t<p;t+=this._interval){if((z&&!z(t,u[t]))||this._getReformedLabel(t)===""){continue}q=j.merge(u[t].textStyle||{},x);
A={zlevel:this.getZlevelBase(),z:this.getZBase()+3,hoverable:false,style:{x:this.getCoordByIndex(t),y:v,color:q.color,text:this._getReformedLabel(t),textFont:this.getFont(q),textAlign:q.align||"center",textBaseline:q.baseline||B}};
if(s){A.style.textAlign=s>0?(this.option.position=="bottom"?"right":"left"):(this.option.position=="bottom"?"left":"right");A.rotation=[s*Math.PI/180,A.style.x,A.style.y]
}this.shapeList.push(new i(this._axisLabelClickable(y,A)))}}else{var o;var w;if(this.option.position=="left"){o=this.grid.getX()-r;w="right"}else{o=this.grid.getXend()+r;
w="left"}for(var t=0;t<p;t+=this._interval){if((z&&!z(t,u[t]))||this._getReformedLabel(t)===""){continue}q=j.merge(u[t].textStyle||{},x);A={zlevel:this.getZlevelBase(),z:this.getZBase()+3,hoverable:false,style:{x:o,y:this.getCoordByIndex(t),color:q.color,text:this._getReformedLabel(t),textFont:this.getFont(q),textAlign:q.align||w,textBaseline:q.baseline||(t===0&&this.option.name!=="")?"bottom":(t==(p-1)&&this.option.name!=="")?"top":"middle"}};
if(s){A.rotation=[s*Math.PI/180,A.style.x,A.style.y]}this.shapeList.push(new i(this._axisLabelClickable(y,A)))}}},_buildSplitLine:function(){var D;var G=this.option.data;
var q=this.option.data.length;var H=this.option.splitLine;var E=H.lineStyle.type;var o=H.lineStyle.width;var w=H.lineStyle.color;w=w instanceof Array?w:[w];
var p=w.length;var v=typeof this.option.axisLabel.interval=="function"?this.option.axisLabel.interval:false;var A=H.onGap;var F=A?(this.getGap()/2):typeof A=="undefined"?(this.option.boundaryGap?(this.getGap()/2):0):0;
q-=(A||(typeof A=="undefined"&&this.option.boundaryGap))?1:0;if(this.isHorizontal()){var t=this.grid.getY();var B=this.grid.getYend();var s;for(var z=0;
z<q;z+=this._interval){if(v&&!v(z,G[z])){continue}s=this.subPixelOptimize(this.getCoordByIndex(z)+F,o);D={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{xStart:s,yStart:t,xEnd:s,yEnd:B,strokeColor:w[(z/this._interval)%p],lineType:E,lineWidth:o}};
this.shapeList.push(new g(D))}}else{var u=this.grid.getX();var C=this.grid.getXend();var r;for(var z=0;z<q;z+=this._interval){if(v&&!v(z,G[z])){continue
}r=this.subPixelOptimize(this.getCoordByIndex(z)-F,o);D={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{xStart:u,yStart:r,xEnd:C,yEnd:r,strokeColor:w[(z/this._interval)%p],lineType:E,lineWidth:o}};
this.shapeList.push(new g(D))}}},_buildSplitArea:function(){var F;var H=this.option.data;var o=this.option.splitArea;var B=o.areaStyle.color;if(!(B instanceof Array)){F={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:this.grid.getX(),y:this.grid.getY(),width:this.grid.getWidth(),height:this.grid.getHeight(),color:B}};
this.shapeList.push(new m(F))}else{var p=B.length;var r=this.option.data.length;var A=typeof this.option.axisLabel.interval=="function"?this.option.axisLabel.interval:false;
var D=o.onGap;var G=D?(this.getGap()/2):typeof D=="undefined"?(this.option.boundaryGap?(this.getGap()/2):0):0;if(this.isHorizontal()){var u=this.grid.getY();
var w=this.grid.getHeight();var q=this.grid.getX();var t;for(var C=0;C<=r;C+=this._interval){if(A&&!A(C,H[C])&&C<r){continue}t=C<r?(this.getCoordByIndex(C)+G):this.grid.getXend();
F={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:q,y:u,width:t-q,height:w,color:B[(C/this._interval)%p]}};this.shapeList.push(new m(F));
q=t}}else{var v=this.grid.getX();var z=this.grid.getWidth();var E=this.grid.getYend();var s;for(var C=0;C<=r;C+=this._interval){if(A&&!A(C,H[C])&&C<r){continue
}s=C<r?(this.getCoordByIndex(C)-G):this.grid.getY();F={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:false,style:{x:v,y:s,width:z,height:E-s,color:B[(C/this._interval)%p]}};
this.shapeList.push(new m(F));E=s}}}},refresh:function(o){if(o){this.option=this.reformOption(o);this.option.axisLabel.textStyle=this.getTextStyle(this.option.axisLabel.textStyle)
}this.clear();this._buildShape()},getGap:function(){var p=this.option.data.length;var o=this.isHorizontal()?this.grid.getWidth():this.grid.getHeight();
if(this.option.boundaryGap){return o/p}else{return o/(p>1?(p-1):1)}},getCoord:function(r){var q=this.option.data;var s=q.length;var t=this.getGap();var o=this.option.boundaryGap?(t/2):0;
for(var p=0;p<s;p++){if(this.getDataFromOption(q[p])==r){if(this.isHorizontal()){o=this.grid.getX()+o}else{o=this.grid.getYend()-o}return o}o+=t}},getCoordByIndex:function(p){if(p<0){if(this.isHorizontal()){return this.grid.getX()
}else{return this.grid.getYend()}}else{if(p>this.option.data.length-1){if(this.isHorizontal()){return this.grid.getXend()}else{return this.grid.getY()}}else{var q=this.getGap();
var o=this.option.boundaryGap?(q/2):0;o+=p*q;if(this.isHorizontal()){o=this.grid.getX()+o}else{o=this.grid.getYend()-o}return o}}},getNameByIndex:function(o){return this.getDataFromOption(this.option.data[o])
},getIndexByName:function(o){var q=this.option.data;var r=q.length;for(var p=0;p<r;p++){if(this.getDataFromOption(q[p])==o){return p}}return -1},getValueFromCoord:function(){return""
},isMainAxis:function(o){return o%this._interval===0}};j.inherits(f,k);h("../component").define("categoryAxis",f);return f});d("echarts/util/shape/Cross",["require","zrender/shape/Base","zrender/shape/Line","zrender/tool/util","./normalIsCover"],function(g){var h=g("zrender/shape/Base");
var j=g("zrender/shape/Line");var f=g("zrender/tool/util");function i(k){h.call(this,k)}i.prototype={type:"cross",buildPath:function(k,l){var m=l.rect;
l.xStart=m.x;l.xEnd=m.x+m.width;l.yStart=l.yEnd=l.y;j.prototype.buildPath(k,l);l.xStart=l.xEnd=l.x;l.yStart=m.y;l.yEnd=m.y+m.height;j.prototype.buildPath(k,l)
},getRect:function(k){return k.rect},isCover:g("./normalIsCover")};f.inherits(i,h);return i});d("echarts/util/date",[],function(){var f=[{formatter:"hh : mm : ss",value:1000},{formatter:"hh : mm : ss",value:1000*5},{formatter:"hh : mm : ss",value:1000*10},{formatter:"hh : mm : ss",value:1000*15},{formatter:"hh : mm : ss",value:1000*30},{formatter:"hh : mm\nMM - dd",value:60000},{formatter:"hh : mm\nMM - dd",value:60000*5},{formatter:"hh : mm\nMM - dd",value:60000*10},{formatter:"hh : mm\nMM - dd",value:60000*15},{formatter:"hh : mm\nMM - dd",value:60000*30},{formatter:"hh : mm\nMM - dd",value:3600000},{formatter:"hh : mm\nMM - dd",value:3600000*2},{formatter:"hh : mm\nMM - dd",value:3600000*6},{formatter:"hh : mm\nMM - dd",value:3600000*12},{formatter:"MM - dd\nyyyy",value:3600000*24},{formatter:"week",value:3600000*24*7},{formatter:"month",value:3600000*24*31},{formatter:"quarter",value:3600000*24*380/4},{formatter:"half-year",value:3600000*24*380/2},{formatter:"year",value:3600000*24*380}];
function j(v,x,q){q=q>1?q:2;var u;var s;var y;var r;for(var w=0,t=f.length;w<t;w++){u=f[w].value;s=Math.ceil(x/u)*u-Math.floor(v/u)*u;if(Math.round(s/u)<=q*1.2){y=f[w].formatter;
r=f[w].value;break}}if(y==null){y="year";u=3600000*24*367;s=Math.ceil(x/u)*u-Math.floor(v/u)*u;r=Math.round(s/(q-1)/u)*u}return{formatter:y,gapValue:r}
}function g(q){return q<10?("0"+q):q}function p(z,x){if(z=="week"||z=="month"||z=="quarter"||z=="half-year"||z=="year"){z="MM - dd\nyyyy"}var q=o(x);var w=q.getFullYear();
var u=q.getMonth()+1;var v=q.getDate();var t=q.getHours();var r=q.getMinutes();var A=q.getSeconds();z=z.replace("MM",g(u));z=z.toLowerCase();z=z.replace("yyyy",w);
z=z.replace("yy",w%100);z=z.replace("dd",g(v));z=z.replace("d",v);z=z.replace("hh",g(t));z=z.replace("h",t);z=z.replace("mm",g(r));z=z.replace("m",r);z=z.replace("ss",g(A));
z=z.replace("s",A);return z}function h(q){q=o(q);q.setDate(q.getDate()+8-q.getDay());return q}function m(s,r,q){s=o(s);s.setMonth(Math.ceil((s.getMonth()+1)/q)*q);
s.setDate(r);return s}function k(r,q){return m(r,q,1)}function n(r,q){return m(r,q,3)}function l(r,q){return m(r,q,6)}function i(r,q){return m(r,q,12)}function o(q){return q instanceof Date?q:new Date(typeof q=="string"?q.replace(/-/g,"/"):q)
}return{getAutoFormatter:j,getNewDate:o,format:p,nextMonday:h,nextNthPerNmonth:m,nextNthOnMonth:k,nextNthOnQuarterYear:n,nextNthOnHalfYear:l,nextNthOnYear:i}
});d("echarts/util/smartLogSteps",["require","./number"],function(k){var P=k("./number");var G=Math;var r=G.log;var x=G.pow;var B=G.abs;var D=G.ceil;var M=G.floor;
var z=G.E;var I=G.LN10;var s=G.LN2;var h=s/I;var t=1e-9;var j=5;var q=2;var g={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻"};
var p;var l;var K;var N;var i;var v;var f;var o;var E;var u;function F(Q){y();i=Q||{};m();H();return[w(),y()][0]}function y(){p=i=f=N=o=E=v=u=l=K=null}function m(){l=i.logLabelBase;
if(l==null){K="plain";l=10;N=I}else{l=+l;if(l<1){l=10}K="exponent";N=r(l)}v=i.splitNumber;v==null&&(v=j);var R=parseFloat(i.dataMin);var Q=parseFloat(i.dataMax);
if(!isFinite(R)&&!isFinite(Q)){R=Q=1}else{if(!isFinite(R)){R=Q}else{if(!isFinite(Q)){Q=R}else{if(R>Q){Q=[R,R=Q][0]}}}}p=i.logPositive;if(p==null){p=Q>0||R===0
}o=p?R:-Q;E=p?Q:-R;o<t&&(o=t);E<t&&(E=t)}function H(){u=[];var aa=A(r(E)/N);var R=A(r(o)/N);var W=D(aa);var Z=M(R);var X=W-Z;var Y=aa-R;if(K==="exponent"){V()
}else{!(X<=q&&v>q)?V():S()}function V(){if(X<v){v=X}var ac=M(A(X/v));var ag=D(A(X/ac));var ab=ac*ag;var ae=(ab-Y)/2;var ad=M(A(R-ae));if(O(ad-R)){ad-=1
}f=-ad*N;for(var af=ad;af-ac<=aa;af+=ac){u.push(x(l,af))}}function S(){var af=Q(Z,0);var ab=af+2;while(af<ab&&U(af+1)+T(af+1)*h<R){af++}var ag=Q(W,0);var ab=ag-2;
while(ag>ab&&U(ag-1)+T(ag-1)*h>aa){ag--}f=-(U(af)*I+T(af)*s);for(var ad=af;ad<=ag;ad++){var ae=U(ad);var ac=T(ad);u.push(x(10,ae)*x(2,ac))}}function Q(ac,ab){return ac*3+ab
}function T(ab){return ab-U(ab)*3}function U(ab){return M(A(ab/3))}}function w(){var T=[];for(var W=0,S=u.length;W<S;W++){T[W]=(p?1:-1)*u[W]}!p&&T.reverse();
var V=C();var R=V.value2Coord;var U=R(T[0]);var Q=R(T[T.length-1]);if(U===Q){U-=1;Q+=1}return{dataMin:U,dataMax:Q,tickList:T,logPositive:p,labelFormatter:n(),dataMappingMethods:V}
}function n(){if(K==="exponent"){var Q=l;var R=N;return function(T){if(!isFinite(parseFloat(T))){return""}var S="";if(T<0){T=-T;S="-"}return S+Q+J(r(T)/R)
}}else{return function(S){if(!isFinite(parseFloat(S))){return""}return P.addCommas(L(S))}}}function C(){var Q=p;var R=f;return{value2Coord:function(S){if(S==null||isNaN(S)||!isFinite(S)){return S
}S=parseFloat(S);if(!isFinite(S)){S=t}else{if(Q&&S<t){S=t}else{if(!Q&&S>-t){S=-t}}}S=B(S);return(Q?1:-1)*(r(S)+R)},coord2Value:function(S){if(S==null||isNaN(S)||!isFinite(S)){return S
}S=parseFloat(S);if(!isFinite(S)){S=t}return Q?x(z,S-R):-x(z,-S+R)}}}function A(Q){return +Number(+Q).toFixed(14)}function L(Q){return Number(Q).toFixed(15).replace(/\.?0*$/,"")
}function J(U){U=L(Math.round(U));var S=[];for(var T=0,R=U.length;T<R;T++){var Q=U.charAt(T);S.push(g[Q]||"")}return S.join("")}function O(Q){return Q>-t&&Q<t
}return F});d("echarts/util/smartSteps",[],function(){var o=[10,20,25,50];var H=[4,5,6];var l;var r;var h;var w;var I;var q=Math;var v=q.round;var t=q.floor;
var D=q.ceil;var x=q.abs;function s(K){return q.log(x(K))/q.LN10}function k(K){return q.pow(10,K)}function A(K){return K===t(K)}function E(L,K,O,N){l=N||{};
r=l.steps||o;h=l.secs||H;O=v(+O||0)%99;L=+L||0;K=+K||0;w=I=0;if("min" in l){L=+l.min||0;w=1}if("max" in l){K=+l.max||0;I=1}if(L>K){K=[L,L=K][0]}var M=K-L;
if(w&&I){return g(L,K,O)}if(M<(O||5)){if(A(L)&&A(K)){return G(L,K,O)}else{if(M===0){return j(L,K,O)}}}return n(L,K,O)}function f(M,P,S,U){U=U||0;var O=C((P-M)/S,-1);
var R=C(M,-1,1);var K=C(P,-1);var W=q.min(O.e,R.e,K.e);if(R.c===0){W=q.min(O.e,K.e)}else{if(K.c===0){W=q.min(O.e,R.e)}}m(O,{c:0,e:W});m(R,O,1);m(K,O);U+=W;
M=R.c;P=K.c;var L=(P-M)/S;var V=k(U);var Q=0;var T=[];for(var N=S+1;N--;){T[N]=(M+L*N)*V}if(U<0){Q=J(V);L=+(L*V).toFixed(Q);M=+(M*V).toFixed(Q);P=+(P*V).toFixed(Q);
for(var N=T.length;N--;){T[N]=T[N].toFixed(Q);+T[N]===0&&(T[N]="0")}}else{M*=V;P*=V;L*=V}h=0;r=0;l=0;return{min:M,max:P,secs:S,step:L,fix:Q,exp:U,pnts:T}
}function C(K,O,L){O=v(O%10)||2;if(O<0){if(A(K)){O=(""+x(K)).replace(/0+$/,"").length||1}else{K=K.toFixed(15).replace(/0+$/,"");O=K.replace(".","").replace(/^[-0]+/,"").length;
K=+K}}var M=t(s(K))-O+1;var N=+(K*k(-M)).toFixed(15)||0;N=L?t(N):D(N);!N&&(M=0);if((""+x(N)).length>O){M+=1;N/=10}return{c:N,e:M}}function m(L,K,N){var M=K.e-L.e;
if(M){L.e+=M;L.c*=k(-M);L.c=N?t(L.c):D(L.c)}}function F(L,K,M){if(L.e<K.e){m(K,L,M)}else{m(L,K,M)}}function u(L,K){K=K||o;L=C(L);var N=L.c;var M=0;while(N>K[M]){M++
}if(!K[M]){N/=10;L.e+=1;M=0;while(N>K[M]){M++}}L.c=K[M];return L}function n(N,R,T){var M;var Q=T||+h.slice(-1);var P=u((R-N)/Q,r);var K=C(R-N);var S=C(N,-1,1);
var L=C(R,-1);m(K,P);m(S,P,1);m(L,P);if(!T){Q=p(S,L)}else{M=z(S,L,Q)}if(A(N)&&A(R)&&N*R>=0){if(R-N<Q){return G(N,R,Q)}Q=i(N,R,T,S,L,Q)}var O=y(N,R,S.c,L.c);
S.c=O[0];L.c=O[1];if(w||I){B(N,R,S,L)}return f(S.c,L.c,Q,L.e)}function p(R,P){var Q;var N,O,L;var K=[];for(var M=h.length;M--;){Q=h[M];N=u((P.c-R.c)/Q,r);
N=N.c*k(N.e);O=t(R.c/N)*N;L=D(P.c/N)*N;K[M]={min:O,max:L,step:N,span:L-O}}K.sort(function(T,S){var U=T.span-S.span;if(U===0){U=T.step-S.step}return U});
K=K[0];Q=K.span/K.step;R.c=K.min;P.c=K.max;return Q<3?Q*2:Q}function z(S,L,P){var T;var R;var N=L.c;var M=(L.c-S.c)/P-1;while(N>S.c){M=u(M+1,r);M=M.c*k(M.e);
T=M*P;R=D(L.c/M)*M;N=R-T}var K=S.c-N;var O=R-L.c;var Q=K-O;if(Q>M*1.1){Q=v(Q/M/2)*M;N+=Q;R+=Q}S.c=N;L.c=R;return M}function i(M,O,Q,P,K,N){var R=K.c-P.c;
var L=R/N*k(K.e);if(!A(L)){L=t(L);R=L*N;if(R<O-M){L+=1;R=L*N;if(!Q&&(L*(N-1)>=(O-M))){N-=1;R=L*N}}if(R>=O-M){var S=R-(O-M);P.c=v(M-S/2);K.c=v(O+S/2);P.e=0;
K.e=0}}return N}function G(M,K,O){O=O||5;if(w){K=M+O}else{if(I){M=K-O}else{var Q=O-(K-M);var P=v(M-Q/2);var N=v(K+Q/2);var L=y(M,K,P,N);M=L[0];K=L[1]}}return f(M,K,O)
}function j(L,K,M){M=M||5;var N=q.min(x(K/M),M)/2.1;if(w){K=L+N}else{if(I){L=K-N}else{L=L-N;K=K+N}}return n(L,K,M)}function y(L,K,N,M){if(L>=0&&N<0){M-=N;
N=0}else{if(K<=0&&M>0){N-=M;M=0}}return[N,M]}function J(K){K=(+K).toFixed(15).split(".");return K.pop().replace(/0+$/,"").length}function B(L,K,O,M){if(w){var P=C(L,4,1);
if(O.e-P.e>6){P={c:0,e:O.e}}F(O,P);F(M,P);M.c+=P.c-O.c;O.c=P.c}else{if(I){var N=C(K,4);if(M.e-N.e>6){N={c:0,e:M.e}}F(O,N);F(M,N);O.c+=N.c-M.c;M.c=N.c}}}function g(T,W,Y){var P=Y?[Y]:h;
var Z=W-T;if(Z===0){W=C(W,3);Y=P[0];W.c=v(W.c+Y/2);return f(W.c-Y,W.c,Y,W.e)}if(x(W/Z)<0.000001){W=0}if(x(T/Z)<0.000001){T=0}var N,M,O;var V=[[5,10],[10,2],[50,10],[100,2]];
var Q=[];var R=[];var K=C((W-T),3);var X=C(T,-1,1);var L=C(W,-1);m(X,K,1);m(L,K);Z=L.c-X.c;K.c=Z;for(var U=P.length;U--;){Y=P[U];N=D(Z/Y);M=N*Y-Z;O=(M+3)*3;
O+=(Y-P[0]+2)*2;if(Y%5===0){O-=10}for(var S=V.length;S--;){if(N%V[S][0]===0){O/=V[S][1]}}R[U]=[Y,N,M,O].join();Q[U]={secs:Y,step:N,delta:M,score:O}}Q.sort(function(ab,aa){return ab.score-aa.score
});Q=Q[0];X.c=v(X.c-Q.delta/2);L.c=v(L.c+Q.delta/2);return f(X.c,L.c,Q.secs,K.e)}return E});d("echarts/util/shape/Candle",["require","zrender/shape/Base","zrender/tool/util","./normalIsCover"],function(g){var h=g("zrender/shape/Base");
var f=g("zrender/tool/util");function i(j){h.call(this,j)}i.prototype={type:"candle",_numberOrder:function(k,j){return j-k},buildPath:function(j,l){var k=f.clone(l.y).sort(this._numberOrder);
j.moveTo(l.x,k[3]);j.lineTo(l.x,k[2]);j.moveTo(l.x-l.width/2,k[2]);j.rect(l.x-l.width/2,k[2],l.width,k[1]-k[2]);j.moveTo(l.x,k[1]);j.lineTo(l.x,k[0])},getRect:function(l){if(!l.__rect){var j=0;
if(l.brushType=="stroke"||l.brushType=="fill"){j=l.lineWidth||1}var k=f.clone(l.y).sort(this._numberOrder);l.__rect={x:Math.round(l.x-l.width/2-j/2),y:Math.round(k[3]-j/2),width:l.width+j,height:k[0]-k[3]+j}
}return l.__rect},isCover:g("./normalIsCover")};f.inherits(i,h);return i});d("zrender/shape/Sector",["require","../tool/math","../tool/computeBoundingBox","../tool/vector","./Base","../tool/util"],function(g){var l=g("../tool/math");
var n=g("../tool/computeBoundingBox");var j=g("../tool/vector");var h=g("./Base");var f=j.create();var o=j.create();var m=j.create();var k=j.create();var i=function(p){h.call(this,p)
};i.prototype={type:"sector",buildPath:function(C,q){var B=q.x;var z=q.y;var t=q.r0||0;var p=q.r;var v=q.startAngle;var s=q.endAngle;var u=q.clockWise||false;
v=l.degreeToRadian(v);s=l.degreeToRadian(s);if(!u){v=-v;s=-s}var A=l.cos(v);var w=l.sin(v);C.moveTo(A*t+B,w*t+z);C.lineTo(A*p+B,w*p+z);C.arc(B,z,p,v,s,!u);
C.lineTo(l.cos(s)*t+B,l.sin(s)*t+z);if(t!==0){C.arc(B,z,t,s,v,u)}C.closePath();return},getRect:function(u){if(u.__rect){return u.__rect}var p=u.x;var z=u.y;
var s=u.r0||0;var v=u.r;var t=l.degreeToRadian(u.startAngle);var q=l.degreeToRadian(u.endAngle);var w=u.clockWise;if(!w){t=-t;q=-q}if(s>1){n.arc(p,z,s,t,q,!w,f,m)
}else{f[0]=m[0]=p;f[1]=m[1]=z}n.arc(p,z,v,t,q,!w,o,k);j.min(f,f,o);j.max(m,m,k);u.__rect={x:f[0],y:f[1],width:m[0]-f[0],height:m[1]-f[1]};return u.__rect
}};g("../tool/util").inherits(i,h);return i});d("zrender/tool/computeBoundingBox",["require","./vector","./curve"],function(i){var l=i("./vector");var h=i("./curve");
function n(x,t,w){if(x.length===0){return}var s=x[0][0];var y=x[0][0];var v=x[0][1];var q=x[0][1];for(var u=1;u<x.length;u++){var r=x[u];if(r[0]<s){s=r[0]
}if(r[0]>y){y=r[0]}if(r[1]<v){v=r[1]}if(r[1]>q){q=r[1]}}t[0]=s;t[1]=v;w[0]=y;w[1]=q}function g(B,z,y,w,s,v){var q=[];h.cubicExtrema(B[0],z[0],y[0],w[0],q);
for(var t=0;t<q.length;t++){q[t]=h.cubicAt(B[0],z[0],y[0],w[0],q[t])}var A=[];h.cubicExtrema(B[1],z[1],y[1],w[1],A);for(var t=0;t<A.length;t++){A[t]=h.cubicAt(B[1],z[1],y[1],w[1],A[t])
}q.push(B[0],w[0]);A.push(B[1],w[1]);var r=Math.min.apply(null,q);var x=Math.max.apply(null,q);var u=Math.min.apply(null,A);var p=Math.max.apply(null,A);
s[0]=r;s[1]=u;v[0]=x;v[1]=p}function k(A,z,y,s,w){var u=h.quadraticExtremum(A[0],z[0],y[0]);var t=h.quadraticExtremum(A[1],z[1],y[1]);u=Math.max(Math.min(u,1),0);
t=Math.max(Math.min(t,1),0);var p=1-u;var B=1-t;var r=p*p*A[0]+2*p*u*z[0]+u*u*y[0];var x=p*p*A[1]+2*p*u*z[1]+u*u*y[1];var q=B*B*A[0]+2*B*t*z[0]+t*t*y[0];
var v=B*B*A[1]+2*B*t*z[1]+t*t*y[1];s[0]=Math.min(A[0],y[0],r,q);s[1]=Math.min(A[1],y[1],x,v);w[0]=Math.max(A[0],y[0],r,q);w[1]=Math.max(A[1],y[1],x,v)}var f=l.create();
var j=l.create();var o=l.create();var m=function(B,z,p,w,q,s,u,A){if(Math.abs(w-q)>=Math.PI*2){u[0]=B-p;u[1]=z-p;A[0]=B+p;A[1]=z+p;return}f[0]=Math.cos(w)*p+B;
f[1]=Math.sin(w)*p+z;j[0]=Math.cos(q)*p+B;j[1]=Math.sin(q)*p+z;l.min(u,f,j);l.max(A,f,j);w=w%(Math.PI*2);if(w<0){w=w+Math.PI*2}q=q%(Math.PI*2);if(q<0){q=q+Math.PI*2
}if(w>q&&!s){q+=Math.PI*2}else{if(w<q&&s){w+=Math.PI*2}}if(s){var v=q;q=w;w=v}for(var t=0;t<q;t+=Math.PI/2){if(t>w){o[0]=Math.cos(t)*p+B;o[1]=Math.sin(t)*p+z;
l.min(u,o,u);l.max(A,o,A)}}};n.cubeBezier=g;n.quadraticBezier=k;n.arc=m;return n});d("echarts/util/shape/Chain",["require","zrender/shape/Base","./Icon","zrender/shape/util/dashedLineTo","zrender/tool/util","zrender/tool/matrix"],function(i){var j=i("zrender/shape/Base");
var k=i("./Icon");var f=i("zrender/shape/util/dashedLineTo");var g=i("zrender/tool/util");var h=i("zrender/tool/matrix");function l(m){j.call(this,m)}l.prototype={type:"chain",brush:function(m,o){var n=this.style;
if(o){n=this.getHighlightStyle(n,this.highlightStyle||{})}m.save();this.setContext(m,n);this.setTransform(m);m.save();m.beginPath();this.buildLinePath(m,n);
m.stroke();m.restore();this.brushSymbol(m,n);m.restore();return},buildLinePath:function(o,q){var n=q.x;var s=q.y+5;var p=q.width;var m=q.height/2-10;o.moveTo(n,s);
o.lineTo(n,s+m);o.moveTo(n+p,s);o.lineTo(n+p,s+m);o.moveTo(n,s+m/2);if(!q.lineType||q.lineType=="solid"){o.lineTo(n+p,s+m/2)}else{if(q.lineType=="dashed"||q.lineType=="dotted"){var r=(q.lineWidth||1)*(q.lineType=="dashed"?5:1);
f(o,n,s+m/2,n+p,s+m/2,r)}}},brushSymbol:function(p,r){var t=r.y+r.height/4;p.save();var q=r.chainPoint;var o;for(var m=0,n=q.length;m<n;m++){o=q[m];if(o.symbol!="none"){p.beginPath();
var s=o.symbolSize;k.prototype.buildPath(p,{iconType:o.symbol,x:o.x-s,y:t-s,width:s*2,height:s*2,n:o.n});p.fillStyle=o.isEmpty?"#fff":r.strokeColor;p.closePath();
p.fill();p.stroke()}if(o.showLabel){p.font=o.textFont;p.fillStyle=o.textColor;p.textAlign=o.textAlign;p.textBaseline=o.textBaseline;if(o.rotation){p.save();
this._updateTextTransform(p,o.rotation);p.fillText(o.name,o.textX,o.textY);p.restore()}else{p.fillText(o.name,o.textX,o.textY)}}}p.restore()},_updateTextTransform:function(m,q){var p=h.create();
h.identity(p);if(q[0]!==0){var o=q[1]||0;var n=q[2]||0;if(o||n){h.translate(p,p,[-o,-n])}h.rotate(p,p,q[0]);if(o||n){h.translate(p,p,[o,n])}}m.transform.apply(m,p)
},isCover:function(m,o){var n=this.style;if(m>=n.x&&m<=(n.x+n.width)&&o>=n.y&&o<=(n.y+n.height)){return true}else{return false}}};g.inherits(l,j);return l
});d("zrender/shape/Ring",["require","./Base","../tool/util"],function(g){var h=g("./Base");var f=function(i){h.call(this,i)};f.prototype={type:"ring",buildPath:function(i,j){i.arc(j.x,j.y,j.r,0,Math.PI*2,false);
i.moveTo(j.x+j.r0,j.y);i.arc(j.x,j.y,j.r0,0,Math.PI*2,true);return},getRect:function(j){if(j.__rect){return j.__rect}var i;if(j.brushType=="stroke"||j.brushType=="fill"){i=j.lineWidth||1
}else{i=0}j.__rect={x:Math.round(j.x-j.r-i/2),y:Math.round(j.y-j.r-i/2),width:j.r*2+i,height:j.r*2+i};return j.__rect}};g("../tool/util").inherits(f,h);
return f});d("zrender",["zrender/zrender"],function(f){return f});d("echarts",["echarts/echarts"],function(f){return f});var c=a("zrender");c.tool={color:a("zrender/tool/color"),math:a("zrender/tool/math"),util:a("zrender/tool/util"),vector:a("zrender/tool/vector"),area:a("zrender/tool/area"),event:a("zrender/tool/event")};
c.animation={Animation:a("zrender/animation/Animation"),Cip:a("zrender/animation/Clip"),easing:a("zrender/animation/easing")};var b=a("echarts");b.config=a("echarts/config");
a("echarts/chart/bar");a("echarts/chart/line");e.echarts=b;e.zrender=c})(window);if(typeof module==="object"&&module&&typeof module.exports==="object"){module.exports=echarts
}else{if(typeof define==="function"&&define){define("lib/echart/echarts",[],function(){return echarts})}}if(typeof window==="object"&&typeof window.document==="object"){window.echarts=window.$=echarts
};