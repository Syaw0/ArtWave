import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { Mapper } from "../../../shared/infra/mapper";
import { Artwork } from "../domain/artwork";
import { ArtworkDescription } from "../domain/artworkDescription";

export class ArtworkMapper implements Mapper<Artwork> {
  public static toDomain(raw: any): Artwork | null {
    const artwork = Artwork.create(
      {
        artworkId: raw.artwork_id,
        owner: raw.artwork_owner_id,
        description: ArtworkDescription.create(
          raw.artwork_description
        ).getValue(),
        imageSrc: raw.artwork_image_source,
        publishDate: raw.artwork_publish_date,
      },
      new UniqueEntityID(raw.raw.artwork_id)
    );
    if (artwork.isFailure) {
      console.error(artwork.getErrorValue());
      return null;
    }
    return artwork.getValue();
  }

  public static toPersistence(artwork: Artwork): any {
    return {
      artwork_id: artwork.artworkId.id.toString(),
      artwork_owner_id: artwork.owner.id.toString(),
      artwork_description: artwork.description.props.description,
      artwork_publish_date: artwork.publishDate,
      artwork_image_source: artwork.imageSrc,
    };
  }
}
