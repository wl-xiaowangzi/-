/**
 * 查看信息
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery","artTemplate","text!tpls/recordShow.html","common/api"],function ($,art,recordShowTpl,API) {
    return function (vs_id) {
        //根据id获取人员信息
        API.getVisitorBaseInfo(vs_id,function(res){
            var recordShow=art.render(recordShowTpl,res.data);
            var $recordShow=$(recordShow);
            $("#modalShowRecord").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $recordShow.appendTo("body").modal();
        })
    };
});