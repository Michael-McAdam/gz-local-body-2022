import RentIcon from "@mui/icons-material/HolidayVillage";
import RainbowIcon from "@mui/icons-material/Looks";
import AgeIcon from "@mui/icons-material/Skateboarding";
import DisabledIcon from "@mui/icons-material/AccessibleForward";
import MaoriIcon from "@mui/icons-material/Foundation";
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
`;

export default function CandidateIcons({ data }) {
  const iconDefs = [
    { key: "renter", label: "Renter", Icon: RentIcon },
    { key: "rainbow", label: "Rainbow/Takatāpui Community", Icon: RainbowIcon },
    { key: "young", label: "Under 35", Icon: AgeIcon },
    { key: "disabled", label: "Disabled", Icon: DisabledIcon },
    { key: "maori", label: "Māori", Icon: MaoriIcon },
  ];

  return (
    <IconContainer>
      {iconDefs.map(({ key, label, Icon }) =>
        data[key] ? (
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
