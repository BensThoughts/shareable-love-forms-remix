import {createContext, Dispatch, ReactNode, SetStateAction, useState} from 'react';
import type { FieldGroup } from '~/utils/types';

export const FieldGroupsContext = createContext<{
  fieldGroups: FieldGroup[] | undefined,
  setFieldGroups: Dispatch<SetStateAction<FieldGroup[]>>
} | undefined>(undefined);

interface FieldGroupsProviderProps {
  initialFieldGroups: FieldGroup[];
  children: ReactNode;
}

const FieldGroupsProvider = ({
  initialFieldGroups,
  children
}: FieldGroupsProviderProps) => {
  const [fieldGroups, setFieldGroups] = useState<FieldGroup[]>(initialFieldGroups);

  return (
    <FieldGroupsContext.Provider value={{ fieldGroups, setFieldGroups }}>
      {children}
    </FieldGroupsContext.Provider>
  );
};

export default FieldGroupsProvider;