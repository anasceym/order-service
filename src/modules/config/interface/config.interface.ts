export interface Config {
  app: {
    host: string
    port: number
  }
  mongo: {
    connectionString?: string
    host?: string
    port?: number
    db?: string
    username?: string
    password?: string
  }
}
