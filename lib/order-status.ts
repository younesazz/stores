export function statusLabel(status: string, lang: "fr" | "en" | "ar") {
    const map = {
      fr: {
        DELIVERED: "Livrée",
        SHIPPED: "Expédiée",
        PROCESSING: "En cours",
        CANCELLED: "Annulée",
        PENDING: "En attente",
      },
      en: {
        DELIVERED: "Delivered",
        SHIPPED: "Shipped",
        PROCESSING: "Processing",
        CANCELLED: "Cancelled",
        PENDING: "Pending",
      },
      ar: {
        DELIVERED: "تم التوصيل",
        SHIPPED: "تم الشحن",
        PROCESSING: "قيد المعالجة",
        CANCELLED: "ملغاة",
        PENDING: "قيد الانتظار",
      },
    } as const
  
    return (map[lang] as any)[status] ?? status
  }
  
  export function statusClasses(status: string) {
    if (status === "DELIVERED") return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900"
    if (status === "CANCELLED") return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-900"
    return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-900"
  }
  