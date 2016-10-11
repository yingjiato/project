/**
 * Created by Administrator on 2016/9/27.
 */
$(function($){
    //返回顶部按钮效果
    $(window).scroll(function(){
        var h=document.documentElement.scrollTop+document.body.scrollTop;
        if(h>=500){
            $(".backtop").show();
        }
        else{
            $(".backtop").hide();
        }
    })
    $(".backtop").hover(function(){
        $(this).css("background-color","#F05C80");
    },function(){
        $(this).css("background-color","#7f7f7f");
    })
    $(".backtop").click(function(){
        var sT=$(document).scrollTop();
        var timer3=setInterval(function(){
            sT=sT<0?0:sT-10;
            if(sT==0){
                clearInterval(timer3);
            }
            $(document).scrollTop(sT);
        },1)
    })
    //多选按钮效果
    $(".duoxuan").hover(function(){
        $(this).css({
            "background":"#b81c22",
            "color":"#ffffff"
        })
    },function(){
        $(this).css({
            "background":"#f2f0ef",
            "color":"#000000"
        })
    })
    $(".duoxuan").click(function(){
        $(this).parent().hide();
        $(".pphide").show();
    })

    //所有品牌效果
    $(".allbrandtab").on("mouseover","li",function(){
        $(this).css({
            "background":"#d10700",
            "color":"#fff"
        }).siblings().css({
            "background":"#ffffff",
            "color":"#000000"
        })
    })
    //所有品牌ajax获取数据
    $.ajax({
        type:"get",
        url:"json/allbrand.json",
        success:function(msg){
            for(var i=0;i<msg.length;i++){
                $(".allbrandcontent").append("<a href='javascript:;'>"+msg[i]+"</a>")
            }
            fn3();
        }
    })

    function fn3(){
        var arr1=[];
        //点击多选品牌
        $(".allbrandcontent a").click(function(){
            arr1.push($(this).html());
            arr1=quchong(arr1);
            $(".brandselected").empty();
            $(".brandselected").append("<span>已选品牌：</span>");
            for(var i=0;i<arr1.length;i++){
                $(".brandselected").append("<a href='javascript:;'>"+arr1[i]+"</a>")
                if(arr1.length==0){
                    $(".brandselected").hide();
                }
                else{
                    $(".brandselected").show();
                }
                //取消多选
                $(".brandselected a").click(function(){
                    arr1=del(arr1,$(this).html());
                  //  console.log(arr1)
                    if(arr1.length==0){
                        $(".brandselected").hide();
                    }
                    else{
                        $(".brandselected").show();
                    }
                    $(this).remove();
                })
            }
        })
        //确定 取消按钮效果
        $("#no,#yes").click(function(){
            $(".pphide").hide();
            $(".pp").show();
        })

    }


    //数组去重
    function quchong(arr){
        for(var i=0;i<arr.length;i++){
            for(var j=i+1;j<arr.length;j++){
                if(arr[i]==arr[j]){
                    arr.splice(j,1);
                    j--;
                }
            }
        }
        return arr;
    }
    //删除数组中的某个元素
    function del(arr,item){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==item){
                arr.splice(i,1)
            }
        }
        return arr;
    }

    //选择排序方式
    $(".sortway").on("click","a",function(){
        $(this).css({
            "color":"#ffffff",
            "background":"#b81c22",
            "border":"transparent"
        }).siblings("a").css({
            "color":"#333333",
            "background":"#ffffff",
            "border":"1px solid #cccccc"
        })
    })

    //分页加载ajax
    $.ajax({
        type:"get",
        url:"json/fenye.json",
        success:function(msg){
            var $num=40;
            var $pages=Math.ceil(msg.length/$num);
            var $index=2;
            $("#ttsearch").html(msg.length);          //共搜索到商品的个数
            $("#totalpage").html($pages);             //共多少页
            for(var i=0;i<$pages;i++){                //动态创建页码
                $("#lastpage").before("<span class='pages'>"+(i+1)+"</span>");
            }
            function createlist(){                   //动态加载某一页
                $(".pages").eq($index-2).css({
                    "border":"none",
                    "color":"#b81c22"
                }).siblings(".pages").css({
                    "border":"1px solid #cccccc",
                    "color":"#000000"
                })
                $("#nowpage").html($index-1);          //当前在第几页
                $(".list_box").empty();              //每次点击清空一遍容器
                $(document).scrollTop(0);
                for(var j=$num*($index-2);j<$num*($index-1);j++){
                    var a=msg[j];
                    if(a){
                        var odl=$("<dl>")
                        var odt=$("<dt>")
                        var odd=$("<dd>")
                        odl.append(odt,odd);
                        var oA1=$("<a>");
                        oA1.attr("href",a.href);
                        var oimg=$("<img>");
                        oimg.attr("src",a.url);
                        oA1.append(oimg);
                        odt.append(oA1);
                        var oA2=$("<a>");
                        oA2.attr("href",a.href);
                        var op=$("<p>");
                        op.html(a.name);
                        op.append(oA2);
                        var oh2=$("<h2>");
                        oh2.html(a.price);
                        var ospan=$("<span>");
                        ospan.html(a.pingjia);
                        var oA3=$("<a>");
                        oA3.html("加入购物车");
                        oA3.attr("href", a.href);
                        odd.append(op,oh2,ospan,oA3);
                        $(".list_box").append(odl);
                    }
                }
                fn2();
            }
            function qutouwei(){             //判断是否需要去掉上一页和写一页
                if($index==2){
                    $("#firstpage").hide();
                    $("#toFirst").hide();
                }else{
                    $("#firstpage").show();
                    $("#toFirst").show();
                }
                if($index==$pages+1){
                    $("#lastpage").hide();
                }else{
                    $("#lastpage").show();
                }
            }
            createlist();
            qutouwei()
            $(".btns_box").on("click","span[class=pages]",function(){
                $index = $(this).index();
                createlist();
                qutouwei()
            })
            $("#firstpage").click(function(){           //点击上一页
                $index--;
                createlist();
                qutouwei()
            })
            $("#lastpage").click(function(){            //点击下一页
                $index++;
                createlist();
                qutouwei();
            })
            $("#toFirst").click(function(){             //点击返回首页
                $index=2;
                createlist();
                qutouwei();
            })
        }
    })

    //分页列表边框
    function fn2(){                     //鼠标移入溢出样式
        $(".list_box dl").hover(function(){
            $(this).css("border","3px solid #cccccc");
        },function(){
            $(this).css("border-color","transparent");
        })
    }



})
