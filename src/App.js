import React from "react";

// people component
import People from "./components/People";

// ant design layout components
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;

export default function App() {
  return (
    <Layout>
      <Header style={{ color: "white" }}>
        React APollo GraphQL With Hooks
      </Header>
      <Content>
        <People />
      </Content>
      <Footer>
        <div style={{ bottom: "40", marginLeft: "40%" }}>
          <a
            href="http://www.muguku.co.ke/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h3>
              <span style={{ color: "blue" }}>www.muguku.co.ke</span>
              {"\u00A0"}
              <img
                src={"https://www.svgrepo.com/show/34932/copyright-symbol.svg"}
                alt="copyright"
                height={15}
                width={15}
              />
              {new Date().getFullYear()},{"\u00A0"}All rights reserved
            </h3>
          </a>
        </div>
      </Footer>
    </Layout>
  );
}
