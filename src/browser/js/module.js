var mod = angular.module('kanban', ['ng', 'ngRoute']);

mod.controller('boardCtrl', require('./controllers/boardCtrl'))
	.controller('listCtrl', require('./controllers/listCtrl'))
	.controller('cardCtrl', require('./controllers/cardCtrl'));

mod.directive('board', require('./directive/boardDirective'));

module.exports = mod;
