export interface UserModel {
  id: string;
  gender: UserGenderTypes;
  phone: string | null;
  surname: string;
  name: string;
  age: number;
  email: string | null;
}

export type UserGenderTypes = "мужчина" | "женщина";
