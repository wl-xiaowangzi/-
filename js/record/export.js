/**
 * 导出记录
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery","artTemplate","text!tpls/recordExport.html","common/api"],function ($,art,recordExportTpl,API) {
    return function (uid) {
        //根据id获取人员信息
        console.log(uid)
        API.exportRecordCheck(uid,function(res){
            console.log(res)
            var recordExport=art.render(recordExportTpl,res.data);
            var $recordExport=$(recordExport);
            $("#modalRecordExport").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $recordExport.appendTo("body").modal();
        })
    };
});