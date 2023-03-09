// export the sitemap

/*
  type - structure,
    key:
    names
*/
import { setValidWordLists, getSimilarity } from './spellChecker.js';
import { API_URL, COUNTRY_KEY, REGION_KEY, SYMPTOM_KEY } from './consts';

let sitemapLoaded = false;

export let sitemap = {};

export const getSitemap = async () => {
  if (sitemapLoaded) return sitemap;

  await sitemapPromise;
  
  return sitemap;
};

export const getMatchingTerms = async (searchTerm) => {
  const SEARCH_MINIMUM_LENGTH = 3;

  if (searchTerm.length < SEARCH_MINIMUM_LENGTH) return;
  // check each term for something similar and add them
  // const extraSearchTerms = searchTermsAsWords.map(searchWord => findSimilar(searchWord, creature.key)).flat();
  const SIMILARITY_THRESHOLD = 0.9;
  const SYMPTOM_SIMILARITY_THRESHOLD = 0.85;

  const USELESS_SYMPTOM_WORDS = ["and", "or", "other", "wbc", "orgtype", "rbc", "eastern", "western", "northern", "southern"];

  const USELESS_TERM_KEYS = ["orgClass", "region", "countries"];

  const wordSeparatedSearchTerm = searchTerm.split(" ");

  return sitemap.terms
    .map(term => {
      if (USELESS_TERM_KEYS.includes(term.key)) return [];

      const threshold = term.key == SYMPTOM_KEY ? SYMPTOM_SIMILARITY_THRESHOLD : SIMILARITY_THRESHOLD;

      return term.values
        .map(value => {
          if (!value) return;

          const termWords = value.split(/( |_)/g).filter(k => !USELESS_SYMPTOM_WORDS.includes(k));

          const matches = termWords.filter(termWord => {
            return wordSeparatedSearchTerm.filter(searchWord => {
              return getSimilarity(searchWord, termWord) > threshold;
            }).length;
          });

          return (matches.length > 0) && { key: term.key, value }; 
        })
        .filter(v => v)
      })
      .flat();
};

let sitemapPromise = fetch(`${API_URL}/assets/sitemap.json`)
  .then(res => res.json())
  .then(json => {
    sitemap = json;
    
    // expand the tracks
    // the first question is about animals
    const questionCount = sitemap.diagnosis.questions.length;
    const trackKeys = Object.keys(sitemap.diagnosis.tracks);

    trackKeys.forEach(key => {
      const value = sitemap.diagnosis.tracks[key].q;
      const lengthenedValue = value + '.'.repeat(questionCount - value.length);

      sitemap.diagnosis.tracks[key].q = lengthenedValue;
    });
    const countryTerms = sitemap.terms.find(v => v.key == COUNTRY_KEY).values;
    const regionTerms = sitemap.terms.find(v => v.key == REGION_KEY).values;

    sitemap.countries = countryTerms;
    sitemap.regions = regionTerms;
    
    // setup wordlist.
    const wordLists = [
      {
        key: "sitemapSearchTerms",
        words: sitemap.terms.map(t => t.matches).flat()
      }
    ];
    
    setValidWordLists(wordLists);
  });
