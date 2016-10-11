/**
 * Created by Administrator on 2016/9/29.
 */
$(function($){
    //判断是否登录
    if(getCookie("flag")=="true"){
        $("#bian1").html("["+getCookie("user")+"]");
        $("#bian2").html("[退出]");
        $("#bian1").click(function(){
            window.location.reload();
        })
        $("#bian2").click(function(){
            window.location.assign("log_in.html")
        })
    }
    else{
        $("#bian1").html("登录");
        $("#bian2").html("免费注册");
        $("#bian1").click(function(){
            window.location.assign("log_in.html")
        });
        $("#bian2").click(function(){
            window.location.assign("register.html")
        })
    }

    //将cookie导入购物车
    function daoru(){
        $(".box").empty();
        var total=0;
        var i=0;
        var cartStr=getCookie("cart");
        if(cartStr&&cartStr!="{}"){
            $(".empty_cart").hide();
            $(".cart_main").show();
            var cart=JSON.parse(cartStr);
            for(var id in cart){                   //便利cookie对象创建div
                i++;
                var goods=cart[id];
                var ocartbox=$("<div>");
                var o1=$("<div class='content_1'></div>")
                var o2=$("<div class='content_2'></div>")
                var o3=$("<div class='content_3'></div>")
                var o4=$("<div class='content_4'></div>")
                var o5=$("<div class='content_5'></div>")
                var oimg=$("<img src='"+goods.src+"'>");
                var op=$("<p>");
                op.html(goods.name);
                var oA1=$("<a href='"+goods.lianjie+"'></a>");
                oA1.append(oimg);
                var oA2=$("<a href='"+goods.lianjie+"'></a>");
                oA2.append(op);
                o1.append(oA1,oA2);
                o2.html("￥"+goods.price);
                var jian=$("<a href='javascript:;' class='jian1'>-</a>")
                var $iptxt=$("<input type='text'>");
                $iptxt.val(goods.num);
                var jia=$("<a href='javascript:;' class='jia1'>+</a>")
                o3.append(jian,$iptxt,jia);
                o4.html("￥"+(goods.num*goods.price));
                o5.html("<a href='javascript:;'>加入收藏夹</a><br/><a href='javascript:;' class='shanchu'>删除</a>");
                ocartbox.addClass("main_content");
                ocartbox.attr("id",id);
                ocartbox.append(o1,o2,o3,o4,o5);
                $(".box").append(ocartbox);
                total+=goods.num*goods.price;
            }
            $(".main_content").children(".content_5").children(".shanchu").click(function()   {                             //点击删除按钮删除商品
                var goodID=$(this).parent().parent().attr("id");
                var cartStr=getCookie("cart");
                var cart=JSON.parse(cartStr);
                delete cart[goodID];
                var res=cart;
                var resStr=JSON.stringify(res);
                setCookie("cart",resStr,20);
                $(".box")[0].removeChild(this.parentNode.parentNode);
                daoru();
            })
            $(".main_content").children(".content_3").children(".jia1").click(function(){                                         //点击+按钮
                var goodID=$(this).parent().parent().attr("id");
                var cartStr=getCookie("cart");
                var cart=JSON.parse(cartStr);
                cart[goodID].num+=1;
                var res=cart;
                var resStr=JSON.stringify(res);
                setCookie("cart",resStr,20);
                daoru();
            })
            $(".main_content").children(".content_3").children(".jian1").click(function(){                                         //点击-按钮
                var goodID=$(this).parent().parent().attr("id");
                var cartStr=getCookie("cart");
                var cart=JSON.parse(cartStr);
                cart[goodID].num-=1;
                if(cart[goodID].num==0){
                    delete cart[goodID];
                }
                var res=cart;
                var resStr=JSON.stringify(res);
                setCookie("cart",resStr,20);
                daoru();
            })
            var obj=$(".main_content").children(".content_3").children("input[type=text]");                                //手动更改商品数目  有bug!!
            for(var i=0;i<obj.length;i++){
                obj[i].oninput=function(){
                    console.log($(this))
                    var num=$(this).val();
                    num=isNaN(num)||Number(num)<=0?1:parseInt(num);
                    $(this).val(num);
                    var goodID=$(this).parent().parent().attr("id");
                    var cartStr=getCookie("cart");
                    var cart=JSON.parse(cartStr);
                    cart[goodID].num=Number($(this).val());
                    var res=cart;
                    var resStr=JSON.stringify(res);
                    setCookie("cart",resStr,20);
                    daoru();
                }
            }
            $(".total").html("￥"+total);
            $(".howmany").html(i);
        }
        else{
            $(".empty_cart").show();
            $(".cart_main").hide();
        }
    }
    daoru();
    //向购物车存入cookie
    var btns=$(".guessyoulike dl dd>a");
    btns.click(function(){
        var goodID=$(this).parent().parent().attr("id");    //商品ID
        //console.log(goodID);
        var goodName=$(this).siblings("p").children("a").html();
        //console.log(goodName);                              //商品名称
        var goodPrice=$(this).siblings("h3").html();
        goodPrice=parseFloat(goodPrice.slice(1))
        //console.log(goodPrice);                       //商品价格
        var pic=$(this).parent().siblings("dt").children("a").children("img").attr("src");                                                      //商品图片
        // console.log(pic);
        var ohref=$(this).siblings("p").children("a").attr("href");
        //console.log(ohref);                                     //商品链接
        var cartStr=getCookie("cart")?getCookie("cart"):"{}";
        var cart=JSON.parse(cartStr);
        if(goodID in cart){
            cart[goodID].num+=1;
        }
        else{
            cart[goodID]={
                name:goodName,
                price:goodPrice,
                src:pic,
                lianjie:ohref,
                num:1
            }
        }
        cartStr=JSON.stringify(cart);
        setCookie("cart",cartStr,20);
        //获取购物车里的cookie
        daoru();
    })


})