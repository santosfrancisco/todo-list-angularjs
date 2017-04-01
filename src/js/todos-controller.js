angular.module('app').controller('TodosController', ['$scope', 'TodosFactory', function($scope, TodosFactory) {
    $scope.todos = [];
    $scope.ready = false;
    $scope.showCompleteds = true;

    $scope.getTodos = function(showCompleteds) {
        if ($scope.showCompleteds) {
            TodosFactory.list().then(function(todos) {
                $scope.todos = todos;
                $scope.ready = true;

            });
        } else {
            TodosFactory.hideCompleteds().then(function(todos) {
                $scope.todos = todos;
                $scope.ready = true;
            });
        }

    };

    $scope.addTodo = function addTodo() {
        var todo = {};
        if ($scope.new_todo.$valid) {
            todo.id = Date.now() + '';
            todo.title = $scope.title;
            todo.date = new Date().toLocaleDateString('en-GB');
            todo.completed = false;
        } else {
            alert('Título obrigatório');
        };

        $scope.todos.push(todo);
        $scope.title = '';
        TodosFactory.add(todo).then($scope.getTodos);
    };

    $scope.removeTodo = function(id) {
        TodosFactory.remove(id).then($scope.getTodos);
    };

    $scope.completeTodo = function(todo) {
        TodosFactory.change(todo).then($scope.getTodos);
    };

    $scope.removeCompleteds = function() {
        TodosFactory.removeCompleteds().then($scope.getTodos);
    };

    $scope.getTodos($scope.showCompleteds);
}]);