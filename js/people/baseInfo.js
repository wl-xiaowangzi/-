/**
 * 编辑基本信息
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleBaseInfo.html","common/editCamera1","common/editCamera2"],function ($,art,API,peopleBaseInfoTpl,editCamera1,editCamera2) {

    return function(ep_id){
        //根据员工id获取员工基本信息
        API.getEmployeeBaseInfo(ep_id,function(res){
             console.log(res.data)
            var peopleBaseInfo=art.render(peopleBaseInfoTpl,res.data);
           
            var $peopleBaseInfo=$(peopleBaseInfo);
            
            $("#modalEditInfo").remove();
            $peopleBaseInfo.on("click", ".picture1", function () {
                editCamera1();
            });
            $peopleBaseInfo.on("click", ".picture2", function () {
                editCamera2();
            });
            
            $peopleBaseInfo.on("submit","form",function(){
                var deviceids=$(".btn-blue").parent().attr("deviceids").replace(/\[|]/g,'').replace(/\"|"/g,'');
                var employeeid=$(".btn-blue").parent().attr("employeeid");
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
                var job=$(".job").val();
                var employeenumber=$(".employeenumber").val();
                var sex=$(".sex").val();
                console.log(deviceids)
                API.editEmployee(ep_id,deviceids,name,sex,birthday,phonenumber,job,employeenumber,facedatas,faceimages,function(res){
                    console.log(res)
                    $peopleBaseInfo.modal("hide");
                    //数据更新成功-->跳转到员工列表
                    $("#btnPeopleManager").trigger("click");

                })

                return false;
            })

            $peopleBaseInfo.appendTo("body").modal();


        
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