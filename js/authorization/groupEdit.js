/**
 * 编辑授权组
 * Author:land
 *   Date:2017/11/23
 */
define(["jquery", "artTemplate", "text!tpls/authorGroupEdit.html", "common/api"], function ($, art, authorGroupEditTpl, API) {
    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page") || 1;
        var start = 60 * (page - 1);
        var limit = 60;
        var keyword = $("#btnSearchWords").attr("deviceKeyword");
        // 渲染模板
        API.queryDeviceList(start, limit, keyword, function (res) {
            var authorGroupEdit = art.render(authorGroupEditTpl, res);
            var $authorGroupEdit = $(authorGroupEdit);
            // 提交表单
            $authorGroupEdit
                .on("submit", "form", function () {
                    // 获取表单参数 
                    var formData = $(this).serialize();
                    // 接口
                    API.addUser(formData, function (res) {
                        $authorGroupEdit.modal("hide");
                        //成功的添加用户->刷新用户管理页面
                        $("#btnUsersManager").trigger("click");
                    })
                    return false; //阻止同步提交表单
                });
            // 清除上一次的模板
            $("#modalauthorGroupEdit").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $authorGroupEdit.appendTo("body").modal();
            $("#box3>.device-name").on("click", function () {
                $(this).addClass("back-gray");
                var deviceid = $(this).attr("deviceid");
                var i = $(this).attr("num");
                $($("#box4>.device-name").find("deviceid:" + deviceid).prevObject[i]).removeClass("displayN");
            })
            $("#box4>.device-name").on("click", function () {
                $(this).addClass("displayN");
                var deviceid = $(this).attr("deviceid");
                var i = $(this).attr("num");
                $($("#box3>.device-name").find("deviceid:" + deviceid).prevObject[i]).removeClass("back-gray");
            })
        })
    };
});