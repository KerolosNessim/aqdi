"use client";



import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/src/utils/axios";

import {

  getContractTypeLabel,

  groupContractPeriodsByInstrumentType,

  normalizeContractPeriods,

} from "@/src/lib/contract-period-utils";



async function fetchContractPeriods(contractType) {

  const res = await axiosInstance.get("/admin/contract-periods", {

    params: {

      contract_type: contractType,

      per_page: 100,

    },

  });

  return normalizeContractPeriods(res.data);

}



export function useContractPeriods(enabled = true) {

  const housingQuery = useQuery({

    queryKey: ["contract-periods", "housing", "order-nav"],

    queryFn: () => fetchContractPeriods("housing"),

    enabled,

    staleTime: 60_000,

  });



  const commercialQuery = useQuery({

    queryKey: ["contract-periods", "commercial", "order-nav"],

    queryFn: () => fetchContractPeriods("commercial"),

    enabled,

    staleTime: 60_000,

  });



  const groups = [

    {

      id: "housing",

      name: getContractTypeLabel("housing"),

      sections: groupContractPeriodsByInstrumentType(housingQuery.data ?? []),

    },

    {

      id: "commercial",

      name: getContractTypeLabel("commercial"),

      sections: groupContractPeriodsByInstrumentType(commercialQuery.data ?? []),

    },

  ].filter((group) => group.sections.some((section) => section.items.length > 0));



  return {

    groups,

    isLoading: housingQuery.isLoading || commercialQuery.isLoading,

    hasPeriods: groups.some((group) => group.sections.length > 0),

  };

}

