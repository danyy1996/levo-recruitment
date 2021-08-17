import React from "react";

class App extends React.PureComponent {
  render(): JSX.Element {
    return (
      <>
        <h1>Hello </h1>
        <button type="button" className="btn btn-primary">
          This is a bootstrap button
        </button>
      </>
    );
  }
}

export default App;
