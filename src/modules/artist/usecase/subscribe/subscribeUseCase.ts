import { Result, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/usecase";
import { UniqueEntityID } from "../../../../shared/domain/uniqueEntityID";
import { ArtistId } from "../../domain/artistId";
import { ArtistRepoProps } from "../../repo/artistRepo";
import { SubscribeDTO } from "./subscribeDTO";
import { SubscribeResponse } from "./subscribeResponse";

export class SubscribeUseCase
  implements UseCase<SubscribeDTO, SubscribeResponse>
{
  constructor(private artistRepo: ArtistRepoProps) {}
  async execute(request: SubscribeDTO): Promise<SubscribeResponse> {
    const artist = await this.artistRepo.findById(request.artistId);
    artist.follow(request.subscribedArtistId);
    const subscribedArtist = await this.artistRepo.findById(
      request.subscribedArtistId
    );
    subscribedArtist.subscribeArtist(request.subscribedArtistId);
    this.artistRepo.updateBulk([artist, subscribedArtist]);
    return right(
      Result.ok({
        loggedArtistSubscribes: artist.subscribe.currentItems,
        subscribedArtistSubscribers: subscribedArtist.subscribers.currentItems,
      })
    );
  }
}
