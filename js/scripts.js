/* Description: Custom JS file */
(function ($) {
     'use strict';

     /* Navbar Scripts */
     // jQuery to collapse the navbar on scroll
     $(window).on('scroll load', function () {
          if ($('.navbar').offset().top > 60) {
               $('.fixed-top').addClass('top-nav-collapse');
          } else {
               $('.fixed-top').removeClass('top-nav-collapse');
          }
     });

     // jQuery for page scrolling feature - requires jQuery Easing plugin
     $(function () {
          $(document).on('click', 'a.page-scroll', function (event) {
               var $anchor = $(this);
               $('html, body')
                    .stop()
                    .animate(
                         {
                              scrollTop: $($anchor.attr('href')).offset().top,
                         },
                         600,
                         'easeInOutExpo'
                    );
               event.preventDefault();
          });
     });

     // hover in desktop mode
     function toggleDropdown(e) {
          const _d = $(e.target).closest('.dropdown'),
               _m = $('.dropdown-menu', _d);
          setTimeout(
               function () {
                    const shouldOpen = e.type !== 'click' && _d.is(':hover');
                    _m.toggleClass('show', shouldOpen);
                    _d.toggleClass('show', shouldOpen);
                    $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
               },
               e.type === 'mouseleave' ? 300 : 0
          );
     }
     $('body')
          .on('mouseenter mouseleave', '.dropdown', toggleDropdown)
          .on('click', '.dropdown-menu a', toggleDropdown);

     /* Rotating Text - Morphtext */
     $('#js-rotating').Morphext({
          // The [in] animation type. Refer to Animate.css for a list of available animations.
          animation: 'fadeIn',
          // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
          separator: ',',
          // The delay between the changing of each phrase in milliseconds.
          speed: 2000,
          complete: function () {
               // Called after the entrance animation is executed.
          },
     });

     /* Details Lightbox - Magnific Popup */
     $('.popup-with-move-anim').magnificPopup({
          type: 'inline',
          fixedContentPos: true,
          fixedBgPos: true,
          overflowY: 'auto',
          closeBtnInside: true,
          preloader: false,
          midClick: true,
          removalDelay: 300,
          mainClass: 'my-mfp-slide-bottom',
     });

     /* Image Lightbox - Magnific Popup */
     $('.popup-link').magnificPopup({
          removalDelay: 300,
          type: 'image',
          callbacks: {
               beforeOpen: function () {
                    this.st.image.markup = this.st.image.markup.replace(
                         'mfp-figure',
                         'mfp-figure ' + this.st.el.attr('data-effect')
                    );
               },
               beforeClose: function () {
                    $('.mfp-figure').addClass('fadeOut');
               },
          },
          gallery: {
               enabled: true, //enable gallery mode
          },
     });

     /* Image Slider - Swiper */
     var imageSlider = new Swiper('.image-slider', {
          autoplay: {
               delay: 2000,
               disableOnInteraction: false,
          },
          loop: false,
          navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
          },
          spaceBetween: 30,
          slidesPerView: 5,
          breakpoints: {
               // when window is <= 516px
               516: {
                    slidesPerView: 1,
                    spaceBetween: 10,
               },
               // when window is <= 767px
               767: {
                    slidesPerView: 2,
                    spaceBetween: 20,
               },
               // when window is <= 991px
               991: {
                    slidesPerView: 3,
                    spaceBetween: 30,
               },
               // when window is <= 1199px
               1199: {
                    slidesPerView: 4,
                    spaceBetween: 30,
               },
          },
     });

     /* Counter - CountTo */
     var a = 0;
     $(window).scroll(function () {
          if ($('#counter').length) {
               // checking if CountTo section exists in the page, if not it will not run the script and avoid errors
               var oTop = $('#counter').offset().top - window.innerHeight;
               if (a == 0 && $(window).scrollTop() > oTop) {
                    $('.counter-value').each(function () {
                         var $this = $(this),
                              countTo = $this.attr('data-count');
                         $({
                              countNum: $this.text(),
                         }).animate(
                              {
                                   countNum: countTo,
                              },
                              {
                                   duration: 2000,
                                   easing: 'swing',
                                   step: function () {
                                        $this.text(Math.floor(this.countNum));
                                   },
                                   complete: function () {
                                        $this.text(this.countNum);
                                        //alert('finished');
                                   },
                              }
                         );
                    });
                    a = 1;
               }
          }
     });

     /* Move Form Fields Label When User Types */
     // for input and textarea fields
     $('input, textarea').keyup(function () {
          if ($(this).val() != '') {
               $(this).addClass('notEmpty');
          } else {
               $(this).removeClass('notEmpty');
          }
     });

     /* Back To Top Button */
     // create the back to top button
     $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
     var amountScrolled = 700;
     $(window).scroll(function () {
          if ($(window).scrollTop() > amountScrolled) {
               $('a.back-to-top').fadeIn('500');
          } else {
               $('a.back-to-top').fadeOut('500');
          }
     });

     /* Removes Long Focus On Buttons */
     $('.button, a, button').mouseup(function () {
          $(this).blur();
     });

     const currentYearElement = document.getElementById('currentYear');
     const currentYear = new Date().getFullYear();
     currentYearElement.textContent = currentYear;
})(jQuery);
