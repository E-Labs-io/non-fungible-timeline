/** @format */

import { Button } from "components/common";
import ToggleSwitch from "components/common/ToggleSwitch";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  DateRangeInput,
  DateSingleInput,
  Datepicker,
  OnDatesChangeProps,
  START_DATE,
} from "@datepicker-react/styled";

const Container = styled.div`
  transition: all 0.3s linear;
  border-radius: 10px;
  width: 100%;
  height: auto;
  align-items: left;
  justify-content: center;
  padding: 10px;
  margin: auto;
  row-gap: 20px;

  display: flex;
  flex-direction: column;
  text-align: left;
`;

const FilterInsert = styled.div`
  transition: all 0.3s linear;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  column-gap: 30px;
  border-radius: 10px;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
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

  const [dateState, setDateState] = useState({
    startDate: null,
    endDate: null,
    focusedInput: START_DATE,
  });

  function handleDatesChange(data: OnDatesChangeProps) {
    if (!data.focusedInput) {
      setDateState({ ...data, focusedInput: START_DATE });
    } else {
      setDateState(data);
    }
  }

  return (
    <Container>
      <FilterInsert>
        Show only verified contracts{" "}
        <ToggleSwitch
          callBack={handleToggleVerifiedFilter}
          status={timelineFilters && timelineFilters.length > 0}
          tooltip="Only show NFTs from verified contracts"
        />
      </FilterInsert>
      <FilterInsert>
        <Datepicker
          startDate={null}
          focusedInput={null}
          endDate={null}
          onDatesChange={handleDatesChange}
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