import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/valueObject";
interface ArtistProfilePictureProps {
  profileUrl: string | null;
}
export class ArtistProfilePicture extends ValueObject<ArtistProfilePictureProps> {
  private constructor(props: ArtistProfilePictureProps) {
    super(props);
  }
  public static create(profileUrl: string = ""): Result<ArtistProfilePicture> {
    const checkProfileNullity = Guard.againstNullOrUndefined(
      profileUrl,
      "profileUrl"
    );
    if (checkProfileNullity.isFailure) {
      return Result.fail<ArtistProfilePicture>(
        checkProfileNullity.getErrorValue()
      );
    }

    return Result.ok<ArtistProfilePicture>(
      new ArtistProfilePicture({ profileUrl })
    );
  }
}
