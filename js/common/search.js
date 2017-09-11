/**
 * 搜索
 * Author:land
 *   Date:2017/9/11
 */
define(["jquery","artTemplate","common/api","./noResult"],function ($,art,API,noResult) {
    return function(){
        
        //获取课程id
        // var cs_id=$("#btnCourseTimeManager").attr("cs_id");

        //调用搜索接口
        // API.getCourseLesson(cs_id,function(res){
            //加载课时管理页面

            // var courseTimeList=art.render(courseTimeListTpl,res);
            
            var $approvalList=$(approvalListTpl);

            //入库审批点击事件
            $approvalList
            .on("click",".btn-show-approval",function(){
                
                //获取课时id
                // var ct_id=$(this).parent().attr("ct_id");
                
                //加载编辑课时的模块
                // editCourseTime(ct_id);
                showApproval();
            })
           
            
           

            //把渲染好的元素放到页面中
            // $(".module-container").append($approvalList);
        // })
        
    }
});