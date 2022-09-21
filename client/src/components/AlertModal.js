import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'

export const AlertModal = ({title, body, color, isShown, onClose}) => {
  const [show, setShow] = useState(isShown);
  if(show !== isShown) {
    setShow(isShown)
  }
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton style={{backgroundColor: color}}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
}