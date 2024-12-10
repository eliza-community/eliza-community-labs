import $http from "../utils/http";

export function imageGenApi (prompt: string) {
  return $http.post('image', { prompt })
}