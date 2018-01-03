'use strict';
if(!window.console)window.console = {};
if(!window.console.memory) window.console.memory = function() {};
if(!window.console.debug) window.console.debug = function() {};
if(!window.console.error) window.console.error = function() {};
if(!window.console.info) window.console.info = function() {};
if(!window.console.log) window.console.log = function() {};

(function(){
  $('.js-slider').slick();
  $('.scroll-b').mCustomScrollbar();
  var dateToday = new Date(); 
  $('#datepicker').datepicker({
	dateFormat: 'dd.mm.yy',
	constrainInput: false,
	altField: ".js-sum-time",
	altFormat: "dd.mm.yy",
	setDate: 0,
	minDate: dateToday
  });
  $('#datepicker').datepicker("setDate", new Date());
  $('.tel-mask').mask('+7 (999) 999-99-99 ')
})();

var tabs = (function(){
	var tabBtn = $('.js-tab');

	tabBtn.click(function(){
		var $num = $(this) .index();
		var $tab = $('.services-tab');
		if($(this).hasClass('active')){
			return false;
		} else{
			tabBtn.removeClass('active');
			$(this).addClass('active');
			$tab.hide();
			$tab.eq($num).show();
		}
	});
})();

var riviewsSlider = (function(){
	var slider = $('.js-reviews-slider');

	slider.slick({
		adaptiveHeight: true
	});

	slider.on('afterChange', function(slick, currentSlide) {
		$('.reviews__info-item').removeClass('active');
		$('.reviews__info-item').eq(currentSlide.currentSlide).addClass('active');
	});
})();

var formTabs = (function(){
	var
		tabBtn = $('.js-tab-btn'),
		tab = $('.form-tab__container').children()
	;

	tabBtn.click(function(e){
		var num = $(this).index();
		var currentTab = $(this).closest('.form-tab-btns__wrap').next().children().not('.form__hide, .btn, .datepicker').find('.form-tab');
		e.preventDefault();
		$(this).parent().find(tabBtn).removeClass('active');
		$(this).addClass('active');
		currentTab.hide();
		currentTab.eq(num).show();
	});

})();

var tabCheck = (function(){
	var 
		radioBtn = $('.js-servise-input'),
		sumService = $('.js-sum-service span'),
		sumDoctor = $('.js-sum-doctor span'),
		sumDate = $('.js-sum-date span'),
		sumTime = $('.js-sum-time span'),
		sumClinic = $('.js-sum-clinik span'),
		firstStep = $('.js-first-step'),
		selectBtn = $('.s-drop-list__item'),
		timeBtn = $('.js-time-input'),
		nextBtn = $('.js-step-btn'),
		btnWrap = $('.form-tab-btns__wrap'),
		tabWrap = $('.form-tab__container'),
		pagination = $('.form-pagination'),
		datepicker = $('.datepicker'),
		backBtn = $('.js-back-btn'),
		timeBtn = $('.js-time-input'),
		btnSubmit = $('.js-submit'),
		adressInput = $('.js-adress-input')
	;

	timeBtn.on('change', function(){
		var timeCur = $(this).next().text();
		var adressTxt = $(this).closest('.form-tab__container').prev().find(':not(.form__hide)').find('.active').text();
		sumTime.text(timeCur);
		sumClinic.text(adressTxt);
		adressInput.val(adressTxt);
		nextBtn.removeClass('disabled');
		tabWrap.addClass('ok');
	});

	nextBtn.click(function(e){
		e.preventDefault();
		var $this = $(this);
		if($this.hasClass('step-1')){
			btnWrap.children().eq(0).addClass('form__hide');
			btnWrap.children().eq(1).removeClass('form__hide');
			tabWrap.children().not('.btn, .datepicker').eq(0).addClass('form__hide');
			tabWrap.children().not('.btn, .datepicker').eq(1).removeClass('form__hide');
			datepicker.removeClass('form__hide');
			pagination.children().removeClass('active');
			pagination.children().eq(1).addClass('active');
			$this.removeClass('step-1');
			sumDate.text($('#datepicker').val());
			backBtn.addClass('show');
			$this.addClass('step-2');
			console.log($('.ok').length);
			if($('.ok').length > 0){
				console.log('op');
			}else{
				$this.addClass('disabled');
			}
		} else if($this.hasClass('step-2')){
			pagination.children().removeClass('active');
			pagination.children().eq(2).addClass('active');
			btnWrap.hide();
			datepicker.hide();
			tabWrap.children().not('.btn, .datepicker').eq(1).addClass('form__hide');
			tabWrap.children().not('.btn, .datepicker').eq(2).removeClass('form__hide');
			backBtn.removeClass('step-2');
			backBtn.addClass('step-3');
			btnSubmit.removeClass('form__hide');
			$('.form__summary').removeClass('form__hide');
			tabWrap.addClass('finish');

			$this.addClass('form__hide');
		}
	});

	backBtn.click(function(e){
		e.preventDefault();
		var $this = $(this);
		if($this.hasClass('step-2')){
			btnWrap.children().eq(0).removeClass('form__hide');
			btnWrap.children().eq(1).addClass('form__hide');
			tabWrap.children().not('.btn, .datepicker').eq(0).removeClass('form__hide');
			tabWrap.children().not('.btn, .datepicker').eq(1).addClass('form__hide');
			nextBtn.removeClass('disabled');
			nextBtn.removeClass('step-2');
			nextBtn.addClass('step-1');
			datepicker.addClass('form__hide');
			pagination.children().removeClass('active');
			pagination.children().eq(0).addClass('active');

			$this.removeClass('show');
		}else if($this.hasClass('step-3')){
			nextBtn.removeClass('form__hide');
			btnSubmit.addClass('form__hide');
			tabWrap.removeClass('finish');
			datepicker.show();
			pagination.children().removeClass('active');
			pagination.children().eq(1).addClass('active');
			tabWrap.children().not('.btn, .datepicker').eq(1).removeClass('form__hide');
			tabWrap.children().not('.btn, .datepicker').eq(2).addClass('form__hide');
			$this.removeClass('step-3');
			$this.addClass('step-2');
			$('.form__summary').addClass('form__hide');
			btnWrap.show();
		}

	});

	radioBtn.click(function(){
		var radioText = $(this).next().text();
		sumService.text(radioText);
		$('.js-form-photo').addClass('hide');
		$('.js-form-name').text('Выберите специалиста');
		$('.js-select-input').attr('value', '');
		$('.js-select-input').attr('disabled', 'true');
		nextBtn.removeClass('disabled');
		sumDoctor.text('');
		showFinal();
	});

	selectBtn.click(function(){
		var doctorText = $(this).find('.s-drop-list__name').text();
		nextBtn.removeClass('disabled');
		sumDoctor.text(doctorText);
		sumService.text('');
		showFinal();
	});

	function showFinal(){
		for (let i = 0; i < firstStep.length; i++) {
			if(firstStep.eq(i).find('span').text().length <= 0){
				firstStep.eq(i).hide();
			} else {
				firstStep.eq(i).show();
			}
		}
	}

	showFinal();
})();

var formSelect = (function(){
	var 
		current = $('.spec__current'),
		dropMenu = $('.s-drop-list__wrap'),
		dropMenuItem = $('.s-drop-list__item'),
		name = $('.js-form-name'),
		photo = $('.js-form-photo img'),
		input = $('.js-select-input')
	;
	
	current.click(function(){
		dropMenu.show();
	});

	$(document).on('click touchstart', function () {
		if (!dropMenu.is(event.target) && dropMenu.has(event.target).length === 0 && !current.is(event.target) && current.has(event.target).length === 0){
			dropMenu.stop().hide();
		}
	}); //missclick function
	
	dropMenuItem.click(function(){
		if($(this).hasClass('active')){
			return false;
		} else{
			var nameText = $(this).find('.s-drop-list__name').text();
			var photoItem = $(this).find('.s-drop-list__photo img').attr('src');
			var id = $(this).attr('data-id');
			dropMenuItem.removeClass('active');
			$(this).addClass('active');
			name.text(nameText);
			photo.attr('src', photoItem);
			input.attr('disabled', false);
			input.attr('value', nameText);
			input.attr('data-id', id);
			console.log(id);
			$('.js-form-photo').removeClass('hide');
			$('.js-servise-input').prop('checked', false); //remove chekced from services
			dropMenu.hide();
		}
	});
})();

/* var tabSwitcher = (function(){
	var $btn = $('.switch__link');
  var $tab = $('.tab');
  
	$btn.on('click', function(e){
  	e.preventDefault();
    var $num = $(this).parent().index();
    $btn.removeClass('active');
    $(this).addClass('active');
    $tab.hide();
    $tab.eq($num).show();
  });  
})(); */

/* (function(window, document) {
    'use strict';
    var file = 'img/sprite.svg'; // путь к файлу спрайта на сервере

    if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
    var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
	request,
	data,
	insertIT = function() {
		document.body.insertAdjacentHTML('afterbegin', data);
	},
	insert = function() {
		if (document.body) insertIT();
		else document.addEventListener('DOMContentLoaded', insertIT);
	};
    if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
	data = localStorage.getItem('inlineSVGdata');
	if (data) {
		insert();
		return true;
	}
    }
    try {
	request = new XMLHttpRequest();
	request.open('GET', file, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			data = request.responseText;
			insert();
			if (isLocalStorage) {
				localStorage.setItem('inlineSVGdata', data);
				localStorage.setItem('inlineSVGrev', revision);
			}
		}
	}
	request.send();
    } catch (e) {}
}(window, document)); */