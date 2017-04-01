var app = angular.module('app', ['ngMaterial']);
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
        }

        $scope.title = '';
        TodosFactory.add(todo).then(getTodos);
    };

    $scope.removeTodo = function(id) {
        TodosFactory.remove(id).then(getTodos);
    };

    $scope.completeTodo = function(todo) {
        TodosFactory.change(todo).then(getTodos);
    };
    $scope.cleanCompleteds = function() {
        TodosFactory.removeCompleteds().then(function(todos) {
            $scope.todos = todos;
            $scope.ready = true;
        });
    };

    getTodos();
});
angular.module('app').factory('TodosFactory', function($q, $http) {
    return {
        list: function() {
            var promessa = $q.defer();

            $http.get('https://todo-list-78110.firebaseio.com/todos.json')
                .then(function(result) {
                    var todos = [];
                    angular.forEach(result.data, function(todo, id) {
                        todo.id = id;
                        todos.push(todo);
                    });
                    promessa.resolve(todos);
                });

            return promessa.promise;
        },
        add: function(todo) {
            var id = todo.id;
            delete todo.id;

            return $http.put('https://todo-list-78110.firebaseio.com/todos/' + id + '.json', todo);
        },
        change: function(todo) {
            var id = todo.id,
                completed = !todo.completed;

            return $http.put('https://todo-list-78110.firebaseio.com/todos/' + id + '/completed.json', completed);
        },
        remove: function(id) {
            $http.delete('https://todo-list-78110.firebaseio.com/todos/' + id + '.json');
        },
        removeCompleteds: function() {
            var promessa = $q.defer();

            $http.get('https://todo-list-78110.firebaseio.com/todos.json')
                .then(function(result) {
                    var todos = [];
                    angular.forEach(result.data, function(todo, id) {
                        todo.id = id;
                        var completed = todo.completed;
                        if (completed) {
                            $http.delete('https://todo-list-78110.firebaseio.com/todos/' + todo.id + '.json');
                        } else {
                            todos.push(todo);
                        }
                    });
                    promessa.resolve(todos);
                });

            return promessa.promise;
        }
    };
});