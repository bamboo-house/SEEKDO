export interface TodoType {
  id: number;
  title: string;
  body: string;
  amount: number;
  // numberかどうかわからない
  deadline: Date;
  isDone: boolean;
}

declare global {
  interface Window {
    ethereum: any;
  }
}
