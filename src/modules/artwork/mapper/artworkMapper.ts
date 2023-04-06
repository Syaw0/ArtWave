import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { Mapper } from "../../../shared/infra/mapper";
import { Artwork } from "../domain/artwork";
import { ArtworkDescription } from "../domain/artworkDescription";
import { ArtworkVotes } from "../domain/artworkVotes";
import { Comments } from "../domain/comments";

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
        votes: ArtworkVotes.create(raw.artwork_votes),
        comments: Comments.create(raw.artwork_comments),
        totalCommentsNum: raw.artwork_comments
          ? raw.artwork_comments.length
          : 0,
      },
      new UniqueEntityID(raw.artwork_id)
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
      artwork_votes: artwork.votes ? artwork.votes.getItems() : [],
      artwork_comments: artwork.comments ? artwork.comments.getItems() : [],
    };
  }
}
