import { h, Component } from 'preact';
import { Link } from "preact-router/match";
import { useState, useLayoutEffect } from 'preact/hooks';
import { AutofillDropdownInput } from "../components/autofillDropdownInput.js";
import { sitemap } from "../libs/sitemap.js";

const DIAGNOSIS_ANSWERS_VALUES = {
  UNANSWERED: "U",
  UNKNOWN: ".",
  NO: "N",
  YES: "Y",
};

const DEFAULT_OPTIONS = [
  {
    text: "Yes",
    value: DIAGNOSIS_ANSWERS_VALUES.YES
  },
  {
    text: "No",
    value: DIAGNOSIS_ANSWERS_VALUES.NO
  },
  {
    text: "Unknown",
    value: DIAGNOSIS_ANSWERS_VALUES.UNKNOWN
  }
]

const DiagnosisQuestion = (props) => {
  const onChange = (nextValue) => {
    props.onChange({key: props._key, response: nextValue});
  }

  const options = props.options || DEFAULT_OPTIONS;

  return <diagnosticQuestionContainer>
    <diagnosticQuestionText>
      {props.text}
    </diagnosticQuestionText>

    <switchContainer className={options.length > 4 ? "vertical" : ""}>
      {options.map(op => [
        <input 
          type="radio" 
          name={`${props._key}-input`} 
          value={op.value}
          onChange={() => onChange(op.value)}
          checked={props.response == op.value} />,
        <label for={`${props._key}-input`} onClick={() => onChange(op.value)}>{op.text}</label>
      ])}
    </switchContainer>
  </diagnosticQuestionContainer>;
}

export const DiagnosticQuestionnaire = () => {
  const [questionQuery, setQuestionQuery] = useState([]);
  const [countryRegion, setCountryRegion] = useState("");

  const clearResponses = () => {
    const nextQuestionQuery = sitemap.diagnosis.questions.map((question, index) => ({
      // key is a protected keyword
      _key: question.key,
      index,
      text: question.text,
      options: question.options,
      response: DIAGNOSIS_ANSWERS_VALUES.UNANSWERED
    }));

    setQuestionQuery(nextQuestionQuery);
    setCountryRegion("");
  }

  useLayoutEffect(() => {
    // write out the question query
    clearResponses();
    // todo make the query respond to url

    // only run once
  }, []);

  // lets check how many responses there might be...
  const matchingOrgType = questionQuery.length && questionQuery[0].response && questionQuery[0].options.find(o => o.value == questionQuery[0].response);
  const matchingCode = questionQuery
  // set all unanswered to unknown.
    .filter(question => !question.options)
    .map(question => question.response == DIAGNOSIS_ANSWERS_VALUES.UNANSWERED ? DIAGNOSIS_ANSWERS_VALUES.UNKNOWN : question.response)
    .reduce((s, v, i) => s += v, "");
  const matchingCodeTruncated = matchingCode.replace(/\.*$/g,"");

  const getMatchingSequenceForLength = (length, exclusiveNo = false) => {
    const slicedMatchingCode = matchingCode.slice(0, length);
    const wildcardedMatchingCode = slicedMatchingCode.replace(/\.*$/g,"").replace(/(Y|N)/g,"($1|\\\.)");
    const matchingRegEx = new RegExp(`^${wildcardedMatchingCode}`, "g");

    // filter the tracks by the country selected
    const trackKeys = Object.keys(sitemap.diagnosis.tracks);

    const matchingSequences = trackKeys
      .filter(k => matchingOrgType ? matchingOrgType.values.includes(k.substring(0, 2)) : true)
      .map((i) => {
        const track = sitemap.diagnosis.tracks[i];
        const value = track.q;

        const trackCountries = track.c.map(ci => sitemap.countries[ci]);
        const trackRegions = track.r.map(ri => sitemap.regions[ri]);

        const isInCountryRegion = !countryRegion || 
          trackCountries.find(c => c.includes(countryRegion)) || 
          trackRegions.find(r => r.includes(countryRegion));

        if (!!isInCountryRegion && value.match(matchingRegEx)) {
          if (countryRegion) console.log(trackCountries);
          return {
            key: i,
            value: value
          };
        }
      })
      .filter(v => v);

    return {code: slicedMatchingCode, count: matchingSequences.length, sequences: matchingSequences};
  }

  const getQuestionNecessity = (_questionIndex) => {
    const questionIndex = _questionIndex - 1;
    if (questionIndex < 0) return false;

    // populate the rest of the complete matching code so we can test it
    if (![DIAGNOSIS_ANSWERS_VALUES.UNKNOWN].includes(matchingCode[questionIndex])) return false;

    const possibleSequences = getMatchingSequenceForLength(Math.max(matchingCodeTruncated.length, questionIndex));
    
    const options = possibleSequences.sequences.map(s => s.value.charAt(questionIndex)).filter((v, i, a) => v && a.indexOf(v) == i);

    return !(options.includes(DIAGNOSIS_ANSWERS_VALUES.YES)) || options.length < 2;
  }

  const unnecessayQuestions = questionQuery.filter(q => getQuestionNecessity(q.index));
  const necessaryQuestions = questionQuery.filter(q => !getQuestionNecessity(q.index));

  const matches = getMatchingSequenceForLength(matchingCode.length);

  matches.sequences.length = Math.min(matches.count, 12);

  return [
    
    <searchWrapper>
      <diagnosticQuestionWrapper>
        {
          !sitemap.countries.includes(countryRegion) &&
          <diagnosticQuestionContainer>
            <diagnosticQuestionText>
              Where did the patient come into contact with the toxin?
            </diagnosticQuestionText>
            <answerContainer>
              <AutofillDropdownInput onChange={(v) => {
                setCountryRegion(v);
              }} value={countryRegion} possibleValues={sitemap.countries} />
            </answerContainer>
          </diagnosticQuestionContainer>
        }
        {
          necessaryQuestions
            .sort((qa, qb) => qa.response - qb.response)
            .filter((v) => v.response === 'U')
            .map((query) => {

            return [
              <DiagnosisQuestion {...query} index={query.index}  onChange={({key, response}) => {
                const question = questionQuery.find(question => question._key == key);

                question.response = response;

                setQuestionQuery([...questionQuery]);
              }} />
            ]})
        }
      </diagnosticQuestionWrapper>
      <div><a onClick={clearResponses} href="#">Restart</a></div>
      {matches && <diagnosticMatchesWrapper>
        <diagnosticMatchesHeader>Found {matches.count} related results.</diagnosticMatchesHeader>
        <diagnosticMatchesContainer>{matches.sequences.map(v => [<a href={`/details/${v.key}`}>{v.key}</a>, ', '])}</diagnosticMatchesContainer>
      </diagnosticMatchesWrapper>}
    </searchWrapper>
  ]
};
