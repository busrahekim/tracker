import { Timestamp } from "@/constants/Interfaces";
import { useEffect, useState } from "react";

const useFormattedDate = (timestamp: Timestamp) => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (timestamp) {
      const date = new Date(timestamp.seconds * 1000);

      const formatted = date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setFormattedDate(formatted);
    }
  }, [timestamp]);

  return formattedDate;
};

export default useFormattedDate;
