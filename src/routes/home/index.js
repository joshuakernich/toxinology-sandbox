import { h, createContext } from 'preact';
import style from './style.css';
import SearchPillar from '../../components/SearchPillar';
import ResultsPillar from '../../components/ResultsPillar';
import API from '../../services/api';
import { sitemap } from "../../libs/sitemap.js";

import SearchResults from "../../components/SearchResultsContext";

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

  const [diagnostics, setDiagnostics] = useState([]);

  useEffect(() => {
    // PF: uncomment this if you want to perform a search immediately on load
    // performSearch();
  }, []);
  
  const performSearch = async () => {
    // break down everything we have into something we can search for... Fun
    const currentSearch = {...searchCriteria.current};

    setCurrentSearchCriteria(currentSearch);
    setIsSearching(true);
    
    try {
      const searchTermsReduced = [
        currentSearch.keywords.text
      ];
      const searchText = searchTermsReduced.join(" ");
      const matchingTerms = [
        ...currentSearch.organismTypes.map(type => ({ key: "orgclass", value: type})),
        ...currentSearch.locations.map(location => ({ key: "countries", value: location.toLowerCase()})),
        ...(currentSearch.keywords.matchingTerms || [])
      ];
      
      const newSearchResults = await API.advancedSearch(searchText, {matchingTerms});

      // we're in a race condition, disregard this search, the criteria has changed.
      if (searchCriteria.current.timeStamp != currentSearch.timeStamp) return;

      // check if things have updated in this time.
      setSearchResults(newSearchResults);
      setIsSearching(false);
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
  };
  
  const onDiagnosticChange = (newDiagnostics) => {
    // filter the results
    setDiagnostics(newDiagnostics);
  };

  console.log('currentSearchCriteria',currentSearchCriteria);

  const filterResults = (unfilteredResults) => {
    const answeredDiagnosisTrack = diagnostics.map(diagnosticQuestion => diagnosticQuestion.response).join('').replace(/u/gi, ".").replace(/\.*$/g, "")
    const answeredDiagnosisTrackRegex = new RegExp(answeredDiagnosisTrack, "ig");

    // work out how to filter results jfc
    return unfilteredResults
      .filter((organism) => {
        const track = sitemap.diagnosis.tracks[organism.oid].q;

        return track.match(answeredDiagnosisTrackRegex);
      });
  };

  // filter the search
  const getResults = (unfilteredResults) => {
    if (!diagnostics || diagnostics.length == 0) return unfilteredResults;
    
    const diagnosticsDefinitions = diagnostics.filter(diagnosticQuestion => !["U", "."].includes(diagnosticQuestion.response));

    if (diagnosticsDefinitions.length == 0) return unfilteredResults;
    
    const filteredExclusiveResults = filterResults(searchResults.exclusive);
    const filteredUnexclusiveResults = filterResults(searchResults.unexclusive);

    return {
      exclusive: filteredExclusiveResults,
      unexclusive: filteredUnexclusiveResults,
      exclusiveCount: filteredExclusiveResults.length,
      unexclusiveCount: filteredUnexclusiveResults.length
    };
  };

  const filteredResults = getResults(searchResults);

	return <homePillar>
    <SearchResults.Provider value={searchResults}>
      <SearchPillar 
        isSearchHidden={isSearchHidden} 
        setSearchHidden={setSearchHidden} 
        onChange={onSearchChanged}
        onDiagnosticChange={onDiagnosticChange}>
        </SearchPillar>
      <ResultsPillar 
        isSearching={isSearching} 
        setSearchHidden={setSearchHidden} 
        searchCriteria={currentSearchCriteria}
        results={filteredResults}>
      </ResultsPillar>
    </SearchResults.Provider>
	</homePillar>
};

export default Home;
