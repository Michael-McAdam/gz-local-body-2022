import RoomIcon from "@mui/icons-material/Room";
import styled from "@emotion/styled";
import { hover } from "@testing-library/user-event/dist/hover";

const Marker = ({ text, link }) => (
  <Link
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    role="link"
    // aria-disabled={!link}
  >
    <MarkerContainer>
      <Icon />
      <TextContainer>
        <Text>{text}</Text>
      </TextContainer>
    </MarkerContainer>
  </Link>
);

export default Marker;

const MarkerContainer = styled.div`
  /* width: 50px; */
  /* height: 20px; */
`;

const Icon = styled(RoomIcon)`
  color: red;
  position: absolute;
  transition: all 0.5s ease;
  transform: translate(-50%, -100%);

  &:hover {
    transform: translate(-50%, -100%) scale(1.5);
  }
`;

const Text = styled.p`
  /* margin-left: 5px; */
  font-size: 12px;
  color: black;
  background-color: white;
  border-radius: 2px;
  padding: 5px;
  margin: 0;
  transition: all 0.2s ease;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
  }
`;

const TextContainer = styled.div`
  /* margin-left: 5px; */
  position: absolute;
  left: 10px;
  white-space: nowrap;
  transform: translate(0, -100%);
  /* display: flex; */
  /* flex-direction: column;
  align-items: center;
  justify-content: flex-start; */
`;

const Link = styled.a`
  text-decoration: none;
`;
