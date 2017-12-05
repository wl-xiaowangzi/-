/**
 * 授权组删除提示
 * Created by land on 2017/12/5.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/authorGroupDel.html", "bootstrap"], function ($, art, API, authorGroupDelTpl) {
    return function (datanumbers) {
        // 渲染数据
        var $authorGroupDel = $(authorGroupDelTpl);
        var datanumbers = datanumbers;
        // 提交表单
        $authorGroupDel.on("submit", "form", function () {
            API.delAuthorizationgroup(datanumbers, function (res) {
                $authorGroupDel.modal("hide");
                $("#btnAuthorization").trigger("click");
            })
            return false;
        })
        // 移出上次模板
        $("#modalAuthorGroup").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $authorGroupDel.appendTo("body").modal();
    }
})