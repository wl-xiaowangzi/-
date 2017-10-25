/**
 * 个人中心
 * Author:land
 *   Date:2017/9/4
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/changePWD.html", ], function ($, art, API, changePWDTpl) {
    return function () {
        // 转换为jq对象
        var $changePWD = $(changePWDTpl);
        // 点击事件
        $changePWD
            .on("click", ".oldPWD", function () {
                if ($(".oldPassword").attr("type") == "password") {
                    $(".oldPassword").attr("type", "text");
                    $(".oldPWD").removeClass("eye-close").addClass("eye-open")
                } else {
                    $(".oldPassword").attr("type", "password");
                    $(".oldPWD").removeClass("eye-open").addClass("eye-close")
                }
            })
            .on("click", ".newPWD", function () {
                if ($(".newPassword").attr("type") == "password") {
                    $(".newPassword").attr("type", "text");
                    $(".newPWD").removeClass("eye-close").addClass("eye-open")
                } else {
                    $(".newPassword").attr("type", "password");
                    $(".newPWD").removeClass("eye-open").addClass("eye-close")
                }
            })
            .on("click", ".confirmPWD", function () {
                if ($(".confirmPassword").attr("type") == "password") {
                    $(".confirmPassword").attr("type", "text");
                    $(".confirmPWD").removeClass("eye-close").addClass("eye-open")
                } else {
                    $(".confirmPassword").attr("type", "password");
                    $(".confirmPWD").removeClass("eye-open").addClass("eye-close")
                }
            })
           .on("keyup",".confirmPassword",function(){
               if($(".newPassword").val().length==$(".confirmPassword").val().length&&$(".newPassword").val()!=$(".confirmPassword").val()){
                  $(".cfmPWD").addClass("opacity1").html("两次输入密码不一致！");
                  setTimeout(function(){$(".cfmPWD").removeClass('opacity1')},2000);
               }else{
                   $(".cfmPWD").removeClass("opacity1");
               }
           })
        // 提交表单   
        .on("submit","form",function(){
            var formData=$(this).serialize();
            API.changePWD(formData,function(res){
                if(res.message=="原密码错误！"){
                    $(".cfmPWD").addClass('opacity1').html("原密码错误！")
                    setTimeout(function(){$(".cfmPWD").removeClass('opacity1')},2000);
                    return;
                }
                $changePWD.modal("hide");
            })
            return false;
        })
        // 移除上一次调出的模板
        $("#modalChangePWD").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $changePWD.appendTo("body").modal();
    }
})