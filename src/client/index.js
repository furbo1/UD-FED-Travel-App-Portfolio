import { handleSubmit } from './js/app'
import './styles/style.scss';

// Service Worker
if('serviceWorker' in navigator){

    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('sw.js', {scope: './'})
        .then(registration => console.log('Service Worker Registered'))
        .catch(err => console.log('Service Worker failed to register', err))
    }
}

document.getElementById('btn').addEventListener('click', handleSubmit);
