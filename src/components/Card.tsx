import Rate from "./rate";
import styled from "styled-components";
import Favorite from "./Favorite";
import { Card as CardType } from "../utils/repository";

type CardProps = {
  card: CardType;
  onClick: () => void;
  onClickFavorite?: (card: CardType) => void;
};

const Card = ({ card, onClick, onClickFavorite }: CardProps) => {
  return (
    <CardItem onClick={onClick}>
      <Container>
        <Cover src={card.cover} alt={card.title} />
        <Rate
          rate={card.rate}
          disabled
          position="absolute"
          top={10}
          left={10}
        />
      </Container>
      <Row margin="0px 10px">
        <Title>{card.title}</Title>
        <Favorite
          isFavorite={card.isFavorite}
          onClick={(e) => {
            e.stopPropagation();
            onClickFavorite && onClickFavorite(card);
          }}
        />
      </Row>
    </CardItem>
  );
};

export const Cover = styled.img`
  width: 100%;
  border-radius: 5px;
  aspect-ratio: 1 / 1;
`;

const CardItem = styled.div`
  margin: 16px;
  box-shadow: 5px 10px 50px gray;
  border-radius: 5px;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  border-radius: 5px;
`;

const Row = styled.div<{ margin?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props) => `margin: ${props.margin};`}
`;

const Title = styled.h3`
  flex-grow: 1;
`;

export default Card;
