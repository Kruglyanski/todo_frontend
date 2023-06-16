export interface IListenEvents {
  chatMessage: string;
  anotherMessage: { text: string };
  //deleteQuestion: (data: { id: string; user_id: string }) => void;
}

export interface IEmitEvents {
  chatMessage: string;
  anotherMessage: { text: string; foo: any };
}
