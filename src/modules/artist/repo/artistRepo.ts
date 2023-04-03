import orm, { OrmType } from "../../../shared/infra/db/orm/createModel";
import { Artist } from "../domain/artist";
import { ArtistEmail } from "../domain/artistEmail";
import { ArtistMapper } from "../mapper/artistMapper";

export interface ArtistRepoProps {
  exists(email: ArtistEmail | string): Promise<boolean>;
  save(artist: Artist): Promise<void>;
  findByEmail(artistEmail: ArtistEmail | string): Promise<Artist>;
  updateArtist(artist: Artist): Promise<void>;
}

export class ArtistRepo implements ArtistRepoProps {
  private models: OrmType;
  constructor(models: OrmType) {
    this.models = models;
  }

  async exists(email: ArtistEmail | string): Promise<boolean> {
    const artistModel = this.models.artistModel;
    const emailValue = typeof email === "string" ? email : email.value;
    const artist = await artistModel.findOne({
      where: {
        artist_email: emailValue,
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
  async updateArtist(artist: Artist): Promise<void> {
    const artistModel = this.models.artistModel;
    const rawArtist = ArtistMapper.toPersistence(artist);
    await artistModel.update(rawArtist, {
      where: { artist_email: artist.email.value },
    });
  }

  async findByEmail(artistEmail: string | ArtistEmail): Promise<Artist> {
    const artistModel = this.models.artistModel;
    const email =
      typeof artistEmail == "string" ? artistEmail : artistEmail.value;

    const artist = await artistModel.findOne({
      where: { artist_email: email },
    });
    if (!!artist === false || artist.length == 0)
      throw new Error("Artist Not Found!");
    return ArtistMapper.toDomain(artist[0]) as Artist;
  }
}

const artistRepo = new ArtistRepo(orm);
export { artistRepo };
