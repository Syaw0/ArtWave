import { Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { ArtworkImageService } from "../../../service/artworkImage/artworkImageService";
import { GetArtworkByIdDTO } from "../getArtworkById/getArtworkByIdDTO";
import { GetArtworkImageResponse } from "./getArtworkImageResponse";

export class GetArtworkImageUseCase
  implements UseCase<GetArtworkByIdDTO, GetArtworkImageResponse>
{
  constructor(private artworkImageService: ArtworkImageService) {}

  async execute(request: GetArtworkByIdDTO): Promise<GetArtworkImageResponse> {
    const artworkImage = await this.artworkImageService.retrieve(
      request.artworkId
    );
    return right(Result.ok<Buffer>(artworkImage));
  }
}
