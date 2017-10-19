/**
 * 编辑基本信息
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/peopleBaseInfo.html", "common/editCamera1", "common/editCamera2", "./choicePicture1", "./choicePicture2","typeahead"], function ($, art, API, peopleBaseInfoTpl, editCamera1, editCamera2,choicePicture1,choicePicture2) {
    return function (ep_id) {
        //根据员工id获取员工基本信息
        API.getEmployeeBaseInfo(ep_id, function (res) {console.log(res)
            // 渲染模板
            var peopleBaseInfo = art.render(peopleBaseInfoTpl, res.data);
            var $peopleBaseInfo = $(peopleBaseInfo);
            // 移除模板
            $("#modalEditInfo").remove();
            // 选择照片
            var ps_id = ep_id;
            var ps_type = 1;
            var ps_name = res.data.name;
            $peopleBaseInfo.on("click", ".picture1", function () {
                choicePicture1(ps_id,ps_type,ps_name);
            });
            $peopleBaseInfo.on("click", ".picture2", function () {
                choicePicture2(ps_id,ps_type,ps_name);
            });
            // 提交表单
            $peopleBaseInfo.on("submit", "form", function () {
                // 获取参数
                var deviceids = $(".btn-blue").parent().attr("deviceids").replace(/\[|]/g, '').replace(/\"|"/g, '');
                var employeeid = $(".btn-blue").parent().attr("employeeid");
                var firstFacedatas = $(".btn-blue").parent().attr("firstFacedatas").replace(/\[|]/g, '');
                var firstFaceimages = $(".btn-blue").parent().attr("firstFaceimages");
                var secondFacedatas = $(".btn-blue").attr("secondFacedatas").replace(/\[|]/g, '');
                var secondFaceimages = $(".btn-blue").attr("secondFaceimages");
                var facetypes1 = $(".btn-blue").parent().attr("facetypes1")||1;
                var facetypes2 = $(".btn-blue").attr("facetypes2")||1;
                var employeenumber = $(".employeenumber").val();
                var phonenumber = $(".phonenumber").val();
                var birthday = $(".birthday-join").val();
                var name = $(".name").val();
                var job = $(".job").val();
                var sex = $(".sex").val();
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
                API.editEmployee(ep_id, deviceids, name, sex, birthday, phonenumber, job, employeenumber, facedatas, faceimages,facetypes, function (res) {
                    // 隐藏模态框
                    $peopleBaseInfo.modal("hide");
                    //数据更新成功-->跳转到员工列表
                    $("#btnPeopleManager").trigger("click");
                })
                // 阻止表单自动提交
                return false;
            })
            // 弹出模态框
            $peopleBaseInfo.appendTo("body").modal();
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
            $peopleBaseInfo.find(".birthday-join").datetimepicker({
                format: 'yyyy-mm-dd',
                weekStart: 1,
                autoclose: true,
                startView: 4,
                minView: 2,
                forceParse: false,
                language: 'zh-CN'
            });
            //渲染入库日期-->日期控件
            $peopleBaseInfo.find(".date-join").datetimepicker({
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