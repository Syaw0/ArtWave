import { Avatar, Button, Divider, TextField } from "@mui/material";
import style from "./profileSetting.module.css";
import { ChangeEvent } from "react";
import { updateProfile } from "src/modules/artist/redux/updateProfile";
import { useDispatch } from "react-redux";
import { apiConfig } from "src/config/apiConfig";
import { useRouter } from "next/router";
import { removeProfile } from "src/modules/artist/redux/removeProfile";

interface ProfileSettingProps {
  loggedArtist: Artist;
}

const ProfileSetting = ({ loggedArtist }: ProfileSettingProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const uploadNewProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files as FileList;
    await updateProfile(
      dispatch,
      "artist/updateProfile",
      file[0],
      loggedArtist.artistId
    );
    router.reload();
  };

  const rmProfile = async () => {
    await removeProfile(
      dispatch,
      "artist/updateProfile",
      loggedArtist.artistId
    );
    router.reload();
  };

  return (
    <div className={style.con}>
      <div className={style.avatarSection}>
        <Avatar
          src={`${apiConfig.baseUrl}${loggedArtist.artistProfile}`}
          className={style.avatar}
        />
        <div className={style.avatarSectionButtons}>
          <Button>
            Upload new
            <input
              onChange={uploadNewProfile}
              type="file"
              className={style.fileInput}
              accept="image/*"
            />
          </Button>
          <Button onClick={rmProfile} color="error">
            Remove
          </Button>
        </div>
      </div>
      <Divider />
      <div className={style.inputsSection}>
        <TextField required variant="filled" label="Name" />
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="filled"
          label="Biography"
        />
        <div className={style.updateButton}>
          <Button>Update Information</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
