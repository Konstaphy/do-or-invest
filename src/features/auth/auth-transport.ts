import { Transport } from "../../shared/model/transport"
import { logError } from "../../shared/lib/log-error"
import sha256 from "crypto-js/sha256"

export class AuthTransport extends Transport {
  constructor() {
    super("/users")
  }

  public login(username: string, password: string) {
    // Настриваем первичную авторизацию
    const config = this.getAuthConfig(username, password)

    return this.get<{
      access_token: string
    }>("/login", config).catch((e) => {
      logError(e, "AuthTransport")
      throw e
    })
  }
  public signUp(username: string, password: string, email: string | null) {
    // Настриваем первичную авторизацию
    const config = this.getAuthConfig(username, password)

    return this.post<{ email: string | null }, { access_token: string }>(
      "/sign-up",
      { email },
      config,
    ).catch((e) => {
      logError(e, "AuthTransport")
      throw e
    })
  }

  private getAuthConfig(username: string, password: string) {
    return {
      auth: {
        username,
        password: sha256(password).toString(),
      },
    }
  }
}
