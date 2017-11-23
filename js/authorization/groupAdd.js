/**
 * 添加授权组
 * Author:land
 *   Date:2017/11/23
 */
define(["jquery", "artTemplate", "text!tpls/authorGroupAdd.html", "common/api"], function ($, art, authorGroupAddTpl, API) {
    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page") || 1;
        var start = 60 * (page - 1);
        var limit = 60;
        var keyword = $("#btnSearchWords").attr("deviceKeyword");
        // 渲染模板
        API.getDeviceList(start, limit, keyword, function (res) {
            var authorGroupAdd = art.render(authorGroupAddTpl, res);
            var $authorGroupAdd = $(authorGroupAdd);
            // 提交表单
            $authorGroupAdd
                .on("submit", "form", function () {
                    // 获取表单参数 
                    var formData = $(this).serialize();
                    // 接口
                    API.addUser(formData, function (res) {
                        $authorGroupAdd.modal("hide");
                        //成功的添加用户->刷新用户管理页面
                        $("#btnUsersManager").trigger("click");
                    })
                    return false; //阻止同步提交表单
                });
            // 清除上一次的模板
            $("#modalauthorGroupAdd").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $authorGroupAdd.appendTo("body").modal();
            $("#box1>.device-name").on("click", function () {
                $(this).addClass("back-gray");
                var deviceid = $(this).attr("deviceid");
                var i = $(this).attr("num");
                $($("#box2>.device-name").find("deviceid:" + deviceid).prevObject[i]).removeClass("displayN");
            })
            $("#box2>.device-name").on("click", function () {
                $(this).addClass("displayN");
                var deviceid = $(this).attr("deviceid");
                var i = $(this).attr("num");
                $($("#box1>.device-name").find("deviceid:" + deviceid).prevObject[i]).removeClass("back-gray");
            })
        })
    };
});