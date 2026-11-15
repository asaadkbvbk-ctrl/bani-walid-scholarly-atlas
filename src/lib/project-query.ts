import { queryOptions } from '@tanstack/react-query';
import { getProjectCatalog, getProjectDocuments } from './projects.functions';
export const catalogOptions = queryOptions({ queryKey: ['project-catalog'], queryFn: () => getProjectCatalog(), staleTime: 0 });
export const documentsOptions = queryOptions({ queryKey: ['project-documents'], queryFn: () => getProjectDocuments(), staleTime: 0 });