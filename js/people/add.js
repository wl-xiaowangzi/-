/**
 * 添加员工
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/peopleAdd.html", "common/api","common/camera", "datetimepicker", "datetimepickerLang"], function ($, art, peopleAddTpl, API,camera) {
    return function () {
         $("#modalcamera").remove();
        $("#modalPeopleAdd").remove();
        $("#modalVisitantAdd").remove();

        // var teacherAdd=art.render(teacherAddTpl);

        // var $teacherAdd=$(teacherAdd);
        var $peopleAdd = $(peopleAddTpl);

        $peopleAdd.on("click", "#start", function () {
           camera();
        })
        // $teacherAdd.on("submit","form",function(){

        //     var formData=$(this).serialize();

        //     API.addTeacher(formData,function(){

        //         $teacherAdd.modal("hide");

        //         //成功的添加讲师-->刷新讲师管理页面
        //         $("#btnTeacherManager").trigger("click");

        //     })

        //     return false;//阻止同步提交表单
        // });

        $peopleAdd.appendTo("body").modal();

        //渲染入职日期-->日期控件
         $peopleAdd.find(".birthday-join").datetimepicker({
            format: 'yyyy/mm/dd',
            weekStart: 1,
            autoclose: true,
            startView: 4,
            minView: 2,
            forceParse: false,
            language: 'zh-CN'
        });
    };
});