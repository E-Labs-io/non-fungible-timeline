/** @format */

import useNFTimelineProvider from "hooks/NFTimelineProvider";
import { Address, useWeb3Provider, AddressBook } from "e-labs_web3provider";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import StateSkeleton from "components/common/SkeletonLoader";

const Container = styled.div`
  width: 550px;
  min-height: 100px;
  max-height: 600px;
  padding: 10px;
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
  height: 30px;
  width: 490px;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: black;
  font-size: large;
  column-gap: 10px;
  justify-content: space-between;
`;

const AddressColum = styled.div`
  display: flex;
  height: 30px;
  width: 450px;
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
  const [list, setList] = useState<AddressBook>();
  const { walletAddress } = useWeb3Provider();
  const [working, setWorking] = useState<boolean>(false);

  useEffect(() => {
    if (!list && spyList && !working) setList(spyList);
  });

  const searchSpiedOn = (address: string) => {
    handleInputChange(address);
    searchUsersHistory(address);
    handleCloseModal(false);
  };

  const removeAddress = async (address: string): Promise<boolean> => {
    setWorking(true);
    return removeFromSpyList(walletAddress, address).then((result) => {
      if (!result) {
        setWorking(false);
        return false;
      } else {
        setList(result);
        setWorking(false);
        return true;
      }
    });
  };

  return (
    <Container>
      <InfoArea>
        You are currently spying on {list ? list.addressCount() : 0} wallets.
      </InfoArea>
      <TableWrapper>
        {list &&
          list
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
  removeAddress: (address: string) => Promise<boolean>;
}
function SpyRow({ address, searchSpiedOn, removeAddress }: SpyRowProps) {
  const [displayAddress, setDisplayAddress] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (address.isReady() && !displayAddress) {
      if (address.hasEns()) setDisplayAddress(address.getEns());
      else setDisplayAddress(address.getAddress());
    } else if (!address.isReady())
      address.on("ready", () =>
        setDisplayAddress(
          address.hasEns() ? address.getEns() : address.shortenAddress()
        )
      );
  });

  const onClickAddress = () => {
    searchSpiedOn(address.getAddress());
  };

  const onClickRemove = () => {
    setLoading(true);
    removeAddress(address.getAddress()).then((result) => setLoading(result));
  };

  return (
    <TableRow>
      {loading && (
        <StateSkeleton
          width="inherit"
          height="30px"
          colorA={"#00dbde"}
          colorB={"#fc00ff"}
          border=""
        />
      )}
      {!loading && (
        <>
          <AddressColum onClick={onClickAddress}>
            {address.hasEns() ? address.getEns() : address.getAddress()}
          </AddressColum>
          <RemoveColum onClick={onClickRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </RemoveColum>
        </>
      )}
    </TableRow>
  );
}
