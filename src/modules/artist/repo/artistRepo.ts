import orm, { OrmType } from "../../../shared/infra/db/orm/createModel";
import { Artist } from "../domain/artist";
import { ArtistEmail } from "../domain/artistEmail";

export interface ArtistRepoProps {
  exists(email: ArtistEmail): Promise<boolean>;
  save(artist: Artist): Promise<void>;
}

export class ArtistRepo implements ArtistRepoProps {
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

  async save(artist: Artist): Promise<void> {
    const artistModel = this.models.artistModel;
    const isExist = await this.exists(artist.email);
    if (!isExist) {
      const rawArtist = artist;
      await artistModel.create(rawArtist);
    }

    return;
  }
}

const userRepo = new ArtistRepo(orm);
export { userRepo };
