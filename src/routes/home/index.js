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

  const [searchResults, setSearchResults] = useState(undefined);

  useEffect(() => {
    // PF: uncomment this if you want to perform a search immediately on load
    // performSearch();
  }, []);
  
  const performSearch = async () => {
    // break down everything we have into something we can search for... Fun
    const currentSearch = searchCriteria.current;
    
    console.log(`Performing Search`, currentSearch);

    try {
      const searchTermsReduced = [
        ...currentSearch.keywords.text
      ];
      const searchText = searchTermsReduced.join(" ");
      const matchingTerms = [
        ...currentSearch.organismTypes.map(type => ({ key: "orgclass", value: type})),
        ...currentSearch.locations.map(location => ({ key: "countries", value: location.toLowerCase()})),
        ...currentSearch.keywords.matchingTerms
      ]

      if (searchText?.length || matchingTerms?.length) {
        const newSearchResults = await API.advancedSearch(searchText, {matchingTerms});

        setSearchResults(newSearchResults);
      }
    } catch (e) {
      console.error(`Search Failed, `, e);
    }
  };

  const onSearchChanged = (newSearchCriteria) => {
    searchCriteria.current = newSearchCriteria;

    if (searchPollCallback.current) {
      clearInterval(searchPollCallback.current);
    }

    searchPollCallback.current = setTimeout(() => {
      // don't send any variables, we'll use what we've stored
      performSearch();
    }, SEARCH_POLL_DURATION);
  }

	return <div class={style.home}>
		<SearchPillar onChange={onSearchChanged}></SearchPillar>
		<ResultsPillar results={searchResults}></ResultsPillar>
	</div>
};

export default Home;
