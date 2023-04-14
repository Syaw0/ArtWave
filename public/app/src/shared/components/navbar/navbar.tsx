import {
  AddAPhoto,
  Favorite,
  Logout,
  ManageAccounts,
  Person,
  Search,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  Fab,
  Fade,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { apiConfig } from "src/config/apiConfig";
import style from "./navbar.module.css";
import { useSearchStore } from "src/shared/infra/store/search/searchStoreHooks";
import { useDispatch } from "react-redux";
import { logout } from "src/modules/artist/redux/logout";

interface NavbarProps {
  isLogin: boolean;
  loggedArtist: Artist;
}

const Navbar = ({ isLogin, loggedArtist }: NavbarProps) => {
  const { searchQuery } = useSearchStore((s) => s);
  const [element, setElement] = useState<HTMLElement | null>();
  const [sQuery, setSearchQuery] = useState<string>(searchQuery ?? "");
  const dispatch = useDispatch();
  const router = useRouter();
  const open = Boolean(element);
  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
    setElement(e.currentTarget);
  };
  const handleClose = () => {
    setElement(null);
  };

  const logoutHandle = async () => {
    await logout(loggedArtist.artistEmail);
    router.reload();
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchQuery != null) {
      return dispatch({
        type: "search/updateSearchQuery",
        payload: e.currentTarget.value,
      });
    }
    setSearchQuery(e.currentTarget.value);
  };

  const startSearch = (e: any) => {
    if (e.key != null) {
      if (e.key !== "Enter") {
        return;
      }
    }
    if (searchQuery != null) {
      if (searchQuery.trim().length === 0) return;
      router.replace(`/search?q=${searchQuery}`);
    } else {
      if (sQuery.trim().length === 0) return;
      router.replace(`/search?q=${sQuery}`);
    }
  };
  return (
    <>
      <div className={style.con}>
        <Link href={"/"}>
          <Typography variant="h5">ArtWave 🌊</Typography>
        </Link>
        <OutlinedInput
          value={searchQuery ?? sQuery}
          onChange={handleChangeInput}
          onKeyDown={startSearch}
          className={style.searchInput}
          size="small"
          placeholder="Search Through +10k Arts..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" onClick={startSearch}>
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
        <div className={style.right}>
          <Link href={"/search"}>
            <IconButton className={style.searchIcon}>
              <Search />
            </IconButton>
          </Link>
          {isLogin && (
            <>
              <Link href={"/artwork/new"}>
                <Button
                  className={style.uploadBtn}
                  size="small"
                  variant="contained"
                  disableElevation
                  endIcon={<AddAPhoto />}
                >
                  Add
                </Button>
              </Link>
              <Avatar
                src={`${apiConfig.baseUrl}${loggedArtist.artistProfile}`}
                sx={{ cursor: "pointer" }}
                onClick={handleAvatarClick}
              ></Avatar>
              <Menu
                open={open}
                anchorEl={element}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  className: style.menuPaper,
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                TransitionComponent={Fade}
              >
                <Link href={`/artist/${loggedArtist.artistId}`}>
                  <MenuItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                </Link>

                <Link href={"/setting"}>
                  <MenuItem>
                    <ListItemIcon>
                      <ManageAccounts fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={"Edit Profile"}></ListItemText>
                  </MenuItem>
                </Link>

                <Link href={`/artist/${loggedArtist.artistId}?tab=1`}>
                  <MenuItem>
                    <ListItemIcon>
                      <Favorite fontSize="small" />
                    </ListItemIcon>
                    My Likes
                  </MenuItem>
                </Link>
                <Divider sx={{ my: 1 }} />

                <MenuItem onClick={logoutHandle}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              <Link href={"/artwork/new"}>
                <Fab color="primary" className={style.fab}>
                  <AddAPhoto />
                </Fab>
              </Link>
            </>
          )}

          {!isLogin && (
            <>
              <Link href={"/login"}>
                <Button size="small" variant="text" disableElevation>
                  Signin
                </Button>
              </Link>

              <Link href={"/signup"}>
                <Button size="small" variant="contained" disableElevation>
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Navbar;
