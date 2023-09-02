import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

console.log("Dashboard!")

// Mount function to mount the elements in browser

const mount = (element) => {
    const app = createApp(Dashboard);
    app.mount(element);
};


// Situation #1
// if in development & running in isolation
// jst mount the element

if (process.env.NODE_ENV === 'development') {
    const element = document.querySelector('div#dashboard-dev');
    if (element) {
        mount(element);
    }
}

// Situation #2
// if we are in production or run the remote app using host application
// we should export the mount function.

export { mount };