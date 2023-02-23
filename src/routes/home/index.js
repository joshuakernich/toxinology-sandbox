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

  const [isSearchHidden, setSearchHidden] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [currentSearchCriteria, setCurrentSearchCriteria] = useState({});
  const [searchResults, setSearchResults] = useState(undefined);

  useEffect(() => {
    // PF: uncomment this if you want to perform a search immediately on load
    // performSearch();
  }, []);
  
  const performSearch = async () => {
    // break down everything we have into something we can search for... Fun
    const currentSearch = {...searchCriteria.current};

    setCurrentSearchCriteria(currentSearch);
    setIsSearching(true);
    
    console.log(`Performing Search`, currentSearch);

    try {
      const searchTermsReduced = [
        currentSearch.keywords.text
      ];
      const searchText = searchTermsReduced.join(" ");
      const matchingTerms = [
        ...currentSearch.organismTypes.map(type => ({ key: "orgclass", value: type})),
        ...currentSearch.locations.map(location => ({ key: "countries", value: location.toLowerCase()})),
        ...(currentSearch.keywords.matchingTerms || [])
      ]

      if (searchText?.length || matchingTerms?.length) {
        const newSearchResults = await API.advancedSearch(searchText, {matchingTerms});

        // we're in a race condition, disregard this search, the criteria has changed.
        if (searchCriteria.current.timeStamp != currentSearch.timeStamp) return;

        // check if things have updated in this time.
        setSearchResults(newSearchResults);
        setIsSearching(false);
      }
    } catch (e) {
      console.error(`Search Failed, `, e);
      setIsSearching(false);
    }
  };

  const onSearchChanged = (newSearchCriteria) => {

    searchCriteria.current = newSearchCriteria;
    searchCriteria.current.timeStamp = Date.now();

    if (searchPollCallback.current) {
      clearTimeout(searchPollCallback.current);
    }

    searchPollCallback.current = setTimeout(() => {
      // don't send any variables, we'll use what we've stored
      performSearch();
    }, SEARCH_POLL_DURATION);
  }

  console.log('currentSearchCriteria',currentSearchCriteria);

	return <div class={style.home}>
		<SearchPillar 
      isSearchHidden={isSearchHidden} 
      setSearchHidden={setSearchHidden} 
      onChange={onSearchChanged}>
      </SearchPillar>
		<ResultsPillar 
      isSearching={isSearching} 
      setSearchHidden={setSearchHidden} 
      searchCriteria={currentSearchCriteria}
      results={searchResults}>
      </ResultsPillar>
	</div>
};

export default Home;
