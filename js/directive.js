 angular.module('movieApp.directive', [])
     //3.创建一个自定义指令 ngActive
     .directive('ngActive', [function() {
         //4.把自定义指令的代码返回回去
         return {
             //5.把JS代码写在link的回调函数里面
             link: function(scope, element, attribute) {
                 //9.通过判断当前锚点值的什么 匹配对应的值  
                 switch (window.location.hash.split('/')[1]) {
                     case "":
                         //当匹配到主页的时候 就获取主页的标签添加active类名
                         document.querySelector('[ng-active="#/"]').classList.add('active');
                         break;
                     case "nowplaying":
                         //当匹配到正在热映的时候 就获取正在热映的标签添加active类名
                         document.querySelector('[ng-active="#/nowplaying"]').classList.add('active');
                         break;
                     case "later":
                         document.querySelector('[ng-active="#/later"]').classList.add('active');
                         break;
                     case "top250":
                         document.querySelector('[ng-active="#/top250"]').classList.add('active');
                         break;
                 }
                 // 6. 给当前元素添加点击事件
                 element.on('click', function() {
                     //7. 把所有的li的active类名清空
                     element.parent().find('li').removeClass('active');
                     //8. 给当前的li加上active类名
                     // 在事件里面 element就是指当前元素
                     element.addClass('active');
                 })
             }
         }
     }])
