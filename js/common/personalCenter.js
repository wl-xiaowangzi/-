/**
 * 个人中心
 * Author:land
 *   Date:2017/9/3
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/personalCenter.html","./photoRequire"], function ($, art, API, personalCenterTpl,photoRequire) {

    return function () {
        $("#my-tree").addClass("displayN");
        // 获取员工id
        var userid = $.cookie("userid");
        // 查询员工信息
        API.queryUser(userid, function (res) {
            // 渲染模板
            var personalCenter = art.render(personalCenterTpl, res.data[0]);
            var $personalCenter = $(personalCenter);
            $personalCenter
                .on("click","#photo-require",function(){
                    photoRequire();
                })
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
                .on("keyup", ".confirmPassword", function () {
                    if ($(".newPassword").val().length == $(".confirmPassword").val().length && $(".newPassword").val() != $(".confirmPassword").val()) {
                        $(".cfmPWD").addClass("opacity1").html("两次输入密码不一致！");
                        setTimeout(function () {
                            $(".cfmPWD").removeClass('opacity1')
                        }, 2000);
                    } else {
                        $(".cfmPWD").removeClass("opacity1");
                    }
                })
                // 提交表单   
                .on("submit", "form", function () {
                    var formData = $(this).serialize();
                    API.changePWD(formData, function (res) {
                        if (res.message == "原密码错误！") {
                            $(".cfmPWD").addClass('opacity1').html("原密码错误！")
                            setTimeout(function () {
                                $(".cfmPWD").removeClass('opacity1')
                            }, 2000);
                            return;
                        }
                        // $changePWD.modal("hide");
                        alert("密码修改成功")
                    })
                    return false;
                })
            //把渲染好的元素放到页面中
            $(".module-container").empty();
            $(".module-container").append($personalCenter);
        })
    }
})