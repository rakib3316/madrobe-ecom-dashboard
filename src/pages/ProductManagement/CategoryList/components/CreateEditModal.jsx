import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Tooltip,
  TreeSelect,
  Upload,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useAddCategoryMutation } from "../../../../redux/features/category/categoryApi";
import { getBase64 } from "../utils";

const treeData = [
  {
    value: "parent 1",
    title: "parent 1",
    children: [
      {
        value: "parent 1-0",
        title: "parent 1-0",
        children: [
          {
            value: "leaf1",
            title: "leaf1",
          },
          {
            value: "leaf2",
            title: "leaf2",
          },
          {
            value: "leaf3",
            title: "leaf3",
          },
          {
            value: "leaf4",
            title: "leaf4",
          },
          {
            value: "leaf5",
            title: "leaf5",
          },
          {
            value: "leaf6",
            title: "leaf6",
          },
        ],
      },
      {
        value: "parent 1-1",
        title: "parent 1-1",
      },
    ],
  },
];

export default function CreateEditModal({
  open,
  setOpen,
  selectedGridDataItem,
  //handleSelectedGridDataItem,
  //handleReloadGrid,
}) {
  const [form] = Form.useForm();
  const user = useSelector(getCurrentUser);
  const [treeValue, setTreeValue] = useState();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const isCreate = Object.is(selectedGridDataItem, null);

  const handleBeforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      messageApi.open({
        type: "error",
        content: "You can only upload JPG/PNG file!",
      });
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageApi.open({
        type: "error",
        content: "Image must smaller than 2MB!",
      });
      return Upload.LIST_IGNORE;
    }
    return isJpgOrPng && isLt2M;
  };

  const handleImageChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const onChange = (newValue) => {
    setTreeValue(newValue);
  };

  const onCloseModal = () => {
    setOpen({ payload: false, type: "createEdit" });
    //handleSelectedGridDataItem();
    form.resetFields();
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onFinish = async (values) => {
    let formData = new FormData();

    const data = {
      category_name: values.category_name,
      parent_id: values.parent_id,
      posted_by: user?.user_id,
      posted_user: user?.fullName,
      posted_date: dayjs().toString(),
    };

    formData.append("file", values?.image?.file?.originFileObj);
    formData.append("data", JSON.stringify(data));

    try {
      await addCategory(formData).unwrap();
      messageApi.success("Category created successfully");
      onCloseModal();
      setFileList([]);
    } catch (error) {
      messageApi.error("Failed to create category");
    }
  };

  return (
    <>
      <Tooltip
        title="Add a new category"
        color="#52525B"
        styles={{
          body: {
            fontSize: "12px",
          },
        }}
      >
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ fontSize: "18px" }} />}
          onClick={() => setOpen({ payload: true, type: "createEdit" })}
        >
          New category
        </Button>
      </Tooltip>
      <Modal
        forceRender
        open={open}
        title={isCreate ? "Add a new category" : "Edit category"}
        width={400}
        style={{
          top: 40,
        }}
        footer={null}
        onCancel={onCloseModal}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="create_edit_category_modal"
            size="middle"
            clearOnDestroy
            onFinish={onFinish}
          >
            {contextHolder}
            {dom}
          </Form>
        )}
      >
        {/* Category name */}
        <Form.Item
          name="category_name"
          label="Category Name"
          rules={[
            {
              required: true,
              message: "Please input category name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* Category list */}
        <Form.Item name="parent_id" label="Parent category">
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            value={treeValue}
            styles={{
              popup: { root: { maxHeight: 400, overflow: "auto" } },
            }}
            placeholder="Please select parent category"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={treeData}
          />
        </Form.Item>
        {/* Image */}
        <Form.Item name="image" label="Upload photo">
          <Upload
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={fileList}
            beforeUpload={handleBeforeUpload}
            onChange={handleImageChange}
            onPreview={handlePreview}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
            alt="image"
          />
        )}

        <div style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {isCreate ? "Create" : "Update"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
