export interface SubBranch {
  name: string;
  type: string;
  address: string;
  status: string;
}

export interface Branch {
  id: number;
  slug: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  image: string;
  localImage?: string;
  bannerImage?: string;
  coords: { lat: number; lng: number };
  description: string;
  manager: string;
  subBranches: SubBranch[];
  googleMapsUrl: string;
}

export const SITE = {
  name: "MyG Express",
  tagline: "Logística y Entregas de Confianza",
  description:
    "Recibimos tus compras online y las entregamos directamente en tu casa. Servicio de logística y entregas en la Selva Central del Perú.",
  url: "https://myg-express.com",
  appUrl: "https://app.myg-express.com",
  locale: "es_PE",
  region: "Selva Central del Perú",
  phone: "+51 991 776 931",
  email: "mygexpress30@gmail.com",
  whatsapp: "+51991776931",
  hours: "Lun-Vie: Mañana y Tarde · Sábados: 9:00 am - 5:00 pm",
} as const;

export const NAV_LINKS = [
  { href: "/#hero", label: "Inicio" },
  { href: "/#sedes", label: "Sedes" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proceso", label: "¿Cómo funciona?" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export const BRANCHES: readonly Branch[] = [
  {
    id: 1,
    slug: "la-merced",
    name: "Sede Principal La Merced",
    region: "Chanchamayo · Junín",
    address: "Calle La Rivera c/ Los Piñales",
    phone: "+51 937 172 319",
    whatsapp: "51937172319",
    hours: "Lun-Vie: 9:00am - 1:00pm / 3:00pm - 7:00pm · Sáb: 9:00am - 5:00pm",
    hoursWeekdays: "Lun-Vie: 9:00 am - 1:00 pm / 3:00 pm - 7:00 pm",
    hoursSaturday: "Sábados: 9:00 am - 5:00 pm",
    image: "/assets/sede-la-merced.jpg?v=4",
    localImage: "/assets/local-la-merced.jpg?v=4",
    coords: { lat: -11.0628, lng: -75.3257 },
    description: "Sede central de recepción y despacho para enviar y recoger paquetes en todo el valle de Chanchamayo y puntos conectados.",
    manager: "Atención al Cliente - La Merced",
    subBranches: [
      { name: "Agencia San Ramón", type: "Agencia MyG Express", address: "Av. Progreso 142", status: "Punto Activo" },
      { name: "Agencia Pichanaki", type: "Punto de Recepción", address: "Av. Marginal 530", status: "Punto Activo" },
      { name: "Punto Perené", type: "Punto de Envío y Recojo", address: "Jr. Comercio 210", status: "Punto Activo" },
      { name: "Punto Vitoc", type: "Punto Autorizado", address: "Plaza Principal s/n", status: "Punto Activo" },
      { name: "Agencia Villa Rica", type: "Agencia MyG Express", address: "Jr. Leopoldo Krause 240", status: "Punto Activo" },
      { name: "Punto Puerto Bermúdez", type: "Punto de Envío y Recojo", address: "Av. Alberto Reyes s/n", status: "Punto Activo" },
      { name: "Punto Iscozacín", type: "Punto Autorizado", address: "Jr. Comercio s/n", status: "Punto Activo" },
      { name: "Punto Palcazú", type: "Punto de Recepción", address: "Av. Fernando Belaunde s/n", status: "Punto Activo" },
      { name: "Punto Ciudad Constitución", type: "Agencia MyG Express", address: "Av. Marginal s/n", status: "Punto Activo" },
    ],
    googleMapsUrl: "https://maps.google.com/?q=-11.0628,-75.3257",
  },
  {
    id: 2,
    slug: "satipo",
    name: "Sede Principal Satipo",
    region: "Satipo · Junín",
    address: "Av. Manuel Prado 284, Satipo",
    phone: "+51 965 432 100",
    whatsapp: "51965432100",
    hours: "Lun-Vie: 9:00am - 1:00pm / 4:00pm - 8:00pm · Sáb: 9:00am - 5:00pm",
    hoursWeekdays: "Lun-Vie: 9:00 am - 1:00 pm / 4:00 pm - 8:00 pm",
    hoursSaturday: "Sábados: 9:00 am - 5:00 pm",
    image: "/assets/sede-satipo.jpg?v=8",
    localImage: "/assets/local-satipo.jpg?v=2",
    coords: { lat: -11.2524, lng: -74.6386 },
    description: "Centro logístico de recepción y recojo para la provincia de Satipo y su red de puntos de atención en distritos aledaños.",
    manager: "Atención al Cliente - Satipo",
    subBranches: [
      { name: "Agencia Mazamari", type: "Agencia MyG Express", address: "Av. Perú 312", status: "Punto Activo" },
      { name: "Agencia Pangoa", type: "Punto de Envío y Recojo", address: "Jr. 7 de Junio 415", status: "Punto Activo" },
      { name: "Punto Río Tambo", type: "Punto Autorizado", address: "Av. Principal s/n", status: "Punto Activo" },
      { name: "Punto Río Negro", type: "Punto de Recepción", address: "Jr. Los Laureles 108", status: "Punto Activo" },
    ],
    googleMapsUrl: "https://maps.google.com/?q=-11.2524,-74.6386",
  },
  {
    id: 3,
    slug: "oxapampa",
    name: "Sede Principal Oxapampa",
    region: "Oxapampa · Pasco",
    address: "Av. Enrique Bottger, cuadra 7 con Jr. Kennedy, cuadra 4",
    phone: "+51 976 543 210",
    whatsapp: "51976543210",
    hours: "Lun-Vie: 9:00am - 1:00pm / 3:00pm - 7:00pm · Sáb: 9:00am - 5:00pm",
    hoursWeekdays: "Lun-Vie: 9:00 am - 1:00 pm / 3:00 pm - 7:00 pm",
    hoursSaturday: "Sábados: 9:00 am - 5:00 pm",
    image: "/assets/sede-oxapampa.jpg?v=2",
    localImage: "/assets/local-oxapampa.jpg?v=4",
    bannerImage: "/assets/banner-oxapampa.jpg",
    coords: { lat: -10.5775, lng: -75.4014 },
    description: "Oficina principal de recepción y envío en Oxapampa, conectando puntos de recojo y entregas en la provincia.",
    manager: "Atención al Cliente - Oxapampa",
    subBranches: [
      { name: "Agencia Chontabamba", type: "Punto de Envío y Recojo", address: "Jr. Pozuzo s/n", status: "Punto Activo" },
      { name: "Punto Huancabamba", type: "Punto Autorizado", address: "Av. Principal 115", status: "Punto Activo" },
      { name: "Punto Pozuzo", type: "Punto de Recepción", address: "Jr. José Faber s/n", status: "Punto Activo" },
    ],
    googleMapsUrl: "https://maps.google.com/?q=-10.5775,-75.4014",
  },
];

export const SERVICES = [
  {
    icon: "truck",
    name: "Entrega a Domicilio",
    description:
      "Llevamos tu paquete directamente a la puerta de tu casa. Sin que te muevas, ya lo tienes.",
  },
  {
    icon: "package",
    name: "Recepción de Paquetes",
    description:
      "Recibimos en nuestras sedes los paquetes de tus compras online y te avisamos de inmediato.",
  },
  {
    icon: "gift",
    name: "Paquetes Especiales",
    description:
      "Paquetes frágiles o de alto valor. Los manejamos con el mayor cuidado para que lleguen perfectos.",
  },
  {
    icon: "messageSquare",
    name: "Seguimiento y Soporte",
    description:
      "Te informamos el estado de tu paquete en todo momento. Cualquier consulta, estamos aquí.",
  },
] as const;

export const WHY_US = [
  {
    icon: "star",
    stat: "98%",
    label: "Entregas Exitosas",
    description:
      "Casi la totalidad de nuestros paquetes son entregados en el tiempo acordado, siempre.",
  },
  {
    icon: "shield",
    stat: "100%",
    label: "Paquetes Seguros",
    description:
      "Tu paquete está protegido desde que lo recibimos en sede hasta que llega a tu puerta.",
  },
  {
    icon: "messageSquare",
    stat: "24/7",
    label: "Soporte Constante",
    description:
      "Siempre disponibles para resolver tus consultas sobre tu paquete, cobertura o ubicación.",
  },
  {
    icon: "mapPin",
    stat: "3",
    label: "Sedes Estratégicas",
    description:
      "Cubrimos La Merced, Satipo y Oxapampa para llegar a cada rincón de la Selva Central.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    icon: "clipboard",
    label: "Haz tu compra online",
    description:
      "Compra en cualquier tienda y coloca nuestra sede como destino de entrega.",
  },
  {
    icon: "bell",
    label: "Te avisamos al recibir",
    description:
      "Cuando llega tu paquete, te notificamos de inmediato por WhatsApp.",
  },
  {
    icon: "truck",
    label: "Lo llevamos a tu casa",
    description:
      "Nuestro equipo entrega el paquete directamente en la puerta de tu domicilio.",
  },
  {
    icon: "checkCircle",
    label: "Recíbelo en casa",
    description:
      "Firmas la recepción y listo. Tu compra online llegó sin que salgas de casa.",
  },
] as const;

export const TESTIMONIALS = [
  {
    initials: "RM",
    name: "Rosa Mamani",
    city: "La Merced, Junín",
    time: "Hace 1 semana",
    service: "Entrega a domicilio",
    route: "Lima → La Merced",
    text: "Pedí algo por internet y llegó directo a mi puerta en La Merced. No tuve que moverme para nada. El servicio es increíble y súper rápido.",
  },
  {
    initials: "JC",
    name: "Juan Carlos Pérez",
    city: "Satipo, Junín",
    time: "Hace 2 semanas",
    service: "Entrega a domicilio",
    route: "Lima → Satipo",
    text: "Excelente servicio. Me avisaron por WhatsApp cuando llegó mi paquete y a las horas ya lo tenía en casa en Satipo. Muy atentos.",
  },
  {
    initials: "LH",
    name: "Lucía Huamán",
    city: "Oxapampa, Pasco",
    time: "Hace 1 mes",
    service: "Entrega a domicilio",
    route: "Lima → Oxapampa",
    text: "Vivo en Oxapampa y siempre me preocupaba que mis compras online llegaran. Con MyG Express ya no me preocupo, llegan seguros y a tiempo.",
  },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com/mygexpress",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/mygexpress",
    icon: "instagram",
  },
] as const;

export const MAP_CITIES = [
  { name: "Oxapampa", x: 45, y: 75, delay: 0 },
  { name: "San Ramón", x: 110, y: 35, delay: 0.2 },
  { name: "Chanchamayo", x: 180, y: 65, delay: 0.4, main: true },
  { name: "Perene", x: 245, y: 30, delay: 0.6 },
  { name: "Pichanaki", x: 295, y: 75, delay: 0.8 },
  { name: "Satipo", x: 360, y: 45, delay: 1 },
] as const;
