/**
 * Created by Administrator on 2016/9/8.
 */
function startMove(obj,json,fn)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function()
    {
        var bstop=true;
        for(var style in json)
        {
            var iCur;
            if(style=="opacity")
            {
                iCur=parseInt(parseFloat(getStyle(obj,style))*100)
            }
            else
            {
                iCur=parseInt(getStyle(obj,style))
            }
            var speed=(json[style]-iCur)/4;
            speed=(speed>0)?Math.ceil(speed):Math.floor(speed);
            if(iCur!=json[style])
            {
                bstop=false;
            }
            if(style=="opacity")
            {
                obj.style.opacity=(iCur+speed)/100;
                obj.style.filter="alpha(opacity:"+(iCur+speed)+")";
            }
            else
            {
                obj.style[style]=iCur+speed+"px";
            }
        }
        if(bstop)
        {
            clearInterval(obj.timer);
            if(fn)
            {
                fn();
            }
        }
    },30)
}

function getStyle(obj,style)
{
    var result;
    if(obj.currentStyle)
    {
        result=obj.currentStyle[style];
    }
    else
    {
        result=window.getComputedStyle(obj,null)[style]
    }
    return result;
}