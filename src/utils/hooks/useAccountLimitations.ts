import { AuthContext } from "@context/auth/AuthContext";
import { stringToCamalCase } from "@app/stringToCamalCase";
import { useContext, useEffect, useState } from "react";

interface AppLimitations {
  maxApps: number;
  maxPagesPerApp: number;
  onlineStore: boolean;
  calendarEvents: boolean;
  calendarBookings: boolean;
}
export const useAccountLimitations = () => {
  const { accountTier } = useContext(AuthContext);
  const [limitList, setList] = useState<{ data: string | number; name: string }[]>([]);
  const [limitations, setLimitations] = useState<AppLimitations>({
    maxApps: 0,
    maxPagesPerApp: 0,
    onlineStore: false,
    calendarEvents: false,
    calendarBookings: false,
  });

  useEffect(() => {
    const data: AppLimitations = {
      maxApps: 0,
      onlineStore: false,
      calendarEvents: false,
      calendarBookings: false,
      maxPagesPerApp: 0,
    };
    if (accountTier) {
      accountTier.features.forEach((feature) => {
        const featureName = stringToCamalCase(feature.name);
        if (feature.valueType === "Checkbox") data[featureName] = !!feature.value;
        if (feature.valueType === "Message" && featureName === "maxApps") data[featureName] = parseInt(feature.value, 10);
        else if (feature.valueType === "Message") data[featureName] = feature.value;
      });
      setLimitations(data);
    }
    setList([
      {
        name: "Max pages",
        data: data.maxPagesPerApp,
      },
      {
        name: "Calendar events",
        data: data.calendarEvents ? "Active" : "Disabled",
      },
      {
        name: "Online store",
        data: data.onlineStore ? "Active" : "Disabled",
      },
    ]);
  }, [accountTier]);

  return { limitations, accountTier, limitList };
};
