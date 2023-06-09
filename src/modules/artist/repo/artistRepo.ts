import orm, { OrmType } from "../../../shared/infra/db/orm/createModel";
import { Artist } from "../domain/artist";
import { ArtistEmail } from "../domain/artistEmail";
import { ArtistMapper } from "../mapper/artistMapper";

interface ArtistRepoProps {
  exists(email: ArtistEmail | string): Promise<boolean>;
  save(artist: Artist): Promise<void>;
  updateBulk(artists: Artist[]): Promise<void>;
  findByEmail(artistEmail: ArtistEmail | string): Promise<Artist>;
  updateArtist(artist: Artist): Promise<void>;
  findById(artistId: string): Promise<Artist>;
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
      where: { artist_id: artist.artistId.id.toString() },
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
  async findById(artistId: string): Promise<Artist> {
    const artistModel = this.models.artistModel;
    const artist = await artistModel.findOne({
      where: { artist_id: artistId },
    });
    if (!!artist === false || artist.length == 0) {
      console.log("could not found ", artistId);
      throw new Error("Artist Not Found!");
    }

    return ArtistMapper.toDomain(artist[0]) as Artist;
  }

  async updateBulk(artists: Artist[]): Promise<void> {
    await Promise.all(artists.map((artist) => this.updateArtist(artist)));
  }
}

const artistRepo = new ArtistRepo(orm);
export { artistRepo };
export type { ArtistRepoProps };
