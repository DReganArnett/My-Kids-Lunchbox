import React from "react";

function Alert({messages = [] }) {

  return (
      <div className="Alert">
        {messages.map(error => (
            <p key={error}>
              {error}
            </p>
        ))}
      </div>
  );
}

export default Alert;
