/**
 * Created by Administrator on 2016/9/22.
 */
$(function($){
    var welcome=getCookie("user");         //��ʾ��ע����û��ֻ���
    $("#wel").html(welcome);

    $("#go").click(function(){
        setCookie("flag",true,14);
    })











})