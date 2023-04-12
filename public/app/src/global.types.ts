declare global {
  interface ArtworkCardProps {
    artworkImage: string;
    artworkName: string;
    artworkId: string;
    artworkOwner: any;
    artistProfile: string;
    artistName: string;
    artworkVotes: any;
    hideBottom: boolean;
  }

  interface HomePageProps {
    isLogin: boolean;
    artist: Artist;
    artworks: Artwork[];
  }

  interface SearchPageProps {
    isLogin: boolean;
    artist: Artist;
    artworks: Artwork[];
  }

  interface ArtistIdPageProps {
    isLogin: boolean;
    loggedArtist: Artist;
    artist: Artist;
    artistArtworks: Artwork[];
    artistVoted: Artwork[];
  }

  interface ArtworkIdPageProps {
    isLogin: boolean;
    loggedArtist: Artist;
    artwork: Artwork;
    isArtistLikeArtwork: boolean;
    more: Artwork[];
  }

  interface Artist {
    artistEmail: string;
    artistId: string;
    artistProfile: string;
    artistName: string;
    artistBiography: string;
  }

  interface Artwork {
    artworkId: string;
    artworkImage: string;
    artworkName: string;
    artworkVotes: Vote[];
    artworkComments: ArtworkComment[];
    artworkOwner: Artist;
    artworkText: string;
  }

  interface ArtworkComment {
    artist: Artist;
    commentId: string;
    parentComment: string | null;
    text: string;
    publishDate: string;
  }

  interface Vote {
    artistId: string;
    voteId: string;
    artworkId: string;
  }
}
export {};
