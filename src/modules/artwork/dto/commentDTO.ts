import { ArtistDTO } from "../../artist/dto/artistDTO";

export interface CommentDTO {
  artist: ArtistDTO;
  commentId: string;
  parentComment: string | null;
  text: string;
  publishDate: string;
  artworkId: string;
}
