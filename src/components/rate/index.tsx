import { useState } from "react";
import Star from "./Star";
import styled, { CSSProperties } from "styled-components";

type Size = "large" | "medium" | "small";

const Rate = ({
  rate = 0,
  size = "medium",
  onRate,
  disabled = false,
  ...style
}: {
  rate?: number;
  size?: Size;
  disabled?: boolean;
  onRate?: (rate: number) => void;
} & CSSProperties) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(rate);

  const getSize = (size: Size) => {
    switch (size) {
      case "large":
        return 50;
      case "medium":
        return 30;
      case "small":
        return 20;
      default:
        return 30;
    }
  };

  return (
    <Row style={style}>
      {[...Array(5)].map((_, index) => {
        index += 1;

        return (
          <Star
            disabled={disabled}
            onClick={() => {
              setRating(index);
              onRate && onRate(index);
            }}
            key={index}
            height={getSize(size)}
            width={getSize(size)}
            onMouseEntered={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            filled={index <= (hover || rating)}
          />
        );
      })}
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Rate;
