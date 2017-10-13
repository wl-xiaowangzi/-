/**
 * 删除提示
 * Created by land on 2017/9/3.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/usersDel.html", "bootstrap"], function ($, art, API, usersDelTpl) {
    return function (user_id) {
        // 移出上次模板
        $("#modalDelUsers").remove();
        // 渲染数据
        var $usersDel = $(usersDelTpl);
        var user_id = user_id;
        // 提交表单
        $usersDel.on("submit", "form", function () {
            API.delUser(user_id, function (res) {
                if(res.code!=0){
                    $usersDel.modal("hide");
                    alert(res.message);
                }
                $usersDel.modal("hide");
                $("#btnUsersManager").trigger("click");
            })
            return false;
        })
        $usersDel.appendTo("body").modal();
    }
})