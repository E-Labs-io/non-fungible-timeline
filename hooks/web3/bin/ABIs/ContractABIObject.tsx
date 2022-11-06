/** @format */

//  ABI Storage
import IERC721 from "./IERC721";
import IERC20 from "./IERC20";
import IERC1155 from "./IERC1155";
import { ContractABIInterface } from "../../types/helperInterfaces";

const ContractABIs: ContractABIInterface = {
  ERC20: IERC721,
  ERC721: IERC20,
  ERC1155: IERC1155,
};

export default ContractABIs;
