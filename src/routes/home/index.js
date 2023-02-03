import { h } from 'preact';
import style from './style.css';
import SearchPillar from '../../components/SearchPillar';
import ResultsPillar from '../../components/ResultsPillar';
import API from '../../services/api';

import { useState, useRef, useEffect } from 'preact/hooks';

import { API_URL } from '../../libs/consts';

const SEARCH_POLL_DURATION = 500;

const Home = () => {
  const searchPollCallback = useRef();
  const searchCriteria = useRef({});

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // PF: uncomment this if you want to perform a search immediately on load
    // performSearch();
  }, []);
  
  const performSearch = async () => {
    // break down everything we have into something we can search for... Fun
    const currentSearch = searchCriteria.current;
    
    console.log(`Performing Search`, currentSearch);

    try {
      const searchResults = await API.simpleSearch([...currentSearch.locations, ...currentSearch.keywords, ...Object.keys(currentSearch.organismTypes)].join(" "));

      setSearchResults(searchResults);
    } catch (e) {
      console.error(`Search Failed, `, e);
    }
  };

  const onSearchChanged = (newSearchCriteria) => {
    searchCriteria.current = newSearchCriteria;

    if (searchPollCallback.current) {
      // 
      clearInterval(searchPollCallback.current);
    }

    searchPollCallback.current = setTimeout(() => {
      // don't send any variables, we'll use what we've stored
      performSearch();
    }, SEARCH_POLL_DURATION)
  }

	return <div class={style.home}>
		<SearchPillar onChange={onSearchChanged}></SearchPillar>
		<ResultsPillar results={searchResults}></ResultsPillar>
	</div>
};

export default Home;
