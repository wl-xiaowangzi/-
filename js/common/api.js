/**
 * 这是注释的内容
 * Author:Wilbert
 *   Date:2017/6/13
 */
define(["jquery"],function($){

    return {
        /**
         * 获取课程对应的课时信息
         * @param cs_id 课程id
         * @param callback 接口响应成功了，执行该回调函数
         */
        getCourseLesson:function(cs_id,callback){
            $.get("/api/course/lesson",{cs_id:cs_id},function(res){
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                //接口响应成功了
                callback && callback(res);

            })
        },

        /**
         * 根据指定的课时id获取相应的课时信息
         * @param ct_id 课时id
         * @param callback 接口响应成功了，执行该回调函数
         */
        editCourseTime:function(ct_id,callback){
            $.get("/api/course/chapter/edit",{ct_id:ct_id},function(res){
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                //接口响应成功了
                callback && callback(res);

                //editCourseTime(10,function(){})
                //editCourseTime(10)
            })
        },
        /**
         * 编辑课时表单提交
         * @param formData
         * @param callback
         */
        modifyCourseTime:function(formData,callback){
            $.post("/api/course/chapter/modify",formData,function(res){
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                callback && callback();

            })
        },
        /**
         * 根据课程id获取课程基本信息
         * @param cs_id 课程id
         * @param callback
         */
        getCourseBaseInfo:function(cs_id,callback){
            $.get("/api/course/basic",{cs_id:cs_id},function(res){
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                callback && callback(res);


            })
        },


        /**
         * 根据指定的一级分类的id获取对应的二级分类数据
         * @param firstId 一级分类的id
         * @param callback
         */
        getSecondCatoryByFirst:function(firstId,callback){
            this.get("category/child",{cg_id:firstId},callback);

            // $.get("/api/category/child",{cg_id:firstId},function(res){
            //     if(res.code!=200){
            //         console.log(res.msg);
            //         return;
            //     }
            //
            //     callback && callback(res);
            //
            //
            // })
        },
        get:function(url,params,callback){
            $.get("/api/"+url,params,function(res){
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                callback && callback(res);
            })
        },
        //处理ajax请求的入口方法
        //$.ajax("post","course/add",{},function(){})
        ajax:function(type,url,params,callback){
            //$["post"]("/api/course/add",{},function(){res})
            $[type]("/api/"+url,params,function(res){
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                callback && callback(res);
            });
        },
        /**
         * 根据课程id获取原来的课程图片相关信息
         * @param cs_id
         * @param callback
         */
        getCoursePic:function(cs_id,callback){
            this.ajax("get","course/picture",{cs_id:cs_id},callback);
        },

        /**
         * 更新基本信息
         * @param formData
         * @param callback
         */
        saveCourseBaseInfo:function(formData,callback){
            $.post("/api/course/update/basic",formData,function(res){
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                callback && callback();
            })
        },
        /**
         * 获取讲师列表
         * @param callback
         */
        getTeacherList:function(callback){
            this.ajax("get","teacher",{},callback);
        },
        /**
         * 修改讲师账户状态
         * @param tc_id 讲师id
         * @param tc_status 讲师账户原来的状态
         * @param callback
         */
        changeTeacherStatus:function(tc_id,tc_status,callback){
            this.ajax("post","teacher/handle",{tc_id:tc_id,tc_status:tc_status},callback);
        }
    }
})