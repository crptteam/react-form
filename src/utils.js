import React from "react";

export function recursiveMap(children, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn)
      });
    }

    return fn(child);
  });
}

export function recursiveForEach(children, fn) {
  return React.Children.forEach(children, child => {

    if (!React.isValidElement(child)) {
      return;
    }

    if (child.props.children) {
      recursiveForEach(child.props.children, fn);
    }

    return fn(child);
  });
}