angular.module('app').factory('TodosFactoryV2', ['$http', '$q', function($http, $q) {
    var myApi = "https://polar-forest-11830.herokuapp.com/api";
    return {
        list: function(showCompleteds) {
            var promessa = $q.defer();

            $http.get(myApi + '/todos')
                .then(function(result) {
                    var todos = [];
                    angular.forEach(result.data, function(todo, id) {
                        todo.id = id;
                        var completed = todo.completed;
                        // 	Converte a data usando configurações locais
                        todo.date = new Date(todo.date).toLocaleDateString();

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
            var data = {
                title: todo.title,
                completed: false,
                date: Date.now()
            };
            return $http.post(myApi + '/todos', data);
        },
        remove: function(todo) {
            return $http.delete(myApi + '/todos/' + todo._id);
        },
        change: function(todo) {
            todo.completed != todo.completed;
            var data = {
                completed: !todo.completed,
                title: todo.title
            };
            return $http.put(myApi + '/todos/' + todo._id, data);
        },
        removeCompleteds: function() {

            return $http.get(myApi + '/todos')
                .then(function(result) {
                    var todos = [];
                    angular.forEach(result.data, function(todo, id) {
                        todo.id = id;
                        var completed = todo.completed;

                        if (completed) {
                            $http.delete(myApi + '/todos/' + todo._id);
                        }
                    });
                });

        }
    }
}]);