import { EllipsisOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown } from "antd";
import dayjs from "dayjs";
import { Pencil, Trash2 } from "lucide-react";

const actionItems = [
  {
    key: "edit",
    label: "Edit",
    icon: <Pencil size={16} />,
  },
  {
    key: "delete",
    label: "Delete",
    icon: <Trash2 size={16} />,
    danger: true,
  },
];

export default function getColumns(
  sortedInfo,
  gridQueryValues,
  setSelectedGridDataItem,
  handleToggleModal
) {
  // function onActionsMenuClick(record, { key }) {
  //   // Class edit modal
  //   if (key === "edit") {
  //     setSelectedGridDataItem(record);
  //     handleToggleModal({ type: "createEdit", payload: true });
  //   }

  //   if (key === "delete") {
  //     setSelectedGridDataItem(record);
  //     handleToggleModal({ type: "delete", payload: true });
  //   }
  // }

  return [
    {
      title: "Blog title",
      dataIndex: "title",
      key: "title",
      width: 100,
      sorter: true,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 80,
      sorter: true,
      filters: [
        {
          text: "Sara Lee",
          value: "Sara Lee",
        },
        {
          text: "Emily Stone",
          value: "Emily Stone",
        },
        {
          text: "Nina Patel",
          value: "Nina Patel",
        },
        {
          text: "Tom Hanks",
          value: "Tom Hanks",
        },
        {
          text: "Mike Brown",
          value: "Mike Brown",
        },
        {
          text: "Alex Johnson",
          value: "Alex Johnson",
        },
        {
          text: "John Smith",
          value: "John Smith",
        },
        {
          text: "Jane Doe",
          value: "Jane Doe",
        },
      ],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 100,
      sorter: true,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      width: 120,
      render: (_, record) => <>{record?.tags.map((tag) => `${tag}, `)}</>,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      width: 60,
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
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "Inactive",
          value: false,
        },
      ],
      // filteredValue: filteredInfo.isActive || null,
    },
    // {
    //   title: "Actions",
    //   width: 100,
    //   align: "center",
    //   render: (_, record) => (
    //     <Dropdown
    //       menu={{
    //         items: actionItems,
    //         onClick: (menuInfo) => onActionsMenuClick(record, menuInfo),
    //       }}
    //       trigger="click"
    //     >
    //       <Button
    //         type="text"
    //         icon={<EllipsisOutlined style={{ fontSize: "20px" }} />}
    //       />
    //     </Dropdown>
    //   ),
    // },
  ];
}
