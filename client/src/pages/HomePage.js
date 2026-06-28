import React, { useState, useEffect, useReducer, useContext } from "react";
import { Form, Input, Modal, Select, Table, message } from "antd";
import Spinner from "../components/Spinner";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Analytics from "../components/Analytics";
import { delData } from "../context/ContextProvider";

const { RangePicker } = DatePicker;

const HomePage = () => {
  // const handleSubmit = (values) => {
  //   console.log(values);
  // };

  // const {deleteData,setData}=useContext(delData)

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  // const setDelData =useContext(delData)
  const [delData, setDelData] = useState("");

  // const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  //table data

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "category",
      dataIndex: "category",
    },
    {
      title: "reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //getall transactions

  // useEffect  hook

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        // const user = JSON.parse(sessionStorage.getItem("token"));

        const token = sessionStorage.getItem("token");

        // console.log(`this is token ${token}`)
        setLoading(true);
        const res = await axios.post(
          "/transactions/getTransaction",
          {
            // userid: user._id,
            frequency,
            selectedDate,
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setLoading(false);
        setAllTransaction(res.data.transactions);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("fetch issue with transaction");
      }
    };
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  // delete handler

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      const res = await axios.post("/transactions/deleteTransaction", {
        transactionId: record._id,
      });
      setLoading(false);
      // forceUpdate();
      // window.location.reload(false);
      setDelData(res);
      message.success("transaction deleted");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("unable to delete");
    }
  };
  //for handling
  const handleSubmit = async (values) => {
    try {
      // const user = JSON.parse(sessionStorage.getItem("user"));

      const token = sessionStorage.getItem("token");
      setLoading(true);
      if (editable) {
        await axios.post(
          "/transactions/editTransaction",
          {
            payload: values,
            transactionId: editable._id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setLoading(false);
        // window.location.reload(false);

        message.success("transaction updated successfully");
      } else {
        await axios.post(
          "/transactions/addTransaction",
          
             values
          ,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setLoading(false);

        message.success("transaction added successfully");
        // window.location.reload(false);
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);

      message.error("failed to add transaction");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Weak</Select.Option>
            <Select.Option value="30">last 1 Month</Select.Option>

            <Select.Option value="365">last 1 Year</Select.Option>

            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>

            <Select.Option value="expense">Expense </Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="switch-icon ">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransaction} />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>
      <Modal
        title={editable ? "Edit transaction" : "Add transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <h1>Aditya</h1>
        <Form
          layout="horizontal"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="category" name="category">
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Tip">Tip</Select.Option>
              <Select.Option value="Project">Project</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Movies">Movies</Select.Option>
              <Select.Option value="Bills">Bills</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="Fee">Fee</Select.Option>
              <Select.Option value="Tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-danger">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
