/**
 * 识别记录编辑
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery","artTemplate","common/api","text!tpls/recordEdit.html"],function ($,art,API,recordEditTpl) {
    return function (tc_id) {

        var organizationid = $.cookie("organizationid");
        var time = new Date();
        var starttime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();
        var endtime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();

            API.getRecordList(organizationid, starttime, endtime, function (res) {
            console.log(res)
            //编译模板
            var recordEdit=art.render(recordEditTpl,res);
            var $recordEdit=$(recordEdit);

            $("#modalEditRecord").remove();
            
            $recordEdit
            .on("scroll",".modal-body",function(e){
                    console.log(e)
                })
            
            $recordEdit.appendTo("body").modal();

        })
    };
});