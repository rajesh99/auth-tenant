'use client';

import { defineAbilityFor } from '@/lib/utils/caslAbility';
import { AbilityContext } from '@/lib/utils/caslContext';
import { RoleContext } from '@/lib/utils/roleContext';
import { LayoutProps } from '@/lib/types/types';
import { RolesE } from '@/lib/types/enums';

interface AbilityProviderPropsI extends LayoutProps {
  role: RolesE;
  id: string;
}

export function AbilityProvider({ children, role, id }: AbilityProviderPropsI) {
  return (
    <AbilityContext.Provider value={defineAbilityFor(role, id)}>
      <RoleContext.Provider value={role}>{children}</RoleContext.Provider>
    </AbilityContext.Provider>
  );
}
