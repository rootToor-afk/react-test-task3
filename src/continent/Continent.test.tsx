import React from "react";
import * as renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import * as graphqlService from "../graphql";

import Continent from "./continent";

const API_URI =
  process.env.REACT_APP_COUNTRIES_BASE_URL ??
  "https://countries.trevorblades.com";
const apolloClient = new graphqlService.ApolloClient(API_URI);

test("Continent snapshot", () => {
  const continent = renderer
    .create(<Continent apolloClient={apolloClient} />)
    .toJSON();
  expect(continent).toMatchSnapshot();
});

it("Test input continent code", async () => {
  const elem = render(<Continent apolloClient={apolloClient} />, {});
  const input = await elem.getByPlaceholderText("Enter Continent Code");
  fireEvent.change(input, { target: { value: "AF" } });
  const isExist = await screen.findByText(/Angola/g);
  expect(isExist).not.toBe(null);
});
