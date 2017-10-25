/**
 * 事由管理
 * Created by land 2017/9/4.
 */
define(["jquery","artTemplate","text!tpls/configCauseManagement.html"],function($,art,configCauseManagementTpl){

    return function(){
            var $configCauseManagement=$(configCauseManagementTpl);
            $(".module-container").append($configCauseManagement);
       
    }
})