/**
 * 添加访客
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/usersAdd.html", "common/api"], function ($, art, usersAddTpl, API) {
    return function () {

        $("#modalUsersAdd").remove();

        var usersAdd=art.render(usersAddTpl);

        var $usersAdd=$(usersAdd);

        $usersAdd
            .on("submit", "form", function () {
               
                var formData = $(this).serialize();

                API.addUser(formData, function (res) {

                    $usersAdd.modal("hide");

                    //成功的添加讲师-->刷新讲师管理页面
                    $("#btnUsersManager").trigger("click");

                })

                return false; //阻止同步提交表单
            });

        $usersAdd.appendTo("body").modal();
    };
});