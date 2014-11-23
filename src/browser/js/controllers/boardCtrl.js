var lists = [
	{
		title: 'To-Do',
		cards: [
			{
				title: 'Write something good'
			},
			{
				title: 'Code something'
			},
			{
				title: 'Code some more'
			},
			{
				title: 'Test it'
			},
			{
				title: 'Write something good'
			},
			{
				title: 'Code something'
			},
			{
				title: 'Code some more'
			},
			{
				title: 'Test it'
			},
			{
				title: 'Write something good'
			},
			{
				title: 'Code something'
			},
			{
				title: 'Code some more'
			},
			{
				title: 'Test it'
			},
			{
				title: 'Write something good'
			},
			{
				title: 'Code something'
			},
			{
				title: 'Code some more'
			},
			{
				title: 'Test it'
			}
		]
	},
	{
		title: 'Doing',
		cards: [
			{
				title: 'Finish wrapper'
			}
		]
	},
	{
		title: 'Done',
		cards: [
			{
				title: 'Make it red'
			},
			{
				title: 'Do more'
			}
		]
	}
];

function boardCtrl($scope) {
	$scope.lists = lists;

	$scope.addList = function() {
		$scope.lists.push({
			title: 'List ' + $scope.lists.length,
			cards: []
		});
	}
}

module.exports = ['$scope', boardCtrl];
