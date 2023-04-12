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
    artworkComments: Comment[];
    artworkOwner: Artist;
    artworkText: string;
  }

  interface Comment {}

  interface Vote {}
}
export {};
