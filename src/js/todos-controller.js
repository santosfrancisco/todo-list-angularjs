angular.module('app').controller('TodosController', ['$scope', 'TodosFactory', function($scope, TodosFactory) {
    $scope.todos = [];
    $scope.ready = false;
    $scope.showCompleteds = false;

    var getTodos = function getTodos() {
        TodosFactory.list($scope.showCompleteds).then(function(todos) {
            $scope.todos = todos;
            $scope.ready = true;
        });
    };

    $scope.addTodo = function addTodo() {
        var todo = {};
        if ($scope.title) {
            todo.id = Date.now() + '';
            todo.title = $scope.title;
            todo.date = new Date().toLocaleDateString('en-GB');
            todo.completed = false;
        } else {
            alert('Título obrigatório');
        };

        $scope.todos.push(todo);
        $scope.title = '';
        TodosFactory.add(todo).then(getTodos);
        $scope.new_todo.$setPristine();
        $scope.new_todo.$setUntouched();
    };

    $scope.removeTodo = function(todo) {
        TodosFactory.remove(todo.id);
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