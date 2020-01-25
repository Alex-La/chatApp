import React, { useState, useEffect, useContext } from "react";

import { Header, Form, Segment, Grid, Button, Icon } from "semantic-ui-react";

import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

export default function Mobile() {
  const [rooms, showRooms] = useState(false);

  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const socket = io(ENDPOINT);
  });

  if (rooms)
    return (
      <Grid textAlign="center" style={{ height: "100vh", overflow: "hidden" }}>
        <Grid.Row style={{ maxWidth: 300 }}>
          <Grid.Column>
            <Segment stacked style={{ height: "70vh" }}>
              <Header as="h2" color="teal">
                Rooms
              </Header>
            </Segment>

            <Segment stacked style={{ height: "23vh" }}>
              <Form>
                <Header as="h5" color="teal">
                  Create room
                </Header>
                <Form.Input
                  fluid
                  icon="building"
                  iconPosition="left"
                  placeholder="Room name"
                  size="small"
                  onChange={e => setRoom(e.target.value)}
                />
                <Button color="teal" fluid size="large">
                  Create
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  return (
    <Grid>
      <Grid.Row
        style={{
          maxWidth: 600
        }}
      >
        <Grid.Column textAlign="center">
          <Segment style={{ height: "85vh" }}>
            <Icon name="comments outline" size="massive" color="teal" />
            <Header as="h4" color="teal">
              Choose the room to start chating
            </Header>
          </Segment>
          <Segment>
            <Button color="teal" fluid onClick={() => showRooms(true)}>
              Rooms
            </Button>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
