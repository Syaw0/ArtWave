import { Add, AddAPhoto, Search } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Fab,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import style from "./navbar.module.css";

interface NavbarProps {
  isLogin: boolean;
}

const Navbar = ({ isLogin }: NavbarProps) => {
  return (
    <div className={style.con}>
      <Link href={"/"}>
        <Typography variant="h5">ArtWave 🌊</Typography>
      </Link>
      <OutlinedInput
        className={style.searchInput}
        size="small"
        placeholder="Search Through +10k Arts..."
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <Search />
            </IconButton>
          </InputAdornment>
        }
      />
      <div className={style.right}>
        <IconButton className={style.searchIcon}>
          <Search />
        </IconButton>
        {isLogin && (
          <>
            <Button
              className={style.uploadBtn}
              size="small"
              variant="contained"
              disableElevation
            >
              Upload
            </Button>
            <Avatar></Avatar>{" "}
            <Link href={"/add"}>
              <Fab color="primary" className={style.fab}>
                <AddAPhoto />
              </Fab>
            </Link>
          </>
        )}

        {!isLogin && (
          <>
            <Button size="small" variant="text" disableElevation>
              Signin
            </Button>
            <Button size="small" variant="contained" disableElevation>
              Signup
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
