/**
 * 课程分类列表
 * Created by WilbertCheng on 2017/6/11.
 */
define(["jquery", "artTemplate", "text!tpls/courseCategoryList.html", "./add","./edit"], function ($, art, courseCategoryListTpl, addCourseCategory,editCourseCategory) {

    return function () {
        //需要动态的将课程分类里面的内容渲染到页面中-->动态的加载dom元素
        //  -->1、原生JS拼接DOM元素，拼接成一个字符串，把字符串通过append等方法添加到页面中
        //  -->2、把所有的内容放到一个独立的html文件中，通过异步请求该文件，获取该文件的内容(字符串)，把该字符串添加到页面中
        //          -->requireJS本身只支持加载js文件，但是提供了一个插件(text)，实现html文件的加载


        $.get("/api/category", function (res) {
            //优化：减少if的嵌套，先把简单的逻辑处理完，return结束函数的执行过程；之后就可以直接当成数据获取成功
            if (res.code != 200) {
                //打印错误日志
                console.log(res.msg);
                return;
            }

            //数据获取成功
            var result = res.result;//获取所有的分类数据(数组)


            //使用arttemplate编译指定的页面文件，编译完成会输出一段编译成功的html字符串
            var courseCategoryList = art.render(courseCategoryListTpl, {
                result: result   //左边的result应该和html文件中使用的result一一对应
            });

            //把真正的表格内容(已经被art编译过了)转换为jquery对象
            var $courseCategoryList = $(courseCategoryList);

            //实现添加分类功能--->给添加分类的按钮绑定单击事件
            $courseCategoryList
                .on("click", ".btn-add-course-category", function () {
                    //加载添加课程分类的模块
                    addCourseCategory();

                })
                .on("click", ".btn-edit-course-category", function () {
                    //获取该行数据对应的分类id
                    var cg_id=$(this).parent().attr("cg_id");

                    //加载编辑分类的模块
                    editCourseCategory(cg_id);
                })


            //把渲染好的元素放到页面中
            $(".module-container").append($courseCategoryList);
        })
    };
})