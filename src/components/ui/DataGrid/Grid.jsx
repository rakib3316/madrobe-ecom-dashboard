import { SearchOutlined } from "@ant-design/icons";
import { Input, Pagination, Table } from "antd";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useGetBlogsQuery } from "../../../redux/features/blog/blogApi";
import getColumns from "./getColumns";
import { batchUpdateState, getFilterQuery, getSortQuery } from "./utils";

export default function Grid() {
  const [searchValue, setSearchValue] = useState("");
  const [params, setParams] = useState([]);
  const { data, isFetching } = useGetBlogsQuery(params);
  const columns = getColumns();
  const dataSource = data?.data?.result;
  const metaData = data?.data?.meta;

  const handleGridChange = (_, filters, sorter) => {
    const sortQuery = getSortQuery(sorter);
    const filterQuery = getFilterQuery(filters);

    setParams((prevState) =>
      batchUpdateState(prevState, [sortQuery, ...filterQuery])
    );
  };

  const onSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    doSearch(value);
  };

  const doSearch = useDebounce((searchValue) => {
    const searchQuery = {
      field: "searchTerm",
      value: searchValue !== "" ? searchValue : null,
    };

    setParams((prevState) => batchUpdateState(prevState, [searchQuery]));
  }, 500);

  const onPageSizeChange = (current, pageSize) => {
    const pageQuery = { field: "page", value: current };
    const limitQuery = { field: "limit", value: pageSize };

    setParams((prevState) =>
      batchUpdateState(prevState, [pageQuery, limitQuery])
    );
  };

  const onPageChange = (page) => {
    const pageQuery = { field: "page", value: page };
    setParams((prevState) => batchUpdateState(prevState, [pageQuery]));
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Input
        placeholder="Search..."
        size="middle"
        suffix={!searchValue ? <SearchOutlined /> : null}
        onChange={onSearch}
        allowClear
        style={{ marginBottom: 16, width: 250 }}
      />
      <div
        style={{
          width: "100%",
          height: "450px",
          overflow: "auto",
          marginBottom: "10px",
        }}
      >
        <Table
          rowKey={(record) => record._id.toString()}
          size="small"
          columns={columns}
          dataSource={dataSource}
          onChange={handleGridChange}
          loading={isFetching}
          pagination={false}
        />
      </div>
      <Pagination
        className="custom-pagination"
        size="small"
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        showSizeChanger
        onShowSizeChange={onPageSizeChange}
        pageSize={metaData?.limit}
        total={metaData?.total}
        onChange={onPageChange}
      />
    </div>
  );
}
