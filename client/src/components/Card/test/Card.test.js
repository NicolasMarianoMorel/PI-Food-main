import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Card from "../Card.js";

test("should render <Card />", () => {
  // mocks para testear mi componente Card
  const props = {
    title: "Milanese with potato chips",
    diets: "carnivorous",
  };

  const components = render(<Card title="Milanese with potato chips" diets="carnivorous"/>);

  components.getByText("Milanese with potato chips");
  components.getByText("carnivorous");
 
  
});