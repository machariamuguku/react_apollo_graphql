import React from "react";
import { Card, Avatar } from "antd";
// a person card with an avatar, name, and gender
export default function Person({ person }) {
  return (
    <div>
      <Card style={{ width: 300, marginTop: 16 }}>
        <Card.Meta
          avatar={
            <Avatar
              shape="square"
              size={35}
              src={
                "https://www.logolynx.com/images/logolynx/a1/a1a84205a131311c84fc8f4a5adedf61.png"
              }
            />
          }
          title={person.name}
          description={person.gender}
        />
      </Card>
    </div>
  );
}
