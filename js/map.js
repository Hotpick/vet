if($('.map').length > 0){
	var map = (function(){
		ymaps.ready(function () {
			var myMap = new ymaps.Map('map', {
					center: [48.7515298, 44.4966436],
					zoom: 10,
					controls: []
				}, {
					searchControlProvider: 'yandex#search'
				}),
	
				// Создадим пользовательский макет ползунка масштаба.
				ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>" +
				"<div id='zoom-in' class='y-btn y-btn__plus'></div><br>" +
				"<div id='zoom-out' class='y-btn y-btn__minus'></div>" +
				"</div>", {
	
				// Переопределяем методы макета, чтобы выполнять дополнительные действия
				// при построении и очистке макета.
				build: function () {
					// Вызываем родительский метод build.
					ZoomLayout.superclass.build.call(this);
	
					// Привязываем функции-обработчики к контексту и сохраняем ссылки
					// на них, чтобы потом отписаться от событий.
					this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
					this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
	
					// Начинаем слушать клики на кнопках макета.
					$('#zoom-in').bind('click', this.zoomInCallback);
					$('#zoom-out').bind('click', this.zoomOutCallback);
				},
	
				clear: function () {
					// Снимаем обработчики кликов.
					$('#zoom-in').unbind('click', this.zoomInCallback);
					$('#zoom-out').unbind('click', this.zoomOutCallback);
	
					// Вызываем родительский метод clear.
					ZoomLayout.superclass.clear.call(this);
				},
	
				zoomIn: function () {
					var map = this.getData().control.getMap();
					map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
				},
	
				zoomOut: function () {
					var map = this.getData().control.getMap();
					map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
				}
			}),
			zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});
	
			myMap.controls.add(zoomControl, {
				position: {
					top: 280,
					right: 40
				}
			});
		
				myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
					hintContent: 'Собственный значок метки',
					balloonContent: '<div class="map__pop">'+
					'<h2>Клиника</h2>' +
					'<p><span>Адрес:</span>Волгоград, Дзержинский район, бул. 30 лет Победы, 72<p>' +
					'<p><span>Телефон:</span>(8442) 504-004<p>' +
					'</div>',
				}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#image',
					// Своё изображение иконки метки.
					iconImageHref: 'img/drugstore.png',
					// Размеры метки.
					iconImageSize: [51, 63],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-5, -38]
				}),
				myPlacemarkWithContent = new ymaps.Placemark([48.793989, 44.572172], {
					hintContent: 'Собственный значок метки с контентом',
					balloonContent: '<div class="map__pop">'+
					'<h2>Клиника</h2>' +
					'<p><span>Адрес:</span>Волгоград, Дзержинский район, бул. 30 лет Победы, 72<p>' +
					'<p><span>Телефон:</span>(8442) 504-004<p>' +
					'</div>',
				}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: 'img/drugstore.png',
					// Размеры метки.
					iconImageSize: [51, 63],
					iconImageOffset: [-24, -24],
					iconContentOffset: [15, 15]
				}),
				myPlacemarkWithContent2 = new ymaps.Placemark([48.695431, 44.493601], {
					hintContent: 'Собственный значок метки с контентом',
					balloonContent: '<div class="map__pop">'+
					'<h2>Клиника</h2>' +
					'<p><span>Адрес:</span>Волгоград, Дзержинский район, бул. 30 лет Победы, 72<p>' +
					'<p><span>Телефон:</span>(8442) 504-004<p>' +
					'</div>',
				}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: 'img/clinic.png',
					// Размеры метки.
					iconImageSize: [51, 63],
					iconImageOffset: [-24, -24],
					iconContentOffset: [15, 15]
				}),
				myPlacemarkWithContent3 = new ymaps.Placemark([48.511348, 44.544652], {
					hintContent: 'Собственный значок метки с контентом',
					balloonContent: '<div class="map__pop">'+
					'<h2>Клиника</h2>' +
					'<p><span>Адрес:</span>Волгоград, Дзержинский район, бул. 30 лет Победы, 72<p>' +
					'<p><span>Телефон:</span>(8442) 504-004<p>' +
					'</div>',
				}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: 'img/drugstore.png',
					// Размеры метки.
					iconImageSize: [51, 63],
					iconImageOffset: [-24, -24],
					iconContentOffset: [15, 15]
				});
				
			myMap.behaviors.disable('scrollZoom'); 

			$('.js-yandex-zoom').click(function(e){
				e.preventDefault();
				var lat = $(this).attr('data-lat');
				var leng = $(this).attr('data-leng');
				console.log([lat, leng]);
				myMap.setCenter([lat, leng], 17, { checkZoomRange: true });
			});
		
			myMap.geoObjects
				.add(myPlacemark)
				.add(myPlacemarkWithContent)
				.add(myPlacemarkWithContent2)
				.add(myPlacemarkWithContent3);
		});
	})();
}