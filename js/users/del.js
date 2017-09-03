/**
 * 删除提示
 * Created by land on 2017/9/3.
 */
define(["jquery","artTemplate","text!tpls/usersDel.html","bootstrap"],function($,art,usersDelTpl){
    
    return function(){
     
            $("#modalEditUsers").remove();

            var $usersDel=$(usersDelTpl);
            
            $usersDel.appendTo("body").modal();

    }
})