(function($){
	var diskAsyncTask = new AsyncTaskTemplate();
	/*定义任务类型*/
	diskAsyncTask.getTypes = function(){
		/* key: type名称  value：type code*/
		var typeArr =  [
		   /*0:批量创建用户*/
            {
                "key": doI18n("async_task_type_mult_create_member"),
                "value": "0"
            }
        ];
        return typeArr;
	};
	/*操作按钮*/
	diskAsyncTask.getButtons = function(taskTable, rows, rowIndex){
		/* 
		    taskTable: table对象
		    rows:行数据
	        rowIndex: 行索引
		*/
		return [];
	};
	return diskAsyncTask;
})(jQuery);