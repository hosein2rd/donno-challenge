import styled from "styled-components";
import Icon from "../Icon";

const Star = ({
  filled,
  onMouseEntered,
  onMouseLeave,
  onClick,
  width,
  height,
  disabled = false,
}: {
  filled?: boolean;
  onMouseEntered: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
}) => {
  return (
    <Container
      disabled={disabled}
      onClick={() => !disabled && onClick()}
      onMouseEnter={() => !disabled && onMouseEntered()}
      onMouseLeave={() => !disabled && onMouseLeave()}
    >
      {filled ? (
        <Icon src="/star-filled-black.png" width={width} height={height} />
      ) : (
        <Icon src="/star-line-black.png" width={width} height={height} />
      )}
    </Container>
  );
};

const Container = styled.div<{ disabled?: boolean }>`
  cursor: ${(props) => (!props.disabled ? "pointer" : "")};
`;

export default Star;
