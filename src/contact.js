import styled from "@emotion/styled";
import { connect } from "unistore/react";
import store from "./state";

function Contact({ contact }) {
    return (
        <Footer>
            <p>
                Like what we're doing? You can{" "}
                <a
                    href="https://www.generationzero.org/donate"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Donate
                </a>
            </p>
            {contact && <p>Questions? Contact us at {contact}</p>}
            <p>
                <i>Authorized by De Laroche, genzero.scorecards@gmail.com</i>
            </p>
        </Footer>
    );
}

const Footer = styled.div`
    position: absolute;
    bottom: 5px;
    /* left: 40px; */
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
        font-size: 0.7em;
        width: 50%;
        /* margin-bottom: 5px; */
        margin-top: 5px;
    }
`;

// Connect to Unistore and map state to props
const mapStateToProps = (state) => {
    // Example: get contact from region data
    let contact = null;
    if (state.data && state.selected && state.data.region) {
        const selectedRegion = state.data.region.find(
            (a) => a.id === state.selected.region
        );
        if (selectedRegion) contact = selectedRegion.contact;
    }
    return { contact };
};

export default connect(mapStateToProps)(Contact);
