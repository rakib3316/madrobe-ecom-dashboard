import { NavLink } from "react-router";

export const sidebarRoutesGenerator = (items) => {
  const routes = items.reduce((acc, item) => {
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

  return routes;
};
