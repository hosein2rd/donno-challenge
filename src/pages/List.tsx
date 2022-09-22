import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import {
  Card as CardType,
  getCards,
  toggleFavorite,
} from "../utils/repository";

const List = () => {
  const navigate = useNavigate();

  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    setCards(getCards());
  }, []);

  return (
    <div>
      {cards.map((card, i) => (
        <Card
          key={i}
          card={card}
          onClick={() => navigate(`/${card.title.toLowerCase()}`)}
          onClickFavorite={(card) => {
            toggleFavorite(card.title);
            setCards(getCards());
          }}
        />
      ))}
    </div>
  );
};

export default List;
