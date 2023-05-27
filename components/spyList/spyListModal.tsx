/** @format */

import useNFTimelineProvider from "hooks/NFTimelineProvider";
import { Address, useWeb3Provider } from "hooks/web3";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AddressBook from "hooks/web3/helpers/AddressManager";

const Container = styled.div`
  width: 500px;
  min-height: 200px;
  padding: 5px;
`;

const InfoArea = styled.div`
  text-align: left;
  color: black;
  font-size: medium;
`;
const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  color: black;
  font-size: large;
  column-gap: 10px;
  justify-content: space-between;
`;

const AddressColum = styled.div`
  display: flex;
  :hover {
    color: #ff55bb;
    cursor: pointer;
  }
`;

const RemoveColum = styled.div`
  :hover {
    color: #2d93f8;
    cursor: pointer;
  }
`;

/** @format */
interface SpyListModalProps {
  handleInputChange: (input: any) => void;
  searchUsersHistory: (address?: string) => void;
  handleCloseModal: (flag: boolean) => void;
}
export default function SpyListModal({
  handleInputChange,
  searchUsersHistory,
  handleCloseModal,
}: SpyListModalProps) {
  const { spyList, removeFromSpyList } = useNFTimelineProvider();
  const { walletAddress } = useWeb3Provider();

  const searchSpiedOn = (address: string) => {
    handleInputChange(address);
    searchUsersHistory(address);
    handleCloseModal(false);
  };

  const removeAddress = (address: string) => {
    removeFromSpyList(walletAddress, address).then((result) => {
      if (result) spyList.removeFromAddressBook(address);
    });
  };

  return (
    <Container>
      <InfoArea>
        You are currently spying on {spyList.addressCount()} wallets.
      </InfoArea>
      <TableWrapper>
        {spyList &&
          spyList
            .getAddressBook()
            .map((address: Address, key: number) => (
              <SpyRow
                key={key}
                address={address}
                removeAddress={removeAddress}
                searchSpiedOn={searchSpiedOn}
              />
            ))}
      </TableWrapper>
    </Container>
  );
}

interface SpyRowProps {
  address: Address;
  searchSpiedOn: (address: string) => void;
  removeAddress: (address: string) => void;
}
function SpyRow({ address, searchSpiedOn, removeAddress }: SpyRowProps) {
  console.log("Spy List Added: ", address.getEns());
  return (
    <TableRow>
      <AddressColum onClick={() => searchSpiedOn(address.getAddress())}>
        {address.hasEns() ? address.getEns() : address.getAddress()}
      </AddressColum>
      <RemoveColum onClick={() => removeAddress(address.getAddress())}>
        <FontAwesomeIcon icon={faTrash} />
      </RemoveColum>
    </TableRow>
  );
}
