function listCtrl($scope) {

	$scope.newCard = {
		title:''
	};

	$scope.addNewCard = function() {
		if ($scope.newCard.title) {
			$scope.list.cards.push(angular.copy($scope.newCard));

			$scope.newCard = {
				title:''
			};
		}
	};
}

module.exports = ['$scope', listCtrl];
