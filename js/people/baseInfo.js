/**
 * 编辑基本信息
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleBaseInfo.html"],function ($,art,API,peopleBaseInfoTpl) {

    return function(ep_id){
        //把渲染好的元素放到页面中


        //根据课程id获取课程基本信息
        API.getEmployeeBaseInfo(ep_id,function(res){
            console.log(res.data[0])
            var peopleBaseInfo=art.render(peopleBaseInfoTpl,res.data[0]);

            var $peopleBaseInfo=$(peopleBaseInfo);

            $("#modalEditInfo").remove();

            // $courseBaseInfo.on("submit","form",function(){
                // var formData=$(this).serialize();

                // API.saveCourseBaseInfo(formData,function(){
                //     //数据更新成功-->跳转到课程列表

                //     $("#btnCourseManager").trigger("click");

                // })

                // return false;
            // })

            // $(".module-container").append($courseBaseInfo);
            $peopleBaseInfo.appendTo("body").modal();


        })

         //渲染入库日期-->日期控件
            // $peopleBaseInfo.find(".date-join").datetimepicker({
            //     weekStart:1,//一周从哪一天开始。0（星期日）到6（星期六）
            //     format: 'yyyy-mm-dd h:mm',
            //     //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
            //     autoclose:true,
            //     // minView:"month",
            //     todayBtn:true,
            //     todayHighlight:true,
            //     language:"zh-CN"
            // });
    }
})