const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormBtn = $messageForm.querySelector('button')

const $messages = document.querySelector('#messages')

socket.on('message', (data) => {
    const html = `
        <div>
            <p>${data.text}(${data.username} ${moment(data.createdAt).format('DD.MM HH:mm')})</p>
        </div>
    `
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    $messageFormBtn.setAttribute('disabled', 'disabled')

    socket.emit('new-chat-message', event.target.elements.message.value, () => {
        $messageFormBtn.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
    })
})
