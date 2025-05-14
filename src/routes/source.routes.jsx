import { NavLink } from "react-router";
import Dashboard from "../pages/Dashboard";
import AttributeList from "../pages/ProductManagement/AttributeList";
import CategoryList from "../pages/ProductManagement/CategoryList/Index";
import ProductList from "../pages/ProductManagement/ProductList";

export const routeSources = [
  {
    name: "Dashboard",
    path: "/",
    element: <Dashboard />,
  },
  {
    name: "Product Management",
    children: [
      {
        name: "Product List",
        path: "product",
        element: <ProductList />,
      },
      {
        name: "Category List",
        path: "category",
        element: <CategoryList />,
      },
      {
        name: "Attribute List",
        path: "attribute",
        element: <AttributeList />,
      },
    ],
  },
  {
    name: "Order Management",
    children: [
      {
        name: "Purchase Order(s)",
        path: "order",
        element: <ProductList />,
      },
      {
        name: "Customer Order(s)",
        path: "customer-order",
        element: <CategoryList />,
      },
      {
        name: "Refund & Replacement",
        path: "redund-replacement",
        element: <AttributeList />,
      },
    ],
  },
];

export const sidebarItems = routeSources.reduce((acc, item) => {
  if (item.name && item.path) {
    acc.push({
      key: item.name,
      label: <NavLink to={item.path}>{item.name}</NavLink>,
    });
  }

  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: <NavLink to={child.path}>{child.name}</NavLink>,
      })),
    });
  }

  return acc;
}, []);

// export const productPaths = [
//   {
//     path: "/",
//     element: <Dashboard />,
//   },
//   {
//     path: "product", // This is a relative path,
//     element: <ProductList />,
//   },
//   {
//     path: "category", // This is a relative path,
//     element: <CategoryList />,
//   },
//   {
//     path: "attribute", // This is a relative path,
//     element: <AttributeList />,
//   },
// ];
