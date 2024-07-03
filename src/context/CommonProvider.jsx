import React from "react";
import { createContext, useState } from "react";

const CommonContext = createContext({});

export const CommonProvider = ({ children }) => {
  const [profile, setProfile] = useState();
  const [cardItems, setCardItems] = useState([]);

  return (
    <CommonContext.Provider
      value={{ profile, setProfile, cardItems, setCardItems }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContext;
