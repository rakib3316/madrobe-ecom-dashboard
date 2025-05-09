import deleteGif from "../../../assets/emergency.gif";
import { Button, Flex, Modal, message } from "antd";
import { useState } from "react";

export default function DeleteModal({
  open,
  setOpen,
  selectedGridDataItem,
  handleSelectedGridDataItem,
  handleReloadGrid,
}) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    let payload = {
      studentId: selectedGridDataItem?._id,
      userId: selectedGridDataItem?.userId,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      setLoading(true);
      const url = "http://localhost:5000/api/v1/student/delete";
      const response = await fetch(url, options);
      const result = await response.json();

      if (result?.success) {
        handleReloadGrid();
        handleCancel();

        messageApi.open({
          type: "success",
          content: result?.message,
        });
      } else {
        messageApi.open({
          type: "error",
          content: result?.message,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen({ payload: false, type: "delete" });
    handleSelectedGridDataItem();
    setLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal open={open} onCancel={handleCancel} footer={null} width={300}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Icon */}
          <img
            src={deleteGif}
            alt="Emergency gif"
            width={80}
            height={80}
            unoptimized={true}
          />
          {/* Title */}
          <h3 style={{ fontWeight: 600 }}>Delete student</h3>
          {/* Delete message */}
          <p style={{ textAlign: "center", fontWeight: 400 }}>
            You&apos;re going to delete the student &quot;
            <span style={{ color: "#EF4444", fontWeight: 700 }}>
              {selectedGridDataItem?.fullName}
            </span>
            . Are you sure?
          </p>
          {/* Buttons */}
          <Flex gap="middle">
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              loading={loading}
            >
              Yes, Delete!
            </Button>
            <Button type="default" onClick={handleCancel}>
              No, Keep it.
            </Button>
          </Flex>
        </div>
      </Modal>
    </>
  );
}
