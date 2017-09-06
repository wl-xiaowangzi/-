/**
 * 识别记录编辑
 * Author:land
 *   Date:2017/8/31
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
                    console.log(e)
                })
            //     return false;
            // })

            $recordEdit.appendTo("body").modal();

        // })
    };
});