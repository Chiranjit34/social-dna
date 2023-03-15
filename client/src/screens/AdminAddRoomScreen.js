import React, { useState } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Select } from "antd";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { api } from "../api";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function AdminAddRoomScreen() {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${api}/api/rooms/addroom`, values);
      // console.log(res.data);
      Swal.fire("Congratulations", "Your Room Added Successfully", "success");
      form.resetFields();
    } catch (error) {
      console.log(error);
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }

    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="row">
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Error msg={error} />
      ) : (
        <div className="col-md-12">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="maxcount"
              label="Max People Allowed"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>
            <Form.Item
              name="phonenumber"
              label="Contact Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="locality"
              label="Locality"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="rentperday"
              label="Rent Per Day"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>
            <Form.Item
              name="imageurl1"
              label="Image url 1"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="imageurl2"
              label="Image url 2"
              rules={[
                {
                  //required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="imageurl3" label="Image url 3">
              <Input />
            </Form.Item>
            <Form.Item name="imageurl4" label="Image url 4">
              <Input />
            </Form.Item>
            <Form.Item name="imageurl5" label="Image url 5">
              <Input />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select a room type" allowClear >
                <Option value="delux">Delux</Option>
                <Option value="non-delux">Non-Delux</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="success" htmlType="submit">
                Add
              </Button>
              <Button type="danger" htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}

export default AdminAddRoomScreen;
