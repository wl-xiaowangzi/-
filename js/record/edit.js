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
        API.queryRecordList(starttime, endtime, start, limit,persontype,similarity,keyword,personid, function (res) {
            //编译模板
            var recordEdit = art.render(recordEditTpl, res);
            var $recordEdit = $(recordEdit);
            // page最大值maxPage
            var maxPage = Math.ceil(res.sumsize / 60);
            // 设置事件
            $recordEdit
                .on("scroll", ".modal-body", function (e) {
                    
                })
                .on("click",".replaceIMG",function(res){
                    var datanumber = $(this).parent().attr("datanumber");
                    API.showRecord(starttime,endtime,start,limit,datanumber,function(res){
                        console.log(res)
                        var ps_id = res.data.list[0].personid;
                        var ps_type = res.data.list[0].persontype;
                        var facedata = res.data.list[0].facedata;
                        var faceimage = res.data.list[0].faceimage;
                        replaceIMG(ps_id,ps_type,facedata,faceimage);
                    })
                })
                .on("click",".loadMore",function(){
                    page++
                    console.log(page)
                    if(page==maxPage){
                        $("#recordEditLoading").html("已加载全部数据")
                    }else{
                        editLoadMore(ps_id,ps_type,page)
                    }
                })
            // 移出上一次的模态框
            $("#modalEditRecord").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            // 渲染数据
            $recordEdit.appendTo("body").modal();
             if(maxPage=="1"){
                $("#recordEditLoading").html("已加载全部数据")
            }
            console.log(maxPage)
        })
    };
});