import "../App.css";
import styled from "@emotion/styled";
import { Icon, Modal, Button, Chip } from "@mui/material";

// const categoryInfo = {
//   overview: `Everyone was sent a questionnaire that asked various questions about the categories listed below. Their responses were rated.
//     For people who are already elected to the council their voting record on issues while in office was taken into account`,
//   categories: {
//     publicTransport:
//       "Public Transport is a key part of mode shift - getting people out of cars and into more efficient forms of transport",
//     cleanEnergy: "Local council can support clean energy through x, y and z",
//     density:
//       "Density means people live closer together, meaning less resources are need to get around",
//   },
// };

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
                <h1> Our scorecarding process </h1>
                <p>
                    Generation Zero has created these scorecards for candidates
                    in the 2025 Local Body Elections, with the intention to make
                    climate justice a dominant discourse this election season.
                    We hope that voters will use them to get an idea of which
                    candidates in their area will prioritise work the hardest to
                    deliver fairer, more sustainable communities. We also
                    encourage everyone to research their local candidates
                    further, and to engage in local hui with candidates to make
                    sure that climate justice issues are talked about in these
                    spaces.
                </p>

                <p>
                    Scores are based <b>solely</b> on candidates’ survey
                    responses. Scores were only given to candidates that filled
                    out the survey (question mark symbols on scorecards indicate
                    that candidates did not fill out the survey) and were given
                    manually by GZ volunteers.
                </p>

                <p>
                    The survey was composed of different types of multiple
                    choice questions, and asked candidates to prioritise certain
                    projects in their areas and to demonstrate their values.
                    Candidates were also invited to elaborate on their answers.
                    The answers to all questions, including additional
                    elaboration, were considered when grading candidates’
                    responses. Surveys had regional specificity on certain
                    questions. This is an example of a survey we sent to
                    candidates:{" "}
                    <a
                        href="/assets/Generation-Zero-Survey-Template.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        survey template
                    </a>
                    .
                </p>

                <p>
                    Survey questions came from ideas sent to us by our
                    supporters, as well as other groups advocating for justice
                    in our communities. Questions were grouped into six
                    categories:{" "}
                    <b>
                        Transport, Housing, Equity and Decision-making, Economic
                        Justice, Environment,
                    </b>{" "}
                    and <b>Te Tiriti.</b> Their responses to these categories
                    were weighted equally to create a final grade. Our
                    scorecards also highlight candidates’ commitments to
                    supporting the Boycott, Divestment and Sanctions movement in
                    solidarity with Palestine, but did not contribute to the
                    overall scorecard grade.
                </p>

                <p>
                    We would like to express our deepest gratitude to those who
                    supported us through creating these scorecards. Alongside
                    our members and supporters, we have been supported by:
                    <i>
                        Renters United, The Future Is Rail, Wellbeing Economy
                        Alliance Aotearoa NZ, and Zero Waste Network.
                    </i>
                </p>

                {/* <p>
                    <b>
                        You can read the questions yourself{" "}
                        <a
                            // href="https://forms.gle/uegWEhxVADiG94TG9"
                            href="https://www.generationzero.org/2022_scorecard_questions"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            here
                        </a>
                    </b>
                </p> */}
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

// const Table = styled.table`
//   width: 80%;
//   margin: 0 auto;
//   border-collapse: collapse;
// `;
// const Row = styled.tr`
//   font-size: 16px;

//   & > td {
//     border-bottom: 1px solid;
//   }
// `;
// const TitleCell = styled.td`
//   text-align: left;
// `;
// const ScoreCell = styled.td`
//   text-align: left;
// `;
