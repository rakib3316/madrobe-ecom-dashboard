// import Grid from "../../../../components/ui/DataGrid/Grid";
import { SearchOutlined } from "@ant-design/icons";
import { Badge, Flex, Image, Input, Pagination, Table } from "antd";
import { useState } from "react";
import { useGetCategoriesQuery } from "../../../../redux/features/category/categoryApi";
import CreateEditModal from "./CreateEditModal";

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: "33.33%",
    render: (image) => <Image src={image.url} width={70} />,
  },
  {
    title: "Category name",
    dataIndex: "category_name",
    key: "category_name",
    width: "33.33%",
  },
  {
    title: "Active",
    dataIndex: "isActive",
    key: "isActive",
    width: "30.33%",
    render: (isActive) => (
      <Badge
        count={isActive ? "Yes" : "No"}
        style={{
          backgroundColor: isActive ? "#DCFCE7" : "#FEE2E2",
          color: isActive ? "#15803D" : "#B91C1C",
          fontWeight: 600,
          border: "0px",
        }}
      />
    ),
  },
];
const data = [
  {
    key: 1,
    category_name: "Clothes",
    image:
      "https://www.brandedgifts.ng/wp-content/uploads/2018/12/Laptop-Bag-Backpack_Original.jpg",
    isActive: true,
    children: [
      {
        key: 11,
        category_name: "Best seller",
        image:
          "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
        isActive: true,
      },
      {
        key: 12,
        category_name: "Top",
        image:
          "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
        isActive: true,
      },
    ],
  },
  {
    key: 2,
    category_name: "New Arrival",
    image:
      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
    isActive: true,
    children: null,
  },
];

export default function CategoryGrid() {
  const [searchValue, setSearchValue] = useState("");
  const [gridParams, setGridParams] = useState([]);
  const { data, isFetching } = useGetCategoriesQuery(gridParams);
  const dataSource = data?.data?.data;
  const metaData = data?.data?.meta;
  // For all modal
  const [modalOpen, setModalOpen] = useState({
    createEdit: false,
    delete: false,
  });
  // Contain selected grid item data for updating and deleting.
  const [selectedGridDataItem, setSelectedGridDataItem] = useState(null);
  // Reload data grid after creating, updating & deleting
  const [reloadGrid, setReloadGrid] = useState(false);

  function handleToggleModal(value) {
    let updateObj = { ...modalOpen };
    if (value.type === "createEdit") {
      updateObj = {
        ...modalOpen,
        createEdit: value?.payload,
      };
    } else if (value.type === "delete") {
      updateObj = {
        ...modalOpen,
        delete: value?.payload,
      };
    }
    setModalOpen(updateObj);
  }

  return (
    <div className="data-grid-container">
      {/* Toolbar */}
      <div style={{ paddingBottom: "10px" }}>
        <Flex justify="space-between">
          <Flex gap="small">
            <Input
              placeholder="Search..."
              size="middle"
              suffix={<SearchOutlined />}
              //onChange={onSearch}
              style={{ marginBottom: 16, width: 250 }}
            />
          </Flex>

          <>
            <CreateEditModal
              open={modalOpen?.createEdit}
              setOpen={handleToggleModal}
              selectedGridDataItem={selectedGridDataItem}
              handleReloadGrid={() => setReloadGrid(!reloadGrid)}
              handleSelectedGridDataItem={() => setSelectedGridDataItem(null)}
            />
          </>
        </Flex>
      </div>
      {/* Datagrid */}
      <div className="table">
        <Table
          rowKey={(record) => record._id.toString()}
          size="small"
          columns={columns}
          dataSource={dataSource}
          loading={isFetching}
          pagination={false}
          expandable={{
            indentSize: 30,
          }}
        />
      </div>
      {/* Pagination */}
      <div>
        <Pagination
          className="custom-pagination"
          size="small"
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          showSizeChanger
          //onShowSizeChange={onPageSizeChange}
          pageSize={metaData?.limit}
          total={metaData?.total}
          //onChange={onPageChange}
        />
      </div>
    </div>
  );
}
