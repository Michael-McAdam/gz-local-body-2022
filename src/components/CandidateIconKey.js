import RentIcon from "@mui/icons-material/HolidayVillage";
import RainbowIcon from "@mui/icons-material/Looks";
import AgeIcon from "@mui/icons-material/Skateboarding";
import DisabledIcon from "@mui/icons-material/AccessibleForward";
import MaoriIcon from "@mui/icons-material/Foundation";
import styled from "@emotion/styled";

import { iconDefs } from "./CandidateIcons";
import { icon } from "leaflet";

const iconStyle = {
    borderRadius: "50%",
    padding: "4px",
    borderWidth: "1px",
    borderStyle: "solid",
};

const IconKey = styled.div`
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    & > span {
        font-style: italic;
        margin-right: 10px;
        margin-left: 5px;
    }
`;

const IconKeyItem = styled.div`
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    & > span {
        font-style: italic;
        margin-right: 10px;
        margin-left: 5px;
    }
`;

export default function CandidateIconKey() {
    return (
        <IconKey>
            {iconDefs.map(({ key, label, Icon }) => (
                <IconKeyItem key={key}>
                    <Icon sx={{ ...iconStyle }} />
                    <span>- {label} </span>
                </IconKeyItem>
            ))}
        </IconKey>
    );
}
