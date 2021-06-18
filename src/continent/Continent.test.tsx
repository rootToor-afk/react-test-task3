/**
 * @jest-environment jsdom
 */
import React from "react";
import * as renderer from "react-test-renderer";
import { render } from "react-dom";
import reactTest, { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/client/testing";

import * as graphqlSchemas from "../graphql/schemas";

import Continent from "./continent";
import ContinentInput from "./continent-input";

let container: Element = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test("Test continent input", () => {
  let continentCode = "";
  let continentInput: Element;

  const setContinentCode = (code: string) => {
    continentCode = code;
  };
  act(() => {
    render(
      <ContinentInput
        continentCode={continentCode}
        onSetContinentCode={setContinentCode}
      />,
      container
    );
  });

  continentInput = container.querySelector(".continent-code__input");
  continentInput.setAttribute("value", "AF");
  act(() => {
    reactTest.Simulate.change(continentInput);
  });
  expect(continentCode).toBe("AF");
});

test("Test graphql", async () => {
  const mocks = [
    {
      request: {
        query: graphqlSchemas.GET_CONTINENT,
        variables: {
          continent: "AF",
        },
      },
      result: {
        data: {
          continent: {
            countries: [
              {
                name: "Angola",
                emoji: "asd",
              },
              {
                emoji: "🇦🇴",
                name: "Angola",
              },
            ],
          },
        },
      },
    },
  ];

  let component: any = null;
  await renderer.act(async () => {
    component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Continent />
      </MockedProvider>
    );
  });

  const root = component.root.findByType("input");
  await renderer.act(async () => {
    root.props.onChange({
      currentTarget: {
        value: "AF",
      },
    });
  });

  const span = component.root.findAllByType("span")
  expect(span).not.toEqual([])
});