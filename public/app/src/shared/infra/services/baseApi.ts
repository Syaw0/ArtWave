import axios, { AxiosInstance } from "axios";
import { apiConfig } from "src/config/apiConfig";
import { AuthenticationService } from "../../../../../../src/modules/artist/service/authenticationService";

export abstract class BaseApi {
  protected baseUrl: string;
  private axiosInstance: AxiosInstance | any;
  public authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
    this.baseUrl = apiConfig.baseUrl;
    this.axiosInstance = axios.create({});
  }

  protected get(url: string, params?: any, headers?: any): Promise<any> {
    return this.axiosInstance({
      method: "GET",
      url: `${this.baseUrl}${url}`,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }

  protected post(
    url: string,
    data?: any,
    params?: any,
    headers?: any
  ): Promise<any> {
    return this.axiosInstance({
      method: "POST",
      url: `${this.baseUrl}${url}`,
      data: data ? data : null,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }
}
