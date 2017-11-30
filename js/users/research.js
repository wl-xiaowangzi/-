/**
 * 用户关联人员搜索模块
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/usersReSearch.html"], function ($, art, API, usersReSearchTpl) {
    return function (keyword) {
        // 获取参数
        var start = 0;
        var limit = 40;
        var keyword = keyword;
        // 调用识别记录接口
        API.getPeopleList(start, limit, keyword, function (res) {
        // 渲染模板
        var usersReSearch=art.render(usersReSearchTpl,res);
        var $usersReSearch=$(usersReSearch);
        $("#relevance-content").empty();
        $("#relevance-content").append($usersReSearch);
        })
    };
});