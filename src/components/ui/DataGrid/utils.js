// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";

// export const excelExport = (data, selectedRowKeys, setSelectedRowKeys) => {
//   const selectedData = data.filter((item) =>
//     selectedRowKeys.includes(item._id)
//   );

//   const modifiedData = selectedData.map((item) => ({
//     name: item.name,
//     age: item.age,
//     class: item.class,
//   }));

//   const worksheet = XLSX.utils.json_to_sheet(modifiedData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Student list");
//   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//   const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//   saveAs(blob, "sutdent_list.xlsx");
//   setSelectedRowKeys([]);
// };

export async function fetchData(queryParams) {
  const { gridQuery, paginationQuery } = queryParams;
  const finalQuery = {
    ...gridQuery?.filter,
    ...gridQuery?.search,
  };

  const payload = {
    query: finalQuery,
    skip: (paginationQuery.current - 1) * paginationQuery.pageSize,
    limit: paginationQuery.pageSize,
    sort: gridQuery?.sort,
  };

  const response = await fetch(
    "http://localhost:5000/api/v1/student/query/get",
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export function getSortQuery(sorter) {
  if (sorter?.order) {
    const sortOrder =
      sorter?.order === "ascend" ? sorter?.field : `-${sorter?.field}`;
    return { field: "sort", value: sortOrder };
  }

  return { field: "sort", value: null };
}

export function getFilterQuery(filters) {
  const query = [];

  Object.keys(filters).forEach((key) => {
    query.push({ field: key, value: filters[key] });
  });

  return query;
}

export function batchUpdateState(prevState = [], updates) {
  let updatedState = [...prevState];

  updates.forEach(({ field, value }) => {
    const index = updatedState.findIndex((item) => item.field === field);

    if (!value) {
      if (index !== -1) {
        updatedState.splice(index, 1);
      }
    } else {
      if (index !== -1) {
        updatedState[index] = { field, value };
      } else {
        updatedState.push({ field, value });
      }
    }
  });

  return updatedState;
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
