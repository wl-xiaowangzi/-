/**
 * 添加访客
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/usersAdd.html", "common/api", "./relevance", "./authority"], function ($, art, usersAddTpl, API, relevance, authority) {
    return function () {
        // 渲染模板
        var usersAdd = art.render(usersAddTpl);
        var $usersAdd = $(usersAdd);
        // 提交表单
        $usersAdd
            .on("click", "#relevance-employee", function () {
                relevance()
            })
            .on("submit", "form", function () {
                // 获取表单参数 
                var username = $("#admin-add").val();
                var password = $("#password-add").val();
                var name = $("#userName-add").val();
                var phonenumber = $("#phonenumber").val();
                var faceimage = $("#user-pic").attr("faceimage");
                var facedata = $("#user-pic").attr("facedata");
                var roleid = 0;
                if ($.cookie("username") == "admin") {
                    // 隐藏当前模块
                    $usersAdd.modal("hide");
                    // 调用权限配置模块
                    authority(name,username,password,phonenumber,faceimage,facedata);
                } else {
                    API.addUser(name,username,password,phonenumber,faceimage,facedata,roleid, function (res) {
                        $usersAdd.modal("hide");
                        //成功的添加用户->刷新用户管理页面
                        $("#btnUsersManager").trigger("click");
                    })
                }
                return false; //阻止同步提交表单
            });
        // 清除上一次的模板
        $("#modalUsersAdd").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $usersAdd.appendTo("body").modal();
    };
});