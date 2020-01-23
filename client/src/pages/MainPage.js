import React, { useState, useEffect } from "react";

import {
  Header,
  Menu,
  Segment,
  Sidebar,
  Label,
  Icon,
  Checkbox
} from "semantic-ui-react";

export default function MainPage() {
  const [visible, setVisible] = useState(false);
  const [menuWidth, setMenuWidth] = useState("thin");
  const [footerMenu, setFooterMenu] = useState(true);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    if (window.innerWidth > 768) {
      setVisible(true);
      setFooterMenu(false);
    }
    if (window.innerWidth > 1000) {
      setMenuWidth("wide");
    }
  }, []);

  const handleItemClick = e => {
    setActiveItem(e.name);
  };

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
          <Label color="teal">1</Label>Chats
        </Menu.Item>
        <Menu.Item as="a">
          <Label color="teal">2</Label>Games
        </Menu.Item>
        <Menu.Item as="a">
          <Label color="teal">3</Label>Channels
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher
        onClick={() =>
          visible && window.innerWidth <= 1000 && setVisible(false)
        }
      >
        <Segment basic>
          <Header as="h3">Application Content</Header>
        </Segment>
        {footerMenu && (
          <div className="navbar">
            <Menu fluid widths={3}>
              <Menu.Item>
                <Checkbox toggle />
              </Menu.Item>
              <Menu.Item
                name="sell"
                active={activeItem === "sell"}
                onClick={handleItemClick}
              >
                {" "}
                <Icon name="comment outline" color="teal" size="large" />{" "}
              </Menu.Item>
              <Menu.Item
                name="rent"
                active={activeItem === "rent"}
                onClick={e => {
                  handleItemClick(e);
                  setVisible(!visible);
                }}
              >
                {" "}
                <Icon name="bars" color="teal" size="large" />{" "}
              </Menu.Item>
            </Menu>
          </div>
        )}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
