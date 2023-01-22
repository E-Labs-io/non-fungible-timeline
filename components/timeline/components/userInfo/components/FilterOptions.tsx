/** @format */

import { Button } from "components/common";
import ToggleSwitch from "components/common/ToggleSwitch";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #86848447;
  transition: all 0.3s linear;
  border-radius: 10px;
  width: 80%;
  height: 200px;
  align-items: left;
  justify-content: center;
  padding: 10px;
  margin: auto;
  row-gap: 20px;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const FilterInsert = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  column-gap: 30px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: right;
  display: flex;
  padding: 5px;
`;

interface FilterOptionsProps {}
function FilterOptions({}: FilterOptionsProps) {
  const {
    addTimelineFilter,
    removeTimelineFilter,
    removeAllTimelineFilters,
    timelineFilters,
  } = useNFTimelineProvider();

  const handleToggleVerifiedFilter = (flag: boolean) => {
    if (flag) {
      console.log("Verified Filter: ", flag);
      addTimelineFilter({ filterType: "verified" });
    } else {
      console.log("Verified Filter: ", flag);
      removeTimelineFilter("verified");
    }
  };

  const handleResetAllFilters = () => removeAllTimelineFilters();

  return (
    <Container>
      <FilterInsert>
        Show only verified contracts{" "}
        <ToggleSwitch
          callBack={handleToggleVerifiedFilter}
          status={timelineFilters && timelineFilters.length > 0}
        />
      </FilterInsert>
      <ButtonContainer>
        <Button onClick={handleResetAllFilters} fontSize="1rem">
          Reset
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default FilterOptions;
