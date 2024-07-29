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

const Steps: StepData[] = [
  {
    id: 1,
    stepTitle: "Choose your workout plan",
    content: [
      {
        contentId: 1,
        title: "PPL",
        description: "favourite by 75% of the users",
      },
      {
        contentId: 2,
        title: "Upper & Lower Body",
        description: "great choice for beginners",
      },
    ],
  },
  {
    id: 2,
    stepTitle: "Choose unit",
    content: [
      {
        contentId: 1,
        title: "kg",
        description: "",
      },
      {
        contentId: 2,
        title: "lbs",
        description: "",
      },
    ],
  },
  {
    id: 3,
    stepTitle: "Choose frequency",
    content: [
      {
        contentId: 1,
        title: "3-days a week",
        description: "",
      },
      {
        contentId: 2,
        title: "5-days a week",
        description: "",
      },
    ],
  },
];

export default Steps;
