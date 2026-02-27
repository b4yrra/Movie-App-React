export interface Movies {
  type: string;
  data: Data;
}

export interface Data {
  event: string;
  currentTime: number;
  duration: number;
  progress: number;
  id: string;
  mediaType: string;
  season: number;
  episode: number;
  timestamp: number;
}
