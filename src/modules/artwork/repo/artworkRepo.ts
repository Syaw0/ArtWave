import models, { OrmType } from "../../../shared/infra/db/orm/createModel";
import { Artwork } from "../domain/artwork";
import { ArtworkId } from "../domain/artworkId";
import { ArtworkMapper } from "../mapper/artworkMapper";

export interface ArtworkRepoProps {
  findOneArtwork(artworkId: string | ArtworkId): Promise<Artwork>;
  save(artwork: Artwork): Promise<void>;
  exist(artworkId: string | ArtworkId): Promise<boolean>;
}

export class ArtworkRepo implements ArtworkRepoProps {
  constructor(private model: OrmType) {}

  async findOneArtwork(artworkId: ArtworkId | string): Promise<Artwork> {
    const artworkModel = this.model.artworkModel;

    const id =
      typeof artworkId === "string" ? artworkId : artworkId.id.toString();
    const artwork = await artworkModel.findOne({ where: { artwork_id: id } });
    if (!!artwork === false || artwork.length == 0)
      throw new Error("Artist Not Found!");
    return ArtworkMapper.toDomain(artwork[0]) as Artwork; // we muse use mapper here
  }

  async exist(artworkId: string | ArtworkId): Promise<boolean> {
    const artworkModel = this.model.artworkModel;
    const id =
      typeof artworkId === "string" ? artworkId : artworkId.id.toString();
    const artwork = await artworkModel.findOne({ where: { artwork_id: id } });
    return !!artwork[0] === true;
  }

  async save(artwork: Artwork): Promise<void> {
    const artworkModel = this.model.artworkModel;
    const isExist = await this.exist(artwork.artworkId);
    if (!isExist) {
      const rawArtwork = ArtworkMapper.toPersistence(artwork);
      await artworkModel.create(rawArtwork);
    }
  }
}

export const artworkRepo = new ArtworkRepo(models);
