import React from 'react';
import Drawer from 'material-ui/Drawer';

const MyDrawer = ({ open, onRequestChange }) => {

  console.log(open)

  return (
    <Drawer
      docked={false}
      width={200}
      open={open}
      onRequestChange={onRequestChange}
    >

    </Drawer>
  )

};

export default MyDrawer;
