import React, { useState } from "react";
import * as apolloClient from "@apollo/client";

import CountryInfo from "./country-info";
import * as apolloSchemas from "../graphql/schemas";

const Country = () => {
  const [countryCode, setCountryCode] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  const [getCountry, res] = apolloClient.useLazyQuery(
    apolloSchemas.GET_COUNTRY
  );
  const data = res.data;
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
