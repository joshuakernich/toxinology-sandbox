import { SYMPTOM_KEY } from "../libs/consts.js";
import { getSimilarity } from "../libs/spellChecker.js";
import { sitemap, getMatchingTerms } from "../libs/sitemap.js";

import { API_URL } from '../libs/consts.js';

const buildQueryFromMatchingTerms = (matchingTerms, searchTerm) => {
  const searchTermAsWords = searchTerm.split(/ /g);
  const unmatchedWords = searchTermAsWords
    .filter(v => v); // remove empty terms;

  const searchQuery = {
    matchingTerms,
    unmatchedWords
  }

  return searchQuery;
};
const getQueryFromSearchTerm = async (searchTerm) => {
  // we can reduce our search to just this creature.
  const matchedAssociatedTerms = await getMatchingTerms(searchTerm);
  const query = buildQueryFromMatchingTerms(matchedAssociatedTerms, searchTerm);
  // from these keywords, we can build a better search
  return query
};

export default {
  simpleSearch: async (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    // attempt to find creature terms
  
    const query = await getQueryFromSearchTerm(lowerCaseSearchTerm);
  
    // if the queries is empty, perform a super simple search :)
    const fetchBody = {
      ...query,
      text: lowerCaseSearchTerm
    };
  
    // so now we have access to the database, lets make some api calls
    try {
      var response = await fetch(`${API_URL}/search`, {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Access-Control-Allow-Headers': "true",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fetchBody)
      });
    } catch (e) {
      console.error("Server call failed", e);
  
      throw e;
    }
  
    if (response) {
      try {
        var body = await response.json();
      } catch (e) {
        console.error("Failure to transform response body into JSON", e);
        throw e;
      }
  
      return body;
    }
  },
  advancedSearch: async (searchTerm, advancedQueryData) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const searchTermAsWords = lowerCaseSearchTerm.split(/[ \:\=]/g);
  
    // if the queries is empty, perform a super simple search :)
    const fetchBody = {
      ...advancedQueryData,
      unmatchedWords: searchTermAsWords,
      text: lowerCaseSearchTerm
    };
  
    const stringifiedFetchBody = JSON.stringify(fetchBody);
  
    // so now we have access to the database, lets make some api calls
    try {
      var response = await fetch(`${API_URL}/search`, {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Access-Control-Allow-Headers': "true",
          'Content-Type': 'application/json'
        },
        body: stringifiedFetchBody
      });
    } catch (e) {
      console.error("Server call failed", e);
  
      throw e;
    }
  
    if (response) {
      try {
        var body = await response.json();
      } catch (e) {
        console.error("Failure to transform response body into JSON", e);
        throw e;
      }
  
      return body;
    }
  },
  getCreatureDetails: async (creatureId) => {
    try {
      var response = await fetch(`${API_URL}/creature-details/${creatureId}`, {
        method: 'get',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Access-Control-Allow-Headers': "true",
          'Content-Type': 'application/json'
        }
      });  
    } catch (e) {
      console.error("Server call failed", e);

      throw e;
    }

    if (response) {
      try {
        var body = await response.json();
      } catch (e) {
        console.error("Failure to transform response body into JSON", e);
        throw e;
      }
  
      return body;
    }
  },
  getFirstAidDetails: async (firstAidId) => {
    return {};
  }
};