export const API_URL = `http://localhost:80`;
export const REGION_KEY = "region";
export const COUNTRY_KEY = "countries";
export const COMMON_NAME_KEY = "common_names";
export const DISTRIBUTION_KEY = "distribution";
export const ORG_KEY = "orgclass";
export const SYMPTOM_KEY = "symptom";
export const VENOMOUS_OR_POISIONOUS_KEY = "venomous_or_poisonous";
export const BIOTA_KEYS = [
  ORG_KEY,
  "phylum",
  "class",
  "subclass",
  "ord",
  "suborder",
  "family",
  "subfamily",
  "genus",
  "species",
];
export const ALL_VALID_SEARCH_PROPERTIES = [
  ...BIOTA_KEYS,
  REGION_KEY,
  COUNTRY_KEY,
  COMMON_NAME_KEY,
  DISTRIBUTION_KEY,
  SYMPTOM_KEY,
  VENOMOUS_OR_POISIONOUS_KEY
];
export const SITEMAP_TREE_KEY = "t";
export const SITEMAP_CHILDREN_KEY = "c";
export const SITEMAP_COUNTRY_KEY = "countries";
export const SITEMAP_KEY_KEY = "k";
export const SITEMAP_REGION_KEY = "region";
export const SITEMAP_VALUE_KEY = "v";
export const SITEMAP_MATCH_KEY = "m";

// helper function