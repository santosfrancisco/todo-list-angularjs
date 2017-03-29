angular.module('app').controller('TodosController', function($scope, $mdToast, TodosFactory) {
    $scope.todos = [];
    $scope.ready = false;

    var getTodos = function() {
        TodosFactory.list().then(function(todos) {
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
        } else {
            alert('Título obrigatório');
        };
        $scope.title = '';
        TodosFactory.add(todo).then(getTodos);
    };

    $scope.removeTodo = function(id) {
        TodosFactory.remove(id).then(getTodos);
    };

    $scope.completeTodo = function(todo){
        TodosFactory.change(todo).then(getTodos);
    };
     $scope.cleanCompleteds = function() {
         console.log('dentro da func');
        TodosFactory.removeCompleteds().then(function(todos) {
            $scope.todos = todos;
            $scope.ready = true;
        });
    };

    getTodos();
});