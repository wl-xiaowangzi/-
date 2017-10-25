/**
 * 识别记录编辑
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/recordEditLoadMore.html"], function ($, art, API, recordEditLoadMoreTpl) {
    return function (ps_id,ps_type,page) {
        // 获取参数
        var organizationid = $.cookie("organizationid");
        var time = new Date();
        var starttime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
        var endtime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate()+1) + ' ' + time.getHours() + ':' + time.getMinutes();
        var page = page;
        var start = 60*(page-1);
        var limit = 60;
        var similarity = $("#btnSimilarity").attr("similarity") || 0.75;
        var persontype = ps_type;
        var keyword = $("#btnSearchWords").attr("keyword");
        var personid=ps_id;
        // 清除参数
        $("#btnPager").removeAttr("page");
        // 调用识别记录接口
        API.getRecordList(organizationid, starttime, endtime, start, limit,persontype,similarity,keyword,personid, function (res) {
            //编译模板
            var recordEditLoadMore = art.render(recordEditLoadMoreTpl, res);
            var $recordEditLoadMore = $(recordEditLoadMore);
            // 渲染数据
            $('.info-box').append($recordEditLoadMore)
        })
    };
});