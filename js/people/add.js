/**
 * 添加员工
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/peopleAdd.html", "common/api", "common/camera", "datetimepicker", "datetimepickerLang", "typeahead"], function ($, art, peopleAddTpl, API, camera) {
    return function (faceimages, facedatas, headfaceimage) {
        // 职位查询所需参数
        var parameterkey = "key_job";
        var start = 0;
        var limit = 30;
        var firstFaceimages = faceimages;
        var firstFacedatas = facedatas;
        var headfaceimage = headfaceimage;
        // 调用参数查询接口
        API.getParameterList(start, limit, parameterkey, function (res) {
            // 渲染模板
            var peopleAdd = art.render(peopleAddTpl, res.data)
            var $peopleAdd = $(peopleAdd);
            // 如果点击start则表示提交两张图片
            $peopleAdd.on("click", "#start", function () {
                var ps_type = 1;
                camera(ps_type);
            });
            
            // 查询设备
            API.getDeviceList(0,1000,null, function (res) {
                // 拼接设备号
                var device = res.data;
                var deviceids = device[0].deviceid;
                for (var i = 1; i < res.data.length; i++) {
                    deviceids += "," + device[i].deviceid
                    }
                    $("#btnDeviceids").attr("deviceids", deviceids);
                })
            //  提交表单
            $peopleAdd
            .on("submit", "form", function () {
                // 获取参数
                var deviceids = $("#btnDeviceids").attr("deviceids");
                var secondFaceimages = $("#btnPeopleManager").attr("faceimage");
                var secondFacedatas = $("#btnPeopleManager").attr("facedata");
                var birthday = $("#PA-birthday").val();
                var phonenumber = $("#PA-phonenumber").val();
                var name = $("#visitorName").val();
                var job = $("#PA-Job").val();
                var employeenumber = $("#PA-employeenumber").val();
                var sex = $("#PA-sex").val();
                if (secondFaceimages == undefined) {
                    var faceimages = firstFaceimages;
                    var facedatas = "[" + firstFacedatas + "]";
                    var facetypes = 1;
                } else {
                    var faceimages = firstFaceimages + "," + secondFaceimages;
                    var facedatas = "[" + firstFacedatas + "]|" + "[" + secondFacedatas + "]";
                    var facetypes = 1+","+1;
                }
                $("#btnPeopleManager").removeAttr("faceimage");
                $("#btnPeopleManager").removeAttr("facedata");
                // 调用接口
                API.addEmployee(deviceids, name, sex, birthday, phonenumber, employeenumber, job, faceimages, facedatas,facetypes, function (res) {
                    if(res.message=="该机构手机号码已经被使用！"){
                        alert("该手机号码已被注册")
                    }
                    $peopleAdd.modal("hide");
                    //成功的添加员工->刷新员工管理页面
                    $("#btnPeopleManager").trigger("click");
                })
                return false; //阻止同步提交表单
            })
            // 使用下拉菜单完成快捷选择职位
            .on("click", "#PA-jobSel", function () {
                if ($("#PA-Job").val() == "") {
                    $("#job_select").removeClass("displayN").addClass("displayB");
                    $("#job_select>li>a").on("click", function () {
                        $("#PA-Job").val($(this).html());
                        $("#job_select").removeClass("displayB").addClass("displayN");
                    })
                }
            })
            .on("input","#PA-Job",function(){
                if($("#PA-Job").val()!=""){
                    $("#job_select").removeClass("displayB").addClass("displayN");
                }
            })
            // 移除上一次的模态框
            $("#modalPeopleAdd").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            // 弹出模态框
            $peopleAdd.appendTo("body").modal();
            // 为下拉框替换左侧小三角
            var flag=true;
            $("select").on("click",function(){
                if(flag){
                    $(this).addClass("triangle_down");
                    flag=false;
                }else{
                    $(this).removeClass("triangle_down");
                    flag=true;
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
            // 利用typeahead插件完成输入提醒功能
            $(function () {
                var mySource = $("#btnMySource").attr("mySource");
                var mySource = JSON.parse(mySource)
                $(".job").typeahead({
                    source: mySource
                })
            })
            //渲染入职日期-->日期控件
            $peopleAdd.find(".birthday-join").datetimepicker({
                format: 'yyyy-mm-dd',
                weekStart: 1,
                autoclose: true,
                startView: 4,
                minView: 2,
                forceParse: false,
                language: 'zh-CN'
            });
        })
    };
});