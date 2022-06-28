import * as React from "react";
import { useState } from "react";
import classNames from "classnames";
import { Box, Grid, Input, Slider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatCcy, handleInvalidValue } from "../../../utils";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

const FREE_TARGETS = 10;
const COST_PER_TARGET = 10;
const HIGH_AVAILABILITY_TARGETS = 100;
const UNLIMITED_TARGETS = 2001;
const UNLIMITED_PRICE = "192,000";

const isChargedTargets = (valueTargets: number | string): boolean => {
  return valueTargets > FREE_TARGETS;
};

const ServerPricing = () => {
  // Styling
  const classes = useStyles();

  // Deployment Targets
  const [valueTargets, setValueTargets] = useState(FREE_TARGETS);

  const handleSliderChange = (event: any, newValue: any) => {
    setValueTargets(newValue);
    setLastTargetsSliderVal(valueTargets);
  };

  const handleBlur = () => {
    if (valueTargets < 0) {
      setValueTargets(0);
    } else if (valueTargets > 10000) {
      setValueTargets(10000);
    }
  };

  // Single spot where targets slider value to be set by the user
  const updateUserTargets = (valueTargets: number) => {
    setValidTargets(valueTargets); // update display value
    setLastTargetsSliderVal(valueTargets); // remember user's last value

    // reset checkbox if targets slider value is not eligible to HA
    if (valueTargets < HIGH_AVAILABILITY_TARGETS) {
      setHaCheckboxVal(false);
    }
  };
  const setValidTargets = (num: number) => {
    let vaildVal = handleInvalidValue(num);
    setValueTargets(vaildVal);
  };

  // High Availablity
  const [LastTargetsSliderVal, setLastTargetsSliderVal] = useState(
    FREE_TARGETS
  );
  const [haCheckboxVal, setHaCheckboxVal] = useState(false);
  const isEligibleHA = valueTargets >= HIGH_AVAILABILITY_TARGETS;
  const renderHaChecked = haCheckboxVal || isEligibleHA;
  const highAvailabilityCheck = (e: { target: { checked: any } }) => {
    // Updating checkbox state
    const newHaCheckboxVal = e.target.checked;
    setHaCheckboxVal(newHaCheckboxVal);
    // [ ] => [x]
    if (newHaCheckboxVal) {
      // Set high availablility value
      if (valueTargets < HIGH_AVAILABILITY_TARGETS) {
        setValueTargets(HIGH_AVAILABILITY_TARGETS);
      }
    } else {
      // [x] => [ ]
      // Reset to user's last input value
      setValueTargets(LastTargetsSliderVal);
    }
  };

  // Unlimited Targets
  const [
    unlimitedTargetsCheckboxVal,
    setUnlimitedTargetsCheckboxVal,
  ] = useState(false);
  const isEligibleUnlimited = valueTargets >= UNLIMITED_TARGETS;
  const renderUnlimitedTargetsChecked =
    unlimitedTargetsCheckboxVal || isEligibleUnlimited;
  const unlimitedTargetsCheck = (e: { target: { checked: any } }) => {
    // Updating checkbox state
    const newUnlimitedTargetsCheckboxVal = e.target.checked;
    setUnlimitedTargetsCheckboxVal(newUnlimitedTargetsCheckboxVal);
    // [ ] => [x]
    if (newUnlimitedTargetsCheckboxVal) {
      // Set unlimited target value
      if (valueTargets < UNLIMITED_TARGETS) {
        setValueTargets(UNLIMITED_TARGETS);
      }
    } else {
      // [x] => [ ]
      // Reset to user's last input value
      setValueTargets(LastTargetsSliderVal);
    }
  };

  // Calculations
  const calcChargedTargets = (valueTargets: any) => {
    if (isChargedTargets(valueTargets)) {
      return valueTargets - FREE_TARGETS;
    } else {
      return 0;
    }
  };

  const targetsPrice = calcChargedTargets(valueTargets) * COST_PER_TARGET;
  const totalPrice = targetsPrice;

  return (
    <>
      <div className="pricing__item pricing__item--secondary">
        <h2 className="pricing__title">
          Server
        </h2>
        <div className="pricing__price">
          <span>
            {renderUnlimitedTargetsChecked
              ? UNLIMITED_PRICE
              : formatCcy(totalPrice)}
            <sup>*</sup>
          </span>
          <span className="pricing__price-duration">/month</span>
        </div>
        <div className="pricing__slider-container">
          <p className="pricing__slider-description">
            For{" "}
            {renderUnlimitedTargetsChecked
              ? ` unlimited deployment targets`
              : " up to " + valueTargets + " deployment targets "}
          </p>
          <div className="pricing__slider">
            {renderUnlimitedTargetsChecked ? null : (
              <Slider
                value={valueTargets}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                min={10}
                max={2000}
              />
            )}
          </div>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={renderUnlimitedTargetsChecked}
              onChange={unlimitedTargetsCheck}
              name="unlimitedTargets"
            />
          }
          label="Unlimited Targets"
        />
        <p className="pricing__term">
          High availability feature included in plan with more than 100 deployment targets.
        </p>
        <a href="" className="btn btn-lg btn-success">
          Start a trial
        </a>
        <img src="octopus.svg" className="octopus octopus--caught" alt="Octopus Floating Around"/>
      </div>
    </>
  );
};
export default ServerPricing;
