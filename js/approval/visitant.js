/**
 * 访客列表
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery","artTemplate","common/api","text!tpls/approvalVisitantList.html","./visitantedit","./refuse"],function ($,art,API,approvalVisitantListTpl,editVisitantApproval,approvalRefuse) {
    return function(){
        //实现点击指定课程，跳转到指定课程对应的课时管理页面？
        //-->1、在课程列表(list.js)中，给编辑课时按钮绑定了单击事件，在事件回调函数中：
        //  -->跳转到课时管理页面
        //      -->解决方案：如果直接跳转，进入课时管理，获取不到课程id(存放在列表中指定行数据中的)
        //          -->所以不能直接跳转，用如下的方法实现：
        //              -->a、需要在跳转之前，首先获取该课程id
        //              -->b、然后将该课程id存放到"课时管理"菜单按钮中（添加一个cs_id属性）
        //              -->c、跳转到课时管理页面，进入到课时管理模块
        //              -->d、通过获取"课时管理"按钮的cs_id属性，从而获取到指定的课程id


        //获取课程id
        // var cs_id=$("#btnCourseTimeManager").attr("cs_id");

        //根据课程id获取指定的课时信息
        // API.getCourseLesson(cs_id,function(res){
            //加载课时管理页面

            // var courseTimeList=art.render(courseTimeListTpl,res);
            
            var $approvalVisitantList=$(approvalVisitantListTpl);
            $(".module-container").empty();

            //给编辑课时按钮绑定事件，实现编辑课时的功能
            $approvalVisitantList
            .on("click",".btn-edit-approval",function(){
                
                //获取课时id
                // var ct_id=$(this).parent().attr("ct_id");
                
                //加载编辑课时的模块
                // editCourseTime(ct_id);
                console.log(1)
                editVisitantApproval();
            })
            .on("click",".btn-employee",function(){
                $("#btnApproval").trigger("click");
            })
            .on("click",".btn-refuse",function(){
                approvalRefuse();
            })

            //把渲染好的元素放到页面中
            $(".module-container").append($approvalVisitantList);
        // })
        
    }
});