angular.module('movieApp.searchCtrl', [])
    .controller('searchCtrl', ['$scope', '$routeParams', '$movieServ', function($scope, $routeParams, $movieServ) {
        $scope.searchName = $routeParams.searchName;
        $scope.isLoading = false;
        $routeParams.pageid = $routeParams.pageid || 1;
        $scope.pageid = $routeParams.pageid;
        $scope.movie = {};
        var start = ($routeParams.pageid - 1) * 5;
        $movieServ.jsonp('https://api.douban.com/v2/movie/search', {
            q: $routeParams.searchName,
            count: 5,
            start: start
        }, function(data) {
            $scope.movie = data;
            $scope.prevPage = $routeParams.pageid - 1;
            if ($routeParams.pageid <= 1) {
                $scope.prevPage = 1;
            }
            $scope.nextPage = ($routeParams.pageid - 0) + 1;
            $scope.pageCount = Math.ceil(data.total / 5);
            if ($scope.nextPage == $scope.pageCount) {
                $scope.nextPage = $scope.pageCount;
            }
            $scope.total = data.total;
            $scope.isLoading = true;
            $scope.$apply();
        });
    }]);
