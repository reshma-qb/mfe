import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

console.log("Auth!")

// Mount function to mount the elements in browser

const mount = (element, { onNavigate, onSignIn, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    // whenever user click on the links or url or path changes on marketing app, we want to 
    // automatically call the onNavigate function, and history objects listen will
    // called the onNavigate fn of container
    if (onNavigate) {
        history.listen(onNavigate);
    }

    // to render the marketing home page and pricing page.
    ReactDOM.render(
        <App onSignIn={onSignIn} history={history} />, 
        element
    );

    // returning to communicate with container, so that we can handle the containers navigation
    // in marketing
    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
            console.log("Container just navigated!")
        }
    }
};


// Situation #1
// if in development & running in isolation
// jst mount the element

if (process.env.NODE_ENV === 'development') {
    const element = document.querySelector('div#auth-dev');
    if (element) {
        mount(element, { defaultHistory: createBrowserHistory() });
    }
}

// Situation #2
// if we are in production or run the remote app using host application
// we should export the mount function.

export { mount };