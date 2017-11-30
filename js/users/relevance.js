/**
 * 账号关联人员
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/usersRelevance.html", "common/api","./research"], function ($, art, usersRelevanceTpl, API,research) {
    return function () {
        var page = $("#btnPager").attr("page") || 1;
        var parameterkey = "key_job";
        var start = 40 * (page - 1);
        var limit = 40;
        var keyword = $("#btnSearchWords").attr("peopleKeyword");
        // 移除参数
        $("#btnPager").removeAttr("page");
        $("body").removeClass("noResult");
        // 清空其他模块保留的搜索信息
        $("#btnSearchWords").removeAttr("visitantkeyword");
        $("#btnSearchWords").removeAttr("approvalkeyword");
        $("#btnSearchWords").removeAttr("recordkeyword");
        $("#btnSearchWords").removeAttr("deviceKeyword");
        $("#btnSearchWords").removeAttr("usersKeyword");
        $("#btnKeepSearchWords").removeAttr("visitantSearchWords");
        $("#btnKeepSearchWords").removeAttr("approvalsearchwords");
        $("#btnKeepSearchWords").removeAttr("recordsearchwords");
        $("#btnKeepSearchWords").removeAttr("deviceSearchwords");
        $("#btnKeepSearchWords").removeAttr("usersSearchWords");

         API.getPeopleList(start, limit, keyword, function (res) {
        // 渲染模板
        var usersRelevance=art.render(usersRelevanceTpl,res);
        var $usersRelevance=$(usersRelevance);
        // 提交表单
        $usersRelevance
            .on("click", "#relevance_search_btn", function () {
                    var keyword = $("#relevance_search_word").val();
                    $("#search").val(keyword);
                    $("#btnSearchWords").attr("peopleKeyword", keyword);
                    // 设置搜索关键字保留
                    $("#btnKeepSearchWords").attr("peopleSearchWords", keyword);
                    research(keyword);
                })
                
        // 清除上一次的模板
        $("#modalusersRelevance").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $usersRelevance.appendTo("body").modal();
        // 设置搜索关键字保留
            var searchWords = $("#btnKeepSearchWords").attr("peopleSearchWords");
            $("#relevance_search_word").val(searchWords);
            $("#search").val(searchWords);
             // 设置分页
            var num = Math.ceil(res.sumsize / 40);
            Page({
                num: num, //页码数
                startnum: page || 1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page", n);
                    $("#btnPeopleManager").trigger("click"); //刷新
                }
            });
             });
    };
});