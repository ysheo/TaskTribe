import React from "react";
import Navbar from "./Navbar";

export default class Setting extends React.Component {
  state = {
    title: "개인 정보 관리",
  };
  titleChange = (title) => {
    this.setState({ title });
  };
  render() {
    return (
      <div>
        <div className="ProfileHeader">
          <h1>{this.state.title}</h1>
        </div>
        <Navbar
          titleChange={this.titleChange}
          handleClose={this.props.handleClose}
        />
      </div>
    );
  }
}
