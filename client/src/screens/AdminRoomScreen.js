import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";
import { api } from "../api";

function AdminRoomScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    {
      title: "roomid",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    { title: "maxcount", dataIndex: "maxcount", key: "maxcount" },
    { title: "phonenumber", dataIndex: "phonenumber", key: "phonenumber" },
    { title: "rentperday", dataIndex: "rentperday", key: "rentperday" },
    { title: "locality", dataIndex: "locality", key: "locality" },
    { title: "type", dataIndex: "type", key: "type" },
  ];

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const res = (await axios.post(`${api}/api/rooms/getallrooms`));
      setRooms(res.data);
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
        <Loader/>
      ) : error.length > 0 ? (
        <Error msg={error}/>
      ) : (
        <>
          <>
            <button className="btn btn-success" onClick={fetchMyData}>
              Refresh
            </button>
          </>
          <div className="col-md-12">
            <Table columns={columns} dataSource={rooms} />
          </div>
        </>
      )}
    </div>
  );
}

export default AdminRoomScreen;
