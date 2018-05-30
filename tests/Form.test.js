import React from "react";
import { Form, FormLine, CollapsibleContent } from "../src/";

describe("Form", () => {
  it("Should renders without problems", () => {
    const wrapper = shallow(<Form>
      <CollapsibleContent>
        <FormLine>I am form.</FormLine>
      </CollapsibleContent>
    </Form>);

    expect(wrapper).toMatchSnapshot();
  });
});
