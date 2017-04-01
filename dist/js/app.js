var app=angular.module("app",["ngMaterial"]);angular.module("app").controller("TodosController",["$scope","TodosFactory",function(o,t){o.todos=[],o.ready=!1;var e=function(){t.list().then(function(t){o.todos=t,o.ready=!0})};o.addTodo=function(){var n={};o.new_todo.$valid?(n.id=Date.now()+"",n.title=o.title,n.date=(new Date).toLocaleDateString("en-GB"),n.completed=!1):alert("Título obrigatório"),o.title="",t.add(n).then(e)},o.removeTodo=function(o){t.remove(o).then(e)},o.completeTodo=function(o){t.change(o).then(e)},o.cleanCompleteds=function(){t.removeCompleteds().then(e)},e()}]),angular.module("app").factory("TodosFactory",["$q","$http",function(o,t){return{list:function(){var e=o.defer();return t.get("https://todo-list-78110.firebaseio.com/todos.json").then(function(o){var t=[];angular.forEach(o.data,function(o,e){o.id=e,t.push(o)}),e.resolve(t)}),e.promise},add:function(o){var e=o.id;return delete o.id,t.put("https://todo-list-78110.firebaseio.com/todos/"+e+".json",o)},change:function(o){var e=o.id,n=!o.completed;return t.put("https://todo-list-78110.firebaseio.com/todos/"+e+"/completed.json",n)},remove:function(o){t.delete("https://todo-list-78110.firebaseio.com/todos/"+o+".json")},removeCompleteds:function(){var e=o.defer();return t.get("https://todo-list-78110.firebaseio.com/todos.json").then(function(o){var n=[];angular.forEach(o.data,function(o,e){o.id=e,o.completed?t.delete("https://todo-list-78110.firebaseio.com/todos/"+o.id+".json"):n.push(o)}),e.resolve(n)}),e.promise}}}]);