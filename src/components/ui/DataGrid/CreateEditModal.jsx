import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Steps,
  Tooltip,
  Upload,
  message,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getBase64 } from "./utils";
const { Option } = Select;
const { Step } = Steps;

export default function CreateEditModal({
  open,
  setOpen,
  selectedGridDataItem,
  handleSelectedGridDataItem,
  handleReloadGrid,
}) {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState({
    submit: false,
    classFetch: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState({
    classData: [],
    sectionData: [],
  });
  const [selectedSection, setSelectedSection] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const isCreate = Object.is(selectedGridDataItem, null);

  const onCloseModal = () => {
    setOpen({ payload: false, type: "createEdit" });
    setLoading({ ...loading, submit: false });
    setCurrentStep(0);
    handleSelectedGridDataItem();
    form.resetFields();
  };

  const onNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  const onPrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleClassChange = (value) => {
    const sections = data?.classData.filter((item) => item?._id === value)[0]
      .children;
    const selectedSectionId = sections[0]?._id;
    setData({ ...data, sectionData: sections });
    form.setFieldsValue({ section: selectedSectionId });
    setSelectedSection(selectedSectionId);
  };

  const handleSectionChange = (value) => {
    setSelectedSection(
      data?.sectionData.filter((item) => item?._id === value)[0]?._id
    );
  };

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

  const onFinish = async () => {
    let values = null;
    let formData = form.getFieldsValue(true);

    if (isCreate) {
      values = formData;
    } else {
      const { password, ...others } = formData;
      values = others;
    }

    const payload = {
      ...values,
      admissionDate: dayjs(values?.admissionDate).toISOString(),
      dateOfBirth: dayjs(values?.dateOfBirth).toISOString(),
      // image: fileList[0]?.originFileObj,
      image: fileList[0]?.originFileObj?.name,
      class: data?.classData.filter((item) => item?._id === values?.class)[0],
      section: data?.sectionData.filter(
        (item) => item?._id === values?.section
      )[0],
      role: "student",
    };

    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      setLoading({ ...loading, submit: true });
      const url = isCreate
        ? "http://localhost:5000/api/v1/student/create"
        : "http://localhost:5000/api/v1/student/update";
      const response = await fetch(url, options);
      const result = await response.json();

      if (result?.success) {
        handleReloadGrid();
        onCloseModal();

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
      setLoading({ ...loading, submit: false });
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchClassData = async () => {
      setLoading((prevState) => {
        return { ...prevState, classFetch: true };
      });
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/class/query/get",
          {
            method: "POST",
          }
        );
        const classes = await response.json();

        setData((prevState) => ({
          ...prevState,
          classData: classes?.data,
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading((prevState) => {
          return { ...prevState, classFetch: false };
        });
      }
    };

    if (open && data?.classData.length === 0) {
      fetchClassData();
    }

    // For edit mode
    if (open && !isCreate) {
      const sections = data?.classData.find(
        (item) => item?._id === selectedGridDataItem?.class?._id
      )?.children;

      if (sections) {
        setData((prevState) => ({
          ...prevState,
          sectionData: sections,
        }));
      }

      form.setFieldsValue({
        ...selectedGridDataItem,
        password: "1234567",
        class: selectedGridDataItem?.class?._id,
        section: selectedGridDataItem?.section?._id,
        dateOfBirth: dayjs(selectedGridDataItem?.dateOfBirth),
        admissionDate: dayjs(selectedGridDataItem?.admissionDate),
      });
    }
  }, [selectedGridDataItem, form, isCreate, open, data?.classData]);

  if (!isMounted) {
    return (
      <Tooltip
        title="Add a new student"
        color="#52525B"
        overlayInnerStyle={{ fontSize: "12px" }}
      >
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ fontSize: "18px" }} />}
        >
          New student
        </Button>
      </Tooltip>
    );
  }

  const steps = [
    // Login Info.
    {
      title: "Login Info",
      content: (
        <div style={{ height: 200, padding: "15px 0" }}>
          <Row gutter={[16, 0]}>
            {/* Full name */}
            <Col span={8}>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: "Insert the student full name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* Roll number */}
            <Col span={8}>
              <Form.Item
                name="rollNumber"
                label="Class roll number"
                rules={[
                  {
                    required: true,
                    message: "Insert the student's roll number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* Password */}
            <Col span={8}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Insert the student login password",
                  },
                ]}
              >
                <Input.Password disabled={!isCreate} />
              </Form.Item>
            </Col>
          </Row>
          {/* Upload Image */}
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item name="image" label="Upload photo">
                <Upload
                  //action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
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
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                  alt="image"
                />
              )}
            </Col>
          </Row>
        </div>
      ),
    },
    // Personal Info.
    {
      title: "Personal Info",
      content: (
        <div style={{ height: 500, padding: "15px 0" }}>
          {/* Name, Age & Gender */}
          <Row gutter={[16, 0]}>
            {/* Name */}
            <Col span={8}>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: "Insert the student name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* Roll number */}
            <Col span={8}>
              <Form.Item
                name="rollNumber"
                label="Class roll number"
                rules={[
                  {
                    required: true,
                    message: "Insert the student's roll number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* Date of birth */}
            <Col span={8}>
              <Form.Item name="dateOfBirth" label="Date of birth" rules={[]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            {/* Age */}
            <Col span={8}>
              <Form.Item
                name="age"
                label="Age"
                rules={[
                  {
                    type: "number",
                    min: 5,
                    max: 25,
                    message: "Age must be between 5-25",
                  },
                  {
                    required: true,
                    message: "Insert the student age",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            {/* Gender */}
            <Col span={8}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Select a gender",
                  },
                ]}
              >
                <Select placeholder="Select a gender" allowClear>
                  <Option value="Boy">Boy</Option>
                  <Option value="Girl">Girl</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* Religion */}
            <Col span={8}>
              <Form.Item
                name="religion"
                label="Religion"
                rules={[
                  {
                    required: true,
                    message: "Select a religion",
                  },
                ]}
              >
                <Select placeholder="Select a religion" allowClear>
                  <Option value="Islam">Islam</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* Class */}
            <Col span={8}>
              <Form.Item
                name="class"
                label="Class"
                rules={[
                  {
                    required: true,
                    message: "Insert the student class",
                  },
                ]}
              >
                <Select
                  placeholder="Select a class"
                  onChange={handleClassChange}
                  options={data?.classData.map((item) => ({
                    label: item?.name,
                    value: item?._id,
                  }))}
                />
              </Form.Item>
            </Col>
            {/* Section */}
            <Col span={8}>
              <Form.Item
                name="section"
                label="Section"
                rules={[
                  {
                    required: true,
                    message: "Insert the student section",
                  },
                ]}
              >
                <Select
                  placeholder="Select a section"
                  allowClear
                  value={selectedSection}
                  onChange={handleSectionChange}
                >
                  {data?.sectionData.map((item) => (
                    <Option value={item?._id} key={item?._id}>
                      {item?.name}
                      <span style={{ fontSize: "10px", paddingLeft: "5px" }}>
                        ({item?.capacity})
                      </span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {/* Admission date */}
            <Col span={8}>
              <Form.Item name="admissionDate" label="Admission Date" rules={[]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            {/* Present address */}
            <Col span={12}>
              <Form.Item
                name="presentAddress"
                label="Present address"
                rules={[
                  {
                    required: true,
                    message: "Insert the student present address",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* Permanent address */}
            <Col span={12}>
              <Form.Item
                name="permanentAddress"
                label="Permanent address"
                rules={[
                  {
                    required: true,
                    message: "Insert the student permanent address",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* Birth certificate */}
            <Col span={24}>
              <Form.Item
                name="birthCertificateNumber"
                label="Brith Certificate"
                rules={[
                  {
                    required: true,
                    message: "Insert the student brith certificate",
                  },
                ]}
              >
                <Input.OTP length={14} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    // Addtional Info.
    {
      title: "Additional Info",
      content: (
        <div style={{ height: 200, padding: "15px 0" }}>
          <Row gutter={[16, 0]}>
            {/* Mobile number */}
            <Col span={8}>
              <Form.Item name="mobileNumber" label="Mobile number">
                <Input />
              </Form.Item>
            </Col>
            {/* Discounted fee */}
            <Col span={8}>
              <Form.Item name="discountFee" label="Discounted fee">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            {/* Siblings */}
            <Col span={8}>
              <Form.Item name="siblings" label="Siblings">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            {/* Previous school name */}
            <Col span={8}>
              <Form.Item name="previousSchool" label="Previous school name">
                <Input />
              </Form.Item>
            </Col>
            {/* Blood Group */}
            <Col span={8}>
              <Form.Item name="bloodGroup" label="Blood Group">
                <Select placeholder="Select a blood group" allowClear>
                  <Option value="A+">A+</Option>
                  <Option value="B+">B+</Option>
                  <Option value="O+">O+</Option>
                  <Option value="AB+">AB+</Option>
                  <Option value="A-">A-</Option>
                  <Option value="B-">B-</Option>
                  <Option value="O-">O-</Option>
                  <Option value="AB-">AB-</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* Parent */}
            <Col span={8}>
              <Form.Item name="parentId" label="parent">
                <Select placeholder="Select a parent" allowClear>
                  <Option value="A+">Parent one</Option>
                  <Option value="B+">Parent two</Option>
                  <Option value="O+">Parent three</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    // Preview Details.
    {
      title: "Preview Details",
      content: <div style={{ height: 200, padding: "15px 0" }}>Preview</div>,
    },
  ];

  return (
    <>
      {contextHolder}
      <Tooltip
        title="Add a new student"
        color="#52525B"
        overlayInnerStyle={{ fontSize: "12px" }}
      >
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ fontSize: "18px" }} />}
          onClick={() => setOpen({ payload: true, type: "createEdit" })}
        >
          New student
        </Button>
      </Tooltip>
      <Modal
        forceRender
        open={open}
        title={isCreate ? "Create a new student" : "Edit student details"}
        width={800}
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
            name="create_edit_student_modal"
            size="middle"
            clearOnDestroy
            onFinish={onFinish}
          >
            {dom}
          </Form>
        )}
      >
        <Steps current={currentStep} size="small">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>

        <div className="steps-content">{steps[currentStep].content}</div>

        <div style={{ textAlign: "right" }}>
          {currentStep > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={onPrevious}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 &&
            currentStep !== steps.length - 2 && (
              <Button type="primary" onClick={onNext}>
                Next
              </Button>
            )}
          {currentStep === steps.length - 2 && (
            <Button type="primary" onClick={onNext}>
              Preview
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit" loading={loading?.submit}>
              Submit
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
}
