/**
 * 添加员工
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/peopleAdd.html", "common/api", "common/camera", "datetimepicker", "datetimepickerLang"], function ($, art, peopleAddTpl, API, camera) {
    return function (faceimages,facedatas) {
        $("#modalPeopleAdd").remove();

        var $peopleAdd = $(peopleAddTpl);
        var firstFaceimages=faceimages;
        var firstFacedatas=facedatas;
       
        $peopleAdd.on("click", "#start", function () {
            camera();
            $peopleAdd.on("click", ".btn-blue", function () {
                var deviceids=$.cookie("deviceids");
                var secondFaceimages = $("#btnPeopleManager").attr("faceimage");
                var secondFacedatas = $("#btnPeopleManager").attr("facedata");
                var faceimages=firstFaceimages+","+secondFaceimages;
                var facedatas = "["+firstFacedatas+"]|"+"["+secondFacedatas+"]";
                var birthday = $(".birthday-join").val();
                var phonenumber = $(".phonenumber").val();
                var name = $(".name").val();
                var job = $(".job").val();
                var employeenumber = $(".employeenumber").val();
                var sex = $(".sex").val();
                API.addEmployee(deviceids,name, sex, birthday, phonenumber,employeenumber, job, faceimages, facedatas, function (res) {
                    $peopleAdd.modal("hide");
                    //成功的添加员工->刷新员工管理页面
                    $("#btnPeopleManager").trigger("click");
                })
                return false; //阻止同步提交表单
            });
        })
        $peopleAdd.appendTo("body").modal();
        $(".mainPIC").attr("src",faceimages);
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