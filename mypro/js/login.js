/**
 * Created by Administrator on 2016/9/22.
 */
$(function($){
    var iptph=$("#iptph");
    var iptpsw=$("#iptpsw");
    var denglu=$("#denglu");
    var flag=false;
    setCookie("flag",flag,14);
    iptph.focus(function(){                      //�ֻ��ű���ý���
        $(this).css("border","1px solid #3FB838")
    });
    $("#iptph").blur(function(){                 //�ֻ��ű�ʧȥ����
        $(this).css("border","1px solid #cccccc")
    })
    iptpsw.focus(function(){                     //������ý���
        $(this).css("border","1px solid #3FB838")
    });
    iptpsw.blur(function(){                      //�����ʧȥ����
        $(this).css("border","1px solid #cccccc")
    });

    denglu.click(function(){                      //��¼�ж�
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
            $("#epu").hide();                    //��½�ɹ�
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