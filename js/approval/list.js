/**
 * 入库审批列表
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery","artTemplate","common/api","text!tpls/approvalList.html","./show","./refuse"],function ($,art,API,approvalListTpl,showApproval,refuse) {
    return function(){
        
            
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
           .on("click","#btn-employee",function(){

           })
           .on("click","#btn-visiter",function(){
               
           })
            .on("click",".btn-refuse",function(){
                refuse();
            })
           

            //把渲染好的元素放到页面中
            $(".module-container").append($approvalList);
        // })
        
    }
});