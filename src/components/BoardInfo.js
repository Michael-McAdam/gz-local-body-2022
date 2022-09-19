import "../App.css";
import styled from "@emotion/styled";
import { Modal } from "@mui/material";

function Render({ open, onClose }) {
  return (
    <Modal
      open={open}
      disableAutoFocus={true}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <InfoContainer>
        <h1> Local Board scorecarding process </h1>
        <p>
          For local boards, we asked candidates a reduced number of questions
          (20+), chosen from the 50+ questions we asked mayoral and councillor
          candidates.
        </p>
        <p>
          Though the questions are still based on the 5 themes (
          <b>Environment, Transport, Te Tiriti, Equity/Social Welfare,</b> and{" "}
          <b>Housing/Liveable Cities</b>), we didn’t give a grade for each
          theme. Due to limited capacity, we only scored candidates who answered
          our survey.
        </p>
        <p>
          <b>
            You can find the questions{" "}
            <a
              // href="https://forms.gle/uegWEhxVADiG94TG9"
              href="https://forms.gle/7Xb73vxNuiavXh4L6"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </b>
        </p>
      </InfoContainer>
    </Modal>
  );
}

export default Render;

const InfoContainer = styled.div`
  max-width: 750px;
  width: 90%;
  /* height: 70%; */
  border-radius: 10px;
  padding: 20px;
  padding-bottom: 50px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.9);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > .h1 {
  }

  & > p {
    margin-top: 5px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  & > p:last-child {
    font-size: 14px;
  }
`;
