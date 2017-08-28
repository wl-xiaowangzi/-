/**
 * 查看讲师
 * Author:Wilbert
 *   Date:2017/6/16
 */
define(["jquery","artTemplate","text!tpls/teacherShow.html","common/api"],function ($,art,teahcerShowTpl,API) {
    return function (tc_id) {

        //根据讲师id获取讲师信息
        API.showTeacher(tc_id,function(res){
            $("#modalShowTeacher").remove();


            var teahcerShow=art.render(teahcerShowTpl,res.result);

            var $teahcerShow=$(teahcerShow);

            $teahcerShow.appendTo("body").modal();
        })



    };
});