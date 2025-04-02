
import { useContext } from "react";
import apiService from "@/services/api/apiServiceFactory";

export function useApi() {
  return apiService;
}
