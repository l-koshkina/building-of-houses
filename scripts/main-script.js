$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    $('.image-popup').magnificPopup({
        type: 'image'
    });
    $('.project-image-small').magnificPopup({
        delegate: 'a',
        gallery: {
            enabled: true
        },
        type: 'image',
    });

    //Показать меню

    $('.burger-menu').on('click', function () {
        $('.menu').css('left', '0');
    })

    //Скрыть меню

    $('.close-menu').on('click', function () {
        $('.menu').css('left', '-700px');
    })

    $('.menu-list-item').on('click', function () {
        $('.menu').css('left', '-700px');
    })

    // Посмотреть 3 проекта

    let showMore = $('.show-more-projects');
    let hideMore = $('.hide-more-projects');

    showMore.on('click', function () {
        $('.more-projects').slideDown();
        showMore.hide();
        hideMore.css('display', 'flex');
    })

    hideMore.on('click', function () {
        $('.more-projects').slideUp();
        hideMore.hide();
        showMore.css('display', 'flex');
    })


    if ($(document).width() < 767) {
        $('.dot-border').on('click', function (){
            $('.dot-border').css("border-color", "rgb(236, 198, 107)");
            $('.dot').css("background-color", "rgb(236, 198, 107)");
            $(this).css("border-color", "rgb(252, 237, 203)");
            $(this).children('div').css("background-color", "rgb(252, 237, 203)");
            let technologyInfo = $(this).data('info-target');
            $('.technology-info-mobile').removeClass('active');
            $(technologyInfo).addClass('active');
        })

    }



    //Инициализация слайдера

    let swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            767: {
                // navigation: false
            },
        }
    });

    //Скролл к блоку консультации

    $('.scroll-to-consultation').on('click', function () {
        let target = $('#' + $(this).data('target'));
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 0);
    })

    //Валидация формы консультации

    let consInput = $('.consultation-input');
    let consName = $('#cons-name');
    let consPhone = $('#cons-phone');
    let consCheckbox = $('#cons-checkbox');
    let consCheckboxText = $('.consultation-checkbox-text');

    consPhone.mask('+7 (999) 999-99-99');

    $('#send-consultation-form').on('click', function () {

        console.log(1);

        let error = false;

        $('.input-error').hide();
        consInput.css('border-color', 'white');
        consCheckboxText.removeClass('consultation-checkbox-text-error');

        if (!consName.val()) {
            consName.next().show();
            consName.css('border-color', '#be0202');
            error = true;
        }

        if (!consPhone.val()) {
            consPhone.next().show();
            consPhone.css('border-color', '#be0202');
            error = true;
        }

        if (!consCheckbox.prop('checked')) {
            $('.consultation-checkbox').next().show();
            consCheckbox.css('border-color', '#be0202');
            consCheckboxText.addClass('consultation-checkbox-text-error');
            error = true;
        }

        if (!error) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: consName.val(), phone: consPhone.val()}
            })
                .done(function (msg) {

                    if (msg.success) {
                        $('.consultation-title').hide();
                        $('.consultation-form').hide();
                        $('.consultation-success').show();
                    } else {
                        alert('Возникла ошибка, позвоните нам')
                    }
                });
        }
    });

    //Показать/скрыть попап

    $('.excursion-btn').on('click', function () {
        $('.popup').show();
    });

    $('.popup-close').on('click', function () {
        $('.popup').hide();
    });

    let popupOverlay = $('.popup-overlay');
    let popupForm = $('.popup-form');

    popupOverlay.on('click', function (e) {
        if (e.target === this) {
            $('.popup').hide();
            popupForm[0].reset();
            popupForm.show();
            $('.popup-title').show();
            $('.input-error').hide();
            popupInput.css('border-color', 'white');
            popupCheckboxText.removeClass('popup-checkbox-text-error');
            $('.popup-success').hide();
        }
    });

//Валидация формы попап


    let popupInput = $('.popup-input');
    let popupName = $('#popup-name');
    let popupPhone = $('#popup-phone');
    let popupCheckbox = $('#popup-checkbox');
    let popupCheckboxText = $('.popup-checkbox-text');

    popupPhone.mask('+7 (999) 999-99-99');

    $('#send-popup-form').on('click', function () {

        console.log(1);

        let error = false;

        $('.input-error').hide();
        popupInput.css('border-color', 'white');
        popupCheckboxText.removeClass('popup-checkbox-text-error');

        if (!popupName.val()) {
            popupName.next().show();
            popupName.css('border-color', '#be0202');
            error = true;
        }

        if (!popupPhone.val()) {
            popupPhone.next().show();
            popupPhone.css('border-color', '#be0202');
            error = true;
        }

        if (!popupCheckbox.prop('checked')) {
            $('.popup-checkbox').next().show();
            popupCheckbox.css('border-color', '#be0202');
            popupCheckboxText.addClass('popup-checkbox-text-error');
            error = true;
        }

        if (!error) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: popupName.val(), phone: popupPhone.val()}
            })
                .done(function (msg) {

                    if (msg.success) {
                        $('.popup-title').hide();
                        popupForm.hide();
                        $('.popup-success').show();
                    } else {
                        alert('Возникла ошибка, позвоните нам')
                    }
                });
        }
    });



});