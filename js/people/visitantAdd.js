/**
 * 添加访客
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/peopleVisitantAdd.html", "common/api", "common/camera", "datetimepicker", "datetimepickerLang"], function ($, art, peopleVisitantAddTpl, API, camera) {
    return function () {
        $("#modalVisitantAdd").remove();

        // var teacherAdd=art.render(teacherAddTpl);

        // var $teacherAdd=$(teacherAdd);
        var $peopleVisitantAdd = $(peopleVisitantAddTpl);

        $peopleVisitantAdd.on("click", "#start", function () {
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

        $peopleVisitantAdd.appendTo("body").modal();

        //渲染入职日期-->日期控件
        $peopleVisitantAdd.find(".date-join").datetimepicker({
            weekStart: 1, //一周从哪一天开始。0（星期日）到6（星期六）
            format: 'yyyy/mm/dd h:mm',
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            language: "zh-CN"
        });
        $peopleVisitantAdd.find(".birthday-join").datetimepicker({
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