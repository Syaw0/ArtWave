import { Avatar, Button, Divider, TextField } from "@mui/material";
import style from "./profileSetting.module.css";
import { ChangeEvent, useState } from "react";
import { updateProfile } from "src/modules/artist/redux/updateProfile";
import { useDispatch } from "react-redux";
import { apiConfig } from "src/config/apiConfig";
import { useRouter } from "next/router";
import { removeProfile } from "src/modules/artist/redux/removeProfile";
import { updateInformation } from "src/modules/artist/redux/updateInformation";

interface ProfileSettingProps {
  loggedArtist: Artist;
}

const ProfileSetting = ({ loggedArtist }: ProfileSettingProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputs, setInputs] = useState({
    name: { text: loggedArtist.artistName, error: false },
    biography: { text: loggedArtist.artistBiography, error: false },
  });

  const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputs((s) => ({ ...s, [name]: { text: value } }));
  };

  const updateInfo = async () => {
    if (inputs.name.text.trim() === "") {
      return setInputs((s) => ({ ...s, name: { ...s.name, error: true } }));
    }
    await updateInformation(
      dispatch,
      "artist/updateInformation",
      loggedArtist.artistId,
      inputs.name.text,
      inputs.biography.text
    );
    router.reload();
  };

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
        <TextField
          value={inputs.name.text}
          error={inputs.name.error}
          onChange={inputChangeHandle}
          name="name"
          required
          variant="filled"
          label="Name"
        />
        <TextField
          value={inputs.biography.text}
          error={inputs.biography.error}
          name="biography"
          onChange={inputChangeHandle}
          fullWidth
          multiline
          rows={3}
          variant="filled"
          label="Biography"
        />
        <div className={style.updateButton}>
          <Button onClick={updateInfo}>Update Information</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
