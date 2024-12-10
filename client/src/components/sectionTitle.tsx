interface SectionTitleProps {
    title: string;
  }
  
  const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    return (
      <h3 className="text-xl font-semibold text-stone-100 mb-4">{title}</h3>
    );
  };
  
  export default SectionTitle;