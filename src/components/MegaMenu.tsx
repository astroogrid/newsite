
import React from 'react';
import DesktopMegaMenu from './megamenu/DesktopMegaMenu';
import { useIsMobile } from '@/hooks/use-mobile';

const MegaMenu: React.FC = () => {
  const isMobile = useIsMobile();

  // Only show desktop mega menu on desktop
  if (isMobile) {
    return null;
  }

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <DesktopMegaMenu />
      </div>
    </div>
  );
};

export default MegaMenu;
