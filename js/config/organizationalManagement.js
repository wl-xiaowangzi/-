/**
 * 事由管理
 * Created by land 2017/9/4.
 */
define(["jquery","artTemplate","text!tpls/configOrganizationalManagement.html"],function($,art,configOrganizationalManagementTpl){

    return function(){
            var $configOrganizationalManagement=$(configOrganizationalManagementTpl);
            $(".module-container").append($configOrganizationalManagement);
       
    }
})