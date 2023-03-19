import orm, { OrmType } from "../../../shared/infra/db/orm/createModel";
import { ArtistEmail } from "../domain/artistEmail";

interface ArtistRepoProps {
  exists(email: ArtistEmail): Promise<boolean>;
}

class ArtistRepo implements ArtistRepoProps {
  private models: OrmType;
  constructor(models: OrmType) {
    this.models = models;
  }

  async exists(email: ArtistEmail): Promise<boolean> {
    const artistModel = this.models.artistModel;
    const artist = artistModel.findOne({
      where: {
        artist_email: email.value,
      },
    });
    return !!artist === true;
  }
}

const userRepo = new ArtistRepo(orm);
export { userRepo };
