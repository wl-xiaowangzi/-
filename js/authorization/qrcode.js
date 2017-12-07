/**
 * 生成二维码
 * Created by land on 2017/11/23.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/authorizationQrcode.html", "qrcode"], function ($, art, API, qrcodeTpl) {

    return function (content, size, logoword) {
        //编译模板
        var type=content.substr(5,1);
        console.log(type)
        API.createDimensioncode(content, size, logoword, function (res) {
            console.log(res);
            var demension = res.data.demension+"&v="+Math.random();
            var qrcode = art.render(qrcodeTpl, res.data);
            var $qrcode = $(qrcode);
            $qrcode


            //把渲染好的元素放到页面中
            // 清除上一次的模板
            $("#modalQrcode").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $qrcode.appendTo("body").modal();
            $("#demension").attr("src",demension)
            if(type=="e"){
                $("#auName").html("员工授权组")
            }
        })

    };
})