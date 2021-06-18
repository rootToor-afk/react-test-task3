import * as apolloTypes from "../graphql/types";

const Country = (data: null | { country: apolloTypes.ICountry }) => {
  if (!data) return <div></div>;
  const { country } = data;

  return (
    <div className="country-info__container">
      <span>Name:{country.name}</span>
      <span>Code:{country.code}</span>
      <span>Flag:{country.emoji}</span>
      <span>
        Languages:
        {!!country.languages && !!country.languages.length
          ? country.languages.map((language: apolloTypes.ILanguage, key: number) => (
              <span key={key}>{language.name}</span>
            ))
          : ""}
      </span>
    </div>
  );
};

export default Country;
