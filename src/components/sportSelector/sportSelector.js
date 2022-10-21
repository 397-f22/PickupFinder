import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const SportSelector = ({ sports, currentSport, setCurrentSport }) => (
  <ButtonGroup>
    {sports.map((sport) => (
      <ToggleButton
        key={sport}
        type="radio"
        checked={sport === currentSport}
        onClick={() => setCurrentSport(sport)}
      >
        {sport}
      </ToggleButton>
    ))}
  </ButtonGroup>
);
export default SportSelector;
