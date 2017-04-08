angular.module('app').factory('TodosFactory', ['$q', '$http', function($q, $http) {
    // api host
    var myApi = 'https://todo-list-78110.firebaseio.com';
    return {
        list: function(showCompleteds) {
            var promessa = $q.defer();

            $http.get(myApi + '/todos.json')
                .then(function(result) {
                    var todos = [];
                    angular.forEach(result.data, function(todo, id) {
                        todo.id = id;
                        var completed = todo.completed;
                        if (showCompleteds) {
                            todos.push(todo);
                        } else {
                            if (!completed) {
                                todos.push(todo);
                            }
                        }
                    });
                    promessa.resolve(todos);
                });

            return promessa.promise;
        },
        add: function(todo) {
            var id = todo.id;
            delete todo.id;

            return $http.put(myApi + '/todos/' + id + '.json', todo);
        },
        change: function(todo) {
            var id = todo.id;
            completed = !todo.completed;
            return $http.put(myApi + '/todos/' + id + '/completed.json', completed);
        },
        remove: function(id) {
            $http.delete(myApi + '/todos/' + id + '.json');
        },
        removeCompleteds: function() {
            var promessa = $q.defer();

            $http.get(myApi + '/todos.json')
                .then(function(result) {
                    var todos = [];
                    angular.forEach(result.data, function(todo, id) {
                        todo.id = id;
                        var completed = todo.completed;
                        if (completed) {
                            $http.delete(myApi + '/todos/' + id + '.json');
                        } else {
                            todos.push(todo);
                        }
                    });
                    promessa.resolve(todos);
                });

            return promessa.promise;
        }
    };
}]);