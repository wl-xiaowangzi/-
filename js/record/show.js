/**
 * 查看信息
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery","artTemplate","text!tpls/recordShow.html","common/api"],function ($,art,recordShowTpl,API) {
    return function (datanumber) {
         var organizationid = $.cookie("organizationid");
         var time = new Date();
        var starttime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();
        var endtime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate()+1);
        var datanumber = datanumber;
        //根据id获取人员信息
        API.showRecord(organizationid,starttime,endtime,0,1,datanumber,function(res){
            $("#modalShowRecord").remove();
            console.log(res)
            var recordShow=art.render(recordShowTpl,res.data[0]);

            var $recordShow=$(recordShow);

            $recordShow.appendTo("body").modal();
        })

    };
});