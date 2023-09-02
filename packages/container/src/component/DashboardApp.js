import React, { useRef, useEffect } from "react";
import { mount } from 'dashboard/DashboardApp';

export default () => {
    const ref = useRef(null);

    useEffect(() => {
        console.log("ref.cur", ref.current)
        mount(ref.current);
    }, []);

    return <div ref={ref} />
}