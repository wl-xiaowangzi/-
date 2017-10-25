/**
 * 添加访客
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/peopleVisitantAdd.html", "common/api", "common/camera", "datetimepicker", "datetimepickerLang"], function ($, art, peopleVisitantAddTpl, API, camera) {
    return function (faceimages, facedatas, headfaceimage) {
        // 渲染模板
        var $peopleVisitantAdd = $(peopleVisitantAddTpl);
        // 获取参数
        var firstFaceimages = faceimages;
        var firstFacedatas = facedatas;
        var headfaceimage = headfaceimage;
        // 调用摄像头
        $peopleVisitantAdd.on("click", "#start", function () {
            camera();
        })
        // 提交表单
        $peopleVisitantAdd.on("submit", "form", function () {
            var deviceids = $.cookie("deviceids");
            var secondFaceimages = $("#btnPeopleManager").attr("faceimage");
            var secondFacedatas = $("#btnPeopleManager").attr("facedata");
            var birthday = $("#VA-birthday").val();
            var phonenumber = $("#VA-phonenumber").val();
            var name = $("#visitantName").val();
            var remark = $("#VA-remark").val();
            var starttime = $("#VA-starttime").val();
            var endtime = $("#VA-endtime").val();
            var sex = $("#VA-sex").val();
            $("#btnPeopleManager").removeAttr("faceimage");
            $("#btnPeopleManager").removeAttr("facedata");
            if (secondFaceimages == undefined) {
                var faceimages = firstFaceimages;
                var facedatas = "[" + firstFacedatas + "]";
                var facetypes = 1;
            } else {
                var faceimages = firstFaceimages + "," + secondFaceimages;
                var facedatas = "[" + firstFacedatas + "]|" + "[" + secondFacedatas + "]";
                var facetypes = 1+","+1;
            }
            if (Date.parse(starttime) > Date.parse(endtime)) {
                alert("结束时间不能小于开始时间");
            } else {
                // 添加员工
                API.addVisitor(deviceids, name, sex, birthday, phonenumber, starttime, endtime, remark, faceimages, facedatas, facetypes, function (res) {
                    $peopleVisitantAdd.modal("hide");
                    //成功的添加员工->刷新员工管理页面
                    $("#btnVisitorManager").trigger("click");
                })
            }

            return false; //阻止同步提交表单
        });
        // 移除模态框
        $("#modalVisitantAdd").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $peopleVisitantAdd.appendTo("body").modal();
        // 为下拉框替换左侧小三角
        var flag = true;
        $("select").on("click", function () {
            if (flag) {
                $(this).addClass("triangle_down");
                flag = false;
            } else {
                $(this).removeClass("triangle_down");
                flag = true;
            }
        })
        $(".mainPIC").attr("src", headfaceimage);
        // 判断图片是否加载完成
        $(".mainPIC").load(function () {
            $(".pic1record").html("").addClass("success_record")
            $(".mainHeadPIC").html("已获取正脸照片")
        })
        $(".secPIC").load(function () {
            $(".pic2record").html("").addClass("success_record")
            $(".secHeadPIC").html("已获取正脸照片")
        })
        //渲染入职日期-->日期控件
        var newDate = new Date();
        var t = newDate.toJSON();
        $peopleVisitantAdd.find(".date-join").datetimepicker({
            weekStart: 1, //一周从哪一天开始。0（星期日）到6（星期六）
            format: 'yyyy-mm-dd h:ii:ss', //选ii才能选择分钟
            minView: 0,
            minuteStep: 5,
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            startDate: new Date(t),
            language: "zh-CN"
        });
        $peopleVisitantAdd.find(".birthday-join").datetimepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            autoclose: true,
            startView: 4,
            minView: 2,
            forceParse: false,
            language: 'zh-CN'
        });
    };
});