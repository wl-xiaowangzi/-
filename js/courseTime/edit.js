/**
 * 编辑课时的模块
 * Author:Wilbert
 *   Date:2017/6/13
 */
define(["jquery","artTemplate","common/api","text!tpls/courseTimeEdit.html"],function($,art,API,courseTimeEditTpl){
    
    return function(ct_id){

        //获取课时对应的信息
        API.editCourseTime(ct_id,function(res){


            //删除原来的模态框
            $("#modalEditCourseTime").remove();

            //编译模板文件，获取含有真正数据的字符串
            var courseTimeEdit=art.render(courseTimeEditTpl,res);

            //将字符串转换为jq对象
            var $courseTimeEdit=$(courseTimeEdit);

            $courseTimeEdit.on("submit","form",function(){

                var formData=$(this).serialize();

                API.modifyCourseTime(formData,function(){

                    //关闭模态框
                    $courseTimeEdit.modal("hide");

                    //刷新课时管理模块
                    $("#btnCourseTimeManager").trigger("click");

                })

                return false;//阻止表单同步提交
            })

            //把jq对象中包含的dom元素放到页面中，并以模态框的形式展现出来
            $courseTimeEdit.appendTo("body").modal();


        })
    }
})