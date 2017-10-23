/**
 * 添加访客
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/usersAdd.html", "common/api"], function ($, art, usersAddTpl, API) {
    return function () {
        // 清除上一次的模板
        $("#modalUsersAdd").remove();
        // 渲染模板
        var usersAdd=art.render(usersAddTpl);
        var $usersAdd=$(usersAdd);
        // 提交表单
        $usersAdd
            .on("submit", "form", function () {
                // 获取表单参数 
                var formData = $(this).serialize();
                // 接口
                API.addUser(formData, function (res) {
                    $usersAdd.modal("hide");
                    //成功的添加用户->刷新用户管理页面
                    $("#btnUsersManager").trigger("click");
                })
                return false; //阻止同步提交表单
            });
        $usersAdd.appendTo("body").modal();
    };
});