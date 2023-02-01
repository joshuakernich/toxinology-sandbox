// export the sitemap

/*
  type - structure,
    key:
    names
*/
import { setValidWordLists } from './spellChecker.js';
import { API_URL, COUNTRY_KEY, REGION_KEY } from './consts';

let sitemapLoaded = false;

export let sitemap = {};

export const getSitemap = async () => {
  if (sitemapLoaded) return sitemap;

  await sitemapPromise;
  
  return sitemap;
};

let sitemapPromise = fetch(`${API_URL}/assets/sitemap.json`)
  .then(res => res.json())
  .then(json => {
    sitemap = json;
    
    // expand the tracks
    // the first question is about animals
    const questionCount = sitemap.diagnosis.questions.length - 1;
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
