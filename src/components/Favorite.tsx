import { useState } from "react";
import { CSSProperties } from "styled-components";
import Icon from "./Icon";

type FavoriteProps = {
  isFavorite?: boolean;
  onClick?: (e: React.MouseEvent) => void;
} & CSSProperties;

const Favorite = ({
  isFavorite: favorated,
  onClick,
  ...styles
}: FavoriteProps) => {
  const [isFavorite, setFavorite] = useState(favorated);

  return (
    <div
      onClick={(e) => {
        setFavorite(!isFavorite);
        onClick && onClick(e);
      }}
      style={styles}
    >
      {isFavorite ? (
        <Icon src="/heart-filled-black.png" />
      ) : (
        <Icon src="/heart-line-black.png" />
      )}
    </div>
  );
};

export default Favorite;
