function boardDirective($parse) {

	return {
		restrict: 'A',
		scope: false,
		link: function($scope, $elm, attrs) {
			var moving = null;
			var offset = null;
			var startPos = null;
			var movingContainer = null;
			var changed = [];
			var origin;
			var listGetter = $parse(attrs.board);
			var listSetter = listGetter.assign;

			$elm.on('contextmenu',function(evt) {
				evt.preventDefault();
			});

			$elm.on('mousedown','.card > .inner,.list > .inner > h3', function(evt) {
				evt.preventDefault();
				evt.stopPropagation();

				var $target = $(this);
				if ($target.is('h3')) {
					$target = $target.parent();
				}
				$target.parent().addClass('placeholder');
				$target.parent().css('height', $target.outerHeight());
				$target.addClass('moving');
				moving = $target;
				movingContainer = moving.closest('.card,.list');

				startPos = offset = $target.position();
				offset.left -= evt.pageX + $elm[0].scrollLeft;
				offset.top -= evt.pageY + $elm[0].scrollTop;

				moving.css({
					left: evt.pageX + offset.left,
					top: evt.pageY + offset.top
				});
			});

			$elm.on('mouseup', function(evt) {
				if (!moving) {
					return;
				}
				moving
					.removeClass('moving')
					.css({
						left:'',
						top:''
					});

				moving = null;
				movingContainer = null;

				$elm.find('.placeholder')
					.removeClass('placeholder')
					.css({
						height:''
					});

				if (changed) {
					var lists = listGetter($scope);
					if (!lists) {
						lists = [];
						listSetter($scope, lists);
					}

					var anyMoved = false;
					if (changed.is('.list-container')) {
						var newListIndex = changed.index();
						if (newListIndex !== origin.list) {
							var list = lists.splice(origin.list,1)[0];
							if (list) {

								lists.splice(newListIndex,0, list);
								anyMoved = true;
							}
						}

					} else {
						var newListIndex = changed.closest('.list-container').index();
						var newIx = changed.index();
						if (newListIndex !== origin.list || origin.index !== newIx) {
							var card = lists[origin.list].cards.splice(origin.index,1)[0];
							if (card) {
								lists[newListIndex].cards.splice(newIx, 0, card);
								anyMoved = true;
							}
						}

					}

					if (anyMoved) {
						changed.remove();
						$scope.$apply();
					}
				}

				origin = null;
				changed = null;
			});

			$elm.on('mousemove', function(evt) {
				if (!moving) {
					return;
				}
				moving.css({
					left: evt.pageX + offset.left,
					top: evt.pageY + offset.top
				});
			});

			$elm.on('mousemove', function(evt) {
				if (!movingContainer) {
					return;
				}

				if (!movingContainer.is('.card')) {
					return;
				}

				var coord = {
					x: evt.pageX,
					y: evt.pageY
				};

				var result = $();
				$elm.find('.card,.list').not('.moving,.placeholder').each(function() {
					var bbox = this.getBoundingClientRect();

					if (bbox.top <= coord.y &&
						bbox.bottom >= coord.y &&
						bbox.left <= coord.x &&
						bbox.right >= coord.x) {
						result = result.add(this);
					}

				});

				var cards = result.not('.list');

				if (!origin) {
					origin = {
						list: movingContainer.closest('.list-container').index(),
						index: movingContainer.index()
					};
				}

				if (cards.length > 0) {

					var bbox = cards[0].getBoundingClientRect();
					var halfHeight = bbox.height / 2;
					var diff = coord.y - bbox.top;
					if (diff > halfHeight) {
						cards.after(movingContainer);
					} else {
						cards.before(movingContainer);
					}
					changed = movingContainer;

				} else if (result.find('.card').length === 0) {
					result.find('ul').prepend(movingContainer);
					changed = movingContainer;

				}
			});

			$elm.on('mousemove', function(evt) {
				if (!movingContainer) {
					return;
				}

				if (!movingContainer.is('.list')) {
					return;
				}

				var container = movingContainer.parent();

				var coord = {
					x: evt.pageX,
					y: evt.pageY
				};

				var result = $();
				$elm.find('.list-container').each(function() {
					if ($(this).find('.moving').length > 0) {
						return;
					}

					var bbox = this.getBoundingClientRect();

					if (bbox.top <= coord.y &&
						bbox.bottom >= coord.y &&
						bbox.left <= coord.x &&
						bbox.right >= coord.x) {
						result = result.add(this);
					}
				});

				if (result.length < 1) {
					return;
				}

				if (!origin) {
					origin = {
						list: container.index(),
						index: -1
					};
				}


				var bbox = result[0].getBoundingClientRect();
				var halfWidth = bbox.width / 2;
				var diff = coord.x - bbox.left;
				if (diff > halfWidth) {
					result.after(container);
				} else {
					result.before(container);
				}

				changed = container;
			});
		}
	}
}


module.exports = ['$parse', boardDirective];
