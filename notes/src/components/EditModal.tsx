import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Show } from "../types/Types";
import { NotesDataContext } from "../context/NotesContext";

const EditModal: React.FC<Show> = ({ show, handleClose, row }) => {
  const { setAlertSuccess, setAlertFail } = useContext(NotesDataContext);
  const [name, setName] = useState<string>(row.values?.name);
  const [content, setContent] = useState<string>(row.values?.content);

  const onSubmitHandle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name && !content) {
      handleClose();
      return;
    }
    axios
      .put(
        `http://localhost:4200/notes/${row.id}`,
        {
          name: name,
          content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        handleClose();
        setAlertSuccess(true);
      })
      .catch((err) => setAlertFail(true));
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlertSuccess(false);
      setAlertFail(false);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [onSubmitHandle]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandle}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={row.values?.name}
              onChange={(e) => setName((row.values.name = e.target.value))}
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              value={row.values?.content}
              onChange={(e) =>
                setContent((row.values.content = e.target.value))
              }
              required={true}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
