/**
 * 编辑讲师
 * Author:Wilbert
 *   Date:2017/6/16
 */
define(["jquery","artTemplate","common/api","text!tpls/teacherEdit.html"],function ($,art,API,teacherEditTpl) {
    return function (tc_id) {

        API.editTeacher(tc_id,function(res){

            $("#modalEditTeacher").remove();

            var teacherEdit=art.render(teacherEditTpl,res.result);

            var $teacherEdit=$(teacherEdit);

            $teacherEdit.on("submit","form",function(){

                var formData=$(this).serialize();

                API.editSaveTeacher(formData,function(){

                    $teacherEdit.modal("hide");

                    //成功的编辑讲师-->刷新讲师管理页面
                    $("#btnTeacherManager").trigger("click");
                })


                return false;
            })

            $teacherEdit.appendTo("body").modal();

            //渲染入职日期-->日期控件
            $teacherEdit.find(".date-join").datetimepicker({
                weekStart:1,//一周从哪一天开始。0（星期日）到6（星期六）
                format: 'yyyy-mm-dd',
                //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                autoclose:true,
                minView:"month",
                todayBtn:true,
                todayHighlight:true,
                language:"zh-CN"
            });
        })
    };
});