import React, { Component } from "react";
import { Button, Input } from "@mui/material";
import { Get, Post } from "./fetch";

export default class Personal extends Component {
  state = {
    userInfo: {
      userid: "",
      password: "",
      name: "",
      nickname: "",
      email: "",
      regnum: "",
    },
    column: [
      { 영문명: "userid", 한글명: "아이디", 활성화: true, data: true },
      { 영문명: "password", 한글명: "비밀번호", 활성화: false, data: false },
      { 영문명: "name", 한글명: "이름", 활성화: true, data: true },
      { 영문명: "nickname", 한글명: "닉네임", 활성화: false, data: true },
      { 영문명: "email", 한글명: "이메일", 활성화: true, data: true },
      { 영문명: "regnum", 한글명: "생년월일", 활성화: true, data: true },
    ],
  };

  componentDidMount = async () => {
    let result = await Get("/api/user/test2");
    result["password"] = "";
    this.setState({ userInfo: result });
  };

  handleChange = async (e) => {
    let { userInfo } = this.state;
    userInfo[e.target.id] = e.target.value;
    await this.setState({ userInfo });
  };

  sideList = () => {
    return this.state.column.map((item, index) => (
      <div className="settingInput" key={item.영문명}>
        <div className="settingSub">{item["한글명"]}</div>
        <Input
          id={item["영문명"]}
          value={this.state.userInfo[item["영문명"]] || ""} // 초기값 ""으로 설정
          type={item["data"] ? "" : "password"}
          onChange={(e) => this.handleChange(e)}
          disabled={item["활성화"]}
          fullWidth
        />
      </div>
    ));
  };

  onClick = async () => {
    const regexPw =
      /^[a-z0-9#?!@$%^&*-](?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])[a-z0-9#?!@$%^&*-]{8,16}$/;

    let formData = {};
    formData["userid"] = this.state.userInfo["userid"];
    if (this.state.userInfo["password"].length != 0) {
      if (!regexPw.test(this.state.userInfo["password"])) {
        alert(
          "비밀번호는 8자리 이상 알파벳,숫자,특수문자로 이루어져야 합니다."
        );
        return;
      }
      formData["password"] = this.state.userInfo["password"];
    }
    formData["nickname"] = this.state.userInfo["nickname"];

    let result = await Post("/api/user/update", formData);

    alert("저장이 완료 되었습니다.");
  };

  render() {
    return (
      <div className="settingDefault">
        <div style={{ height: "10vh" }}></div>
        {this.sideList()}
        <div className="settingBtn">
          <Button
            variant="outlined"
            onClick={this.onClick}
            sx={{
              minHeight: 0,
              minWidth: 0,
              marginRight: 1,
              color: "#CB91F8",
              borderColor: "#CB91F8",
              "&:hover": {
                borderColor: "#CB91F8",
                backgroundColor: "#CB91F826",
              },
            }}
          >
            저장
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={this.props.handleClose}
          >
            취소
          </Button>
        </div>
      </div>
    );
  }
}
