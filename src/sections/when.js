import "../App.css";

import styled from "@emotion/styled";
import Section from "../components/Section";

import Countdown from "react-countdown";
import ReactPlayer from "react-player";

import { Stepper, Step, StepLabel } from "@mui/material";

const labels = {
  enrolBy: { label: "Enrolment Closes", time: "2022-08-12" },
  starting: { label: "Voting Opens", time: "16 Sep 2022 00:00:00 GMT" },
  ending: { label: "Voting Closes", time: "8 Oct 2022 00:00:00 GMT" },
};

const CountdownChooser = (times) => {
  let now = new Date();
  if (times.ending?.toDate().getTime() < now.getTime()) {
    return <h2> Voting has closed. Next elections will be in 3 years!</h2>;
  } else if (times.starting?.toDate().getTime() < now.getTime()) {
    return <h2> Voting has opened. Get out there.</h2>;
  } else {
    return (
      <Countdown
        date={times.starting?.toDate()}
        renderer={({ days, hours, minutes, seconds }) => (
          <TimeDisplay>
            {days}d {hours}h {minutes}m {seconds}s
          </TimeDisplay>
        )}
      />
    );
  }
};

function render({ state, dispatch }) {
  let times = state.regions[state.region].districts[state.district];
  console.log(times);
  let starting = times?.starting;

  console.log(starting);

  if (!starting) {
    return <></>;
  }

  let activeStep = 0;

  let steps = Object.values(labels).map((step, i) => {
    let time = new Date(step.time);
    let now = new Date();
    console.log(time.getTime());
    activeStep = time.getTime() > now.getTime() ? activeStep : i + 1;
    // console.log(activeStep);
    return { label: step.label, time };
  });

  let countdown = CountdownChooser(times);

  return (
    <Section title="WHEN?">
      <Title>Voting opens in:</Title>
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
