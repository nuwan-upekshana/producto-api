import { APIPayload } from '.';

export interface APIResponse {
  statusCode: number;
  exception: string;
  message: string;
  timestamp: string;
  path: string;
  data: APIPayload;
  meta?: any;
}
