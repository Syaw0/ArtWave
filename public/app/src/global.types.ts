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

  interface LoginPageProps {
    phase: "checkInputs" | "checkToken";
    email: string;
    password: string;
  }

  interface SearchPageProps {
    isLogin: boolean;
    artist: Artist;
    artworks: Artwork[];
    searchQuery: string;
  }

  interface SettingPageProps {
    isLogin: boolean;
    loggedArtist: Artist;
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

  interface NewArtworkPageProps {
    isLogin: boolean;
    loggedArtist: Artist;
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
    artworkPublishDate: string;
  }

  interface ArtworkComment {
    artist: Artist;
    commentId: string;
    parentComment: string | null;
    text: string;
    publishDate: string;
    artworkId: string;
  }

  interface Vote {
    artistId: string;
    voteId: string;
    artworkId: string;
  }
}
export {};
