angular.module('movieApp.indexCtrl', [])
    .controller('indexCtrl', ['$scope','$location', function($scope,$location) {
        $scope.searchName = '';
        $scope.search = function() {
        		//由于这是按钮提交不是a链接 无法跳转的地址 所以手动跳转到search的路由地址
            // window.location.href = "#/search/" + $scope.searchName;
            // url方法就是设置url地址 $location.url() 不带#
            $location.url('/search/' + $scope.searchName)
        }                
    }]);
