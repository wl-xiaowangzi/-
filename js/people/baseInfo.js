/**
 * 编辑基本信息
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleBaseInfo.html"],function ($,art,API,peopleBaseInfoTpl) {

    return function(){
        //把渲染好的元素放到页面中


        //根据课程id获取课程基本信息
        // API.getCourseBaseInfo(cs_id,function(res){

            // var courseBaseInfo=art.render(courseBaseInfoTpl,res.result);

            // var $courseBaseInfo=$(courseBaseInfo);

            var $peopleBaseInfo=$(peopleBaseInfoTpl);
            $("#modalEditInfo").remove();
            //用户点击一级分类的时候，切换对应的二级分类
            // $courseBaseInfo.on("change",".select-top",function(){
                //a、获取用户点击的一级分类的id
                // var top=$(this).val();
                //b、根据一级分类的id获取指定的二级分类
                // API.getSecondCatoryByFirst(top,function(res){

                    //获取到所有的二级分类数据，将这些数据渲染到指定的下拉框中

                    // var $selectSecond=$courseBaseInfo.find(".select-second");

                    //.1、清除原来的二级分类数据
                    // $selectSecond.empty();
                    //.2、添加新的二级分类数据
                    // res.result.forEach(function(v){
                        // $selectSecond.append("<option value='"+v.cg_id+"'>"+v.cg_name+"</option>");
                    // })
                // });



            // });

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


        // })

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
    }
})