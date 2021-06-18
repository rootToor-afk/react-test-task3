import React, { useState } from "react";
import { IAppChildProps } from "../app/types";
import * as graphqlServiceTypes from "../graphql/types";
import CountryInfo from "./country-info";

const Country = (props: IAppChildProps) => {
  const { apolloClient } = props;
  const [countryCode, setCountryCode] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  const { queryGetter: getCountry, data } = apolloClient.initLazyQuery(
    graphqlServiceTypes.QueryTypes.GET_COUNTRY
  );
  const isDataExists =
    !!data && !!data.country && !!isEntered ? (
      <CountryInfo country={data.country} />
    ) : (!data || !data.country) && !!isEntered ? (
      "No data"
    ) : (
      ""
    );

  const onSetCountryCode = (code: string) => {
    code = code.toUpperCase();
    getCountry({ variables: { code } });
    if (!isEntered) {
      setIsEntered(true);
    }
    setCountryCode(code);
  };
  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="Enter Country Code"
          value={countryCode}
          onChange={(e) => onSetCountryCode(e.currentTarget.value)}
          pattern="[A-Z]"
          id=""
        />
      </form>
      {isDataExists}
    </div>
  );
};
export default Country;
