/***产品购买右则按钮***/
$(function(){
	$(".order_icon").tap(function(){
		if($(this).hasClass('order_icon')){
            $(this).removeClass('order_icon');
            $(this).addClass('order_icon1');
        }else if($(this).hasClass('order_icon1')){
            $(this).removeClass('order_icon1');
            $(this).addClass('order_icon');
        }
	});
    //产品赎回 、产品购买 图标切换
    $(".redeem_button p").tap(function(){
        $(this).addClass("open").siblings().removeClass("open");
    })

    $(".checkbox i").tap(function(){
        $(this).toggleClass("icon_checked");
    })
})
/* 我的订单 滑动选项卡 */
$(function(){
	$("ul.nav li,ul.nav_2 li,ul.nav_3 li").tap(function(){
		$("ul.nav li a,ul.nav_2 li a,ul.nav_3 li a").removeClass("check");
		$(this).children("a").addClass("check");
		$num=$(this).index(); //alert($num);
		$(".myAssetsBox,.prolistBox").hide();
		$(".myAssetsBox,.prolistBox").eq($num).show();						
	});		
});
/* 登录框  选项卡 */
$(function(){
    $("ul.login_nav li").tap(function(){
        $("ul.login_nav li a").removeClass("check");
        $(this).children("a").addClass("check");
        $num=$(this).index(); //alert($num);
        $(".login_box").hide();
        $(".login_box").eq($num).show();                      
    });     
});
/* 基金 滑动选项卡 2 */
$(function(){
    $("ul.fund_tab_2 li").tap(function(){
        $("ul.fund_tab_2 li a").removeClass("tab_check");
        $(this).children("a").addClass("tab_check");
        $num=$(this).index(); //alert($num);
        $(".fund_tab_box_4").hide();
        $(".fund_tab_box_4").eq($num).show();                      
    });     
});
/* 基金 滑动选项卡 3 */
$(function(){
    $("ul.fund_tab_3 li").tap(function(){
        $("ul.fund_tab_3 li a").removeClass("tab_check");
        $(this).children("a").addClass("tab_check");
        $num=$(this).index(); //alert($num);
        $(".fund_tab_box").hide();
        $(".fund_tab_box").eq($num).show();                      
    });     
});
/* 基金 滑动选项卡 6 */
$(function(){
    $("ul.fund_tab_6 li").tap(function(){
        $("ul.fund_tab_6 li a").removeClass("tab_check");
        $(this).children("a").addClass("tab_check");
        $num=$(this).index(); //alert($num);
        $(".fund_tab_box_4").hide();
        $(".fund_tab_box_4").eq($num).show();                      
    });     
});
/* 基金 滑动选项卡 3X4 */
$(function(){
    $("ul.fund_tab_4 li").tap(function(){
        $("ul.fund_tab_4 li a").removeClass("tab_check_4");
        $(this).children("a").addClass("tab_check_4");
        $num=$(this).index(); //alert($num);
        $(".fund_tab_box_4").hide();
        $(".fund_tab_box_4").eq($num).show();
    });
});
/* 基金 滑动选项卡 2X2 */
$(function(){
    $("ul.fund_tab_5 li").tap(function(){
        $("ul.fund_tab_5 li a").removeClass("tab_check_4");
        $(this).children("a").addClass("tab_check_4");
        $num=$(this).index(); //alert($num);
        $(".fund_tab_box_5").hide();
        $(".fund_tab_box_5").eq($num).show();            
    });
});
/* 业绩图 滑动选项卡 4 */
$(function(){
    $("ul.currency_time li,ul.currency_time_cash li").tap(function(){
        $("ul.currency_time li a,ul.currency_time_cash li a").removeClass("cur");
        $(this).children("a").addClass("cur");
        $num=$(this).index(); //alert($num);
        $(".currency_figure").hide();
        $(".currency_figure").eq($num).show();            
    });
});
/* 现金宝 滑动选项卡 4 */
$(function(){
    $("ul.fund_tab_cash li").tap(function(){
        $("ul.fund_tab_cash li a").removeClass("tab_check");
        $(this).children("a").addClass("tab_check");
        $num=$(this).index(); //alert($num);
        $(".fund_tab_box_4").hide();
        $(".fund_tab_box_4").eq($num).show();                      
    });     
});
/* 轮播 */
$(function(){
    $('#banner-box').swipeSlide({
        continuousScroll:true,
        speed : 3000,
        transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
        callback : function(i){
            $('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });
});
 /*平安证券稳健资本一号  滑动选项卡 */
 $(function(){
     $("ul.currency_nav li").tap(function(){
         $("ul.currency_nav li a").removeClass("check");
        $(this).children("a").addClass("check");
        $num=$(this).index();
         $(".pingsecurBox").hide();
        $(".pingsecurBox").eq($num).show();                      
     });     
 });
/*图标切换*/
function ou_ck(n){
    for(var i=1;i<=4;i++){
        if(n==i){
            $("#ou_"+n).removeClass("icon_offon_"+n);
            $("#ou_"+n).addClass("icon_offon_"+n+""+n);
        }else{
            $("#ou_"+i).removeClass("icon_offon_"+i+""+i);
            $("#ou_"+i).addClass("icon_offon_"+i);
        }
    }
}
/* 隐藏的导航 */
$(function(){
    $(".filter").tap(function(){
      $(".filter_ul").toggle();
    });
    $("ul.filter_ul li").tap(function(){
        $("ul.filter_ul a").removeClass("filter_check");
        $(this).children("a").addClass("filter_check");               
    });
});
/* 滑动监听 */
$(function(){
    //获取要定位元素距离浏览器顶部的距离
    var navH = $(".fund_tab_2,.fund_tab_3,.fund_tab_4,.fund_tab_5,.fund_tab_6,.fund_tab_cash").offset().top-93;
    //滚动条事件
    $(window).scroll(function(){
    //获取滚动条的滑动距离
    var scroH = $(this).scrollTop();
    //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
    if(scroH>=navH){
        $(".fund_tab_2,.fund_tab_3,.fund_tab_6,.fund_tab_cash").css({"position":"fixed","top":"93px"});
        $(".fund_tab_4,.fund_tab_5").css({"position":"fixed","top":"167px"});
        $(".fund_tab_80").css({"padding-top":"80px"});
        $(".fund_tab_178").css({"padding-top":"178px"});
        }else if(scroH<navH){
        $(".fund_tab_2,.fund_tab_3,.fund_tab_4,.fund_tab_5,.fund_tab_6,.fund_tab_cash").css({"position":"static"});
        $(".fund_tab_80,.fund_tab_178,.fund_tab_cash").css({"padding-top":"0"});
        }
    })
})
/* 点击加载 */
function nextpage() {
    $("#addmore").html("加载中...");
    var m="";
    for(var i=0;i<5;i++){
       m+="<tr><td>2015/5/04</td><td>1.8762</td> <td>1.8762</td><td>1.04%</td></tr>";
   }
    if (m == "") {
        $("#addmore").html("已经木有了...");
    } else {
        $("#addmore").html("点击展开更多...");
        $(".addtr").append(m);
    }
}
/* 设置 */
$(function(){
    $(".cash_toggle").hide();
    $(".order_icon").tap(function(){
        $(".cash_toggle").toggle();
    })
});