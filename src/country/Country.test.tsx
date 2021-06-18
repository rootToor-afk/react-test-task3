/**
 * @jest-environment jsdom
 */
import React from "react";
import * as renderer from "react-test-renderer";

import { MockedProvider } from "@apollo/client/testing";

import * as graphqlSchemas from "../graphql/schemas";

import Country from "./country";

let container: Element = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test("Test country graphql", async () => {
  const mocks = [
    {
      request: {
        query: graphqlSchemas.GET_COUNTRY,
        variables: {
          code: "UA",
        },
      },
      result: {
        data: {
          country: {
            name: "Ukraine",
            code: "UA",
            currency: "UAH",
            emoji: "🇺🇦",
            languages: [{ name: "Ukrainian", __typename: "Language" }],
          },
          
        },
      },
    },
  ];

  let component: any = null;
  await renderer.act(async () => {
    component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Country />
      </MockedProvider>
    );
  });

  const root = component.root.findByType("input");
  await renderer.act(async () => {
    root.props.onChange({
      currentTarget: {
        value: "UA",
      },
    });
  });

  const span = component.root.findAllByType("span");
  expect(span).not.toEqual([]);
});
