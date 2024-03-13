'use client';
import React from 'react';
import Popup from 'reactjs-popup';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const contentStyle = {
  height: "90vh",
  width: "80%",

};

const AdminPopup = ({ popupContent,triggerButtonName}) => (
  <>
    <Popup modal contentStyle={contentStyle}   trigger={<button>{triggerButtonName}</button>} position="right center">
      {popupContent}
    </Popup>
  </>);

export default AdminPopup;