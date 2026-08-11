export interface TrackingStep {
  title: string;
  description: string;
  done: boolean;
  isCurrent?: boolean;
}

export interface Shipment {
  code: string;
  status: string;
  summary: string;
  updatedAt: string;
  destination: string;
  source?: string;
  steps: TrackingStep[];
  courier?: string;
  courierPhone?: string;
  vehicle?: string;
  vehicleType?: string;
  operator?: string;
  estimatedDelivery?: string;
  deliveredTo?: string;
  recipient?: string;
  recipientPhone?: string;
  recipientEmail?: string;
  sender?: string;
  address?: string;
  obsTitle?: string;
  obsDetail?: string;
  isObserved?: boolean;
}

export interface TrackingResponse {
  ok: boolean;
  shipment?: Shipment;
  message?: string;
}

export interface TrackingError {
  ok: false;
  message: string;
}
