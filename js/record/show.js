/**
 * 查看信息
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery","artTemplate","text!tpls/recordShow.html","common/api"],function ($,art,recordShowTpl,API) {
    return function (ps_id) {
         var organizationid = $.cookie("organizationid");
        //根据id获取人员信息
        API.showRecord(ps_id,organizationid,function(res){
            $("#modalShowRecord").remove();
            console.log(res)
            var recordShow=art.render(recordShowTpl,res.data[0]);

            var $recordShow=$(recordShow);

            $recordShow.appendTo("body").modal();
        })

    };
});