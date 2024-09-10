import { useState } from "react";

export default function Picture() {
  const [isActive, setIsActive] = useState(false);

  let backgroundClassName = "background";
  let pictureClassName = "picture";

  if (isActive) {
    pictureClassName += "picture--active";
  } else {
    backgroundClassName += "background--active";
  }

  function handleClickImg(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setIsActive(true);
  }

  return (
    <div className={backgroundClassName} onClick={() => setIsActive(false)}>
      <img
        className={pictureClassName}
        alt="Casas de arco-íris em Kampung Pelangi, Indonésia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
        onClick={handleClickImg}
      />
    </div>
  );
}
