/**
 * Created by Administrator on 2016/9/27.
 */
$(function($){
    //欢度国庆边框阴影
    $(".temai").hover(function(){
        $(this).css({
            "box-shadow":"4px 4px 20px #b4b2b2"
        })
    },function(){
        $(this).css({
            "box-shadow":"2px 2px 4px #e3e3e3"
        })
    })
    //倒计时
    var timer5=setInterval(daojishi,1000);
    daojishi();
    function daojishi()
    {
        var nowdate=new Date()               //当前时间
        var nowtime=nowdate.getTime();
        var enddate1=new Date(2016,9,30)      //截止日期为2016年11月1号
        var endtime1=enddate1.getTime();
        var ti1=parseInt((endtime1-nowtime)/1000);
        var days1=parseInt(ti1/86400);
        var hours1=parseInt(ti1%86400/3600);
        var minus1=parseInt(ti1%86400%3600/60);
        var secs1=ti1%60;
        var str1="&nbsp;&nbsp;&nbsp;距离特卖结束&nbsp;&nbsp;&nbsp;"+toTwo(days1)+"天"+toTwo(hours1)+"小时"+toTwo(minus1)+"分钟"+toTwo(secs1)+"秒";
        $(".jieshu").html(str1);
    }
    function toTwo(n)
    {
        if(n>=0&&n<=9){
            return "0"+n;
        }
        else{
            return ""+n;
        }
    }

    //今日上新获取数据ajax
    $.ajax({
        type:"get",
        url:"json/todaynew.json",
        success:function(msg){
            $.each(msg,function(index,items){
                var odl=$("<dl>");
                var odt=$("<dt>");
                var odd=$("<dd>");
                var odatu=$("<img>");
                odatu.attr("src",items.url);
                var obiaoji=$("<img>");
                obiaoji.addClass("biaoji");
                obiaoji.attr("src",items.biaoji);
                var obuy=$("<a>");
                obuy.html("购买");
                var otitle=$("<a>");
                otitle.attr("href",items.href);
                otitle.html(items.title);
                var opra=$("<p>");
                opra.append(otitle);
                var ob=$("<b>");
                ob.html(items.price);
                var ospan=$("<span>");
                ospan.html(items.xiaoliang);
                odt.append(odatu,obiaoji,obuy);
                odd.append(opra,ob,ospan);
                odl.append(odt,odd);
                $(".todaylist").append(odl);
            })
            fn()
        }
    })
    //今日上新边框阴影  购买按钮显示与消失
    function fn(){
        $(".todaylist dl").hover(function(){
            $(this).css({
                "box-shadow":"4px 4px 20px #b4b2b2"
            })
            $(this).children("dt").children("a").show()
        },function(){
            $(this).css({
                "box-shadow":"2px 2px 4px #e3e3e3"
            })
            $(this).children("dt").children("a").hide()
        })
    }

    //黑条tab切换
    $(".tab_top ul").on("mouseover","li",function(){
        $("#heitiao").stop().animate({
            "left":30+96*$(this).index()
        },100);
        $(".tab_content").eq($(this).index()).show().siblings(".tab_content").hide();
    })
    //黑条tab切换获取数据ajax
    $.ajax({
        type:"get",
        url:"json/heitiao.json",
        success:function(msg){
            $.each(msg,function(index,items){
                var odiv=$("<div>");
                odiv.addClass("tab_content");
                $(".tab_area .layout3").append(odiv);
                var a=msg[index];
                $.each(a,function(index,items){
                    var odl=$("<dl>");
                    var odt=$("<dt>");
                    var odd=$("<dd>");
                    var oA1=$("<a>");
                    oA1.attr("href",items.href);
                    var oimg=$("<img>");
                    oimg.attr("src",items.url);
                    oA1.append(oimg);
                    odt.append(oA1);
                    var oh3_1=$("<h3>");
                    oh3_1.html(items.title);
                    var oA2=$("<a>");
                    oA2.attr("href",items.href);
                    oA2.html(items.intro);
                    var op=$("<p>");
                    op.append(oA2);
                    var oh3_2=$("<h3>");
                    oh3_2.html(items.price);
                    odd.append(oh3_1,op,oh3_2);
                    odl.append(odt,odd);
                    odiv.append(odl);
                })
            })
            $(".tab_content").eq(0).show();
        }
    })


})
