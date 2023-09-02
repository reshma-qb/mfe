import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';

// whenever app.js of marketing is loaded in production, instead of showing
// random classNames like jss1, jss2, it will show ma1, ma2 and so on.
const generateClassName = createGenerateClassName({
    productionPrefix: 'au'
})

export default ({ history, onSignIn }) => {
    return (
    <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    <Route path='/auth/signin'>
                        <Signin onSignIn={onSignIn} />
                    </Route>
                    <Route path='/auth/signup'>
                        <Signup onSignIn={onSignIn} />
                    </Route>
                </Switch>
            </Router>
        </StylesProvider>
    </div>
    )
};