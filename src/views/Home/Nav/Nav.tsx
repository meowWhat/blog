import React, { useState } from "react";
import "./Nav.less";
import { Row, Col, Input, AutoComplete } from "antd";
import { HomeOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { SelectProps } from "antd/lib/select";
import { ls } from "../../../store/login";

function Nav(props: RouteComponentProps) {
  const backHome = () => {
    props.history.push("/");
  };
  return (
    <div className="home-nav">
      <Row className="heart">
        <Col span={3} className="home-nav-left" onClick={backHome}>
          MyBlog
        </Col>
        <Col offset={5} span={3} className="home-nav-right" onClick={backHome}>
          <HomeOutlined />
          &nbsp;博客首页
        </Col>
        <Col
          span={3}
          className="home-nav-right"
          onClick={() => {
            ls.setVsible(true);
          }}
        >
          <UserOutlined />
          &nbsp;登录
        </Col>
        <Col span={3} className="home-nav-right">
          <MessageOutlined />
          &nbsp;个人中心
        </Col>
        <Complete></Complete>
      </Row>
    </div>
  );
}
function getRandomInt(max: number, min: number = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}
const searchResult = (query: string) => {
  return new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((item, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
};

const Complete: React.FC = () => {
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);

  const handleSearch = (value: string) => {
    console.log(value);

    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ width: 300 }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search size="middle" placeholder="input here" enterButton />
    </AutoComplete>
  );
};

export default withRouter(Nav);
