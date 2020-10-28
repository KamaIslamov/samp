const videoSwiper = document.querySelector('.chooseWaySwiper-container');


let videoSwiper1 = new Swiper(videoSwiper, {
    loop: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    autoplay: {
        delay: 1500,
    },
    breakpoints: {
        // 320: {
        //     slidesPerView: 1,
        //     spaceBetween: 20
        // },
        640: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1260: {
            slidesPerView: 3,
            spaceBetween: 100,
        }
    }
});

const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lock-padding');
const body = document.querySelector('body');

let unlock = true;

const timeout = 100;

if (popupLinks.length > 0 ) {
    popupLinks.forEach((el) => {
        el.addEventListener('click', function (e) {
            const popupName = el.getAttribute('href').replace('#','');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
            console.log('2')
        })
    });
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    popupCloseIcon.forEach((el) => {
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        })
    })
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive,false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'))
            }
        })
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        lockPadding.forEach((el) => {
            el.style.paddingRight = lockPaddingValue
        })
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    },timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        if (lockPadding.length > 0 ) {
            lockPadding.forEach((el) => {
                el.style.paddingRight = '0px';
            })
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock')
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout)
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive)
    }
});