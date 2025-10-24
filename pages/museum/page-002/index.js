import { useState } from "react";

function Page002() {
  const [showMsg, setShowMsg] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          fontSize: "2.5rem",
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "#111827",
          padding: "2.5rem 3rem",
          backgroundColor: "#fff",
          borderRadius: "0.375rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          opacity: showMsg ? 0 : 1,
          transform: `scale(${showMsg ? 0.95 : 1})`,
          transition: "all 0.6s ease",
        }}
        onClick={() => setShowMsg((prev) => !prev)}
      >
        Don't Panic
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          fontSize: "7rem",
          color: "white",
          background: "black",
          userSelect: "text",
          textAlign: "center",
          cursor: "pointer",
          borderRadius: "0.375rem",
          padding: "2.5rem 3rem",
          opacity: showMsg ? 1 : 0,
          transform: `scale(${showMsg ? 1 : 1.05})`,
          transition: "all 0.6s ease",
        }}
        onClick={() => setShowMsg((prev) => !prev)}
      >
        42
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          fontSize: ".75rem",
          color: "#c5c5c5ff",
        }}
      >
        Click the text on screen to reveal the answer.
      </div>
    </div>
  );
}

export default Page002;
