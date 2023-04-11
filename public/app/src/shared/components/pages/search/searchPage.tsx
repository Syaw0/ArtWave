import { Search } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchStore } from "src/shared/infra/store/search/searchStoreHooks";
import ArtworkHolder from "../../artworkHolder/artworkHolder";
import Navbar from "../../navbar/navbar";
import style from "./searchPage.module.css";
import { searchArtwork } from "src/modules/artwork/redux/searchArtwork";

const SearchPage = () => {
  const { artist, artworks, isLogin } = useSearchStore((s) => s);
  const [searchType, setSearchType] = useState<"Artwork" | "Artist">("Artwork");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const selectChangeHandler = (e: SelectChangeEvent<string>) => {
    setSearchType(e.target.value as "Artwork" | "Artist");
  };

  const startSearch = async (e: any) => {
    if (e.key != null) {
      if (e.key !== "Enter") return;
    }
    if (searchQuery.trim() == "") return;
    await searchArtwork(dispatch, "search/updateArtworksList", searchQuery);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.currentTarget.value);
  };

  return (
    <div className={style.con}>
      <Navbar isLogin={isLogin} profileImage={artist.artistProfile} />
      <div className={style.searchHolder}>
        <Paper
          component={"form"}
          className={style.search}
          onKeyDown={startSearch}
        >
          <IconButton onClick={startSearch}>
            <Search />
          </IconButton>
          <InputBase
            value={searchQuery}
            onChange={handleInputChange}
            className={style.searchInput}
            placeholder="Search Through 10k arts"
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Select
            onChange={selectChangeHandler}
            className={style.searchSelect}
            value={searchType}
          >
            <MenuItem value="Artwork">Artwork</MenuItem>
            <MenuItem value="Artist">Artist</MenuItem>
          </Select>
        </Paper>
      </div>

      <ArtworkHolder artworks={artworks} />
    </div>
  );
};

export default SearchPage;
