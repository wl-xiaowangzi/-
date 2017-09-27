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
            console.log(res)
            var peopleVisitantInfo=art.render(peopleVisitantInfoTpl,res.data);

            var $peopleVisitantInfo=$(peopleVisitantInfo);

            $("#modalVisitantEditInfo").remove();
            $peopleVisitantInfo.on("click", ".picture1", function () {
                editCamera1();
            });
            $peopleVisitantInfo.on("click", ".picture2", function () {
                editCamera2();
            });
            $peopleVisitantInfo.on("submit","form",function(){
                var deviceids=$(".btn-blue").parent().attr("deviceids").replace(/\[|]/g,'').replace(/\"|"/g,'');
                var visitorid=$(".btn-blue").parent().attr("visitorid");
                var facedatas=$(".btn-blue").parent().attr("firstFacedatas");
                var faceimages=$(".btn-blue").parent().attr("firstFaceimages");
                var secondFacedatas=$(".btn-blue").attr("secondFacedatas");
                var secondFaceimages=$(".btn-blue").attr("secondFaceimages");
                 if(secondFaceimages!=undefined){
                     facedatas=facedatas+"|"+secondFacedatas;
                     faceimages=faceimages+","+secondFaceimages;
                 }
                var birthday=$(".birthday-join").val();
                var phonenumber=$(".phonenumber").val();
                var name=$(".name").val();
                var remark = $(".remark").val();
                var starttime = $(".starttime").val();
                var endtime = $(".endtime").val();
                var sex=$(".sex").val();
                console.log(visitorid,deviceids,name,sex,birthday,phonenumber,starttime,endtime, remark,facedatas,faceimages)
                API.editVisitor(visitorid,deviceids,name,sex,birthday,phonenumber,starttime,endtime, remark,facedatas,faceimages,function(res){
                    console.log(res)
                    $peopleVisitantInfo.modal("hide");
                    //数据更新成功-->跳转到员工列表
                    $("#btnVisitorManager").trigger("click");

                })

                return false;
            })

            $peopleVisitantInfo.appendTo("body").modal();

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
            $peopleVisitantInfo.find(".date-join").datetimepicker({
                weekStart:1,//一周从哪一天开始。0（星期日）到6（星期六）
                format: 'yyyy-mm-dd h:mm',
                //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                autoclose:true,
                // minView:"month",
                todayBtn:true,
                todayHighlight:true,
                language:"zh-CN"
            });
       })
    }
})