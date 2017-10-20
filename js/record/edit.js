/**
 * 识别记录编辑
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/recordEdit.html","./editLoadMore","./replaceIMG"], function ($, art, API, recordEditTpl,editLoadMore,replaceIMG) {
    return function (ps_id,ps_type,ps_time) {
        // 获取参数
        var organizationid = $.cookie("organizationid");
        var time = new Date();
        var starttime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()+ ':' + time.getSeconds();
        var endtime = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + (time.getDate()+1) + ' ' + time.getHours() + ':' + time.getMinutes()+ ':' + time.getSeconds();
        // var endtime = ps_time;
        var page = $("#btnPager").attr("page")||1;
        var start = 0;
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
            var recordEdit = art.render(recordEditTpl, res);
            var $recordEdit = $(recordEdit);
            // 移出上一次的模态框
            $("#modalEditRecord").remove();
            // 设置事件
            $recordEdit
                .on("scroll", ".modal-body", function (e) {
                    
                })
                .on("click",".replaceIMG",function(res){
                    var datanumber = $(this).parent().attr("datanumber");
                    API.showRecord(organizationid,starttime,endtime,start,limit,datanumber,function(res){
                        var ps_id = res.data[0].personid;
                        var ps_type = res.data[0].persontype;
                        var facedata = res.data[0].facedata;
                        var faceimage = res.data[0].faceimage;
                        replaceIMG(ps_id,ps_type,facedata,faceimage);
                    })
                })
                .on("click",".loadMore",function(){
                    page++
                    editLoadMore(ps_id,ps_type,page)
                })
            // 渲染数据
            $recordEdit.appendTo("body").modal();
        })
    };
});