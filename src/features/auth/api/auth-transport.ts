import { Transport } from "../../../shared/model/transport"
import { logError } from "../../../shared/lib/log-error"
import sha256 from "crypto-js/sha256"

export class AuthTransport extends Transport {
  constructor() {
    super("/users")
  }

  // Логин в систему, получаем токен
  public login(username: string, password: string) {
    // Настриваем первичную авторизацию
    const config = this.getAuthConfig(username, password)

    return this.get<{ access_token: string }>("/login", config)
  }

  // Создание нового пользователя
  public signUp(username: string, password: string, email: string | null) {
    const config = this.getAuthConfig(username, password)

    return this.post<{ email: string | null }, { access_token: string }>(
      "/sign-up",
      { email },
      config,
    )
  }

  // Получить штраф пользователя
  public getPenalty() {
    return this.get<{ penalty: number }>("/get-penalty")
  }

  // Пересоздаем токен
  public refresh() {
    return this.get<{ access_token: string; username: string; id: string }>("/refresh")
  }

  // Получеам конфигурацию без токена
  private getAuthConfig(username: string, password: string) {
    return {
      auth: {
        username,
        password: sha256(password).toString(),
      },
      headers: {
        authorization: null,
      },
    }
  }
}
