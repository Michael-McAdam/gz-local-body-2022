import "../App.css";

import styled from "@emotion/styled";
import Section from "../components/Section";

import Countdown from "react-countdown";
import ReactPlayer from "react-player";

import { Stepper, Step, StepLabel } from "@mui/material";

const labels = {
  enrolBy: { label: "Enrolment Closes", time: new Date("2022-08-12") },
  starting: {
    label: "Voting Opens",
    time: new Date("2022-09-16"),
  },
  ending: { label: "Voting Closes", time: new Date("2022-10-08") },
};

const CountdownChooser = () => {
  let now = new Date();
  if (labels.ending.time.getTime() < now.getTime()) {
    return <h2> Voting has closed. Next elections will be in 3 years!</h2>;
  } else if (labels.starting.time.getTime() < now.getTime()) {
    // return <h2> Voting has opened. Get out there.</h2>;
    return (
      <>
        <Title>Voting has opened, closes in:</Title>
        <Countdown
          date={labels.ending.time}
          renderer={({ days, hours, minutes, seconds }) => (
            <TimeDisplay>
              {days}d {hours}h {minutes}m {seconds}s
            </TimeDisplay>
          )}
        />
      </>
    );
  } else {
    return (
      <>
        <Title>Voting opens in:</Title>
        <Countdown
          date={labels.starting.time}
          renderer={({ days, hours, minutes, seconds }) => (
            <TimeDisplay>
              {days}d {hours}h {minutes}m {seconds}s
            </TimeDisplay>
          )}
        />
      </>
    );
  }
};

function render({ state, dispatch }) {
  // let times = state.regions[state.region].districts[state.district];
  // console.log(labels);
  // let starting = times?.starting;

  // console.log(starting);

  // if (!starting) {
  //   return <></>;
  // }

  let activeStep = 0;

  let steps = Object.values(labels).map((step, i) => {
    let time = step.time;
    let now = new Date();
    // console.log(time.getTime());
    activeStep = time.getTime() > now.getTime() ? activeStep : i + 1;
    // console.log(activeStep);
    return { label: step.label, time };
  });

  let countdown = CountdownChooser();

  return (
    <Section title="WHEN?">
      {countdown}
      <StepContainer>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(({ label, time }) => {
            if (!time) return;
            return (
              <Step key={label}>
                <StepLabel>
                  <Label>
                    <span>{label}</span>
                    <span>
                      {time.toLocaleDateString("en-NZ", {
                        // year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </Label>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </StepContainer>
    </Section>
  );
}

export default render;

const TimeDisplay = styled.p`
  font-size: 40px;
  font-weight: bold;
`;

const StepContainer = styled.div`
  color: white;
  width: 70%;
  padding-top: 30px;
`;

const Label = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 15px;
`;
