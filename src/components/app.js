import { h } from 'preact';
import { Router } from 'preact-router';
import { useLayoutEffect } from 'preact/hooks';

import { getSitemap } from '../libs/sitemap';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';

const handleResize = () => {
	const doc = document.documentElement;
	doc.style.setProperty('--screen-height', `${window.innerHeight}px`);
};

const App = () => {
  useLayoutEffect(async () => {
		try {
    	await getSitemap();

			console.log(`Sitemap Loaded`);
		} catch (e) {
			console.error(`Sitemap Error, try to continue`, e);
		}

		// we need to set the screen-height var
		window.addEventListener("resize", handleResize);
		handleResize();
  },[]);
	
	return <div id="app">	
		<Router>
			<Home path="/" />
			<Home path="/search/:props" />
			<Home path="/organism/:organism" />
			<Profile path="/profile/" user="me" />
			<Profile path="/profile/:user" />
		</Router>
	</div>
};

export default App;
