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
  eq: '=',
} as const;
export type DeviceComparisonKey = keyof typeof COMPARISON_CHOICES;

export const RULE_COMPARISON_CHOICES = [
  {
    value: 'gt',
    label: '>',
  },
  {
    value: 'lt',
    label: '<',
  },
  {
    value: 'eq',
    label: '=',
  },
] as const;
export type RuleComparisonKey = keyof typeof RULE_COMPARISON_CHOICES;

export const RULE_PARAMETER = [
  {
    value: 'cpu_usage',
    label: 'CPU',
  },
  {
    value: 'ram_usage',
    label: 'RAM',
  },
  {
    value: 'temperature',
    label: 'Temperatura',
  },
  {
    value: 'latency',
    label: 'Latência',
  },
] as const;
export type RuleParameterKey = keyof typeof RULE_PARAMETER;
