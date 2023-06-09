import { useEffect, useState } from "react";
import ArtworkCard from "../artworkCard/artworkCard";
import style from "./artworkHolder.module.css";

interface ArtworkHolderProps {
  artworks: Artwork[];
  hideBottom?: boolean;
  className?: string;
}

const ArtworkHolder = ({
  artworks,
  hideBottom = false,
  className = "",
}: ArtworkHolderProps) => {
  const [colNumber, setColNumber] = useState(3);
  const [cols, setCols] = useState<any>([]);
  useEffect(() => {
    window.addEventListener("resize", checkWidth);
    checkWidth();
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const checkWidth = () => {
    const { innerWidth } = window;

    if (innerWidth >= 1000) {
      return setColNumber(3);
    }
    if (innerWidth < 1000 && innerWidth >= 800) {
      return setColNumber(2);
    } else setColNumber(1);
  };

  useEffect(() => {
    const columns = new Array(colNumber).fill("").map(() => new Array());
    let count = 0;
    artworks.forEach((artwork: any) => {
      columns[count].push(artwork);
      if (count === colNumber - 1) {
        count = 0;
      } else {
        count += 1;
      }
    });
    setCols(columns);
  }, [artworks, colNumber]);

  return (
    <div className={`${style.con} ${className}`}>
      {cols.map((c: any, i: number) => {
        return (
          <div className={style.cols} key={i}>
            {c.map((item: any) => {
              return (
                <ArtworkCard
                  key={item.artworkId}
                  {...item}
                  hideBottom={hideBottom}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ArtworkHolder;
