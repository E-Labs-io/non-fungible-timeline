/** @format */

import { Button } from "components/common";
import ToggleSwitch from "components/common/ToggleSwitch";
import useNFTimelineProvider from "hooks/NFTimelineProvider";
import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import { DateRangeInput } from "@datepicker-react/styled";
import { filtersInitalState } from "hooks/NFTimelineProvider/types/FilterTypes";
import { device } from "constants/media";

const Container = styled.div`
  transition: all 0.3s linear;
  border-radius: 10px;
  width: 100%;
  height: auto;
  align-items: center;
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
  justify-content: space-between;
  padding: 10px;
  column-gap: 30px;
  border-radius: 10px;
  width: 40vw;
  box-shadow: inset 0px 0px 15px 2px #cfcfcfad;
  @media ${device.mobileL} {
    flex-direction: column;
  }
  @media ${device.tablet} {
    flex-direction: column;
    max-width: 40vw;
  }
  @media ${device.laptop} {
    flex-direction: column;
    max-width: 40vw;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: right;
  display: flex;
  padding: 5px;
`;

const SwitchContainer = styled.div`
  align-items: center;
  justify-content: right;
  display: flex;

  width: auto;
`;

interface FilterOptionsProps {}
function FilterOptions({}: FilterOptionsProps) {
  const {
    addTimelineFilter,
    removeTimelineFilter,
    removeAllTimelineFilters,
    timelineFilters,
  } = useNFTimelineProvider();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeFilters, setActiveFilters] = useState<filtersInitalState>();

  const initState = { date: false, verified: false, order: false };

  useEffect(() => {
    if (!!!activeFilters) {
      //  Filters Not set - setting
      if (timelineFilters && timelineFilters.length > 0) {
        //  Setting filters from store
        const actualActive: filtersInitalState = initState;
        timelineFilters.forEach((filter) => {
          actualActive[filter.filterType] = true;
        });
        setActiveFilters(actualActive);
      }
    }
  }, [activeFilters, timelineFilters]);

  const handleResetAllFilters = () => {
    dispatch({ type: "dateChange", payload: initialState });
    removeAllTimelineFilters();
    setActiveFilters(initState);
  };

  const handleToggleVerifiedFilter = (flag: boolean) => {
    if (flag) {
      addTimelineFilter({ filterType: "verified" });
      setActiveFilters({ ...activeFilters, verified: true });
    } else {
      removeTimelineFilter("verified");
      setActiveFilters({ ...activeFilters, verified: false });
    }
  };

  const handleToggleOrderFilter = (flag: boolean) => {
    if (flag) {
      addTimelineFilter({ filterType: "order" });
      setActiveFilters({ ...activeFilters, order: true });
    } else {
      removeTimelineFilter("order");
      setActiveFilters({ ...activeFilters, order: false });
    }
  };

  const handleToggleDateFilter = (flag: boolean) => {
    if (flag) {
      const optionA = state.startDate;
      const optionB = !!state.endDate ? state.endDate : new Date();
      addTimelineFilter({ filterType: "date", optionA, optionB });
      setActiveFilters({ ...activeFilters, date: true });
    } else {
      removeTimelineFilter("date");
      setActiveFilters({ ...activeFilters, date: false });
    }
  };

  const dateToLocal = (date) => new Date(date).toLocaleDateString();
  const handleOnDateChange = (data) =>
    dispatch({ type: "dateChange", payload: data });
  const handleOnFocuseChange = (focusedInput) =>
    dispatch({ type: "focusChange", payload: focusedInput });

  return (
    <Container>
      <FilterInsert>
        Show only verified contracts{" "}
        <SwitchContainer>
          <ToggleSwitch
            callBack={handleToggleVerifiedFilter}
            status={timelineFilters && activeFilters?.verified}
            tooltip="Only show NFTs from verified contracts"
            id="verifiedToggle"
          />
        </SwitchContainer>
      </FilterInsert>
      <FilterInsert>
        Show latest first
        <SwitchContainer>
          <ToggleSwitch
            callBack={handleToggleOrderFilter}
            status={timelineFilters && activeFilters?.order}
            tooltip="Show Timeline with newest first"
            id="orderToggle"
          />
        </SwitchContainer>
      </FilterInsert>
      <FilterInsert>
        By Date
        <DateRangeInput
          displayFormat={dateToLocal}
          placement="bottom"
          onDatesChange={handleOnDateChange}
          onFocusChange={handleOnFocuseChange}
          startDate={state.startDate}
          endDate={state.endDate}
          focusedInput={state.focusedInput}
        />
        <SwitchContainer>
          <ToggleSwitch
            callBack={handleToggleDateFilter}
            status={timelineFilters && activeFilters?.date}
            tooltip="Only show NFTs inside the date range"
            id="dateToggle"
          />
        </SwitchContainer>
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

const initialState = {
  startDate: new Date("01/01/2018"),
  endDate: new Date(),
  focusedInput: new Date(),
};

function reducer(state, action) {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}
