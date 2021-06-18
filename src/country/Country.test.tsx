import React from "react";
import * as renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import * as graphqlService from "../graphql";

import Country from "./country";

const API_URI =
  process.env.REACT_APP_COUNTRIES_BASE_URL ??
  "https://countries.trevorblades.com";
const apolloClient = new graphqlService.ApolloClient(API_URI);


test("Country snapshot", () => {
  const continent = renderer
    .create(<Country apolloClient={apolloClient} />)
    .toJSON();
  expect(continent).toMatchSnapshot();
});

it("Test input country code", async () => {
  const elem = render(<Country apolloClient={apolloClient} />, {});

  const input = await elem.getByPlaceholderText("Enter Country Code");
  fireEvent.change(input, { target: { value: "UA" } });

  const country = await screen.findByText(/Ukraine/g);
  expect(country).not.toBe(null);
});
