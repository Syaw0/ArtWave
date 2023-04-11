export interface CommentDTO {
  artistId: string;
  commentId: string;
  parentComment: string | null;
  text: string;
  publishDate: Date;
}
