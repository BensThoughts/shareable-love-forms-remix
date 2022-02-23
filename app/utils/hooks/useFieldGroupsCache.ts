import { useContext } from 'react';
import { FieldGroupsContext } from '../context/FieldGroupCacheContext';

export default function useFieldGroupCache() {
  const context = useContext(FieldGroupsContext);
  if (context === undefined) {
    throw new Error('useSlideAnimation must be used within a SlideAnimationProvider');
  }
  const fieldGroups = context.fieldGroups;
  const setFieldGroups = context.setFieldGroups;

  return [fieldGroups, setFieldGroups] as const;
};
