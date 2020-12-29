import Typed from "typed.js";
import React from "react";

//taken from https://jsfiddle.net/mattboldt/ovat9jmp/

class TypedJs extends React.Component {
  componentDidMount() {
    // If you want to pass more options as props, simply add
    // your desired props to this destructuring assignment.
    const { strings } = this.props;
    console.log(this.props);
    // You can pass other options here, such as typing speed, back speed, etc.
    const options = {
      strings: strings,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      loopCount: Infinity,
    };
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    // Make sure to destroy Typed instance on unmounting
    // to prevent memory leaks
    this.typed.destroy();
  }

  render() {
    return (
      <span
        style={{ whiteSpace: "pre" }}
        ref={(el) => {
          this.el = el;
        }}
      />
    );
  }
}
export default TypedJs;
