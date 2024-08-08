export interface Content {
  contentId: number;
  title: string;
  description: string;
}

export interface StepData {
  id: number;
  stepTitle: string;
  content: Content[];
}

export interface SetData {
  kg: string;
  rep: string;
}
