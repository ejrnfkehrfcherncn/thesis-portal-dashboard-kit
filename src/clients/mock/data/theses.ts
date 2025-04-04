
import { Thesis } from "@/types/api";

export const mockTheses: Thesis[] = [
  {
    id: "1",
    title: "Розробка системи управління бакалаврськими темами",
    description: "Розробка веб-застосунку для розподілу та управління темами бакалаврських робіт між студентами та викладачами.",
    supervisor: {
      id: "2",
      name: "Петро Викладач",
      username: "xsupervisor",
      authorities: ["ROLE_SUPERVISOR"]
    },
    status: "AVAILABLE",
    createdAt: new Date(2023, 8, 1).toISOString(),
    updatedAt: new Date(2023, 8, 1).toISOString()
  },
  {
    id: "2",
    title: "Машинне навчання для аналізу текстових даних",
    description: "Розробка системи машинного навчання для класифікації та аналізу тексту українською мовою.",
    supervisor: {
      id: "2",
      name: "Петро Викладач",
      username: "xsupervisor",
      authorities: ["ROLE_SUPERVISOR"]
    },
    status: "ASSIGNED",
    createdAt: new Date(2023, 8, 5).toISOString(),
    updatedAt: new Date(2023, 9, 10).toISOString(),
    assignedTo: {
      id: "1",
      name: "Іван Студентський",
      username: "xstudent",
      authorities: ["ROLE_STUDENT"]
    }
  },
  {
    id: "3",
    title: "Розробка мобільного застосунку для медичних закладів",
    description: "Створення мобільного застосунку для полегшення запису на прийом до лікарів та отримання медичних консультацій.",
    supervisor: {
      id: "2",
      name: "Петро Викладач",
      username: "xsupervisor",
      authorities: ["ROLE_SUPERVISOR"]
    },
    status: "AVAILABLE",
    createdAt: new Date(2023, 8, 10).toISOString(),
    updatedAt: new Date(2023, 8, 10).toISOString()
  }
];
