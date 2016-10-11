/**
 * Created by Administrator on 2016/9/24.
 */
$(function($){
    //隐藏栏小格子鼠标移入移出效果
    $(".choose li").hover(function(){
        $(".choose li span").eq($(this).index()).css({
            "border-radius":0,
            "background-color":"#B81C22"
        })
        $(".choose li a").eq($(this).index()).show();
    },function(){
        $(".choose li span").eq($(this).index()).css({
            "background-color":"#313131",
            "border-top-left-radius":"5px",
            "border-bottom-left-radius":"5px"
        })
        $(".choose li a").eq($(this).index()).hide();
    })

    //点击任意选项，右框拉出
    $(".choose").on("click","li:lt(3)",function(){
        $(".right_side").stop().animate({"right":"0"},1000);
        $(".right_content").children("div").eq($(this).index()).show().siblings("div").hide();
    })




    //点击叉叉 右框缩回
    $(".right_content h2 a").click(function(){
        $(".right_side").stop().animate({"right":"-273px"},1000);
    })

    //返回顶部
    $("#totop").click(function(){
        var sT=$(document).scrollTop();
        var timer2=setInterval(function(){
            sT=sT<0?0:sT-10;
            if(sT==0){
                clearInterval(timer2);
            }
            $(document).scrollTop(sT);
        },1)
    })

    //左中小图片轮播
    var smallindex=0;
    $("#next1").click(function(){
        if(smallindex==1){
            $("#smallball").css("left","-303px")
        }
        else{
            smallindex++;
            $("#smallball").stop().animate({
                left:-303*smallindex
            },300)
        }
    })

    $("#prev1").click(function(){
        if(smallindex==0){
            $("#smallball").css("left","0")
        }
        else{
            smallindex--;
            $("#smallball").stop().animate({
                left:-303*smallindex
            },300)
        }
    })

    //小图片鼠标移入变红框  并将里面的小图片放入上面的框和放大镜中
    $("#smallball li").mouseover(function(){
        $(this).css("border","1px solid #ff0000").siblings("li").css("border","1px solid #cccccc");
        $(".bigpic").children("img").eq($(this).index()).show().siblings("img").hide();
        $(".fangdajing").children("img").eq($(this).index()).show().siblings("img").hide();
    })

    //放大镜效果
    $(".bigpic").hover(function(){
        $(".lj").show();
        $(".fangdajing").show();
    },function(){
        $(".lj").hide();
        $(".fangdajing").hide();
    });
    var boxW=$(".bigpic").innerWidth();
    var boxH=$(".bigpic").innerHeight();
    var ljW=$(".lj").innerWidth();
    var ljH=$(".lj").innerHeight();
    $(".bigpic").mousemove(function(e){
        var ev=window.event||e;
        var posX=ev.offsetX-ljW/2;
        var posY=ev.offsetY-ljH/2;
        if(posX<=0){
            posX=0
        }else if(posX>=boxW-ljW){
            posX=boxW-ljW
        }
        if(posY<=0){
            posY=0
        }else if(posY>=boxH-ljH){
            posY=boxH-ljH
        }
        $(".lj").css("left",posX);
        $(".lj").css("top",posY);
        $(".fangdajing img").css("left",-posX*4);
        $(".fangdajing img").css("top",-posY*4);
    })

    //选择商品数量
    $("#plus").click(function(){
        $("#minus").css("color","#313131");
        var txt=$("#shuliang").val();
        var num=isNaN(txt)?1:Number(txt);
        if(num>=12){
            num=12;
            $(this).css("color","#cccccc")
        }
        else{
            num++;
        }
        $("#shuliang").val(num)
    })
    $("#minus").click(function(){
        $("#plus").css("color","#313131");
        var txt=$("#shuliang").val();
        var num=isNaN(txt)?1:Number(txt);
        if(num<=1)
        {
            num=1;
            $(this).css("color","#cccccc");
        }
        else{
            num--;
        }
        $("#shuliang").val(num)
    })

    //菜单置顶
    var $st=$(".fixed_top").offset().top;
    $(window).scroll(function(){
        var h=document.documentElement.scrollTop+document.body.scrollTop;
        if(h>=$st){
            $(".fixed_top").css({
                "position":"fixed",
                "left":"auto",
                "top":0
            })
        }
        else{
            $(".fixed_top").css({
                "position":"absolute",
                "left":0,
                "top":0
            })
        }
    })
    //置顶菜单tab切换
    $(".fixed_top ul").on("click","li",function(){
        $(this).children("a").css({
            "background":"#ffffff url(img/fixedtop_bg.png) no-repeat top center",
            "color":"#b81c22",
            "border-bottom":"0",
            "border-left":"1px solid #cccccc"
        });
        $(this).siblings().children("a").css({
            "color":"#000000",
            "background":"none",
            "border-bottom":"1px solid #cccccc"
        });
        $(".outerTab").eq($(this).index()).show().siblings(".outerTab").hide();
    })

    //好评 中评 差评tab切换
    $(".pj_tab ul").on("click","li",function(){
        $(this).children("a").css({
            "background":"#ffffff url(img/fixedtop_bg.png) no-repeat top center",
            "color":"#b81c22",
            "border-bottom":"0",
            "border-left":"1px solid #cccccc"
        });
        $(this).siblings().children("a").css({
            "color":"#000000",
            "background":"none",
            "border-bottom":"1px solid #cccccc"
        });
        $(".innerTab").eq($(this).index()).show().siblings(".innerTab").hide()
    })


    //侧边栏购物车
    function zairu(){
        $(".cbox").empty();
        var ttprice=0;
        var ttnum=0;
        var cartStr=getCookie("cart");
        if(cartStr&&cartStr!="{}"){
            $(".hasgoods").show();
            $(".nogoods").hide();
            var cart=JSON.parse(cartStr);
            for(var id in cart){
                ttnum++;
                var goods=cart[id];
                ttprice+=goods.num*goods.price;
                var odl=$("<dl>");
                var odt=$("<dt>");
                var odd=$("<dd>");
                var oA1=$("<a href='"+goods.lianjie+"'></a>");
                var oimg=$("<img>");
                oimg.attr("src",goods.src);
                oA1.append(oimg);
                odt.append(oA1);
                var oA2=$("<a href='"+goods.lianjie+"'></a>");
                oA2.html(goods.name);
                var op1=$("<p></p>");
                op1.append(oA2);
                var op2=$("<span class='danjia'>"+"￥"+goods.price+"</span>X<span class='shumu'>"+goods.num+"</span><a href='javascript:;' class='del'>删除</a>")
                odd.append(op1,op2);
                odl.attr("id",id);
                odl.append(odt,odd);
                $(".cbox").append(odl);
            }
            $(".del").click(function(){
                var goodID=$(this).parent().parent().attr("id");
                var cartStr=getCookie("cart");
                var cart=JSON.parse(cartStr);
                delete cart[goodID];
                var res=cart;
                var resStr=JSON.stringify(res);
                setCookie("cart",resStr,20);
                $(this).parent().parent().remove();
                zairu();
            })
            $(".ttprice").html(ttprice);
            $(".ttnum").html(ttnum);
        }
        else{
            $(".hasgoods").hide();
            $(".nogoods").show();
        }
    }
    zairu();

    $("#tocar").click(function(){
        var goodID=$("#sp11").attr("id");
        //console.log(goodID);
        var goodName=$("#good_name").html();
       // console.log(goodName);
        var goodPrice=$("#good_price").html();
        goodPrice=parseFloat(goodPrice.slice(1));
        //console.log(goodPrice);
        var number=isNaN($("#shuliang").val())?1:Number($("#shuliang").val());
       // console.log(number);
        var goodpic=$("#oimg").attr("src");
        //console.log(goodpic);
        var olianjie=window.location.href;
       //console.log(olianjie);
        var cartStr=getCookie("cart")?getCookie("cart"):"{}";
        var cart=JSON.parse(cartStr);
        if(goodID in cart){
            cart[goodID].num+=number;
        }
        else{
            cart[goodID]={
                name:goodName,
                price:goodPrice,
                src:goodpic,
                lianjie:olianjie,
                num:number
            }
        }
        var cartStr=JSON.stringify(cart);
        setCookie("cart",cartStr,20);
        zairu();
    })

    $("#tobuy").click(function(){
        var goodID=$("#sp11").attr("id");
        // console.log(goodID);
        var goodName=$("#good_name").html();
        //  console.log(goodName);
        var goodPrice=$("#good_price").html();
        goodPrice=parseFloat(goodPrice.slice(1));
        // console.log(goodPrice);
        var number=isNaN($("#shuliang").val())?1:Number($("#shuliang").val());
        // console.log(number);
        var goodpic=$("#oimg").attr("src");
        // console.log(goodpic);
        var olianjie=window.location.href;
        //console.log(olianjie);
        var cartStr=getCookie("cart")?getCookie("cart"):"{}";
        var cart=JSON.parse(cartStr);
        if(goodID in cart){
            window.location.assign("shopping_cart.html");
        }
        else{
            cart[goodID]={
                name:goodName,
                price:goodPrice,
                src:goodpic,
                lianjie:olianjie,
                num:number
            }
        }
        var cartStr=JSON.stringify(cart);
        setCookie("cart",cartStr,20);
        window.location.assign("shopping_cart.html");
        zairu();
    })

    //热销排行榜效果
    $(".rank dl").on("mouseover","dt",function(){
        $(this).stop().hide();
        $(this).siblings("dt").stop().show();
        $(this).next("dd").stop().show().siblings("dd").stop().hide();
    })



})