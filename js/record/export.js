/**
 * 导出记录
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery", "artTemplate", "text!tpls/recordExport.html", "common/api"], function ($, art, recordExportTpl, API) {
    return function (uid,starttime,endtime) {
        //根据id获取人员信息
        console.log(uid,starttime,endtime)
        var $recordExport = $(recordExportTpl);
        $recordExport.on("click","#recordDownload",function(){
            $("#modalRecordExport").hide();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
        })
        $("#modalRecordExport").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $recordExport.appendTo("body").modal();
        var zipName = starttime + "-" + endtime;
        var timer = null;
        var timer = setInterval(function () {
            API.exportRecordCheck(uid, function (res) {
                console.log(res.data.status)
                if(res.data.status == 3){
                    $("#downloadInfo").html("导出失败，请稍后重试")
                    clearInterval(timer)
                }
                if(res.data.status == 5){
                    $("#downloadInfo").html("暂无数据")
                    clearInterval(timer)
                }
                if(res.data.status == 4){
                    $("#downloadInfo").html("导出成功")
                    $("#recordDownload").removeClass("displayN")
                    $("#downloadZip").attr("href",res.data.filepath)
                    $("#downloadZip").attr("download",zipName+"识别记录.zip")
                    clearInterval(timer)
                }
            })
        }, 100);
    };
});