import { useEffect, useState } from "react";
import { healthCheck } from "../api/backendApi";

export function useHealthCheck() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    async function check() {
      const response = await healthCheck();
      setHealth(response);
    }

    check();
  }, []);

  return health;
}
