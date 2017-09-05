/**
 * 添加讲师
 * Author:Wilbert
 *   Date:2017/6/15
 */
define(["jquery", "artTemplate", "text!tpls/peopleAdd.html", "common/api","common/camera", "datetimepicker", "datetimepickerLang"], function ($, art, peopleAddTpl, API,camera) {
    return function () {
        $("#modalPeopleAdd").remove();

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
        $peopleAdd.find(".date-join").datetimepicker({
            weekStart: 1, //一周从哪一天开始。0（星期日）到6（星期六）
            format: 'yyyy-mm-dd',
            //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
            autoclose: true,
            minView: "month",
            todayBtn: true,
            todayHighlight: true,
            language: "zh-CN"
        });
    };
});