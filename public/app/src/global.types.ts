declare global {
  interface ArtworkCardProps {
    artworkImage: string;
    artworkName: string;
    artworkId: string;
    artworkOwner: any;
    artistProfile: string;
    artistName: string;
    artworkVotes: any;
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
    artworkVotes: Vote;
    artworkComments: Comment;
    artworkOwner: Artist;
  }

  interface Comment {}

  interface Vote {}
}
export {};
