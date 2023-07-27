import { Suspense, lazy } from "react";
import "./Purchase.css";
("../components/form/SelectCompanies");
import Loading from "../components/Loading";

const Content = lazy(() => import("../components/Content"));

export default function Purchase() {
  return (
    <Suspense fallback={<Loading />}>
      <Content />
    </Suspense>
  );
}
