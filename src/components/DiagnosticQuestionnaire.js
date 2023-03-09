import { h, Component } from 'preact';
import { Link } from "preact-router/match";
import { useLayoutEffect, useState, useRef, useContext } from 'preact/hooks';
import { sitemap } from "../libs/sitemap.js";
import SearchResults from '../components/SearchResultsContext.js';

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
        <switchOption><input 
          type="radio" 
          name={`${props._key}-input`} 
          value={op.value}
          onChange={() => onChange(op.value)}
          checked={props.response == op.value} />
        <label for={`${props._key}-input`} onClick={() => onChange(op.value)}>{op.text}</label>
        </switchOption>
      ])}
    </switchContainer>
  </diagnosticQuestionContainer>;
}

const DiagnosticQuestionnaire = ({current, onChange}) => {
  const searchResults = useContext(SearchResults);
  const [questionQuery, setQuestionQuery] = useState(current);

  const clearResponses = (invokeChange = true) => {
    const nextQuestionQuery = sitemap.diagnosis.questions.map((question, index) => {
      // key is a protected keyword
      const currentResponse = (!invokeChange && current && current[index]?.response) || DIAGNOSIS_ANSWERS_VALUES.UNANSWERED;

      return {
        _key: question.key,
        index,
        text: question.text,
        options: question.options,
        response: currentResponse
      };
    });

    setQuestionQuery(nextQuestionQuery);

    if (!invokeChange) return;

    onChange([]);
  }

  useLayoutEffect(() => {
    // write out the question query
    console.log('layout effect');
    clearResponses(false);
    console.log(current);
    // todo make the query respond to url

    // only run once
  }, []);
  
  const updateQuestionQueries = (values) => {
    current = [];

    onChange(values);
    setQuestionQuery(values);
  };

  const allResults = [...searchResults.exclusive, ...searchResults.unexclusive];

  // TODO: CLEAN CODE REUSE!
  const answeredDiagnosisTrack = questionQuery.map(diagnosticQuestion => diagnosticQuestion.response).join('').replace(/u/gi, ".").replace(/\.*$/g, "");
  const answeredDiagnosisTrackRegex = new RegExp(answeredDiagnosisTrack, "ig");

  const possibleOrganismTracks = allResults
    .map(organism => sitemap.diagnosis.tracks[organism.oid].q)
    .filter(track => track.match(answeredDiagnosisTrackRegex));

  // we want to see only questions where a Y or N answer exists
  const filteredQuestions = questionQuery
    .filter(question => {
      return possibleOrganismTracks.find(track => ['Y', 'N'].includes(track[question.index]))
    });

  return [
    <searchWrapper>
      <diagnosticQuestionWrapper>
        {
          filteredQuestions
            .sort((qa, qb) => qa.response - qb.response)
            .filter((v) => v.response === 'U')
            .map((query) => {

            return [
              <DiagnosisQuestion {...query} index={query.index}  onChange={({key, response}) => {
                const question = questionQuery.find(question => question._key == key);

                question.response = response;

                updateQuestionQueries([...questionQuery]);
              }} />
            ]
          })
        }
      </diagnosticQuestionWrapper>
      <button onClick={clearResponses}>Restart Questionnaire</button>
      {/*matches && <diagnosticMatchesWrapper>
        <diagnosticMatchesHeader>Found {matches.count} related results.</diagnosticMatchesHeader>
        <diagnosticMatchesContainer>{matches.sequences.map(v => [<a href={`/details/${v.key}`}>{v.key}</a>, ', '])}</diagnosticMatchesContainer>
      </diagnosticMatchesWrapper>*/}
    </searchWrapper>
  ]
};

export default DiagnosticQuestionnaire;

