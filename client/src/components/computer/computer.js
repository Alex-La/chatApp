import React from "react";

import "./styles.css";
import { Header, Form, Segment, Label, Grid, Button } from "semantic-ui-react";

export default function Computer() {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }}>
      <Grid.Row style={{ maxWidth: 300, marginTop: "10px" }}>
        <Grid.Column>
          <Segment stacked style={{ height: "78vh" }}>
            <Header as="h2" color="teal">
              Rooms
            </Header>
          </Segment>

          <Segment stacked style={{ height: "17vh" }}>
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
              />
              <Button color="teal" fluid size="large">
                Create
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row
        style={{
          maxWidth: 600,
          marginTop: "10px"
        }}
      >
        <Grid.Column>
          <Header as="h2" color="teal" textAlign="center"></Header>
          <Segment style={{ height: "95vh" }}></Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
