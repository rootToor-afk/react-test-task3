import React, { useState } from "react";
import * as apollo from "@apollo/client";

import ContinentInfo from "./continent-info";
import ContinentInput from "./continent-input";
import * as graphqlSchemas from "../graphql/schemas";

const continent = () => {
  const [continentCode, setcontinentCode] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  const [getcontinent, res] = apollo.useLazyQuery(graphqlSchemas.GET_CONTINENT);

  const data = res.data
  const isDataExists =
    !!data && !!data.continent && !!isEntered ? (
      <ContinentInfo continent={data.continent} />
    ) : (!data || !data) && !!isEntered ? (
      "No data"
    ) : (
      ""
    );
    

  const onSetcontinentCode = (continent: string) => {
    continent = continent.toUpperCase();
    getcontinent({ variables: { continent } });
    if (!isEntered) setIsEntered(true);
    setcontinentCode(continent);
  };

  return (
    <div className="continent__container">
      <ContinentInput
        continentCode={continentCode}
        onSetContinentCode={onSetcontinentCode}
      />
      <p>
        <strong>Countries</strong>
      </p>
      {isDataExists}
    </div>
  );
};
export default continent;
