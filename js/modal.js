const popupLinks = document.querySelectorAll('.popup__link')
const popup = document.querySelectorAll('.popup')
const body = document.querySelector('body')

let unlock = true
if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');

            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        })
    }
}
const popupCloseIcon = document.querySelectorAll('.popup__close')

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        })
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.hidden')
        if (popupActive) {
            popupClose(popupActive, false)
        }
        curentPopup.classList.remove('hidden')
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'))
            }
        })
    }
}
function popupClose(popupActive) {
    if (unlock) {
        popupActive.classList.toggle('hidden')
    }
}

const closeAll = document.querySelectorAll('.close__All')
closeAll.forEach(function (item) {
    item.addEventListener('click', function () {

        popup.forEach(function (item) {
            item.classList.add('hidden')
        })
    })
})

function showPassword() {
    const passwordBtn = document.querySelector('.password__btn')
    const passwodrInput = document.querySelector('.password__input')
    passwordBtn.addEventListener('click', function () {
        passwordBtn.classList.toggle('password__btn__active')
        if (passwodrInput.getAttribute('type') === 'password') {
            passwodrInput.setAttribute('type', 'text')
        } else {
            passwodrInput.setAttribute('type', 'password')
        }
    })

}
showPassword()


