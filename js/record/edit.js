/**
 * 识别记录编辑
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/recordEdit.html"], function ($, art, API, recordEditTpl) {
    return function (ps_id,ps_type) {
        // 获取参数
        var organizationid = $.cookie("organizationid");
        var time = new Date();
        var starttime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
        var endtime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate()+1) + ' ' + time.getHours() + ':' + time.getMinutes();
        var page = $("#btnPager").attr("page")||1;
        var start = 0;
        var limit = 32*(page);
        var similarity = $("#btnSimilarity").attr("similarity") || 0.75;
        var persontype = ps_type;
        var keyword = $("#btnSearchWords").attr("keyword");
        var personid=ps_id;
        // 清除参数
        $("#btnPager").removeAttr("page");
        // 调用识别记录接口
        API.getRecordList(organizationid, starttime, endtime, start, limit,persontype,similarity,keyword,personid, function (res) {
            //编译模板
            var recordEdit = art.render(recordEditTpl, res);
            var $recordEdit = $(recordEdit);
            // 移出上一次的模态框
            $("#modalEditRecord").remove();
            // 设置事件
            $recordEdit
                .on("scroll", ".modal-body", function (e) {
                    
                })
                .on("click",".replaceIMG",function(res){
                    
                })
                .on("click",".loadMore",function(){
                    page++
                    $("#btnPager").attr("page",page);
                    $("#btnRecordEdit").trigger("click");
                })
            // 渲染数据
            $recordEdit.appendTo("body").modal();
        })
    };
});