import React from "react";

import { Loader, Grid } from "semantic-ui-react";

const Preloader = () => (
  <Grid verticalAlign="middle" textAlign="center" style={{ height: "100vh" }}>
    <Loader active size="massive" />
  </Grid>
);

export default Preloader;
