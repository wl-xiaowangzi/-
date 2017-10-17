/**
 * 编辑基本信息
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleVisitantInfo.html","common/editCamera1","common/editCamera2"],function ($,art,API,peopleVisitantInfoTpl,editCamera1,editCamera2) {

    return function(vs_id){
        //把渲染好的元素放到页面中
        //根据访客id获取访客基本信息
        API.getVisitorBaseInfo(vs_id,function(res){
            // 渲染模板
            var peopleVisitantInfo=art.render(peopleVisitantInfoTpl,res.data);
            var $peopleVisitantInfo=$(peopleVisitantInfo);
            // 移除上一次模态框
            $("#modalVisitantEditInfo").remove();
            // 调用摄像头
            $peopleVisitantInfo.on("click", ".picture1", function () {
                editCamera1();
            });
            $peopleVisitantInfo.on("click", ".picture2", function () {
                editCamera2();
            });
            // 提交表单
            $peopleVisitantInfo.on("submit","form",function(){
                var deviceids=$(".btn-blue").parent().attr("deviceids").replace(/\[|]/g,'').replace(/\"|"/g,'');
                var visitorid=$(".btn-blue").parent().attr("visitorid");
                var firstFacedatas = $(".btn-blue").parent().attr("firstFacedatas").replace(/\[|]/g, '');
                var firstFaceimages = $(".btn-blue").parent().attr("firstFaceimages");
                var secondFacedatas = $(".btn-blue").attr("secondFacedatas").replace(/\[|]/g, '');
                var secondFaceimages = $(".btn-blue").attr("secondFaceimages");
                var birthday=$(".birthday-join").val();
                var phonenumber=$(".phonenumber").val();
                var name=$(".name").val();
                var remark = $(".remark").val();
                var starttime = $(".starttime").val();
                var endtime = $(".endtime").val();
                var sex=$(".sex").val();
                // 设置条件1张or2张照片
                if (secondFaceimages == undefined) {
                    var faceimages = firstFaceimages;
                    var facedatas = "[" + firstFacedatas + "]";
                } else {
                    var faceimages = firstFaceimages + "," + secondFaceimages;
                    var facedatas = "[" + firstFacedatas + "]|" + "[" + secondFacedatas + "]";
                }
                if(Date.parse(starttime)>Date.parse(endtime)){
                    alert("结束时间不能小于开始时间");
                }else{
                // 添加访客
                API.editVisitor(visitorid,deviceids,name,sex,birthday,phonenumber,starttime,endtime, remark,facedatas,faceimages,function(res){
                    $peopleVisitantInfo.modal("hide");
                    //数据更新成功-->跳转到员工列表
                    $("#btnVisitorManager").trigger("click");
                })
                }
                return false;
            })
            $peopleVisitantInfo.appendTo("body").modal();
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
            // 日期控件
            $peopleVisitantInfo.find(".birthday-join").datetimepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            autoclose: true,
            startView: 4,
            minView: 2,
            forceParse: false,
            language: 'zh-CN'
            });
            //渲染入库日期-->日期控件
            var newDate = new Date();
            var t = newDate.toJSON(); 
            $peopleVisitantInfo.find(".date-join").datetimepicker({
                weekStart:1,//一周从哪一天开始。0（星期日）到6（星期六）
                format: 'yyyy-mm-dd h:ii:ss',//选ii才能选择分钟
                //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                autoclose:true,
                minView:0,
                minuteStep:5,
                todayBtn:true,
                todayHighlight:true,
                startDate:new Date(t),
                language:"zh-CN"
            });
       })
    }
})