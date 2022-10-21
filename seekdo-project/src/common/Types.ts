export interface TodoType {
  title: string;
  body: string;
  poolAmount: number;
  // numberかどうかわからない
  deadline: Date;
  done: boolean;
}

declare global {
  interface Window {
    ethereum: any;
  }
}
