interface ConnectorConfig {
  dialect: "mariadb" | "mysql";
}

export class CreateDBConnector {
  constructor(private config: ConnectorConfig) {
    this.config = config;
  }
}
