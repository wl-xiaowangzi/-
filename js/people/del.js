/**
 * 注销员工提示
 * Created by land on 2017/9/11.
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleDel.html","bootstrap"],function($,art,API,peopleDelTpl){
    
    return function(){
     
            $("#modalDelPeople").remove();

            var $peopleDel=$(peopleDelTpl);
            
            $peopleDel.appendTo("body").modal();

    }
})