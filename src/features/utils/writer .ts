export interface Message<T = string | Record<string, unknown>> {
  data: T;
  comment?: string;
  event?: string;
  id?: string;
  retry?: number;
}

export interface EventNotifier<
  T extends {
    update: T["update"] extends Message ? Message<T["update"]>["data"] : never;
    complete: T["complete"] extends Message
      ? Message<T["complete"]>["data"]
      : never;
  } = any
> {
  update(message: Message<T["update"]>["data"]): void;
  complete(message: Message<T["complete"]>["data"]): void;
}

export class Writer implements EventNotifier {
  update(message: any): void {
    throw new Error("Method not implemented.");
  }
  complete(message: any): void {
    throw new Error("Method not implemented.");
  }
}
