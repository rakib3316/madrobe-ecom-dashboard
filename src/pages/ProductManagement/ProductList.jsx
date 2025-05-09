import React, { useEffect } from "react";
import { useGetAllClassRoomsMutation } from "../../redux/features/classRoom/classRoomApi";

export default function ProductList() {
  const [getAllClassRooms, { data }] = useGetAllClassRoomsMutation();

  console.log("data >>", data);

  useEffect(() => {
    getAllClassRooms();
  }, [getAllClassRooms]);
  return <div>ProductList data</div>;
}
