import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { Mapper } from "../../../shared/infra/mapper";
import { ArtistId } from "../../artist/domain/artistId";
import { ArtistMapper } from "../../artist/mapper/artistMapper";
import { artistRepo } from "../../artist/repo/artistRepo";
import { Artwork } from "../domain/artwork";
import { ArtworkDescription } from "../domain/artworkDescription";
import { ArtworkName } from "../domain/artworkName";
import { ArtworkVote } from "../domain/artworkVote";
import { ArtworkVotes } from "../domain/artworkVotes";
import { Comments } from "../domain/comments";
import { ArtworkDTO } from "../dto/artworkDTO";
import { ArtworkCommentMapper } from "./artworkCommentMapper";
import { ArtworkVoteMapper } from "./artworkVoteMapper";
export class ArtworkMapper implements Mapper<Artwork> {
  public static async toDTO(artwork: Artwork): Promise<ArtworkDTO> {
    return {
      artworkId: artwork.artworkId.id.toString(),
      artworkImage: artwork.imageSrc,
      artworkName: artwork.name.props.text,
      artworkComments: artwork.comments?.currentItems.map((a) =>
        ArtworkCommentMapper.toDTO(a)
      ),
      artworkVotes: artwork.votes?.currentItems.map((a) =>
        ArtworkVoteMapper.toDTO(a)
      ),
      artworkOwner: ArtistMapper.toDTO(
        await artistRepo.findById(artwork.owner.id.toString())
      ),
    };
  }

  public static toDomain(raw: any): Artwork | null {
    const artwork = Artwork.create(
      {
        name: ArtworkName.create({ text: raw.artwork_name }).getValue(),
        owner: ArtistId.create(
          new UniqueEntityID(raw.artwork_owner_id)
        ).getValue(),
        description: ArtworkDescription.create(
          raw.artwork_description
        ).getValue(),
        imageSrc: raw.artwork_image_source,
        publishDate: raw.artwork_publish_date,
        votes: ArtworkVotes.create(
          raw.artwork_votes.map((v: any) => ArtworkVoteMapper.toDomain(v))
        ),
        comments: Comments.create(
          raw.artwork_comments.map((c: any) => ArtworkCommentMapper.toDomain(c))
        ),
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
      artwork_name: artwork.name.props.text,
      artwork_votes: artwork.votes
        ? artwork.votes
            .getItems()
            .map((i) => ArtworkVoteMapper.toPersistence(i))
        : [],
      artwork_comments: artwork.comments
        ? artwork.comments
            .getItems()
            .map((c) => ArtworkCommentMapper.toPersistence(c))
        : [],
    };
  }
}
