/**
 * 添加访客
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/peopleVisitantAdd.html","text!tpls/peopleSubAuthority.html", "common/api", "common/camera","common/visitorCamera", "datetimepicker", "datetimepickerLang"], function ($, art, peopleVisitantAddTpl,peopleSubAuthorityTpl, API, camera,visitorCamera) {
    return function () {
        // 渲染模板
        var $peopleVisitantAdd = $(peopleVisitantAddTpl);
        // 获取参数
        var keyword;
        var time = new Date();
        // 日期补零
        var month = time.getMonth()+1
        var day = time.getDate();
        var hour = time.getHours();
        var minutes = time.getMinutes();
        if(day.toString().length == 1){
            day = "0"+day
        }
        if(hour.toString().length == 1){
            hour = "0"+hour
        }
        if(minutes.toString().length == 1){
            minutes = "0"+minutes
        }
        if(hour>=19){
           var hour5=23;
        }else{
           var hour5=hour+5;
        }
        var initStarttime = time.getFullYear() + '-' + month + '-' + day + " " + time.getHours() + ":" + minutes + ":" + "00";
        var initEndtime = time.getFullYear() + '-' + month + '-' + day + " " + hour5 + ":" + minutes + ":" + "00";
        
        console.log(initStarttime,initEndtime)
        //  授权组选项
            API.queryAuthorizationgroupList(0, 100, keyword,1, function (res) {
                var peopleSubAuthority = art.render(peopleSubAuthorityTpl,res);
                 var $peopleSubAuthority = $(peopleSubAuthority);
                 $("#VA-authorization").append($peopleSubAuthority);
                 for(var i=0;i<res.data.length;i++){
                    if(res.data[i].isdefault==1){
                        console.log(res.data[i].datanumber)
                        var auID=res.data[i].datanumber;
                        auID="au"+auID;
                        $("#"+auID).prop("selected","selected");
                    }
                }
            })
        // 调用摄像头
        $peopleVisitantAdd.on("click", "#firstdata", function () {
            var ps_type = 2;
            visitorCamera(ps_type);
        });
        $peopleVisitantAdd.on("click", "#seconddata", function () {
            camera();
        })
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
        // 提交表单
        $peopleVisitantAdd.on("submit", "form", function () {
            var firstFaceimages =  $("#btnFirstFacedata").attr("firstFaceimages");
            var firstFacedatas = $("#btnFirstFacedata").attr("firstFacedatas");
            var headfaceimage = $("#btnFirstFacedata").attr("headfaceimage");
            var secondFaceimages = $("#btnPeopleManager").attr("faceimage");
            var secondFacedatas = $("#btnPeopleManager").attr("facedata");
            var birthday = $("#VA-birthday").val();
            var authorizationgroupid = $("#VA-authorization").val();
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
            } else if(faceimages==undefined){
                alert("请拍摄人脸照片")
            }
            else{
                // 添加员工
                API.addVisitor(authorizationgroupid, name, sex, birthday, phonenumber, starttime, endtime, remark, faceimages, facedatas, facetypes, function (res) {
                    $peopleVisitantAdd.modal("hide");
                    //成功的添加员工->刷新员工管理页面
                    $("#btnVisitorManager").trigger("click");
                })
            }

            return false; //阻止同步提交表单
        })
        .on("click",".my-btn-cancel",function(){
                $("#btnVisitorManager").trigger("click");
            })
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".module-container").empty();
        $(".module-container").append($peopleVisitantAdd);
        $(".modal-backdrop").remove();
        $("#VA-starttime").attr("value",initStarttime);
        $("#VA-endtime").attr("value",initEndtime);
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