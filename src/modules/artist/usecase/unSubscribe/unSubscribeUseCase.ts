import { Result, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/usecase";
import { ArtistRepoProps } from "../../repo/artistRepo";
import { UnSubscribeDTO } from "./unSubscribeDTO";
import { UnSubscribeResponse } from "./unSubscribeResponse";

export class UnSubscribeUseCase
  implements UseCase<UnSubscribeDTO, UnSubscribeResponse>
{
  constructor(private artistRepo: ArtistRepoProps) {}
  async execute(request: UnSubscribeDTO): Promise<UnSubscribeResponse> {
    const artist = await this.artistRepo.findById(request.artistId);
    artist.unFollow(request.unSubscribedArtistId);
    const unSubscribedArtist = await this.artistRepo.findById(
      request.unSubscribedArtistId
    );
    unSubscribedArtist.unSubscribeArtist(request.artistId);
    this.artistRepo.updateBulk([artist, unSubscribedArtist]);
    return right(
      Result.ok({
        loggedArtistSubscribes: artist.subscribe.currentItems,
        unSubscribedArtistSubscribers:
          unSubscribedArtist.subscribers.currentItems,
      })
    );
  }
}
