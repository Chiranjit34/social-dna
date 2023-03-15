import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";
import { api } from "../api";

function AdminUserScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    { title: "userid", dataIndex: "_id", key: "_id" },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    { title: "email", dataIndex: "email", key: "email" },

    {
      title: "isAdmin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (
        <>
          {isAdmin === true ? (
            <Tag color="green">YES</Tag>
          ) : (
            <Tag color="red">NO</Tag>
          )}
        </>
      ),
    },
  ];


  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${api}/api/users/getallusers`);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div className="row">
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Error msg={error} />
      ) : (
        <div className="col-md-12">
          <div className="col md-12">
            <button className="btn btn-success" onClick={fetchMyData}>
              Refresh
            </button>
          </div>
          <div className="col-md-12">
            <Table columns={columns} dataSource={users} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUserScreen;
