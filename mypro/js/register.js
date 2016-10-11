/**
 * Created by Administrator on 2016/9/21.
 */
$(function($){
    //验证码字符数组
    var arr=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var userList=[];
    var r=parseInt(Math.random()*256);
    var g=parseInt(Math.random()*256);
    var b=parseInt(Math.random()*256);
    var pnum=$("#pho")[0];              //填写手机号表单
    var yzm1=$("#yzm1")[0];             //填写图片验证码表单
    var psw=$("#psw")[0];               //密码表单
    var getma=$("#getma")[0];
    var conpsw=$("#conpsw")[0];         //确认密码表单
    var yzmpic=$("#yzmpic")[0];          //随机验证码span
    var zhuce=$("#zhuce")[0];
    var regph=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;                         //手机号验证
    var regpic=/^yzmpic.html()$/i;   //图片验证码验证
    var regpsw=/^.{6,16}$/           //密码验证

    //随机获取验证矿背景颜色
    $("#yzmpic").css({
        "background":"rgb("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+")"
    })
    get();
    //获取验证码函数
    function get(){
        var token1=arr[parseInt(Math.random()*62)];
        var token2=arr[parseInt(Math.random()*62)];
        var token3=arr[parseInt(Math.random()*62)];
        var token4=arr[parseInt(Math.random()*62)];
        var c=token1+token2+token3+token4;
        $("#yzmpic").html(c);
    }

    //点击换一张  重新获取验证码
    $("#changema").click(function(){
        get();
        $("#yzmpic").css({
            "background":"rgb("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+")"
        });
        $("#yzm1").val("")
    })
    //表单获得焦点
    $("input[type=text]").focus(function(){
        $(this).css({"border":"1px solid #A3D18A"})
    })
    //表单失去焦点
    $("input[type=text]").blur(function(){
        $(this).css({"border":"1px solid #cccccc"})
    })
    //当获取手机验证码按钮按下时
    getma.onclick=function(){          //手机号表单为空
        if( pnum.onblur()==false||yzm1.onblur()==false){
            return false;
        }
        else{                            //全都匹配成功
            $("#nonumber").hide();
            $("#wrongnumber").hide();
            $("#noyzm").hide();
            $("#rptnum").hide();
            $(this).prop("disabled",true);
            var sec=2;
            var timer=setInterval(function(){
                sec--;
                $("#getma").val(sec+"秒后重新获取");
                if(sec==0){
                    clearInterval(timer);
                    $("#getma").val("免费获取校验码");
                    $("#getma").prop("disabled",false);
                }
            },1000);
            $(this).val(sec+"秒后重新获取");
            return true;
        }
    }

    pnum.onblur=function(){                 //手机号失去焦点
        var pnum1=pnum.value;
        if(pnum1==""){                      //手机号为空
            $("#nonumber").show();
            pnum.style.border="1px solid #ff0000";
            return false;
        }
        else if(regph.test(pnum1)==false){   //手机号不合法
            $("#nonumber").hide();
            $("#wrongnumber").show();
            pnum.style.border="1px solid #ff0000";
            return false;
        }
        else if(pnum.value==getCookie("user")){
            $("#rptnum").show();
            pnum.style.border="1px solid #ff0000";
            return false;
        }
        else{
            $("#nonumber").hide();
            $("#wrongnumber").hide();
            pnum.style.border="1px solid #3FB838";
            pnum.style.background="url(img/true.png) no-repeat right center"
            return true;
        }
    }

    yzm1.onblur=function(){                   //图片验证码表单失去焦点
        if(yzm1.value==""||!(yzmpic.innerHTML.toLowerCase()==yzm1.value.toLowerCase())){                             //图片验证码表单为空
            $("#noyzm").show();
            yzm1.style.border="1px solid #ff0000";
            return false;
        }
        else{
            $("#noyzm").hide();
            yzm1.style.border="1px solid #3FB838";
            yzm1.style.background="url(img/true.png) no-repeat right center"
            return true;
        }
    }

    psw.onblur=function(){                        //密码失去焦点
        if(psw.value!=""&&regpsw.test(psw.value)==true){
            $("#wrongpsw").hide();
            psw.style.border="1px solid #3FB838";
            psw.style.background="url(img/true.png) no-repeat right center"
            return true;
        }
        else{
            $("#wrongpsw").show();
            psw.style.border="1px solid #ff0000";
            return false;
        }
    }

    conpsw.onblur=function () {                  //确认密码失去焦点
        if (psw.value != conpsw.value||regpsw.test(conpsw.value)==false) {
            $("#diffpsw").show();
            conpsw.style.border="1px solid #ff0000";
            return false;
        }
        else{
            $("#diffpsw").hide();
            conpsw.style.border="1px solid #3FB838";
            conpsw.style.background="url(img/true.png) no-repeat right center"
            return true;
        }
    }

    zhuce.onclick=function(){                 //总判断
        if(pnum.onblur()==true&&yzm1.onblur()==true&&psw.onblur()==true&&conpsw.onblur()==true){                          // 注册成功
            dealdata();                     //存入cookie
            window.location.assign("reg_success.html");
        }
        else{
            return false;
        }
    }
    function dealdata(){                //注册成功  数据处理函数
        var userID=pnum.value;          //获取注册的手机号
        var userPsw=psw.value;          //获取密码
        //for(var i=0;i<userList.length;i++){              //可存多个用户
        //   // setCookie("user")
        //    setCookie(userList[i].id,userList[i].pasw,14);
        //}
        setCookie("user",userID,14);            //只能存一个用户
        setCookie("pasw",userPsw,14);
    }





})