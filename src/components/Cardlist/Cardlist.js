import React from "react";
import Card from "../Card";

const Cardlist = ({ avatars }) => {
  return (
    <div>
      {avatars.map((user, i) => {
        return (
          <Card
            key={i}
            id={avatars[i].id}
            name={avatars[i].name}
            email={avatars[i].email}
          />
        );
      })}
    </div>
  );
};

export default Cardlist;
