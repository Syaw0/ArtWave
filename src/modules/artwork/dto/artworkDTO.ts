import { ArtistDTO } from "../../artist/dto/artistDTO";

export interface ArtworkDTO {
  artworkId: string;
  artworkImage: string;
  artworkName: string;
  artworkVotes: any;
  artworkComments: any;
  artworkOwner: ArtistDTO;
  artworkText: string;
}
