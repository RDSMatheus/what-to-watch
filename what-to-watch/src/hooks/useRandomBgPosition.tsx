import React, { useEffect, useState } from "react";

const useRandomBgPosition = (): "bottom" | "top" | "center" => {
  const [bgPosition, setBgPosition] = useState<"bottom" | "top" | "center">(
    "bottom"
  );

  useEffect(() => {
    const number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    let position: "bottom" | "top" | "center" = "bottom";

    if (number === 1) position = "top";
    if (number === 2) position = "center";
    if (number === 3) position = "bottom";

    console.log(position);

    setBgPosition(position);
  }, []);

  return bgPosition;
};

export default useRandomBgPosition;
