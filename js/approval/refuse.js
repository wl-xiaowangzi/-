/**
 * 删除提示
 * Created by land on 2017/9/3.
 */
define(["jquery","artTemplate","text!tpls/approvalRefuse.html","bootstrap"],function($,art,approvalRefuseTpl){
    
    return function(){
     
            $("#modalApprovalRefuse").remove();

            var $approvalRefuse=$(approvalRefuseTpl);
            
            $approvalRefuse.appendTo("body").modal();

    }
})