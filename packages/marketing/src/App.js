import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

// whenever app.js of marketing is loaded in production, instead of showing
// random classNames like jss1, jss2, it will show ma1, ma2 and so on.
const generateClassName = createGenerateClassName({
    productionPrefix: 'ma'
})

export default ({ history }) => {
    return (
    <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/pricing" component={Pricing} />
                    <Route path="/" component={Landing} />
                </Switch>
            </Router>
        </StylesProvider>
    </div>
    )
};