import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { Mapper } from "../../../shared/infra/mapper";
import { Artist } from "../domain/artist";
import { ArtistBiography } from "../domain/artistBiography";
import { ArtistEmail } from "../domain/artistEmail";
import { ArtistName } from "../domain/artistName";
import { ArtistPassword } from "../domain/artistPassword";
import { ArtistProfilePicture } from "../domain/artistProfilePicture";
import { ArtistDTO } from "../dto/artistDTO";
import { Result } from "../../../shared/core/result";
import { ArtistSubscribe } from "../domain/artistSubscribe";
import { ArtistSubscribers } from "../domain/artistSubscribers";

export class ArtistMapper implements Mapper<Artist> {
  public static toDTO(artist: Artist): ArtistDTO {
    return {
      artistEmail: artist.email.value,
      artistId: artist.artistId.id.toString(),
      artistProfile: artist.profilePicture?.props.profileUrl ?? "",
      artistName: artist.name?.props.name ?? "",
      artistBiography: artist.biography?.props.biography ?? "",
      artistSubscribe: artist.subscribe.currentItems,
      artistSubscribers: artist.subscribers.currentItems,
    };
  }

  public static toDomain(raw: any): Artist | null {
    const artistEmailOrError = ArtistEmail.create(raw.artist_email);
    const artistPasswordOrError = ArtistPassword.create(raw.artist_password);
    const artistProfilePictureOrError = ArtistProfilePicture.create(
      raw.artist_profile_picture
        ? raw.artist_profile_picture
        : "/api/v1/artist/getProf"
    );
    const artistNameOrError = ArtistName.create(
      raw.artist_name ? raw.artist_name : ""
    );
    const artistBiographyOrError = ArtistBiography.create(
      raw.artist_biography ? raw.artist_biography : ""
    );

    const check = Result.combine([
      artistBiographyOrError,
      artistEmailOrError,
      artistNameOrError,
      artistPasswordOrError,
      artistProfilePictureOrError,
    ]);

    if (check.isFailure) {
      console.error(check.getErrorValue(), "error");
      return null;
    }
    const artistOrError = Artist.create(
      {
        email: artistEmailOrError.getValue(),
        password: artistPasswordOrError.getValue(),
        profilePicture: artistProfilePictureOrError.getValue(),
        name: artistNameOrError.getValue(),
        biography: artistBiographyOrError.getValue(),
        subscribe: ArtistSubscribe.create(raw.artist_subscribe),
        subscribers: ArtistSubscribers.create(raw.artist_subscribers),
      },
      new UniqueEntityID(raw.artist_id)
    );

    artistOrError.isFailure ? console.error(artistOrError.getErrorValue()) : "";
    return artistOrError.isFailure ? null : artistOrError.getValue();
  }

  public static toPersistence(artist: Artist): any {
    return {
      artist_id: artist.artistId.id.toString(),
      artist_email: artist.email.value,
      artist_name: artist.name?.props.name,
      artist_password: artist.password.props.password,
      artist_profile_picture: artist.profilePicture?.props.profileUrl,
      artist_biography: artist.biography?.props.biography,
      artist_subscribers: artist.subscribers.currentItems,
      artist_subscribe: artist.subscribe.currentItems,
    };
  }
}
