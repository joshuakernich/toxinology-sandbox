var validWordLists;

export const setValidWordLists = (wordLists) => {
  validWordLists = wordLists;
}

export const findSimilar = (word, wordListKey, scoreThresh = 0.89) => {
  const targetWordList = wordListKey ? validWordLists.find(list => list.key == wordListKey).words : [];

  var max_size = 1;
  var top_words = [];
  var top_scores = [];

  for (var i = 0; i < targetWordList.length; i++) {
    // compute score
    var element = targetWordList[i];
    var temp_score = score(word, element);

    if (scoreThresh < temp_score) {
      // check if it is a top score
      var index = getListIndex(top_scores, temp_score);
      if (index < max_size) {
        top_words.splice(index, 0, element);
        top_scores.splice(index, 0, temp_score);

        if (top_words.length > max_size) {
          top_words.pop();
          top_scores.pop();
        }
      }
    }
  }

  return top_words[0] || word;
}

export const getSimilarity = (s1, s2) => {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}
const editDistance = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function getListIndex(scores, x) {
  for (var i = 0; i < scores.length; i++) {
    if (x > scores[i]) return i;
  }
  return scores.length;
}

function score(x, y) {
  var length_weight = 0.3;
  var match_weight = 0.5;
  var shift_weight = 0.2;

  return length_weight * length_score(x, y) + match_weight * match_score(x, y)
    + shift_weight * shift_score(x, y);
}

function length_score(x, y) {
  var diff = Math.abs(x.length - y.length);
  return Math.max(1.0 - diff / 4, 0);
}

function match_score(x, y) {
  var length = Math.min(x.length, y.length);
  if (length <= 0) return 0.0;

  var total = 0;
  for (var i = 0; i < length; i++) {
    if (x.charAt(i) == y.charAt(i)) total++;
  }

  var diff = length - total;
  return Math.max(1.0 - diff / 5, 0);
}

function shift_score(x, y) {
  var l2 = match_score(x.substring(2), y);
  var l1 = match_score(x.substring(1), y);
  var c = match_score(x, y);
  var r1 = match_score(x, y.substring(1));
  var r2 = match_score(x, y.substring(2));

  return Math.max(l2, l1, c, r1, r2);
}