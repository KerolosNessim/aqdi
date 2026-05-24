'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Loader from '@/components/home/loader';
import { usePermissions } from '@/src/hooks/usePermissions';
import { getSectionForPath } from '@/src/lib/permissions';

export default function RoutePermissionGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { canRoute, isReady, firstAllowedHref } = usePermissions();

  const section = getSectionForPath(pathname);
  const allowed = canRoute(pathname);

  useEffect(() => {
    if (!isReady || allowed) return;

    toast.error('ليس لديك صلاحية للوصول إلى هذه الصفحة');
    router.replace(firstAllowedHref);
  }, [isReady, allowed, firstAllowedHref, router]);

  if (!isReady) {
    return <Loader />;
  }

  if (!allowed && section) {
    return <Loader />;
  }

  return children;
}
