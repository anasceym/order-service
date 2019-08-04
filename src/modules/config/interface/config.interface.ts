export interface Config {
  app: {
    host: string
    port: number
  }
  mongo: {
    host: string
    port: number
    db: string
  }
}
