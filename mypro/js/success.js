/**
 * Created by Administrator on 2016/9/22.
 */
$(function($){
    var welcome=getCookie("user");         //显示刚注册的用户手机号
    $("#wel").html(welcome);

    $("#go").click(function(){
        setCookie("flag",true,14);
    })











})