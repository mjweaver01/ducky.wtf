import { useEffect } from 'react';
import { updateMetadata } from '../metadata';

interface UseMetadataOptions {
  title: string;
  description?: string;
}

/**
 * Hook to update page metadata (title and description) on mount
 * Usage: useMetadata({ title: 'Page Title', description: 'Page description' })
 */
export function useMetadata({ title, description }: UseMetadataOptions): void {
  useEffect(() => {
    updateMetadata({ title, description });
  }, [title, description]);
}
