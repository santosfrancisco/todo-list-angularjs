angular.module('app').controller('TodosController', ['$scope', 'TodosFactory', function($scope, TodosFactory) {
    $scope.todos = [];
    $scope.ready = false;
    $scope.showCompleteds = true;

    var getTodos = function getTodos() {
        TodosFactory.list($scope.showCompleteds).then(function(todos) {
            $scope.todos = todos;
            $scope.ready = true;
        });
    };

    $scope.addTodo = function addTodo() {
        var todo = {};
        if ($scope.new_todo.$valid) {
            todo.id = Date.now() + '';
            todo.title = $scope.title;
            todo.date = new Date().toLocaleDateString('en-GB');
            todo.completed = false;
            $scope.todos.push(todo);
            $scope.title = null;
            TodosFactory.add(todo).then(getTodos);
        } else {
            return
        };
        $scope.new_todo.$setPristine();
        $scope.new_todo.$setUntouched();
    };

    $scope.removeTodo = function(todo) {
        // TodosFactory.remove(todo.id);
        TodosFactory.remove(todo);
        var idx = $scope.todos.indexOf(todo);
        $scope.todos.splice(idx, 1);
    };

    $scope.completeTodo = function(todo) {
        TodosFactory.change(todo).then(
            getTodos);
    };

    $scope.removeCompleteds = function() {
        TodosFactory.removeCompleteds().then(getTodos);
    };
    $scope.listCompleteds = function() {
        getTodos();
    }
    getTodos();
}]);