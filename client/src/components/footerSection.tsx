interface FooterSectionProps {
  title: string;
  content: React.ReactNode;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, content }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div>{content}</div>
    </div>
  );
};

export default FooterSection;