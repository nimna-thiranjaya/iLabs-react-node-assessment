import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import axios from "axios";
import Button from "../components/button/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Popupform from "../components/popup/Popupform";
import PopupMemu from "../components/PopupMemu";
import AddQuestionForm from "../components/popup/AddQuestionForm";
import "./FaqManager.css";

const FaqManager = () => {
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };
  const menuClose = () => {
    setAnchorEl(null);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Get All Questions
  const GetAllQuestions = async () => {
    await axios
      .get("question/getAllQuestions")
      .then((res) => {
        if (res.data.success) {
          const allQuestions = res.data.questions;
          const temp = [];
          for (let i = 0; i < allQuestions.length; i++) {
            temp.push({
              id: allQuestions[i]._id,
              question: allQuestions[i].question,
              category: allQuestions[i].category,
              status: allQuestions[i].status,
            });
          }

          setQuestions(temp);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    GetAllQuestions();
  }, []);

  const onSearch = async (sk) => {
    if (sk.length > 0) {
      await axios
        .get(`question/searchQuestions?searchKey=${sk}`)
        .then((res) => {
          if (res.data.success) {
            const allQuestions = res.data.result;
            const temp = [];
            for (let i = 0; i < allQuestions.length; i++) {
              temp.push({
                id: allQuestions[i]._id,
                question: allQuestions[i].question,
                category: allQuestions[i].category,
                status: allQuestions[i].status,
              });
            }
            setQuestions(temp);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      GetAllQuestions();
    }
  };

  //table columns
  const columns = [
    {
      field: "#",
      headerName: "#",
      sortable: true,
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: "question",
      headerName: "Question",
      width: 800,
    },
    {
      field: "category",
      headerName: "Category",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === "Published" ? (
              <div
                style={{
                  backgroundColor: "green",
                  color: "black",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "80px",
                  textAlign: "center",
                }}
              >
                Published
              </div>
            ) : params.row.status === "Draft" ? (
              <div
                style={{
                  backgroundColor: "gray",
                  color: "black",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "80px",
                  textAlign: "center",
                }}
              >
                Draft
              </div>
            ) : params.row.status === "Disabled" ? (
              <div
                style={{
                  backgroundColor: "red",
                  color: "black",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "80px",
                  textAlign: "center",
                }}
              >
                Disabled
              </div>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "Action",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            <BsThreeDots
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event, id) => handleClick(event, params.row.id)}
            />
            <PopupMemu
              anchorEl={anchorEl}
              menuClose={menuClose}
              open={open}
              id={id}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="setBody">
      <div className="faq">
        <span>FAQ Manager - iLabs</span>

        <Button
          text={"Add new Question"}
          icon={<AiFillPlusCircle size={28} />}
          onClick={handleShow}
        />
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search.."
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <button
          className="search-input-button"
          onClick={() => {
            onSearch(searchKey);
          }}
        >
          Search{" "}
        </button>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          rows={questions}
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "20px",
            border: "none",
            outline: "none",
          }}
        />
      </div>

      <div className="footer-container">
        <span>copyright @iLabs.All Rights Reserved</span>
        <span>@ Print Policy | Terms of Service | Help Center</span>
      </div>

      <Popupform
        show={show}
        onHide={handleClose}
        title={"Add New Question"}
        body={<AddQuestionForm onHide={handleClose} />}
      />
      <br />
    </div>
  );
};

export default FaqManager;
