import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    subtitle = "2º Pelotão Guaxupé",
    action,
    children
}) => {
    return (
        <header className="px-6 pt-12 pb-6">
            <div className="flex justify-between items-start">
                <div>
                    {subtitle && (
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                            {subtitle}
                        </p>
                    )}
                    <h1 className="text-4xl font-bold">{title}</h1>
                </div>
                {action && (
                    <div className="active:scale-90 transition-transform">
                        {action}
                    </div>
                )}
            </div>

            {children && (
                <div className="mt-8">
                    {children}
                </div>
            )}
        </header>
    );
};

export default PageHeader;
