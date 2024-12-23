const FooterSection = ({ title, content }) => {
    return (<div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div>{content}</div>
    </div>);
};
export default FooterSection;
