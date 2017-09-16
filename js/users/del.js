/**
 * 删除提示
 * Created by land on 2017/9/3.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/usersDel.html", "bootstrap"], function ($, art, API, usersDelTpl) {

    return function (user_id) {
        $("#modalDelUsers").remove();
      
        var $usersDel = $(usersDelTpl);
        var user_id = user_id;

        $usersDel.on("submit", "form", function () {
            console.log(user_id)
            API.delUser(user_id, function (res) {
                console.log(res)
                $usersDel.modal("hide");
                $("#btnUsersManager").trigger("click");
            })

            return false;
        })
        $usersDel.appendTo("body").modal();

    }
})