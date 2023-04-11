export interface FindOneProps {
  where?: {
    [index: string]: any;
  };
  sort?: { [index: string]: 1 | -1 };
}

export interface DbConfig {}
