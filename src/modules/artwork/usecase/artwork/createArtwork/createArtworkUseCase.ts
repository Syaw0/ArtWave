import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { UniqueEntityID } from "../../../../../shared/domain/uniqueEntityID";
import { ArtistId } from "../../../../artist/domain/artistId";
import { Artwork } from "../../../domain/artwork";
import { ArtworkDescription } from "../../../domain/artworkDescription";
import { ArtworkId } from "../../../domain/artworkId";
import { ArtworkVotes } from "../../../domain/artworkVotes";
import { Comments } from "../../../domain/comments";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { ArtworkImageService } from "../../../service/artworkImage/artworkImageService";
import { CreateArtworkDTO } from "./createArtworkDTO";
import { CreateArtworkError } from "./createArtworkError";
import { CreateArtworkResponse } from "./createArtworkResponse";

export class CreateArtworkUseCase
  implements UseCase<CreateArtworkDTO, CreateArtworkResponse>
{
  constructor(
    private artworkRepo: ArtworkRepoProps,
    private artworkImageService: ArtworkImageService
  ) {}

  async execute(request: CreateArtworkDTO): Promise<CreateArtworkResponse> {
    const artworkId = ArtworkId.create().getValue();
    const artwork = Artwork.create(
      {
        description: ArtworkDescription.create(request.description).getValue(),
        artworkId: artworkId,
        imageSrc: `/api/v1/artwork/image/${artworkId.id.toString()}`,
        owner: ArtistId.create(new UniqueEntityID(request.artistId)).getValue(),
        publishDate: new Date(),
        votes: ArtworkVotes.create([]),
        comments: Comments.create([]),
        totalCommentsNum: 0,
      },
      artworkId.id
    );
    if (artwork.isFailure) {
      return left(
        new CreateArtworkError.FailedToCreateArtwork(
          artwork.getErrorValue() as any
        )
      );
    }
    await this.artworkImageService.save(artworkId.id.toString(), request.image);
    await this.artworkRepo.save(artwork.getValue());
    return right(Result.ok<void>());
  }
}
