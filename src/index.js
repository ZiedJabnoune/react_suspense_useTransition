import React, { Suspense, useState, useTransition } from "react";
import ReactDOM from "react-dom";

import { Spinner, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";
import createResource from "./RandomNum";

const Num = ({ resource }) => {
  const num = resource.num.read();
  return <div>{num}</div>;
};

const init = createResource();
const ini2 = createResource();

function App() {
  const [resource, setResource] = useState(init);
  const [resource2, setResource2] = useState(ini2);

  const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });

  const refresh = () => {
    startTransition(() => setResource(createResource()));
  };

  const refresh2 = () => {
    setResource2(createResource());
  };

  return (
    <div className="App">
      <div style={{ border: "solid 1px", margin: "10px" }}>
        <Suspense fallback={<Spinner animation="grow" />}>
          <div style={{ color: isPending ? "pink" : "black" }}>
            <Num resource={resource} />
          </div>
        </Suspense>
        <div>
          <Button
            style={{ margin: "10px" }}
            disabled={isPending}
            onClick={refresh}
          >
            Refresh (useTransition)
          </Button>
        </div>
      </div>
      <div style={{ border: "solid 1px", margin: "10px" }}>
        <Suspense fallback={<Spinner animation="grow" />}>
          <div>
            <Num resource={resource2} />
          </div>
        </Suspense>
        <div>
          <Button style={{ margin: "10px" }} onClick={refresh2}>
            Refresh{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
