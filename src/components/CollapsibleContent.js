import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CollapsibleContentDiv = styled.div`
  display: ${props => (props.visible ? "block" : "none")};
`;

class CollapsibleContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <CollapsibleContentDiv {...this.props} />;
  }
}

CollapsibleContent.displayName = "CollapsibleContent";

CollapsibleContent.propTypes = {
  visible: PropTypes.bool
};

CollapsibleContent.defaultProps = {};

export default CollapsibleContent;
