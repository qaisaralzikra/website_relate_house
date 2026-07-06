export default function SectionTitle({ children }) {
    return (
        <div className="text-center mb-12">
            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark">
                {children}
            </h2>
        </div>
    );
}