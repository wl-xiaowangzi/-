/**
 * 查看信息
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery","artTemplate","text!tpls/recordShow.html","common/api"],function ($,art,recordShowTpl,API) {
    return function (ep_id) {
        //根据id获取人员信息
        API.getEmployeeBaseInfo(ep_id,function(res){
            $("#modalShowRecord").remove();
            console.log(res)
            var recordShow=art.render(recordShowTpl,res.data);

            var $recordShow=$(recordShow);

            $recordShow.appendTo("body").modal();
        })

    };
});