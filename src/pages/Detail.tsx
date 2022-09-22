import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardByTitle, setRate } from "../utils/repository";
import { Cover } from "../components/Card";
import styled from "styled-components";
import Rate from "../components/rate";
import Icon from "../components/Icon";
import Favorite from "../components/Favorite";
import { getTime } from "../utils/helper";

const Detail = () => {
  const params = useParams<{ name: string }>();
  const [card, setCard] = useState(getCardByTitle(params.name || ""));
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [isPlaying, setPlay] = useState(false);
  const [second, setSecond] = useState(0);
  const [range, setRange] = useState(0);

  useEffect(() => {
    setAudio(new Audio(card?.audio));
  }, [card]);

  useEffect(() => {
    return () => audio?.pause();
  }, [audio]);

  useEffect(() => {
    if (!isPlaying) return;

    const total = card?.totalDurationMs || 0;

    const timer = setTimeout(() => setSecond(second + 1), 1000);

    setRange((100 * second) / (total / 1000));

    if (second === Math.round(total / 1000)) {
      clearTimeout(timer);
      setPlay(false);
      setSecond(0);
      setRange(0);
    }

    return () => clearTimeout(timer);
  }, [second, isPlaying]);

  const onClick = () => {
    setPlay(!isPlaying);

    if (!isPlaying) audio?.play();
    else audio?.pause();
  };

  return (
    <DetailContainer>
      <CoverContainer>
        <Cover src={card?.cover} />
        <Button onClick={onClick}>
          {isPlaying ? (
            <Icon height={100} width={100} src="/pause.png" />
          ) : (
            <Icon height={100} width={100} src="/play.png" />
          )}
        </Button>
        <Gradient />
        <Favorite
          isFavorite={card?.isFavorite}
          position="absolute"
          bottom={20}
          right={20}
        />
      </CoverContainer>
      <RangeInput type="range" value={range} />
      <Time>
        {getTime(second)} / {getTime((card?.totalDurationMs || 0) / 1000)}
      </Time>
      <Rate
        onRate={(rate) => setRate(card?.title || "", rate)}
        rate={card?.rate}
        marginTop="16px"
        size="large"
      />
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoverContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Gradient = styled.div`
  background: linear-gradient(0deg, white 0%, transparent 100%);
  position: absolute;
  bottom: 0;
  height: 20%;
  width: 100%;
`;

const Button = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RangeInput = styled.input`
  margin-top: 16px;
  width: 70%;
`;

const Time = styled.span`
  margin-top: 16px;
`;

export default Detail;
