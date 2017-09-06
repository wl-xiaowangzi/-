/**
 * 用户管理编辑
 * Created by land on 2017/9/1.
 */
define(["jquery","artTemplate","text!tpls/usersEdit.html","bootstrap"],function($,art,usersEditTpl){
    
    return function(cg_id){
        // $.get("/api/category/edit",{cg_id:cg_id},function(res){
        //     if(res.code!=200){
        //         console.log(res.msg);
        //         return;
        //     }

        //     //成功的获取了分类信息
        //     var result=res.result;

        //     var courseCategoryEdit=art.render(courseCategoryEditTpl,{
        //         result:result
        //     });

            $("#modalEditUsers").remove();

            var $usersEdit=$(usersEditTpl);
            //$courseCategoryEdit是一个jquery对象，里面有一个DOM元素，这个元素就是一个包含了编辑分类模态框的内容

            // $courseCategoryEdit.on("submit","form",function(){

            //     //获取表单信息
            //     var formData=$(this).serialize();

            //     $.post("/api/category/modify",formData,function(res){
            //         if(res.code!=200){
            //             console.log(res.msg);
            //             return;
            //         }

                    //成功的更新了分类信息
                //     $courseCategoryEdit.modal("hide");//关闭模态框
                //     $("#btnCourseCategoryManager").trigger("click");//刷新了分类列表模块

                // })

            //     return false;//阻止表单的自动提交
            // });
            
            
            //$(courseCategoryEdit).appendTo("body").modal();
            
            $usersEdit.appendTo("body").modal();

        // })


    }
})