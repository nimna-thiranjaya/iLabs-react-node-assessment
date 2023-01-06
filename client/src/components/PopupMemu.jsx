import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";
import { GrFormView } from "react-icons/gr";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Popupform from "./popup/Popupform";
import ViewQuestion from "./popup/ViewQuestion";

const PopupMemu = ({ anchorEl, menuClose, open, id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Deactivate Question
  const onDeactivate = async (id) => {
    if (window.confirm("Are you sure you want to deactivate this Question?")) {
      await axios
        .patch(`question/changeStatus/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  };

  //Delete Question
  const onDelete = async (id) => {
    if (window.confirm("Are you sure! You need to delete this question?")) {
      await axios
        .delete(`question/deleteQuestion/${id}`)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.message);
            alert(res.data.message);
            window.location.href = "/";
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={menuClose}
        elevation={1}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleShow();
            menuClose();
          }}
        >
          <GrFormView /> &nbsp;&nbsp; View
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDeactivate(id);
            menuClose();
          }}
        >
          <TiTickOutline /> &nbsp;&nbsp; Deactivate
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(id);
            menuClose();
          }}
        >
          <RiDeleteBin6Line />
          &nbsp;&nbsp; Delete
        </MenuItem>
      </Menu>
      <Popupform
        show={show}
        onHide={handleClose}
        title={"View Question"}
        body={<ViewQuestion id={id} />}
      />
    </div>
  );
};

export default PopupMemu;
