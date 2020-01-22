import React, { useState, useEffect } from "react";

import { Header, Icon, Menu, Segment, Sidebar, Label } from "semantic-ui-react";
export default function MainPage() {
  const [visible, setVisible] = useState(false);
  const [menuWidth, setMenuWidth] = useState("thin");
  useEffect(() => {
    if (window.innerWidth > 768) {
      setVisible(true);
    }
    if (window.innerWidth > 1000) {
      setMenuWidth("wide");
    }
  }, []);
  return (
    <Sidebar.Pushable as={Segment} style={{ height: "100vh" }}>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        vertical
        visible={visible}
        width={menuWidth}
      >
        <Menu.Item as="a">
          <Label color="teal">1</Label>Home
        </Menu.Item>
        <Menu.Item as="a">
          <Label color="teal">2</Label>Games
        </Menu.Item>
        <Menu.Item as="a">
          <Label color="teal">3</Label>Channels
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>
          <Header as="h3">Application Content</Header>
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
