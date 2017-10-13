/**
 * 个人中心
 * Author:land
 *   Date:2017/9/3
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/personalCenter.html"], function ($, art, API, personalCenterTpl) {

    return function () {
        // 获取员工id
        var userid = $.cookie("userid");
        // 查询员工信息
        API.queryUser(userid, function (res) {
            // 移除上一次的模态框
            $("#modalPersonalCenter").remove();
            // 渲染模板
            var personalCenter = art.render(personalCenterTpl, res.data[0]);
            var $personalCenter = $(personalCenter);
            $personalCenter.appendTo("body").modal();
        })
    }
})