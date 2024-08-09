import { DateItem } from "@/constants/Interfaces";
import moment from "moment";
import { useMemo } from "react";


type Weeks = DateItem[][];

const useWeeks = (currentWeekOffset: number): Weeks => {
  return useMemo(() => {
    const start = moment().add(currentWeekOffset,"weeks").startOf("week")
    return [-1,0,1].map((adj) => Array.from({length: 7}).map((_,index) => {
        const date = moment(start).add(adj, "week").add(index, "day")
        return {
            weekday: date.format("ddd"),
            date: date.toDate()
        };
    }))
  }, [currentWeekOffset]);
};

export default useWeeks;