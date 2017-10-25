/**
 * 操作日志
 * Created by land 2017/9/4.
 */
define(["jquery","artTemplate","text!tpls/configViewLog.html"],function($,art,configViewLogTpl){

    return function(){
            var $configViewLog=$(configViewLogTpl);
            $(".module-container").append($configViewLog);
       
    }
})