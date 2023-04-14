/* eslint-disable @next/next/no-img-element */
import { Button, Divider, TextField, Tooltip, Typography } from "@mui/material";
import style from "./newArtwork.module.css";
import { useState } from "react";
import { artworkService } from "src/modules/artwork/services";
import { useNewArtworkStore } from "src/shared/infra/store/newArtwork/newArtworkStoreHooks";
import { useRouter } from "next/router";

const NewArtworkPage = () => {
  const { loggedArtist } = useNewArtworkStore((s) => s);
  const router = useRouter();
  const [image, setImage] = useState<any>(null);
  const [base64Image, setBase64Image] = useState<any>(null);
  const [inputs, setInputs] = useState({
    name: { text: "", error: false },
    description: { text: "", error: false },
  });

  const handleFileInputChange = (e: any) => {
    setImage(e.currentTarget.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.currentTarget.files[0]);
    fileReader.onloadend = (e) => {
      setBase64Image(e.target?.result);
    };
  };

  const handleChanges = (e: any) => {
    const { value, name } = e.currentTarget;
    setInputs((s) => ({ ...s, [name]: { text: value, error: false } }));
  };

  const publish = async () => {
    let error = false;
    if (inputs.name.text.trim() == "") {
      setInputs((s) => ({ ...s, name: { ...s.name, error: true } }));
      error = true;
    }
    if (inputs.description.text.trim() == "") {
      setInputs((s) => ({
        ...s,
        description: { ...s.description, error: true },
      }));
      error = true;
    }
    if (image == null || error) {
      return;
    }
    const result = await artworkService.create(
      image,
      loggedArtist.artistId,
      inputs.description.text,
      inputs.name.text
    );
    if (result.isRight() == true) {
      router.replace("/");
    }
  };
  return (
    <div className={style.con}>
      <div className={style.top}>
        <Button onClick={() => history.back()} variant="outlined">
          Cancel
        </Button>
        <Button onClick={publish} variant="contained">
          Publish
        </Button>
      </div>
      <Divider />
      <TextField
        name="name"
        onChange={handleChanges}
        value={inputs.name.text}
        error={inputs.name.error}
        className={style.nameInput}
        variant="standard"
        size="medium"
        placeholder="Name me..."
        inputProps={{ style: { fontSize: 30 } }}
      />
      <div className={style.file}>
        {base64Image == null && (
          <>
            <input
              accept="images/*"
              onChange={handleFileInputChange}
              type="file"
              className={style.fileInput}
            />
            <Typography variant="h5">Upload Your Artwork</Typography>
          </>
        )}
        {base64Image != null && (
          <img alt={""} className={style.img} src={base64Image} />
        )}
      </div>
      {base64Image != null && (
        <div>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Upload another
            <input
              accept="images/*"
              onChange={handleFileInputChange}
              type="file"
              className={style.fileInput}
            />
          </Button>
        </div>
      )}

      <TextField
        error={inputs.description.error}
        onChange={handleChanges}
        value={inputs.description.text}
        name="description"
        className={style.nameInput}
        variant="outlined"
        size="medium"
        multiline
        rows={6}
        inputProps={{ style: { fontSize: 20 } }}
        placeholder="Give Some information about artwork..."
      />
    </div>
  );
};

export default NewArtworkPage;
