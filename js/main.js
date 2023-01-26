$(function () {
  $('.header__btn').on('click', function () {
    $('.uppersider__menu').removeClass('uppersider__menu-close');
  });
  $('.uppersider__menu__close').on('click', function () {
    $('.uppersider__menu').addClass('uppersider__menu-close');
  });

  $('.categories__items').slick({
    prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"><img src="images/arrow-right.png" alt=""></button>',
    prevArrow: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
    ]
  });

  $('.accordion__language__link').on('click', function () {
    if ($('.accordion__language').hasClass('one')) {
      $('.accordion__language__link').not($(this)).removeClass('active');
      $('.accordion__language__box').not($(this).next()).slideUp(300);
    }
    $(this).toggleClass('active').next().slideToggle(300);

  });
  $('.menu__button').on('click', function () {
    $('.menu').toggleClass('menu__open');
  });


})

