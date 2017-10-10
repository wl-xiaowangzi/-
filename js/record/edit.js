/**
 * 识别记录编辑
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/recordEdit.html"], function ($, art, API, recordEditTpl) {
    return function (ps_id,ps_type) {

        var organizationid = $.cookie("organizationid");
        var time = new Date();
        var starttime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
        var endtime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate()+1) + ' ' + time.getHours() + ':' + time.getMinutes();
        var page = $("#btnPager").attr("page")||1;
        $("#btnPager").removeAttr("page");
        var start = 0;
        var limit = 32*(page);
        var similarity = $("#btnSimilarity").attr("similarity") || 0.75;
        var persontype = ps_type;
        var keyword = $("#btnSearchWords").attr("keyword");
        var personid=ps_id;
        
        API.getRecordList(organizationid, starttime, endtime, start, limit,persontype,similarity,keyword,personid, function (res) {
            console.log(res)
            //编译模板
            var recordEdit = art.render(recordEditTpl, res);
            var $recordEdit = $(recordEdit);

            $("#modalEditRecord").remove();

            $recordEdit
                .on("scroll", ".modal-body", function (e) {
                    console.log(e)
                })
                .on("click",".replaceIMG",function(res){
                    console.log(9)
                })
                .on("click",".loadMore",function(){
                    page++
                    console.log(page)
                    $("#btnPager").attr("page",page);
                    $("#btnRecordEdit").trigger("click");
                })

            $recordEdit.appendTo("body").modal();

        })
    };
});