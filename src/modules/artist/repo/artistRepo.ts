import orm, { OrmType } from "../../../shared/infra/db/orm/createModel";
import { Artist } from "../domain/artist";
import { ArtistEmail } from "../domain/artistEmail";
import { ArtistMapper } from "../mapper/artistMapper";

export interface ArtistRepoProps {
  exists(email: ArtistEmail): Promise<boolean>;
  save(artist: Artist): Promise<void>;
  findByEmail(artistEmail: ArtistEmail | string): Promise<Artist>;
}

export class ArtistRepo implements ArtistRepoProps {
  private models: OrmType;
  constructor(models: OrmType) {
    this.models = models;
  }

  async exists(email: ArtistEmail): Promise<boolean> {
    const artistModel = this.models.artistModel;
    const artist = await artistModel.findOne({
      where: {
        artist_email: email.value,
      },
    });
    return !!artist[0] === true;
  }

  async save(artist: Artist): Promise<void> {
    const artistModel = this.models.artistModel;
    const isExist = await this.exists(artist.email);
    if (!isExist) {
      const rawArtist = ArtistMapper.toPersistence(artist);
      await artistModel.create(rawArtist);
    }

    return;
  }

  async findByEmail(artistEmail: string | ArtistEmail): Promise<Artist> {
    const artistModel = this.models.artistModel;
    const email =
      typeof artistEmail == "string" ? artistEmail : artistEmail.value;

    const artist = await artistModel.findOne({
      where: { artist_email: email },
    });
    if (!!artist === false) throw new Error("Artist Not Found!");
    return ArtistMapper.toDomain(artist[0]) as Artist;
  }
}

const artistRepo = new ArtistRepo(orm);
export { artistRepo };
