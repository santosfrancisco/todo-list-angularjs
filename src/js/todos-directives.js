var app = angular.module('todos-directives', []);
app.directive('addTodoForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/add-todo.html'
    };
});
app.directive('loading', function() {
    return {
        retrict: 'AE',
        templateUrl: 'common/loading.html'
    };
});
app.directive('listTodos', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/list-todos.html'
    };
});