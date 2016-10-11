/**
 * Created by Administrator on 2016/9/22.
 */
$(function($){
    var iptph=$("#iptph");
    var iptpsw=$("#iptpsw");
    var denglu=$("#denglu");
    var flag=false;
    setCookie("flag",flag,14);
    iptph.focus(function(){                      //手机号表单获得焦点
        $(this).css("border","1px solid #3FB838")
    });
    $("#iptph").blur(function(){                 //手机号表单失去焦点
        $(this).css("border","1px solid #cccccc")
    })
    iptpsw.focus(function(){                     //密码框获得焦点
        $(this).css("border","1px solid #3FB838")
    });
    iptpsw.blur(function(){                      //密码框失去焦点
        $(this).css("border","1px solid #cccccc")
    });

    denglu.click(function(){                      //登录判断
        if(iptph.val()==""){
            $("#epu").show();
            iptph.css("border","1px solid #ff0000");
        }
        else if(iptpsw.val()==""){
            $("#epu").hide();
            $("#nopsw").show();
            iptpsw.css("border","1px solid #ff0000");
        }
        else if(iptph.val()!=getCookie("user")){
            $("#epu").hide();
            $("#nopsw").hide();
            $("#nouser").show();
            iptph.css("border","1px solid #ff0000");
        }
        else if(iptpsw.val()!=getCookie("pasw")){
            $("#epu").hide();
            $("#nopsw").hide();
            $("#nouser").hide();
            $("#pswerror").show();
            iptpsw.css("border","1px solid #ff0000");
        }
        else{
            $("#epu").hide();                    //登陆成功
            $("#nopsw").hide();
            $("#nouser").hide();
            $("#pswerror").hide();
            window.location.assign("index.html");
            setCookie("flag",true,14);
        }
    })

    $(".loginway a").hover(function(){
        $(this).css("opacity",0.4)
    },function(){
        $(this).css("opacity",1)
    })


})