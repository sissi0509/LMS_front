export interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}
export interface Module {
  _id: string;
  name: string;
  course: string;
  lessons: Lesson[];
  editing?: boolean;
  description: string;
}
