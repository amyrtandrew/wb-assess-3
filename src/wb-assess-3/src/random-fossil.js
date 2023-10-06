import axios from 'axios';


let button = document.querySelector('#get-random-fossil')
let image = document.createElement('img')

const cb = (event) => {
    event.preventDefault()
    axios.get('/random-fossil.json')
        .then((res) => {
            console.log(res)
            image.setAttribute('src', res.data.img)
        document.querySelector('#random-fossil-image').appendChild(image)
        // .setAttribute('src', res.data.img)
            document.querySelector('#random-fossil-name').innerText = res.data.name
        })
}
button.addEventListener('click', cb)
