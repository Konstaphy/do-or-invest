import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useUserStore } from "./user-store"

export class Transport {
  protected readonly url: string = "http://127.0.0.1:8080"
  protected readonly token: string | null = null

  constructor(url: string) {
    this.url += url
    this.token = useUserStore.getState().accessToken
  }

  post<T, OUT>(
    controller: string,
    data: T,
    config?: AxiosRequestConfig,
  ): Promise<OUT> {
    return axios
      .post<T, AxiosResponse<OUT>>(this.url + controller, data, {
        ...config,
        withCredentials: true,
        headers: { authorization: `Bearer ${this.token}` },
      })
      .then((res) => res.data)
  }
  get<T>(controller: string, config?: AxiosRequestConfig): Promise<T> {
    return axios
      .get<T>(this.url + controller, {
        ...config,
        withCredentials: true,
        headers: { authorization: `Bearer ${this.token}` },
      })
      .then((res) => res.data)
  }
}
