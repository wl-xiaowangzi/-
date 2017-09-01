/**
 * 查看信息
 * Author:land
 *   Date:2017/8/31
 */
define(["jquery","artTemplate","text!tpls/recordShow.html","common/api"],function ($,art,recordShowTpl,API) {
    return function () {

        //根据讲师id获取讲师信息
        // API.showTeacher(tc_id,function(res){
            $("#modalShowRecord").remove();


            // var teahcerShow=art.render(teahcerShowTpl,res.result);

            // var $teahcerShow=$(teahcerShow);


            var $recordShow=$(recordShowTpl);

            $recordShow.appendTo("body").modal();
        // })



    };
});