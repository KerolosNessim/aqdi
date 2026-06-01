'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/src/stores/user-store';

export default function StoreHydrator() {
  useEffect(() => {
    const finishHydration = () => {
      useUserStore.setState({ _hasHydrated: true });
    };

    if (useUserStore.persist.hasHydrated()) {
      finishHydration();
      return;
    }

    return useUserStore.persist.onFinishHydration(finishHydration);
  }, []);

  return null;
}
