export interface JoinRoom {
  username: string;
  roomname: string;
}

export interface Message {
  text?: string;
  userId?: string;
  username?: string;
  type?: string;
  date?: string;
}
