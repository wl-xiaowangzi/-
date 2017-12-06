/**
 * 添加员工
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/peopleAdd.html","text!tpls/peopleSubOrg.html", "common/api","common/employeeCamera", "common/camera", "datetimepicker", "datetimepickerLang", "typeahead"], function ($, art, peopleAddTpl,peopleSubOrgTpl, API, employeeCamrea,camera) {
    return function () {
        // 职位查询所需参数
        var keyword;
        var start = 0;
        var limit = 30;
        var organizationid=$.cookie("organizationid");
        var status = 1;
        // 调用参数查询接口
        API.queryAuthorizationgroupList(start, limit, keyword,status, function (res) {
            console.log(res)
            // 渲染模板
            var peopleAdd = art.render(peopleAddTpl, res)
            var $peopleAdd = $(peopleAdd);
            // 如果点击start则表示提交两张图片
            $peopleAdd.on("click", "#firstdata", function () {
                var ps_type = 1;
                employeeCamrea(ps_type);
            });
            $peopleAdd.on("click", "#seconddata", function () {
                var ps_type = 1;
                camera(ps_type);
            });
            API.getTree(organizationid, function (res) {
                 var peopleSubOrg = art.render(peopleSubOrgTpl,res.data[0]);
                 var $peopleSubOrg = $(peopleSubOrg);
                 $("#PA-department").append($peopleSubOrg);
                 var orgID = $("#btnOrganizationid").attr("organizationid");
                    orgID = "org"+orgID;
                 $("#"+orgID).prop("selected","selected");
            });
            var orgID = $("#btnOrganizationid").attr("organizationid");
            orgID = "org"+orgID;
            //  提交表单
            $peopleAdd
            .on("submit", "form", function () {
                // 获取参数
                var firstFaceimages =  $("#btnFirstFacedata").attr("firstFaceimages");
                var firstFacedatas = $("#btnFirstFacedata").attr("firstFacedatas");
                var headfaceimage = $("#btnFirstFacedata").attr("headfaceimage");
                var secondFaceimages = $("#btnPeopleManager").attr("faceimage");
                var secondFacedatas = $("#btnPeopleManager").attr("facedata");
                var authorizationgroupid = $("#PA-authorization").val();
                var organizationid = $("#PA-department").val();
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
                console.log(authorizationgroupid,organizationid, name, sex, birthday, phonenumber, employeenumber, job, faceimages, facedatas,facetypes)
                API.addEmployee(authorizationgroupid, organizationid,name, sex, birthday, phonenumber, employeenumber, job, faceimages, facedatas,facetypes, function (res) {
                    $peopleAdd.modal("hide");
                    //成功的添加员工->刷新员工管理页面
                    $("#btnPeopleManager").trigger("click");
                })
                return false; //阻止同步提交表单
            })
            .on("click",".my-btn-cancel",function(){
                $("#btnPeopleManager").trigger("click");
            })
            // 使用下拉菜单完成快捷选择职位
            // .on("click", "#PA-jobSel", function () {
            //     if ($("#PA-Job").val() == "") {
            //         $("#job_select").removeClass("displayN").addClass("displayB");
            //         $("#job_select>li>a").on("click", function () {
            //             $("#PA-Job").val($(this).html());
            //             $("#job_select").removeClass("displayB").addClass("displayN");
            //         })
            //     }
            // })
            // .on("input","#PA-Job",function(){
            //     if($("#PA-Job").val()!=""){
            //         $("#job_select").removeClass("displayB").addClass("displayN");
            //     }
            // })
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            // 弹出模态框
            // $peopleAdd.appendTo("body").modal();
            $(".module-container").empty();
            $(".module-container").append($peopleAdd);
            console.log(orgID)
            $("#"+orgID).prop("selected","selected");
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