const tabParent = document.querySelector('.tabheader__items')
const tabItems = document.querySelectorAll('.tabheader__item')
const tabContent = document.querySelectorAll('.tabcontent')

const hideTabContent = () => {
    tabContent.forEach((tab) => {
        tab.classList.add('content_hide')
        tab.classList.remove('content_show')
    })
    tabItems.forEach((tab) => {
        tab.classList.remove('tabheader__item_active')
    })
}


const showContent = (i = 0) => {
    tabContent[i].classList.add('content_show')
    tabContent[i].classList.remove('content_hide')
        tabItems[i].classList.add('tabheader__item_active')
}

hideTabContent();
showContent();


tabParent.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.classList.contains('tabheader__item_active')) {
        tabItems.forEach((item, idx) => {
            if (item === target) {
                hideTabContent();
                showContent(idx)
            }
        })
    }
})

const modal = document.querySelector('.modal')
const open = document.querySelector('#open_modal')
const close = document.querySelector('#close_modal')

open.addEventListener('click', () => {
    modal.classList.remove('close_modal')
    modal.classList.add('open_modal')
})

close.addEventListener('click', () => {
    modal.classList.remove('open_modal')
    modal.classList.add('close_modal')
})

////post Request

const messageText = {
    loading: 'Loading...',
    success: 'Все успешно сохранено!',
    error: 'Ошибка при запросе!'
}

const forms = document.querySelectorAll('form');

forms.forEach((form) => {
    postData(form);
})


const img = document.createElement('img')
img.src = 'load.gif'

        function postData(form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const messageBlock = document.createElement('div');
                messageBlock.textContent = messageText.loading;
                messageBlock.style.textAlign = 'center'
                messageBlock.style.background = 'grey'
                messageBlock.style.backgroundImage = img
                messageBlock.appendChild(img)

                form.append(messageBlock)
                const request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                // req.setRequestHeader('Content-Type', 'multipart/form-data')


        const formData = new FormData(form);
        
        console.log(formData, 'formData');
        const obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        })

        console.log(obj);
        request.send(formData);
        request.addEventListener('load', () => {
            if (request.status === 200) {
        const response = request.response;
        console.log(response, 'response from server');
        messageBlock.textContent = messageText.success;
        messageBlock.style.textAlign = 'center'
        messageBlock.style.background = 'green'
            } else {
        console.log('request error');
        messageBlock.textContent = messageText.error;
        messageBlock.style.backgroundColor = 'red'
        messageBlock.style.textAlign = 'center'

        }
    })

})
}