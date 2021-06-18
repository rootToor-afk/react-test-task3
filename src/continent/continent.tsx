import React, { useState } from "react";
import { IAppChildProps } from "../app/types";
import * as apolloTypes from "../graphql/types";

import ContinentInfo from "./continent-info";

const continent = (props: IAppChildProps) => {
  const { apolloClient } = props;
  const [continentCode, setcontinentCode] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  const { queryGetter: getcontinent, data } = apolloClient.initLazyQuery(
    apolloTypes.QueryTypes.GET_CONTINENT
  );
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
      <form>
        <input
          type="text"
          placeholder="Enter Continent Code"
          value={continentCode}
          onChange={(e) => onSetcontinentCode(e.currentTarget.value)}
          pattern="[A-Z]"
          id=""
        />
      </form>
      <p>
        <strong>Countries</strong>
      </p>
      {isDataExists}
    </div>
  );
};
export default continent;
