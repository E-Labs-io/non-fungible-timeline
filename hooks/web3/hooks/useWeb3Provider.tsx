/** @format */

import { useContext } from "react";
import { UserWeb3Context } from "../userWeb3Provider";

const useWeb3Provider = () => useContext(UserWeb3Context);

export default useWeb3Provider;
