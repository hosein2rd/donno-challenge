type IconProps = {
  onMouseEnter?: () => void;
  width?: number | string;
  height?: number | string;
  src: string;
};

const Icon = ({ onMouseEnter, width = 30, height = 30, src }: IconProps) => {
  return (
    <img
      onMouseEnter={onMouseEnter}
      width={width}
      height={height}
      src={src}
      alt={src}
    />
  );
};

export default Icon;
