import { queryOptions } from '@tanstack/react-query';
import { getGraduates, getSiteFiles, listSupervisors } from './admin.functions';
export const graduatesOptions = queryOptions({ queryKey: ['graduates'], queryFn: () => getGraduates(), staleTime: 0 });
export const siteFilesOptions = queryOptions({ queryKey: ['site-files'], queryFn: () => getSiteFiles(), staleTime: 0 });
export const supervisorsOptions = queryOptions({ queryKey: ['supervisors'], queryFn: () => listSupervisors(), staleTime: 0 });
