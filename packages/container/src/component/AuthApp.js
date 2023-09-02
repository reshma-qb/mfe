import React, { useRef, useEffect } from "react";
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        console.log("ref.cur", ref.current)
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            
            // Scenario #Any clicks happened on Marketing application
            // # It will communicate the change to container
            // # containers brower history should update it's current path.
            onNavigate: ({ pathname: nextPathname}) => {
                const { pathname } = history.location;
                console.log("The container noticed Navigation in Marketing!");

                // whenvever one history object is changed
                // automatically change the other. so it will cause infinite loop. To avoid it 
                // we need to check the existing path is diff from the next path.
                if (pathname !== nextPathname) {
                    // This will update the history object with the changed url.
                    history.push(nextPathname);
                }
            },
            onSignIn
        });
        
        // this helps to find any chnage in container navigation or in browser history
        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />
}