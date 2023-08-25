import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log("Marketing!")

// Mount function to mount the elements in browser

const mount = (element) => {
    ReactDOM.render(
        <App />, 
        element
    )
};


// Situation #1
// if in development & running in isolation
// jst mount the element

if (process.env.NODE_ENV === 'development') {
    const element = document.querySelector('div#marketing-dev');
    if (element) {
        mount(element);
    }
}

// Situation #2
// if we are in production or run the remote app using host application
// we should export the mount function.

export { mount };