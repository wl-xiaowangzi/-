/**
 * 编辑分类模块
 * Created by WilbertCheng on 2017/6/11.
 */
define(["jquery","artTemplate","text!tpls/usersDel.html","bootstrap"],function($,art,usersDelTpl){
    
    return function(){
     
            $("#modalEditUsers").remove();

            var $usersDel=$(usersDelTpl);
            
            $usersDel.appendTo("body").modal();

    }
})