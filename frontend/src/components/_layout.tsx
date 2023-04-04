import { ReactElement } from "react";

const Layout = ({ children }: { children: ReactElement }) => {
  return <div className="main-container">{children}</div>;
};

export default Layout;
