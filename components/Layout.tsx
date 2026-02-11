import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
    className?: string; // Permitir classes extras se necessário
    withBottomNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '', withBottomNav = true }) => {
    return (
        <div className={`flex-1 flex flex-col ${withBottomNav ? 'pb-24' : ''} bg-background-dark min-h-screen ${className}`}>
            {children}
        </div>
    );
};

export default Layout;
