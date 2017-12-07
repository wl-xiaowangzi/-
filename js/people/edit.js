/**
 * 编辑基本信息
 * Author:land
 *   Date:2017/12/6
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/peopleEdit.html", "text!tpls/peopleSubOrg.html","text!tpls/peopleSubAuthority.html","common/editCamera1", "common/editCamera2", "./choicePicture1", "./choicePicture2","typeahead"], function ($, art, API, peopleEditTpl,peopleSubOrgTpl,peopleSubAuthorityTpl, editCamera1, editCamera2,choicePicture1,choicePicture2) {
    return function (ep_id) {
        // 移除弹出层，防止重复点击造成页面卡顿
        $("#my-tree").addClass("displayN");
        $(".modal-backdrop").remove();
        $("#modalEditInfo").remove();
        var organizationid=$.cookie("organizationid");
        //根据员工id获取员工基本信息
        API.getEmployeeBaseInfo(ep_id, function (res) {
            console.log(res)
            // 渲染模板
            var peopleEdit = art.render(peopleEditTpl, res.data);
            var $peopleEdit = $(peopleEdit);
            // 选择照片
            var ps_id = ep_id;
            var ps_type = 1;
            var ps_name = res.data.name;
            var keyword;
             // 设置部门及授权组默认值
            var auID=res.data.authorizationgroupid;
            auID="au"+auID;
            var orgID=res.data.organizationid;
            orgID="org"+orgID;

            $peopleEdit
            .on("click", ".picture1", function () {
                choicePicture1(ps_id,ps_type,ps_name);
            })
            .on("click", ".picture2", function () {
                choicePicture2(ps_id,ps_type,ps_name);
            })
            // 组织加购选项
            API.getTree(organizationid, function (res) {
                 var peopleSubOrg = art.render(peopleSubOrgTpl,res.data[0]);
                 var $peopleSubOrg = $(peopleSubOrg);
                 $("#PE-department").append($peopleSubOrg);
                 $("#"+orgID).prop("selected","selected");
                 $("#"+auID).prop("selected","selected");
             })
            //  授权组选项
            API.queryAuthorizationgroupList(0, 100, keyword,1, function (res) {
                var peopleSubAuthority = art.render(peopleSubAuthorityTpl,res);
                 var $peopleSubAuthority = $(peopleSubAuthority);
                 $("#PE-authorization").append($peopleSubAuthority);
                 $("#"+orgID).prop("selected","selected");
                 $("#"+auID).prop("selected","selected");
            })
            // 提交表单
            $peopleEdit
            .on("submit", "form", function () {
                // 获取参数
                var employeeid = $("#PE-submit").parent().attr("employeeid");
                var firstFacedatas = $("#PE-submit").parent().attr("firstFacedatas").replace(/\[|]/g, '');
                var firstFaceimages = $("#PE-submit").parent().attr("firstFaceimages");
                var secondFacedatas = $("#PE-submit").attr("secondFacedatas").replace(/\[|]/g, '');
                var secondFaceimages = $("#PE-submit").attr("secondFaceimages");
                var facetypes1 = $("#PE-submit").parent().attr("facetypes1")||1;
                var facetypes2 = $("#PE-submit").attr("facetypes2")||1;
                var employeenumber = $("#PE-employeenumber").val();
                var authorizationgroupid = $("#PE-authorization").val();
                var organizationid = $("#PE-department").val();
                var phonenumber = $("#PE-phonenumber").val();
                var birthday = $("#PE-birthday").val();
                var name = $("#PE-visitorName").val();
                var job = $("#PE-job").val();
                var sex = $("#PE-sex").val();
                // 设置条件一张或者两张
                if (secondFaceimages == undefined) {
                    var faceimages = firstFaceimages;
                    var facedatas = "[" + firstFacedatas + "]";
                    var facetypes = facetypes1;
                } else {
                    var faceimages = firstFaceimages + "," + secondFaceimages;
                    var facedatas = "[" + firstFacedatas + "]|" + "[" + secondFacedatas + "]";
                    var facetypes = facetypes1+","+facetypes2;
                }
                console.log(ep_id, authorizationgroupid,organizationid, name, sex, birthday, phonenumber, job, employeenumber, facedatas, faceimages,facetypes)
                API.editEmployee(ep_id, authorizationgroupid,organizationid, name, sex, birthday, phonenumber, job, employeenumber, facedatas, faceimages,facetypes, function (res) {
                    //数据更新成功-->跳转到员工列表
                    $("#btnPeopleManager").trigger("click");
                })
                // 阻止表单自动提交
                return false;
            })
            $(".module-container").empty();
            $(".module-container").append($peopleEdit);
            $("#"+orgID).prop("selected","selected");
            $("#"+auID).prop("selected","selected");
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
            // 利用typeahead插件完成输入提醒功能
            $(function(){
                var mySource = $("#btnMySource").attr("mySource");
                var mySource=JSON.parse(mySource)
                $(".job").typeahead({
                    source: mySource
                })
            })
            // 日期控件
            $peopleEdit.find(".birthday-join").datetimepicker({
                format: 'yyyy-mm-dd',
                weekStart: 1,
                autoclose: true,
                startView: 4,
                minView: 2,
                forceParse: false,
                language: 'zh-CN'
            });
            //渲染入库日期-->日期控件
            $peopleEdit.find(".date-join").datetimepicker({
                weekStart: 1, //一周从哪一天开始。0（星期日）到6（星期六）
                format: 'yyyy-mm-dd h:mm',
                //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                autoclose: true,
                // minView:"month",
                todayBtn: true,
                todayHighlight: true,
                language: "zh-CN"
            });
        })
    }
})