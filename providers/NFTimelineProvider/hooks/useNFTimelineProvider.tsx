/** @format */

import { useContext } from "react";
import { NFTimelineProviderContext } from "../components/NFTimelineProvider";

const useNFTimelineProvider = () => useContext(NFTimelineProviderContext);

export default useNFTimelineProvider;
