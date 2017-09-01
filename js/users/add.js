/**
 * 添加课程分类
 * Created by WilbertCheng on 2017/6/11.
 */
define(["jquery","artTemplate","text!tpls/courseCategoryAdd.html","bootstrap"],function($,art,courseCategoryAddTpl){

    //写在这里的代码是会立刻执行的

    return function(){
        //写在这里的代码是用户通过获取模块的返回值，来调用的

        $.get("/api/category/top",function(res){
            //1、异常处理
            if(res.code!=200){
                console.log(res.msg);
                return;
            }

            //2、获取数据，将数据编译到html文件对应的字符串中
            var courseCategoryAdd=art.render(courseCategoryAddTpl,{
                result:res.result
            });
            //3、将编译成功的内容添加到页面中
            //3.1、移除已有的模块框
            $("#modalAddCourseCategory").remove();
            //3.2、打开一个新的模块框
            var $courseCategoryAdd=$(courseCategoryAdd);

            $courseCategoryAdd.on("submit","form",function(){
                //a、获取表单数据
                var formData=$(this).serialize();
                //b、提交
                $.post("/api/category/add",formData,function(res){
                    if(res.code!=200){
                        console.log(res.msg);
                        return;
                    }

                    //成功添加了一个分类数据-->刷新页面
                    //location.href="/";//location.reload();

                    //a、点击左侧分类菜单
                    $("#btnCourseCategoryManager").trigger("click");
                    //b、关闭添加的模态框
                    $courseCategoryAdd.modal("hide");
                });


                //取消事件默认行为(同步提交表单)
                return false;
            });

            $courseCategoryAdd.appendTo("body").modal();
        })


    }
})