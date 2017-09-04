/**
 * 编辑讲师
 * Author:Wilbert
 *   Date:2017/6/16
 */
define(["jquery","artTemplate","common/api","text!tpls/recordEdit.html"],function ($,art,API,recordEditTpl) {
    return function (tc_id) {

        // API.editTeacher(tc_id,function(res){

            $("#modalEditRecord").remove();

            // var recordEdit=art.render(recordEditTpl,res.result);

            // var $recordEdit=$(teacherEdit);
            var $recordEdit=$(recordEditTpl);
            // $recordEdit.on("submit","form",function(){

            //     var formData=$(this).serialize();

            //     API.editSaveTeacher(formData,function(){

            //         $recordEdit.modal("hide");

            //         //成功的编辑讲师-->刷新讲师管理页面
            //         $("#btnTeacherManager").trigger("click");
            //     })
            $recordEdit
            .on("scroll",".modal-body",function(e){
                    console.log(1);
                })
            //     return false;
            // })

            $recordEdit.appendTo("body").modal();

            //渲染入库日期-->日期控件
            $recordEdit.find(".date-join").datetimepicker({
                weekStart:1,//一周从哪一天开始。0（星期日）到6（星期六）
                format: 'yyyy-mm-dd h:mm',
                //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                autoclose:true,
                // minView:"month",
                todayBtn:true,
                todayHighlight:true,
                language:"zh-CN"
            });
        // })
    };
});