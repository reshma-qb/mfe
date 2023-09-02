import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch  } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Header from "./component/Header";
import Progress from "./component/Progress";

const MarketingLazy = lazy(() => import('./component/MarketingApp'));
const AuthLazy = lazy(() => import('./component/AuthApp'));

// whenever app.js of marketing is loaded in production, instead of showing
// random classNames like jss1, jss2, it will show ma1, ma2 and so on.
const generateClassName = createGenerateClassName({
	productionPrefix: 'co'
})

export default () => {
	const [isSignedIn, setIsSignedIn] = useState(false);

    return (
		<StylesProvider generateClassName={generateClassName}>
			<BrowserRouter>
				<div>
					<Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
					<Suspense fallback={<Progress />}>
						<Switch>
							<Route path="/auth">
								<AuthLazy onSignIn={() => setIsSignedIn(true)} />
							</Route>
							<Route path="/" component={MarketingLazy} />
						</Switch>
					</Suspense>
				</div>
			</BrowserRouter>
		</StylesProvider>
    )
};