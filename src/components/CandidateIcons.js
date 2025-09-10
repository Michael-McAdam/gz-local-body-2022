import RentIcon from "@mui/icons-material/HolidayVillage";
import RainbowIcon from "@mui/icons-material/Looks";
import AgeIcon from "@mui/icons-material/Skateboarding";
import DisabledIcon from "@mui/icons-material/AccessibleForward";
import MaoriIcon from "@mui/icons-material/Foundation";
import Independent from "@mui/icons-material/Person";
import PartyAffiliated from "@mui/icons-material/Groups";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import styled from "@emotion/styled";

const iconStyle = {
    borderRadius: "50%",
    padding: "4px",
    borderWidth: "1px",
    borderStyle: "solid",
};

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
    width: 100%;
    margin-top: 15px;
    height: 15px;
`;

export const iconDefs = [
    { key: "Renter", label: "Renter", Icon: RentIcon },
    {
        key: "Rainbow",
        label: "Rainbow/Takatāpui Community",
        Icon: RainbowIcon,
    },
    { key: "Young", label: "Under 40", Icon: AgeIcon },
    { key: "Disabled", label: "Disabled", Icon: DisabledIcon },
    // { key: "Maori", label: "Māori", Icon: MaoriIcon },
    { key: "Independent", label: "Independent", Icon: Independent },
    {
        key: "Party-Affiliated",
        label: "Affiliated with a political party",
        Icon: PartyAffiliated,
    },
];

export default function CandidateIcons({ data }) {
    const icons = data.Icons?.split(",").map((icon) => icon.trim()) || [];

    return (
        <IconContainer>
            {iconDefs.map(({ key, label, Icon }) =>
                icons.includes(key) ? (
                    <Tooltip key={key} enterTouchDelay={0} title={label}>
                        <span>
                            <Box sx={visuallyHidden}>{label}</Box>
                            <Icon sx={{ ...iconStyle }} />
                        </span>
                    </Tooltip>
                ) : null
            )}
        </IconContainer>
    );
}
