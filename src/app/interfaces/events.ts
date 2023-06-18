export interface IOnEvents {
  chatMessage: {message: string, userEmail: string};
  anotherMessage: { text: string; foo: any };
}

export interface IEmitEvents {
  chatMessage: string;
  anotherMessage: { text: string; foo: any };
}
