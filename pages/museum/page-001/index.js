function Page001() {
  return (
    <>
      <style>
        {`
          .highlightable {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
            position: absolute;
            font-size: 7rem;
            color: rgba(0, 0, 0, 0.01);
            z-index: 100;
            user-select: text;
            text-align: center;
            transition: color 0.2s ease;
          }

          .highlightable::selection {
            background: black;
            color: white;
          }

          .highlightable::-moz-selection {
            background: black;
            color: white;
          }
        `}
      </style>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          backgroundColor: "#f3f4f6",
          position: "relative",
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
          }}
        >
          Don&apos;t Panic
        </div>

        <div className="highlightable">42</div>

        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            fontSize: ".75rem",
            color: "#c5c5c5ff",
          }}
        >
          Select the text on screen to reveal the answer.
        </div>
      </div>
    </>
  );
}

export default Page001;
