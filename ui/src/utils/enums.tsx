export const DEVICE_PARAMETER = {
  cpu_usage: 'CPU (%)',
  ram_usage: 'RAM (%)',
  temperature: 'Temperatura (°C)',
  latency: 'Latência (ms)',
} as const;

export type DeviceParameterKey = keyof typeof DEVICE_PARAMETER;

export const COMPARISON_CHOICES = {
  gt: '>',
  lt: '<',
  eq: '==',
} as const;
export type DeviceComparisonKey = keyof typeof COMPARISON_CHOICES;
