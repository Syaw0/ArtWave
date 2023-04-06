export interface FindOneProps {
  where?: {
    [index: string]: string;
  };
  sort?: { [index: string]: 1 | -1 };
}

export interface DbConfig {}
