/**
 * 讲师列表
 * Author:Wilbert
 *   Date:2017/6/14
 */
define(["jquery","artTemplate","text!tpls/teacherList.html","common/api"],function ($,art,teacherListTpl,API) {
    return function () {

        API.getTeacherList(function(res){
            var teacherList=art.render(teacherListTpl,res);

            var $teacherList=$(teacherList);

            $teacherList.on("click",".btn-status",function(){

                var tc_id=$(this).parent().attr("tc_id");
                var tc_status=$(this).parent().attr("tc_status");

                var btnStatus=this;


                API.changeTeacherStatus(tc_id,tc_status,function(res){

                    //把新的状态值渲染到页面中
                    var new_tc_status=res.result.tc_status;//1:"启用"  0:"注销"
                    $(btnStatus).parent().attr("tc_status",new_tc_status);

                    //修改按钮的文本
                    $(btnStatus).text(new_tc_status==1?"注销":"启用");

                    //修改账户状态列的文本
                    $(btnStatus).parent().siblings(".col-status").text(new_tc_status==1?"启用":"注销");

                })
            })

            $(".module-container").append($teacherList);
        })


    };
});