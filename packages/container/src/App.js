import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch  } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from "./component/Header";
import Progress from "./component/Progress";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const MarketingLazy = lazy(() => import('./component/MarketingApp'));
const AuthLazy = lazy(() => import('./component/AuthApp'));
const DashboardLazy = lazy(() => import('./component/DashboardApp'));

// whenever app.js of marketing is loaded in production, instead of showing
// random classNames like jss1, jss2, it will show ma1, ma2 and so on.
const generateClassName = createGenerateClassName({
	productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () => {
	const [isSignedIn, setIsSignedIn] = useState(false);

	useEffect(() => {
		if (isSignedIn) {
			history.push('/dashboard');
		}
	}, [isSignedIn])

    return (
		<StylesProvider generateClassName={generateClassName}>
			<Router history={history}>
				<div>
					<Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
					<Suspense fallback={<Progress />}>
						<Switch>
							<Route path="/auth">
								<AuthLazy onSignIn={() => setIsSignedIn(true)} />
							</Route>
							<Route path="/dashboard">
								{!isSignedIn && <Redirect to='/' />}
								<DashboardLazy />
							</Route>
							<Route path="/" component={MarketingLazy} />
						</Switch>
					</Suspense>
				</div>
			</Router>
		</StylesProvider>
    )
};