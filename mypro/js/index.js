/**
 * Created by yjt on 2016/9/19.
 */
window.onload=function(){

   // 首页判断是否已经登录
    if(getCookie("flag")=="true"){
        $("#change1").html(getCookie("user"));
        $("#change2").html("退出");
        $("#change1").click(function(){
            window.location.reload();
        })
        $("#change2").click(function(){
            window.location.assign("log_in.html")
            setCookie("flag",false,14);
        })
    }
    else{
        $("#change1").html("请登录");
        $("#change2").html("注册");
        $("#change1").click(function(){
            window.location.assign("log_in.html");
        })
        $("#change2").click(function(){
            window.location.assign("register.html")
        })
    }


    /*固定侧边栏*/
    window.onscroll=function(){
        var h=document.documentElement.scrollTop+document.body.scrollTop;
        if(h>=500){
            $(".fixed_side").slideDown()
        }
        else{
            $(".fixed_side").slideUp();
        }
    }
    //返回顶部
    $("#index_top").click(function(){
        var sT=$(document).scrollTop();
        var timer4=setInterval(function(){
            if(sT==0){
                clearInterval(timer4);
            }
            else{
             sT=sT<0?0:sT-10;
             $(document).scrollTop(sT);   
            }
            
        },1)
    })

    /*控制二维码的显示与消失*/
    $("#weibo").mouseover(function(){
        $("#weiboma").css("display","block");
    });
    $("#weibo").mouseout(function(){
        $("#weiboma").css("display","none");
    });
    $("#weixin").mouseover(function(){
        $("#weixinma").css("display","block");
    });
    $("#weixin").mouseout(function(){
        $("#weixinma").css("display","none");
    });

    //控制隐藏串口的显示与隐藏
    $("#all").mouseover(function(){
        $(".navhide1").slideDown(500);
    })
    $("#all").mouseout(function(){
        $(".navhide1").hide();
        $(".navhide2").hide();
    })
    $(".navhide1").mouseover(function(){
        $(".navhide1").show()
        $(".navhide2").show();
    })
    $(".navhide1").mouseout(function(){
        $(".navhide1").hide();
        $(".navhide2").hide();
    })
    $(".navhide2").mouseover(function(){
        $(".navhide1").show();
        $(".navhide2").show();
    })
    $(".navhide2").mouseout(function(){
        $(".navhide1").hide();
        $(".navhide2").hide();
    })


    //nav区域tab切换
    $(".navhide1").on("mouseover","li",function(){
        $(".navhide2_1").eq($(this).index()).show().siblings(".navhide2_1").hide();
    })
    //nav区域获取数据域ajax
    $.ajax({
        type:"get",
        url:"json/list.json",
        success:function(msg){
            for(var i=0;i<msg.length;i++){
                var outer=$("<div class='navhide2_1'><div class='lp'></div><div class='rp'></div></div>");
                $(".navhide2").append(outer);
            }
            for(var i=0;i<msg.length;i++){
                var a=msg[i];
                var str="<h3>"+ a.partList[0].title+"</h3>";
                str+="<ul>"
                for(var j=0;j<a.partList[0].list.length;j++){
                    str+="<li><a href='"+ a.partList[0].list[j].href+"'>"+a.partList[0].list[j].name+"</a><li>"
                }
                str+="</ul>"
                str+="<h3>"+a.partList[1].title+"</h3>";
                str+="<ul>"
                for(var k=0;k<a.partList[1].list.length;k++){
                    str+="<li><a href='"+ a.partList[1].list[k].href+"'>"+a.partList[1].list[k].name+"</a><li>"
                }
                str+="</ul>"
                str+="<h3>"+a.partList[2].title+"</h3>";
                str+="<ul>"
                for(var l=0;l<a.partList[2].list.length;l++){
                    str+="<li><a href='"+ a.partList[2].list[l].href+"'>"+a.partList[2].list[l].name+"</a><li>"
                }
                str+="</ul>"
                var str1="<h3>"+ a.partList[3].title+"</h3>";
                str1+="<a href='"+a.partList[3].href+"'>"+"<img src='"+a.partList[3].url+"'>"+"</a>";
                $(".lp").eq(i).html(str);
                $(".rp").eq(i).html(str1);
            }
        }
    })


    //轮播图
    var banner=$(".banner");
    var ball=$("#ball");
    var btns=$("#btns");
    var $i=0;
    var flag=true;
    var op=btns.children()
    var timer=setTimeout(auto,3000)
    function auto(){
        move("right");
    }
    function move(dir){
        if(dir=="right"){
            $i++;
            if($i==8){
                $i=1;
                ball.css("left","0")
            }
        }
        if(dir=="left"){
            $i--;
            if($i==-1){
                $i=6
                ball.css("left","-8960")
            }
        }
        ball.stop().animate({"left":-$i*1280},function(){
            if(flag){
                clearTimeout(timer);
                timer=setTimeout(auto,3000)
            }
        })
        op.eq($i%7).css("opacity","1").siblings().css("opacity","0.4")
    }
    $(".banner").hover(function(){
        clearTimeout(timer);
        flag=false;
    },function(){
        timer=setTimeout(auto,3000);
        flag=true;
    })
    btns.on("click","li",function(){
        if($(this).index()<4&&$i==7){
            ball.css('left',0);
        }
        $i=$(this).index();
        ball.stop().animate({"left":-$i*1280});
        $(this).css("opacity","1").siblings().css("opacity","0.4")
    })
    //品牌特卖区tab切换
    $(".brand_tab").on("click","li",function(){
        $(this).css({                     //改变当前点击的li的背景图和字体颜色
            "color":"#ffffff",
            "background":"url(img/select.png) no-repeat"
        }).siblings().css({
            "color":"#000000",
            "background":"none"
        });
        $(".brand").eq($(this).index()).show().siblings(".brand").hide();
    })
    //品牌特卖区获取数据ajax
    $.ajax({
        type:"get",
        url:"json/brandsale.json",
        success:function(msg){
            for(var i=0;i<msg.length;i++){
                var a=msg[i];
               // console.log(a)
                var oul=$("<ul>");
                oul.addClass("brand");
                $(".brand_sale .layout").append(oul)
                for(var j=0;j<a.length;j++){
                    var oli=$("<li>");
                    var str="<a href='"+a[j].href+"'>"+"<img src='"+a[j].url+"'>"+"</a>";
                    oli.html(str);
                    oul.append(oli);
                }
            }
            fn1()
        }
    })
    //品牌特移入图片中心放大
    function fn1(){
        $(".brand li a").hover(function(){
            $(this).children("img").stop().animate({
                width:320,
                height:200,
                left:-20,
                top:-10
            })
        },function(){
            $(this).children("img").stop().animate({
                width:280,
                height:180,
                left:0,
                top:0
            })
        })
    }
    //限时抢购倒计时
    var timer1=setInterval(daojishi,1000);
    daojishi();
    function daojishi()
    {
        var nowdate=new Date()               //当前时间
        var nowtime=nowdate.getTime();
        var enddate1=new Date(2016,10,1)      //截止日期为2016年11月1号
        var endtime1=enddate1.getTime();
        var ti1=parseInt((endtime1-nowtime)/1000);
        var days1=parseInt(ti1/86400);
        var hours1=parseInt(ti1%86400/3600);
        var minus1=parseInt(ti1%86400%3600/60);
        var secs1=ti1%60;
        var str1="还剩"+toTwo(days1)+"天"+toTwo(hours1)+"小时"+toTwo(minus1)+"分钟"+toTwo(secs1)+"秒结束";
        $("#daojishi1").html(str1);
        var enddate2=new Date(2016,11,1)      //截止日期为2016年11月1号
        var endtime2=enddate2.getTime();
        var ti2=parseInt((endtime2-nowtime)/1000);
        var days2=parseInt(ti2/86400);
        var hours2=parseInt(ti2%86400/3600);
        var minus2=parseInt(ti2%86400%3600/60);
        var secs2=ti2%60;
        var str2=toTwo(days2)+"天"+toTwo(hours2)+"小时"+toTwo(minus2)+"分钟"+toTwo(secs2)+"秒";
        var str2="还剩"+toTwo(days2)+"天"+toTwo(hours2)+"小时"+toTwo(minus2)+"分钟"+toTwo(secs2)+"秒开始";
        $("#daojishi2").html(str2);
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
    //限时抢购tab切换
    $(".time_tab").on("click","li",function(){
        $(this).css({                     //改变当前点击的li的背景图和字体颜色
            "color":"#ffffff",
            "background":"url(img/select.png) no-repeat"
        }).siblings().css({
            "color":"#000000",
            "background":"none"
        });
        $(".time").eq($(this).index()).show().siblings(".time").hide();
        $("i").eq($(this).index()).show().siblings("i").hide();
    })
    //限时抢购数据获取ajax
    $.ajax({
        type:"get",
        url:"json/timesale.json",
        success:function(msg){
            for(var i=0;i<msg.length;i++){
                var a=msg[i];
                var odiv=$("<div>");
                odiv.addClass("time");
                $(".time_sale .layout").append(odiv);
                for(var j=0;j< a.length;j++){
                    var odl=$("<dl>");
                    var str=$("<dt><a href='"+a[j].href+"'><img src='"+a[j].url+"'></a></dt><dd><p><a href='"+a[j].href+"'>"+a[j].name+"</a></p><h2><span>"+a[j].price+"</span><a href='"+a[j].href+"' style='"+a[j].bg+"'>"+"立即抢购"+"</a></h2></dd>");
                    odl.append(str);
                    odiv.append(odl);
                }
            }
        }
    })
    //白酒区tab切换
    $(".baijiu_tab").on("mouseover","li",function(){
        $(".select1").animate({
            "left":43+$(this).index()*92
        },80);
        $(".baijiu").eq($(this).index()).show().siblings(".baijiu").hide();
        $(this).css("color","#B81C22").siblings().css("color","#000000");
    })
    //白酒区左侧列表鼠标移入溢出事件
    $(".baijiu_list a").hover(function(){
        $(this).css({
            "color":"#ff0000"
        })
    },function(){
        $(this).css({
            "color":"#ffffff"
        })
    })
    //白酒区蒙层事件
    $(".cover1 li").hover(function(){
        $(".cover1 span").eq($(this).index()).show();
    },function(){
        $(".cover1 span").eq($(this).index()).hide();
    })
    //白酒区获取数据json
    $.ajax({
        type:"get",
        url:"json/baijiu.json",
        success:function(msg){
            for(var i=0;i<msg.length;i++){
                var a=msg[i];
                var odiv=$("<div>");
                odiv.addClass("baijiu");
                $(".bj .layout").append(odiv);
                for(var j=0;j<a.length;j++){
                    var odl=$("<dl>");
                    var str="<dt>"+"<a href='"+a[j].href+"'>"+"<img src='"+a[j].url+"'>"+"</a>"+"</dt>"+"<dd>"+"<p>"+"<a href='"+a[j].href+"'>"+a[j].name+"</a>"+"</p>"+"<h2>"+"<span>"+a[j].price+"</span>"+"</h2>"+"</dd>";
                    odl.html(str);
                    odiv.append(odl)
                }
            }
        }
    })
    //红酒区tab切换
    $(".hongjiu_tab").on("mouseover","li",function(){
        $(".select1").animate({
            "left":43+$(this).index()*92
        },80);
        $(".hongjiu").eq($(this).index()).show().siblings(".hongjiu").hide();
        $(this).css("color","#B81C22").siblings().css("color","#000000");
    })
    //红酒区左侧列表鼠标移入溢出事件
    $(".hongjiu_list a").hover(function(){
        $(this).css({
            "color":"#ff0000"
        })
    },function(){
        $(this).css({
            "color":"#ffffff"
        })
    })
    //红酒区蒙层事件
    $(".cover2 li").hover(function(){
        $(".cover2 span").eq($(this).index()).show();
    },function(){
        $(".cover2 span").eq($(this).index()).hide();
    })
    //红酒区获取数据json
    $.ajax({
        type:"get",
        url:"json/hongjiu.json",
        success:function(msg){
            for(var i=0;i<msg.length;i++){
                var a=msg[i];
                var odiv=$("<div>");
                odiv.addClass("hongjiu");
                $(".hj .layout").append(odiv);
                for(var j=0;j<a.length;j++){
                    var odl=$("<dl>");
                    var str="<dt>"+"<a href='"+a[j].href+"'>"+"<img src='"+a[j].url+"'>"+"</a>"+"</dt>"+"<dd>"+"<p>"+"<a href='"+a[j].href+"'>"+a[j].name+"</a>"+"</p>"+"<h2>"+"<span>"+a[j].price+"</span>"+"</h2>"+"</dd>";
                    odl.html(str);
                    odiv.append(odl)
                }
            }
        }
    })
    //洋酒区tab切换
    $(".yangjiu_tab").on("mouseover","li",function(){
        $(".select1").animate({
            "left":43+$(this).index()*92
        },80);
        $(".yangjiu").eq($(this).index()).show().siblings(".yangjiu").hide();
        $(this).css("color","#B81C22").siblings().css("color","#000000");
    })
    //洋酒区左侧列表鼠标移入溢出事件
    $(".yangjiu_list a").hover(function(){
        $(this).css({
            "color":"#ff0000"
        })
    },function(){
        $(this).css({
            "color":"#ffffff"
        })
    })
    //洋酒区蒙层事件
    $(".cover3 li").hover(function(){
        $(".cover3 span").eq($(this).index()).show();
    },function(){
        $(".cover3 span").eq($(this).index()).hide();
    })
    //洋酒区获取数据json
    $.ajax({
        type:"get",
        url:"json/yangjiu.json",
        success:function(msg){
            for(var i=0;i<msg.length;i++){
                var a=msg[i];
                var odiv=$("<div>");
                odiv.addClass("yangjiu");
                $(".yj .layout").append(odiv);
                for(var j=0;j<a.length;j++){
                    var odl=$("<dl>");
                    var str="<dt>"+"<a href='"+a[j].href+"'>"+"<img src='"+a[j].url+"'>"+"</a>"+"</dt>"+"<dd>"+"<p>"+"<a href='"+a[j].href+"'>"+a[j].name+"</a>"+"</p>"+"<h2>"+"<span>"+a[j].price+"</span>"+"</h2>"+"</dd>";
                    odl.html(str);
                    odiv.append(odl)
                }
            }
        }
    })
    //其他区tab切换
    $(".qita_tab").on("mouseover","li",function(){
        $(".select1").animate({
            "left":43+$(this).index()*92
        },80);
        $(".qita").eq($(this).index()).show().siblings(".qita").hide();
        $(this).css("color","#B81C22").siblings().css("color","#000000");
    })
    //其他区左侧列表鼠标移入溢出事件
    $(".qita_list a").hover(function(){
        $(this).css({
            "color":"#ff0000"
        })
    },function(){
        $(this).css({
            "color":"#ffffff"
        })
    })
    //其他区蒙层事件
    $(".cover4 li").hover(function(){
        $(".cover4 span").eq($(this).index()).show();
    },function(){
        $(".cover4 span").eq($(this).index()).hide();
    })
    //其他区获取数据json
    $.ajax({
        type:"get",
        url:"json/qita.json",
        success:function(msg){
            for(var i=0;i<msg.length;i++){
                var a=msg[i];
                var odiv=$("<div>");
                odiv.addClass("qita");
                $(".qt .layout").append(odiv);
                for(var j=0;j<a.length;j++){
                    var odl=$("<dl>");
                    var str="<dt>"+"<a href='"+a[j].href+"'>"+"<img src='"+a[j].url+"'>"+"</a>"+"</dt>"+"<dd>"+"<p>"+"<a href='"+a[j].href+"'>"+a[j].name+"</a>"+"</p>"+"<h2>"+"<span>"+a[j].price+"</span>"+"</h2>"+"</dd>";
                    odl.html(str);
                    odiv.append(odl)
                }
            }
        }
    })







}