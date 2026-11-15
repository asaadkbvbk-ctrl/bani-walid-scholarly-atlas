import { queryOptions } from '@tanstack/react-query';
import { getPlatformSettings } from './platform.functions';
export const platformOptions = queryOptions({ queryKey: ['platform-settings'], queryFn: () => getPlatformSettings(), staleTime: 30_000 });