// here fetching data from my own api then assign it to the scope object sothat it can accessed by template
var app=angular.
				module('birthdayApp',[])
				.controller('birthdayCOntroller',function($scope,$http){
					$http.get('http://localhost:8000/api/birthday_list/').success(function(response){
						$scope.birthday_list=response.data;
					});
				})