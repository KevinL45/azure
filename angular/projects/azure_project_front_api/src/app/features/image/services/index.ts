import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export const getAllImages = () => {
  return inject(HttpClient).get<unknown>('')
}
