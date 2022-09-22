import data from "../data.json";

export type Card = {
  title: string;
  audio: string;
  cover: string;
  totalDurationMs: number;
  isFavorite: boolean;
  rate: number;
};

const setLocalStorage = (data: any, key: string) =>
  localStorage.setItem(key, JSON.stringify(data));

const getLocalStorage = (key: string) =>
  localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || "{}")
    : localStorage.getItem(key);

export const getCards = (): Card[] => {
  if (!getLocalStorage("cards")) {
    const cards = data.map((item) => ({ ...item, isFavorite: false, rate: 0 }));
    setLocalStorage(cards, "cards");

    return cards;
  }

  return getLocalStorage("cards") as Card[];
};

export const getCardByTitle = (title: string) =>
  getCards().find((item) => item.title.toLowerCase() === title.toLowerCase());

export const getIndex = (card: Card) =>
  getCards().findIndex(
    (item) => item.title.toLowerCase() === card.title.toLowerCase()
  );

export const updateCard = (index: number, newCard: Card) => {
  setLocalStorage(
    getCards().map((card, i) => (index === i ? newCard : card)),
    "cards"
  );

  console.log("updated successfuly");
};

export const toggleFavorite = (title: string) => {
  const cards = getCards().map((card) =>
    card.title.toLowerCase() === title.toLowerCase()
      ? { ...card, isFavorite: !card.isFavorite }
      : { ...card, isFavorite: false }
  );

  setLocalStorage(cards, "cards");

  return cards;
};

export const setRate = (title: string, rate: number) => {
  const cards = getCards();
  const card = getCardByTitle(title);

  if (!card) return;

  const index = getIndex(card);
  const newCard = { ...cards[index], rate };
  updateCard(index, newCard);
};
