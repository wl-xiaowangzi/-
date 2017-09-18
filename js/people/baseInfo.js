/**
 * 编辑基本信息
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleBaseInfo.html"],function ($,art,API,peopleBaseInfoTpl) {

    return function(ep_id){
        //根据员工id获取员工基本信息
        API.getEmployeeBaseInfo(ep_id,function(res){
             console.log(res.data)
            var peopleBaseInfo=art.render(peopleBaseInfoTpl,res.data);
           
            var $peopleBaseInfo=$(peopleBaseInfo);

            $("#modalEditInfo").remove();

            $peopleBaseInfo.on("submit","form",function(){
                var formData=$(this).serialize();
                console.log(formData)
                API.editEmployee(formData,function(res){
                    console.log(res)
                    $peopleBaseInfo.modal("hide");
                    //数据更新成功-->跳转到员工列表
                    $("#btnPeopleManager").trigger("click");

                })

                return false;
            })

            $peopleBaseInfo.appendTo("body").modal();


        

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