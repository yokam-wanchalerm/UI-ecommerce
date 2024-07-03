import { useContext } from "react";
import CommonContext from "../context/CommonProvider";

const useCommon = () => {
  return useContext(CommonContext);
};

export default useCommon;
