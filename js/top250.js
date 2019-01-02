// 11.创建 正在热映的控制器的模块 并且创建一个正在热映控制器
angular.module('movieApp.top250Ctrl', [])
    .controller('top250Ctrl', ['$scope', '$movieServ', '$routeParams', function($scope, $movieServ, $routeParams) {
        $scope.isLoading = false;
        //$routeParams.pageid 这个参数就是当前页面展示的页码数 // 1 2
        //给当前页码数初始化一个值 如果没有传入pageid 给默认值1
        $routeParams.pageid = $routeParams.pageid || 1;
        //6. 暴露当前页码数
        $scope.pageid = $routeParams.pageid;
        console.log($routeParams.pageid);
        //1. 实现电影列表的展示功能
        // 1.创建一个电影列表的属性
        $scope.movie = {};
        // 2.通过ajax请求data.json文件 获取数据赋值给movie属性中
        //$http就是帮我们实现ajax请求的使用方式类似jquery的$.ajax
        //使用$http.jsonp的方式访问豆瓣的API 访问不了 原因是豆瓣API不支持angular的回调函数的形式
        // angular的jsonp跨域解决不了豆瓣API的跨域问题
        // $http({
        //     url: 'data.json'
        // }).success(function(data) {
        //     $scope.movie = data;
        // })
        //调用$movieServ的jsonp函数
        //1.根据当前的页码数计算电影的起始值
        var start = ($routeParams.pageid - 1) * 5;
        $movieServ.jsonp('https://api.douban.com/v2/movie/top250', {
            count: 5,
            start: start
        }, function(data) {
            $scope.movie = data;
            console.log(data);
            //2.暴露上一页的页码数
            $scope.prevPage = $routeParams.pageid - 1;
            if ($routeParams.pageid <= 1) {
                $scope.prevPage = 1;
            }
            //3.暴露下一页的页码数
            $scope.nextPage = ($routeParams.pageid - 0) + 1;
            //4.暴露总页数  16/ 5 == 4
            $scope.pageCount = Math.ceil(data.total / 5);
            if ($scope.nextPage == $scope.pageCount) {
                $scope.nextPage = $scope.pageCount;
            }
            //5.暴露一个总条数
            $scope.total = data.total;
            $scope.isLoading = true;
            //手动触发脏检查 因为这是我们自己写的异步代码 不会通知angular去刷新页面
            $scope.$apply();
        });
        /**
         *  实现分页功能
         *  1. 上一页按钮 是当前页的前一页 当前页码数 - 1
         *  2. 下一页按钮 是当前页的后一页 当前页码数 + 1
         *  3. 实现上一页下一页的切换都是通过改变路由的参数 通过传入不同的页码数来获取不同的数据
         *  4. 请求第一页数据 count:5 start:0 请求第二页 count:5 start:5 请求第三页 count:5 start:10
         *      (pageid-1)*5 == 电影的起始值
         *  5. 定义两个全局变量 prevPage = pageid - 1   nextPage = pageid+1  
         *      if(pageid==1){prevPage = pageid} if(pageid == pageCount){nextPage = pageCount}
         *  6. 求最大页码数 pageCount = Math.ceil(总条数 / 每页大小) Math.ceil(16/5)== 4
         *  7. 定义一个总条数 = data.total
         */
    }]);
