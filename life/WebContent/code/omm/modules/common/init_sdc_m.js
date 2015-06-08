     var gDomain="sdc.pingan.com";  	// SDC Production Mode Domain
     var gDcsId="dcspymm36v5rgwyi354yjpm91_6q9m ";
     var gFpc="WT-FPC";
     var gConvert=true;
     var gWTIDJS=window.document.createElement("script");
     window.document.getElementsByTagName("head")[0].appendChild(gWTIDJS);
     if ((typeof(gConvert)!="undefined")&&gConvert&&(document.cookie.indexOf(gFpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
       gWTIDJS.src="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+"/"+gDcsId+"/wtid.js";
     }
     function setsdcjs(){
		  //修改为相对路径
    	  var js_path='',
    	      host = window.location.hostname;
    	  if (host == 'u.pingan.com' ) {
    	     js_path = "modules/lib/webtrends/sdc_m.js";
		  } else {
		     js_path = "modules/lib/webtrends/sdc_m.js";
		  }
		  var SDC_js=document.createElement("script");
		  SDC_js.src=js_path;
		  var headElem=document.getElementsByTagName("head")[0];
		  headElem.appendChild(SDC_js);
     }
     setsdcjs();
