import { useEffect, useState } from 'react';
import { loadSavedIds, storeSavedIds } from '../lib/savedStorage';

export function useSavedIds() {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    loadSavedIds().then(setSavedIds);
  }, []);

  
  
  function toggleSaved(id: number) {
    const newSavedIds = savedIds.includes(id)
    
    ? savedIds.filter((savedId) => savedId !== id)
    : [...savedIds, id];
    
    setSavedIds(newSavedIds);
    storeSavedIds(newSavedIds);
  }

  return { savedIds, toggleSaved };
}