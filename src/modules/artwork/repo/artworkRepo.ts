import models, { OrmType } from "../../../shared/infra/db/orm/createModel";
import { ArtistId } from "../../artist/domain/artistId";
import { Artwork } from "../domain/artwork";
import { ArtworkId } from "../domain/artworkId";
import { ArtworkMapper } from "../mapper/artworkMapper";

export interface ArtworkRepoProps {
  findOneArtwork(artworkId: string | ArtworkId): Promise<Artwork>;
  findArtistArtworks(artistId: string | ArtistId): Promise<Artwork[]>;
  save(artwork: Artwork): Promise<void>;
  exist(artworkId: string | ArtworkId): Promise<boolean>;
  findLatestArtworks(): Promise<Artwork[]>;
  findTopArtworks(): Promise<Artwork[]>;
  updateArtwork(artwork: Artwork): Promise<void>;
}

export class ArtworkRepo implements ArtworkRepoProps {
  constructor(private model: OrmType) {}

  async findOneArtwork(artworkId: ArtworkId | string): Promise<Artwork> {
    const artworkModel = this.model.artworkModel;

    const id =
      typeof artworkId === "string" ? artworkId : artworkId.id.toString();

    const artwork = await artworkModel.findOne({ where: { artwork_id: id } });

    if (!!artwork === false || artwork.length == 0)
      throw new Error("Artwork Not Found!");

    return ArtworkMapper.toDomain(artwork[0]) as Artwork;
  }

  async findArtistArtworks(artistId: ArtworkId | string): Promise<Artwork[]> {
    const artworkModel = this.model.artworkModel;

    const id = typeof artistId === "string" ? artistId : artistId.id.toString();
    const artworks = await artworkModel.findOne({
      where: { artwork_owner_id: id },
    });
    return artworks.map((a: any) => ArtworkMapper.toDomain(a));
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

  async findLatestArtworks(): Promise<Artwork[]> {
    const artworkModel = this.model.artworkModel;
    const artworks = await artworkModel.findAndSort({
      sort: { artwork_publish_date: -1 },
    });
    return artworks.map((a: any) => ArtworkMapper.toDomain(a));
  }
  async findTopArtworks(): Promise<Artwork[]> {
    const artworkModel = this.model.artworkModel;
    const artworks = await artworkModel.aggregate(
      [
        {
          $addFields: {
            answers_count: { $size: { $ifNull: ["$artwork_comments", []] } },
          },
        },
        { $sort: { answers_count: -1 } },
      ],
      {}
    );

    return artworks.map((a: any) => ArtworkMapper.toDomain(a));
  }

  async updateArtwork(artwork: Artwork): Promise<void> {
    const artworkModel = this.model.artworkModel;
    await artworkModel.update(ArtworkMapper.toPersistence(artwork), {
      where: {
        artwork_id: artwork.artworkId.id.toString(),
      },
    });
  }
}

export const artworkRepo = new ArtworkRepo(models);
