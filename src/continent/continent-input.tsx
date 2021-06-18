import React from "react";
import { IContinentInput } from "./types";

const ContinentInput = (props: IContinentInput) => {
  const { onSetContinentCode, continentCode } = props;

  return (
    <form>
      <input
        className="continent-code__input"
        type="text"
        placeholder="Enter Continent Code"
        value={continentCode}
        onChange={(e) => onSetContinentCode(e.currentTarget.value)}
        pattern="[A-Z]"
        id=""
      />
    </form>
  );
};

export default ContinentInput;
