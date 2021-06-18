import * as graphqlServiceTypes from "../graphql/types";
import * as React from "react";

const ContinentInfo = (data: null | graphqlServiceTypes.IGetContinentResponse) => {
  if (!data) return <div></div>;

  const { continent } = data;
  return (
    <div className="country-info__container">
      {!!continent.countries.length
        ? continent.countries.map(
            (country: graphqlServiceTypes.ICountry, key: number) => (
              <p key={key}>
                <span >{country.emoji}</span>
                <span> {country.name}</span>
              </p>
            )
          )
        : ""}
    </div>
  );
};

export default ContinentInfo;
